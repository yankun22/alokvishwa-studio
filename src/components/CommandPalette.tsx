import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ExternalLink, 
  Layers, 
  FileDown, 
  Mail, 
  Github, 
  X, 
  Sparkles,
  Inbox
} from 'lucide-react';
import { PROJECTS } from '../data/projects';
import { PROFILE_INFO } from '../data/techStack';
import { Project } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  onOpenResumeModal: () => void;
  onOpenProposalsVault?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenResumeModal,
  onOpenProposalsVault,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const filteredProjects = PROJECTS.filter((p) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.stack.some((s) => s.toLowerCase().includes(q)) ||
      p.summary.toLowerCase().includes(q)
    );
  });

  const staticActions = [
    {
      id: 'action-proposals',
      title: 'Open Recorded Proposals Vault',
      category: 'Owner Dashboard',
      icon: Inbox,
      action: () => {
        onClose();
        if (onOpenProposalsVault) onOpenProposalsVault();
      },
    },
    {
      id: 'action-resume',
      title: 'Download Resume (PDF)',
      category: 'Quick Action',
      icon: FileDown,
      action: () => {
        onClose();
        onOpenResumeModal();
      },
    },
    {
      id: 'action-email',
      title: `Send Email to ${PROFILE_INFO.email}`,
      category: 'Contact',
      icon: Mail,
      action: () => {
        window.location.href = `mailto:${PROFILE_INFO.email}`;
        onClose();
      },
    },
    {
      id: 'action-github',
      title: 'View GitHub Profile (yankun22)',
      category: 'Social',
      icon: Github,
      action: () => {
        window.open(PROFILE_INFO.github, '_blank', 'noopener,noreferrer');
        onClose();
      },
    },
  ];

  const allItems = [
    ...filteredProjects.map((p) => ({
      type: 'project' as const,
      data: p,
      id: p.id,
      title: p.title,
      subtitle: `${p.category} • ${p.stack.slice(0, 3).join(', ')}`,
      url: p.url,
    })),
    ...staticActions.map((a) => ({
      type: 'action' as const,
      data: a,
      id: a.id,
      title: a.title,
      subtitle: a.category,
      url: null,
    })),
  ];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, allItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + allItems.length) % Math.max(1, allItems.length));
    } else if (e.key === 'Enter' && allItems[selectedIndex]) {
      e.preventDefault();
      const item = allItems[selectedIndex];
      if (item.type === 'project') {
        window.open(item.data.url, '_blank', 'noopener,noreferrer');
        onClose();
      } else {
        item.data.action();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#07080a]/85 backdrop-blur-xl"
        />

        {/* Command Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl rounded-2xl bg-surface-100 border border-white/[0.12] shadow-2xl overflow-hidden z-10"
        >
          {/* Input Header */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.08] bg-surface-200/50">
            <Search className="w-5 h-5 text-champagne shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search all 15 deployments, architecture, or actions..."
              className="w-full bg-transparent text-sm sm:text-base text-titanium placeholder:text-titanium-muted/60 focus:outline-none font-mono"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-titanium-muted hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[11px] font-mono bg-black/40 border border-white/10 rounded text-titanium-muted">
              ESC
            </kbd>
          </div>

          {/* List of Results */}
          <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
            {allItems.length > 0 ? (
              allItems.map((item, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (item.type === 'project') {
                        window.open(item.data.url, '_blank', 'noopener,noreferrer');
                        onClose();
                      } else {
                        item.data.action();
                      }
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-white/[0.06] border border-champagne/40 text-white'
                        : 'hover:bg-white/[0.02] text-titanium-muted border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        item.type === 'project'
                          ? 'bg-surface-200 text-champagne'
                          : 'bg-surface-200 text-luminous-cyan'
                      }`}>
                        {item.type === 'project' ? <Layers className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-sm text-titanium truncate flex items-center gap-2">
                          <span>{item.title}</span>
                          {item.type === 'project' && (
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              Live
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-titanium-muted truncate font-mono">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      {item.type === 'project' ? (
                        <span className="text-xs font-mono text-champagne flex items-center gap-1">
                          Launch <ExternalLink className="w-3 h-3" />
                        </span>
                      ) : (
                        <span className="text-xs font-mono text-titanium-muted">
                          Execute ↵
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-12 text-center text-titanium-muted text-sm">
                No matching results found for &quot;{query}&quot;
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-4 py-2.5 bg-surface-200/40 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-titanium-muted">
            <div className="flex items-center gap-3">
              <span>↑↓ Navigate</span>
              <span>↵ Open</span>
              <span>ESC Close</span>
            </div>
            <span>15 Live Deployments</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
