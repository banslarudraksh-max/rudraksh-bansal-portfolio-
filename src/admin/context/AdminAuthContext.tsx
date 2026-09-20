import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User as SupabaseAuthUser } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured, supabaseUrl } from '../../lib/supabase';
import { AdminUser } from '../types';

interface AdminAuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isConfigured: boolean;
  supabaseUrl: string;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

// Transform Supabase auth User into AdminUser representation
const mapSupabaseUser = (sbUser: SupabaseAuthUser): AdminUser => {
  const meta = sbUser.user_metadata || {};
  const email = sbUser.email || '';
  const displayName =
    meta.name ||
    meta.full_name ||
    (email ? email.split('@')[0] : 'Admin');

  return {
    id: sbUser.id,
    email,
    name: displayName,
    role: 'superadmin',
    avatarUrl: meta.avatar_url || '',
    lastLogin: sbUser.last_sign_in_at || new Date().toISOString(),
  };
};

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize session on mount and subscribe to auth changes
  useEffect(() => {
    let isMounted = true;

    async function initSession() {
      if (!isSupabaseConfigured) {
        if (isMounted) {
          setIsLoading(false);
        }
        return;
      }

      try {
        // 1. On Admin Dashboard load, call supabase.auth.getSession()
        const { data, error: sessionError } = await supabase.auth.getSession();
        let session = data?.session;

        // 2. If the session is missing, call supabase.auth.refreshSession()
        if (!session || sessionError) {
          try {
            const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
            if (!refreshError && refreshData?.session) {
              session = refreshData.session;
            } else if (refreshError) {
              console.warn('Initial session refresh notice:', refreshError.message);
            }
          } catch (refEx) {
            console.warn('Session refresh exception on load:', refEx);
          }
        }

        if (session?.user) {
          if (isMounted) {
            setUser(mapSupabaseUser(session.user));
          }
        } else {
          if (isMounted) {
            setUser(null);
          }
        }
      } catch (err) {
        console.error('Session initialization error:', err);
        if (isMounted) {
          setUser(null);
        }
      } finally {
        // 5. Wait for the initial auth session check to finish before rendering protected admin functionality
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    initSession();

    // Setup live subscription to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!isMounted) return;

      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
        if (session?.user) {
          setUser(mapSupabaseUser(session.user));
          setError(null);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, pass: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError('Please enter your admin email address.');
      setIsLoading(false);
      return false;
    }

    if (!pass) {
      setError('Please enter your password.');
      setIsLoading(false);
      return false;
    }

    // Verify Supabase project credentials are set
    if (!isSupabaseConfigured) {
      setError(
        'Supabase is not configured yet. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables.'
      );
      setIsLoading(false);
      return false;
    }

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password: pass,
      });

      if (authError) {
        let displayMessage = authError.message;

        if (
          authError.message.toLowerCase().includes('invalid login credentials') ||
          authError.message.toLowerCase().includes('invalid grant') ||
          authError.status === 400
        ) {
          displayMessage = 'Invalid email or password. Please verify your admin account credentials in Supabase Dashboard → Authentication → Users.';
        } else if (authError.message.toLowerCase().includes('email not confirmed')) {
          displayMessage = 'This email has not been confirmed in Supabase. In Supabase Dashboard → Authentication → Users, please confirm the user or disable email confirmation in Auth settings.';
        } else if (authError.message.toLowerCase().includes('fetch') || authError.message.toLowerCase().includes('network')) {
          displayMessage = 'Network error: Failed to contact Supabase. Please verify your VITE_SUPABASE_URL and internet connection.';
        }

        setError(displayMessage);
        setIsLoading(false);
        return false;
      }

      if (data?.user) {
        setUser(mapSupabaseUser(data.user));
        setIsLoading(false);
        return true;
      }

      setError('Authentication did not return a valid user session. Please try again.');
      setIsLoading(false);
      return false;
    } catch (err: unknown) {
      console.error('Login error:', err);
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred during login.';
      setError(msg);
      setIsLoading(false);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured) {
        const { error: signOutError } = await supabase.auth.signOut();
        if (signOutError) {
          console.warn('Supabase signOut warning:', signOutError.message);
        }
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        isConfigured: isSupabaseConfigured,
        supabaseUrl,
        login,
        logout,
        clearError,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
