import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  FileDown, 
  Github, 
  Menu, 
  X, 
  Layers, 
  Cpu, 
  Mail, 
  Terminal,
  Sparkles
} from 'lucide-react';
import { PROFILE_INFO } from '../data/techStack';

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onOpenResumeModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCommandPalette,
  onOpenResumeModal,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Exhibitions (15)', href: '#deployments', icon: Layers },
    { name: 'Architecture', href: '#architecture', icon: Cpu },
    { name: 'Competencies', href: '#skills', icon: Terminal },
    { name: 'Private Inquiries', href: '#contact', icon: Mail },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled 
          ? 'bg-[#030304]/85 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3.5' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Monogram Brand */}
          <a 
            href="#" 
            className="flex items-center gap-3.5 group focus:outline-none focus:ring-1 focus:ring-white/30 rounded-xl p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group-hover:border-white/20 transition-all duration-300">
              <span className="font-mono font-medium text-platinum text-xs tracking-widest">AV</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-sans font-semibold text-platinum text-sm sm:text-base tracking-tight group-hover:text-white transition-colors">
                  Alok Vishwakarma
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono tracking-widest uppercase bg-white/[0.03] text-platinum-muted border border-white/[0.06]">
                  Architect Hub
                </span>
              </div>
              <p className="text-[11px] text-platinum-dark font-mono tracking-wider hidden md:block">
                Principal Full-Stack & Creative Technologist
              </p>
            </div>
          </a>

          {/* Desktop Floating Pill Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.02] backdrop-blur-2xl px-3 py-1.5 rounded-full border border-white/[0.06]">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-platinum-muted hover:text-white hover:bg-white/[0.03] rounded-full transition-all duration-200"
                >
                  <Icon className="w-3.5 h-3.5 text-platinum-muted/70" />
                  <span>{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Command Palette Trigger */}
            <button
              onClick={onOpenCommandPalette}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-mono text-platinum-muted bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-white/[0.14] rounded-xl transition-all shadow-sm group min-h-[44px]"
              title="Search Directory (Cmd+K)"
              aria-label="Open Search Palette"
            >
              <Search className="w-3.5 h-3.5 text-platinum-muted group-hover:text-white transition-colors" />
              <span className="hidden sm:inline">Search (15)</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono bg-black/40 border border-white/10 rounded text-platinum-dark group-hover:text-white">
                ⌘K
              </kbd>
            </button>

            {/* Resume Trigger */}
            <button
              onClick={onOpenResumeModal}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-platinum bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-white/[0.14] rounded-xl transition-all min-h-[44px]"
              aria-label="View and Download Resume"
            >
              <FileDown className="w-3.5 h-3.5 text-platinum-muted" />
              <span>Resume</span>
            </button>

            {/* GitHub Profile */}
            <a
              href={PROFILE_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-11 h-11 text-platinum-muted hover:text-white bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-white/[0.14] rounded-xl transition-all min-w-[44px]"
              title="GitHub Profile (yankun22)"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-11 h-11 text-platinum-muted hover:text-white bg-white/[0.02] border border-white/[0.06] rounded-xl min-w-[44px]"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden border-b border-white/[0.06] bg-[#030304]/98 backdrop-blur-2xl px-4 py-5 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-3">
              {/* Status Badge */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/[0.08] text-platinum-muted text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-mono text-[11px] tracking-wider">{PROFILE_INFO.availabilityStatus}</span>
              </div>

              {/* Navigation Links */}
              <div className="grid grid-cols-1 gap-1 pt-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-platinum hover:text-white hover:bg-white/[0.03] transition-colors min-h-[44px]"
                    >
                      <Icon className="w-4 h-4 text-platinum-muted" />
                      <span>{link.name}</span>
                    </a>
                  );
                })}
              </div>

              {/* Mobile CTA Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/[0.06]">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResumeModal();
                  }}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/[0.03] text-platinum text-xs font-semibold border border-white/[0.08] min-h-[44px]"
                >
                  <FileDown className="w-4 h-4 text-platinum-muted" />
                  <span>Resume (PDF)</span>
                </button>
                <a
                  href={`mailto:${PROFILE_INFO.email}`}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white text-slate-950 font-bold text-xs min-h-[44px]"
                >
                  <Mail className="w-4 h-4" />
                  <span>Private Inquiries</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
