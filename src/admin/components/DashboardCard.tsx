import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive?: boolean;
    label?: string;
  };
  onClick?: () => void;
  accentColor?: 'emerald' | 'cyan' | 'purple' | 'amber' | 'blue';
  actionLabel?: string;
}

const COLOR_MAP = {
  emerald: {
    bg: 'from-emerald-500/10 via-emerald-500/5 to-transparent',
    border: 'border-emerald-500/20 hover:border-emerald-500/40',
    iconBg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    glow: 'group-hover:shadow-emerald-950/20',
  },
  cyan: {
    bg: 'from-cyan-500/10 via-cyan-500/5 to-transparent',
    border: 'border-cyan-500/20 hover:border-cyan-500/40',
    iconBg: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
    glow: 'group-hover:shadow-cyan-950/20',
  },
  purple: {
    bg: 'from-purple-500/10 via-purple-500/5 to-transparent',
    border: 'border-purple-500/20 hover:border-purple-500/40',
    iconBg: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    glow: 'group-hover:shadow-purple-950/20',
  },
  amber: {
    bg: 'from-amber-500/10 via-amber-500/5 to-transparent',
    border: 'border-amber-500/20 hover:border-amber-500/40',
    iconBg: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    glow: 'group-hover:shadow-amber-950/20',
  },
  blue: {
    bg: 'from-blue-500/10 via-blue-500/5 to-transparent',
    border: 'border-blue-500/20 hover:border-blue-500/40',
    iconBg: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    glow: 'group-hover:shadow-blue-950/20',
  },
};

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  onClick,
  accentColor = 'emerald',
  actionLabel,
}) => {
  const colors = COLOR_MAP[accentColor];

  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl bg-neutral-900/70 border ${
        colors.border
      } bg-gradient-to-br ${colors.bg} p-5 backdrop-blur-xl shadow-lg transition-all duration-300 hover:-translate-y-0.5 ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">{title}</p>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-3xl font-extrabold text-white font-mono tracking-tight">{value}</span>
            {trend && (
              <span
                className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full ${
                  trend.isPositive !== false
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                }`}
              >
                {trend.value}
              </span>
            )}
          </div>
          {subtitle && <p className="text-xs text-neutral-400 pt-0.5">{subtitle}</p>}
        </div>

        <div className={`p-3 rounded-xl border ${colors.iconBg} shrink-0`}>
          {icon}
        </div>
      </div>

      {actionLabel && (
        <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400 group-hover:text-emerald-400 transition-colors">
          <span>{actionLabel}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      )}
    </div>
  );
};
