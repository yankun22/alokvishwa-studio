import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ExternalLink, 
  Check, 
  Copy, 
  Cpu, 
  Layers, 
  Zap, 
  Activity, 
  Terminal
} from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!project) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(project.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#030304]/90 backdrop-blur-2xl"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-3xl rounded-3xl bg-[#0a0b0e] border border-white/[0.12] p-6 sm:p-9 shadow-2xl z-10 my-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2.5 rounded-xl bg-white/[0.04] text-platinum-muted hover:text-white hover:bg-white/[0.08] border border-white/[0.08] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="pr-12">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs text-platinum-dark tracking-widest">
                {project.numberPrefix} /
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-white/[0.03] text-platinum-muted border border-white/[0.08]">
                {project.category}
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                ⚡ {project.status}
              </span>
            </div>

            <h3 className="font-sans font-bold text-2xl sm:text-4xl text-platinum tracking-tight">
              {project.title}
            </h3>
            <p className="text-platinum-muted text-sm sm:text-base mt-3 leading-relaxed font-light">
              {project.summary}
            </p>
          </div>

          {/* Architecture Specifications */}
          <div className="mt-8 space-y-5">
            <h4 className="font-mono text-[11px] font-medium text-platinum-dark uppercase tracking-widest flex items-center gap-2">
              <Terminal className="w-4 h-4 text-platinum-muted" />
              <span>Architectural Specifications</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Frontend Stack */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <div className="flex items-center gap-2 text-xs font-mono text-platinum-muted mb-1">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Frontend Architecture</span>
                </div>
                <p className="text-xs text-platinum font-medium">
                  {project.architectureDetails.frontendStack}
                </p>
              </div>

              {/* Engine / Runtime */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <div className="flex items-center gap-2 text-xs font-mono text-platinum-muted mb-1">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Runtime & Graphics Engine</span>
                </div>
                <p className="text-xs text-platinum font-medium">
                  {project.architectureDetails.engineOrRuntime}
                </p>
              </div>

              {/* State & Data */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <div className="flex items-center gap-2 text-xs font-mono text-platinum-muted mb-1">
                  <Activity className="w-3.5 h-3.5" />
                  <span>State & Data Architecture</span>
                </div>
                <p className="text-xs text-platinum font-medium">
                  {project.architectureDetails.stateAndData}
                </p>
              </div>

              {/* Performance Wins */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <div className="flex items-center gap-2 text-xs font-mono text-platinum-muted mb-1">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Performance Engineering</span>
                </div>
                <p className="text-xs text-platinum font-medium">
                  {project.architectureDetails.performanceWins}
                </p>
              </div>
            </div>

            {/* Key Technical Highlights */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.015] border border-white/[0.05] mt-4">
              <span className="text-xs font-mono text-platinum block mb-3">
                Engineered Capabilities:
              </span>
              <ul className="space-y-2.5">
                {project.architectureDetails.keyFeatures.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-platinum-muted font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60 mt-1.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action CTAs in Modal */}
          <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
            {/* Direct Launch Button */}
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-slate-950 font-bold text-sm hover:bg-slate-200 transition-all min-h-[44px]"
            >
              <span>Launch Live System</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Copy Live URL */}
            <button
              onClick={handleCopyLink}
              className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] text-platinum text-xs font-medium border border-white/[0.08] transition-colors min-h-[44px]"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-mono">URL Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-platinum-muted" />
                  <span>Copy URL</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
