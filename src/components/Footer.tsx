import React from 'react';
import { 
  ArrowUp, 
  Github, 
  Linkedin, 
  Mail, 
  Layers 
} from 'lucide-react';
import { PROFILE_INFO } from '../data/techStack';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-14 border-t border-white/[0.06] bg-[#030304]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/[0.04]">
          
          {/* Brand info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center font-mono font-bold text-platinum text-sm">
              AV
            </div>
            <div>
              <span className="font-sans font-bold text-platinum text-base tracking-tight">
                Alok Vishwakarma
              </span>
              <p className="text-xs text-platinum-muted font-mono">
                Principal Full-Stack Web Architect & Creative Technologist
              </p>
            </div>
          </div>

          {/* Center: Live Systems Telemetry */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.06] text-platinum-muted text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>All 15 Production Deployments Operational (100% SLA)</span>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href={PROFILE_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] text-platinum-muted hover:text-white border border-white/[0.06] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={PROFILE_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] text-platinum-muted hover:text-white border border-white/[0.06] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PROFILE_INFO.email}`}
              className="p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] text-platinum-muted hover:text-white border border-white/[0.06] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Send Direct Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white text-platinum-muted hover:text-slate-950 border border-white/[0.1] transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
              title="Back to top"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-platinum-dark">
          <p>
            © {currentYear} Alok Vishwakarma. Built with Next.js, Three.js WebGL & Web Audio API.
          </p>
          <p className="flex items-center gap-1.5">
            <span>Awwwards Standard • 100% Dual-Viewport Responsive Verified</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
