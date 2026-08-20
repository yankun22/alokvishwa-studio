import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Printer, 
  Mail, 
  Github, 
  Linkedin, 
  ExternalLink
} from 'lucide-react';
import { PROFILE_INFO } from '../data/techStack';
import { PROJECTS } from '../data/projects';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto print:p-0 print:m-0 print:static print:overflow-visible">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#07080a]/90 backdrop-blur-xl print:hidden"
        />

        {/* Modal Container / Resume Page */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl rounded-3xl bg-surface-100 border border-white/[0.12] p-6 sm:p-10 shadow-2xl z-10 my-8 max-h-[90vh] overflow-y-auto print:max-h-none print:border-none print:shadow-none print:bg-white print:text-black print:p-6 print:rounded-none"
        >
          {/* Header Action Bar */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/[0.08] print:hidden">
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-full text-xs font-mono bg-champagne/10 text-champagne border border-champagne/25">
                Principal Architect Credentials
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-champagne hover:bg-champagne-light text-slate-950 font-bold text-xs transition-colors min-h-[40px]"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save PDF</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-surface-200 text-titanium-muted hover:text-white border border-white/[0.08] min-h-[40px] min-w-[40px] flex items-center justify-center"
                aria-label="Close resume"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Resume Body */}
          <div className="space-y-8 print:space-y-6">
            
            {/* Header / Bio */}
            <div className="border-b border-white/[0.08] print:border-black/20 pb-6">
              <h1 className="font-display font-black text-2xl sm:text-4xl text-titanium print:text-black tracking-tight">
                Alok Vishwakarma
              </h1>
              <p className="text-base sm:text-lg text-champagne print:text-slate-800 font-medium mt-1">
                Principal Full-Stack Web Architect & Creative Technologist
              </p>
              
              {/* Contact Links */}
              <div className="flex flex-wrap gap-4 mt-3 text-xs sm:text-sm font-mono text-titanium-muted print:text-slate-700">
                <a href={`mailto:${PROFILE_INFO.email}`} className="hover:text-champagne flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-champagne" /> {PROFILE_INFO.email}
                </a>
                <a href={PROFILE_INFO.github} target="_blank" rel="noopener noreferrer" className="hover:text-champagne flex items-center gap-1.5">
                  <Github className="w-3.5 h-3.5 text-champagne" /> github.com/yankun22
                </a>
                <a href={PROFILE_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-champagne flex items-center gap-1.5">
                  <Linkedin className="w-3.5 h-3.5 text-champagne" /> linkedin.com/in/alokvishwa-studio
                </a>
              </div>
            </div>

            {/* Executive Summary */}
            <div>
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-champagne print:text-black mb-2">
                Executive Architectural Summary
              </h2>
              <p className="text-sm text-titanium-muted print:text-slate-800 leading-relaxed font-light">
                World-class frontend architect and full-stack software engineer with 6+ years of experience engineering high-performance, real-time distributed web applications. Architect and creator of 15 live production web systems spanning 3D WebGL studios (Three.js/R3F), stochastic Monte Carlo financial engines, browser-native DAW audio workstations (Web Audio API), in-browser WASM SQLite sandboxes, luxury e-commerce platforms, and enterprise business applications.
              </p>
            </div>

            {/* Core Architectural Mastery */}
            <div>
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-champagne print:text-black mb-3">
                Core Architectural Mastery
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-titanium print:text-slate-800">
                <div className="p-3.5 rounded-xl bg-surface-200/60 border border-white/[0.08] print:border-slate-300 print:bg-slate-50">
                  <strong className="text-titanium print:text-black block mb-1">Frontend Engineering & React:</strong>
                  Next.js 14+ (App Router, Server Components, SSR/SSG), React 19, TypeScript, Tailwind CSS, Framer Motion, Zustand.
                </div>
                <div className="p-3.5 rounded-xl bg-surface-200/60 border border-white/[0.08] print:border-slate-300 print:bg-slate-50">
                  <strong className="text-titanium print:text-black block mb-1">3D Graphics & Spatial Web:</strong>
                  Three.js, React Three Fiber, Custom GLSL Shaders, HTML5 Canvas, SVG Bezier Engines, glTF Pipelines.
                </div>
                <div className="p-3.5 rounded-xl bg-surface-200/60 border border-white/[0.08] print:border-slate-300 print:bg-slate-50">
                  <strong className="text-titanium print:text-black block mb-1">In-Browser Compute & Audio:</strong>
                  Web Audio API (BiquadFilter, AudioWorklet), Sql.js WebAssembly (WASM), Web Workers, IndexedDB, Local-First Sync.
                </div>
                <div className="p-3.5 rounded-xl bg-surface-200/60 border border-white/[0.08] print:border-slate-300 print:bg-slate-50">
                  <strong className="text-titanium print:text-black block mb-1">Performance & Cloud Deployment:</strong>
                  Vercel Monorepo CI/CD, Core Web Vitals (100/100 LCP/FID/CLS), D3.js Knowledge Graphs, Recharts Data Viz.
                </div>
              </div>
            </div>

            {/* Featured Production Systems Showcase (Selection of 15) */}
            <div>
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-champagne print:text-black mb-3">
                Featured Production Deployments (Selection of 15)
              </h2>
              <div className="space-y-3">
                {PROJECTS.slice(0, 7).map((proj) => (
                  <div key={proj.id} className="p-3.5 rounded-xl bg-surface-200/40 border border-white/[0.05] print:border-slate-200 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <strong className="text-titanium print:text-black font-semibold text-sm">{proj.title}</strong>
                        <span className="text-titanium-muted font-mono">({proj.category})</span>
                      </div>
                      <a href={proj.url} target="_blank" rel="noopener noreferrer" className="text-champagne font-mono hover:underline flex items-center gap-1 print:text-blue-700">
                        {proj.url.replace('https://', '')} <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <p className="text-titanium-muted print:text-slate-700 leading-relaxed mb-1.5 font-light">
                      {proj.summary}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {proj.stack.map(s => (
                        <span key={s} className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-200 print:bg-slate-200 text-titanium-muted print:text-slate-800">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
