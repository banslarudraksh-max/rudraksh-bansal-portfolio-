import React, { useState } from 'react';
import {
  MessageSquare,
  Mail,
  Trash2,
  CheckCircle,
  Star,
  Clock,
  Reply,
  Search,
  ExternalLink,
} from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { useToast } from '../context/ToastContext';
import { ConfirmationDialog } from '../components/ConfirmationDialog';
import { Modal } from '../components/Modal';
import { ContactMessage } from '../types';

export const MessagesPage: React.FC = () => {
  const { messages, markMessageRead, deleteMessage, toggleStarMessage } = useAdminData();
  const { success } = useToast();

  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'starred'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMessages = messages.filter((msg) => {
    if (filter === 'unread' && msg.isRead) return false;
    if (filter === 'starred' && !msg.isStarred) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        msg.name.toLowerCase().includes(q) ||
        msg.email.toLowerCase().includes(q) ||
        msg.subject.toLowerCase().includes(q) ||
        msg.message.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleOpenMessage = (msg: ContactMessage) => {
    setSelectedMessage(msg);
    if (!msg.isRead) {
      markMessageRead(msg.id);
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteId) {
      deleteMessage(deleteId);
      success('Message Deleted', 'Contact message permanently removed.');
      if (selectedMessage?.id === deleteId) {
        setSelectedMessage(null);
      }
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Messages & Inquiries</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Incoming recruiter inquiries, project collaborations, and professional messages.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-neutral-400">
            Total: <strong className="text-white">{messages.length}</strong>
          </span>
          <span className="text-xs font-mono text-emerald-400">
            ({messages.filter((m) => !m.isRead).length} unread)
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by sender, email, or subject..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-neutral-900/80 border border-neutral-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-neutral-100 placeholder:text-neutral-500 outline-none transition-all"
          />
        </div>

        <div className="inline-flex p-1 bg-neutral-900/90 border border-neutral-800 rounded-xl self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
              filter === 'all'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            All ({messages.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('unread')}
            className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
              filter === 'unread'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Unread ({messages.filter((m) => !m.isRead).length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('starred')}
            className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
              filter === 'starred'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Starred ({messages.filter((m) => m.isStarred).length})
          </button>
        </div>
      </div>

      {/* Messages List Container */}
      <div className="rounded-2xl bg-neutral-900/60 border border-neutral-800/90 backdrop-blur-xl shadow-lg overflow-hidden divide-y divide-neutral-800/60">
        {filteredMessages.length === 0 ? (
          <div className="py-16 text-center text-neutral-500 space-y-2">
            <Mail className="w-8 h-8 opacity-30 text-emerald-500 mx-auto" />
            <p className="text-sm font-medium text-neutral-400">No messages match this filter.</p>
          </div>
        ) : (
          filteredMessages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => handleOpenMessage(msg)}
              className={`p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-neutral-800/30 transition-all group ${
                !msg.isRead ? 'bg-emerald-950/10' : ''
              }`}
            >
              <div className="flex items-start gap-3.5 min-w-0 flex-1">
                {/* Unread indicator */}
                <div className="pt-1 shrink-0">
                  {!msg.isRead ? (
                    <span className="block w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
                  ) : (
                    <span className="block w-2.5 h-2.5 rounded-full bg-neutral-800" />
                  )}
                </div>

                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {msg.name}
                    </span>
                    <span className="text-[11px] text-neutral-400 font-mono">
                      &lt;{msg.email}&gt;
                    </span>
                  </div>

                  <h4 className="text-xs font-semibold text-neutral-200 truncate">
                    {msg.subject}
                  </h4>

                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {msg.message}
                  </p>
                </div>
              </div>

              {/* Actions and Date */}
              <div className="flex flex-col items-end gap-2 shrink-0">
                <span className="text-[10px] font-mono text-neutral-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(msg.receivedAt).toLocaleDateString()}
                </span>

                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    onClick={() => toggleStarMessage(msg.id)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      msg.isStarred
                        ? 'text-amber-400 hover:text-amber-300'
                        : 'text-neutral-500 hover:text-neutral-300'
                    }`}
                    title={msg.isStarred ? 'Unstar' : 'Star message'}
                  >
                    <Star className={`w-4 h-4 ${msg.isStarred ? 'fill-amber-400' : ''}`} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeleteId(msg.id)}
                    className="p-1.5 text-neutral-500 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors"
                    title="Delete message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Message View Modal */}
      {selectedMessage && (
        <Modal
          isOpen={!!selectedMessage}
          onClose={() => setSelectedMessage(null)}
          title="Message Details"
          maxWidth="2xl"
        >
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-xs text-neutral-400">From:</span>
                  <p className="text-sm font-bold text-white">
                    {selectedMessage.name}{' '}
                    <span className="text-xs text-neutral-400 font-mono">
                      &lt;{selectedMessage.email}&gt;
                    </span>
                  </p>
                </div>
                <span className="text-xs font-mono text-neutral-400">
                  {new Date(selectedMessage.receivedAt).toLocaleString()}
                </span>
              </div>

              <div className="pt-2 border-t border-neutral-800">
                <span className="text-xs text-neutral-400">Subject:</span>
                <p className="text-sm font-semibold text-emerald-300">{selectedMessage.subject}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-950/40 border border-neutral-800 text-sm text-neutral-200 whitespace-pre-wrap leading-relaxed">
              {selectedMessage.message}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => setDeleteId(selectedMessage.id)}
                className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 hover:underline"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Message</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedMessage(null)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-800 rounded-xl"
                >
                  Close
                </button>
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(
                    selectedMessage.subject
                  )}`}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-neutral-950 bg-emerald-500 hover:bg-emerald-400 rounded-xl shadow-lg transition-all"
                >
                  <Reply className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Message"
        message="Are you sure you want to delete this inquiry? This cannot be undone."
      />
    </div>
  );
};
