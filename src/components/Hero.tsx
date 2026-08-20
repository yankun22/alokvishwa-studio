import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  FileDown, 
  Github, 
  Linkedin, 
  Mail, 
  Layers, 
  Box, 
  Volume2, 
  Cpu, 
  ExternalLink 
} from 'lucide-react';
import { PROFILE_INFO } from '../data/techStack';

interface HeroProps {
  onOpenResumeModal: () => void;
  onExploreDeployments: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenResumeModal,
  onExploreDeployments
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // In-browser Web Audio API synthesis demo easter egg
  const playWebAudioDemo = () => {
    try {
      const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      setIsPlayingAudio(true);

      const notes = [261.63, 329.63, 392.00, 523.25]; // C major chord arpeggio
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);
        gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + idx * 0.12 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.12 + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + idx * 0.12 + 0.5);
      });

      setTimeout(() => {
        setIsPlayingAudio(false);
      }, 900);
    } catch {
      setIsPlayingAudio(false);
    }
  };

  return (
    <section className="relative pt-32 pb-24 md:pt-48 md:pb-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.08] text-platinum-muted text-[11px] font-mono tracking-widest uppercase shadow-noir-card mb-8 group cursor-default backdrop-blur-2xl"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium text-platinum">
              {PROFILE_INFO.availabilityStatus}
            </span>
          </motion.div>

          {/* Master Headline: Playfair Editorial & Syne with Tight Negative Tracking */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] text-platinum"
          >
            <span className="block font-serif font-normal italic tracking-normal text-transparent bg-clip-text bg-gradient-to-b from-white via-platinum to-platinum-muted text-3xl sm:text-5xl md:text-6xl lg:text-7xl mb-2">
              Alok Vishwakarma
            </span>
            <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-platinum tracking-tight">
              Principal Full-Stack Web Architect & Creative Technologist
            </span>
          </motion.h1>

          {/* Editorial Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 text-base sm:text-lg md:text-xl text-platinum-muted max-w-3xl leading-relaxed font-light tracking-wide"
          >
            Engineering state-of-the-art web architectures with specialized mastery in{' '}
            <span className="text-platinum font-medium underline decoration-white/30 underline-offset-4">Next.js (App Router)</span>,{' '}
            <span className="text-platinum font-medium underline decoration-white/30 underline-offset-4">TypeScript</span>,{' '}
            <span className="text-platinum font-medium underline decoration-white/30 underline-offset-4">Three.js WebGL</span>,{' '}
            <span className="text-platinum font-medium underline decoration-white/30 underline-offset-4">Web Audio API</span>, and{' '}
            <span className="text-platinum font-medium underline decoration-white/30 underline-offset-4">In-Browser WASM Databases</span>.
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 w-full"
          >
            {/* Primary Action: Explore Deployments */}
            <button
              onClick={onExploreDeployments}
              className="flex items-center justify-center gap-2.5 px-8 sm:px-10 py-4 rounded-2xl bg-white text-slate-950 font-bold text-sm sm:text-base hover:bg-slate-200 transition-all min-h-[48px] min-w-[210px] shadow-[0_4px_24px_rgba(255,255,255,0.15)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore Deployments (15)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Secondary Action: Download Resume (PDF) */}
            <button
              onClick={onOpenResumeModal}
              className="flex items-center justify-center gap-2 px-6 sm:px-8 py-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] text-platinum font-medium text-sm sm:text-base border border-white/[0.08] hover:border-white/[0.2] shadow-noir-card transition-all min-h-[48px]"
            >
              <FileDown className="w-4 h-4 text-platinum-muted" />
              <span>Download Resume (PDF)</span>
            </button>
          </motion.div>

          {/* Direct Social Links Matrix (LinkedIn, GitHub, Email) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href={PROFILE_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-white/[0.16] text-xs font-medium text-platinum-muted hover:text-white transition-all min-h-[40px]"
            >
              <Linkedin className="w-4 h-4 text-platinum-muted" />
              <span>LinkedIn</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>

            <a
              href={PROFILE_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-white/[0.16] text-xs font-medium text-platinum-muted hover:text-white transition-all min-h-[40px]"
            >
              <Github className="w-4 h-4 text-platinum-muted" />
              <span>GitHub (yankun22)</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>

            <a
              href={`mailto:${PROFILE_INFO.email}`}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-white/[0.16] text-xs font-medium text-platinum-muted hover:text-white transition-all min-h-[40px]"
            >
              <Mail className="w-4 h-4 text-platinum-muted" />
              <span>{PROFILE_INFO.email}</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </motion.div>

          {/* Minimalist Optical Telemetry Matrix */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-14 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-left"
          >
            {/* Metric 1 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.015] border border-white/[0.06] backdrop-blur-2xl hover:border-white/[0.16] transition-all group">
              <div className="flex items-center justify-between">
                <span className="text-2xl sm:text-3xl font-display font-bold text-platinum">15 / 15</span>
                <Layers className="w-4 h-4 text-platinum-muted/60 group-hover:text-platinum transition-colors" />
              </div>
              <p className="text-xs font-medium text-platinum mt-1">Live Systems</p>
              <p className="text-[10px] text-platinum-dark font-mono tracking-widest uppercase">Vercel Edge Deployed</p>
            </div>

            {/* Metric 2 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.015] border border-white/[0.06] backdrop-blur-2xl hover:border-white/[0.16] transition-all group">
              <div className="flex items-center justify-between">
                <span className="text-2xl sm:text-3xl font-display font-bold text-platinum">60 FPS</span>
                <Box className="w-4 h-4 text-platinum-muted/60 group-hover:text-platinum transition-colors" />
              </div>
              <p className="text-xs font-medium text-platinum mt-1">WebGL 3D Engine</p>
              <p className="text-[10px] text-platinum-dark font-mono tracking-widest uppercase">Three.js & GLSL Shaders</p>
            </div>

            {/* Metric 3 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.015] border border-white/[0.06] backdrop-blur-2xl hover:border-white/[0.16] transition-all group">
              <div className="flex items-center justify-between">
                <span className="text-2xl sm:text-3xl font-display font-bold text-platinum">0 ms</span>
                <Cpu className="w-4 h-4 text-platinum-muted/60 group-hover:text-platinum transition-colors" />
              </div>
              <p className="text-xs font-medium text-platinum mt-1">WASM Client DB</p>
              <p className="text-[10px] text-platinum-dark font-mono tracking-widest uppercase">In-Browser SQLite Engine</p>
            </div>

            {/* Metric 4: Web Audio API Easter Egg */}
            <button
              onClick={playWebAudioDemo}
              className="p-4 sm:p-5 rounded-2xl bg-white/[0.015] border border-white/[0.06] backdrop-blur-2xl hover:border-white/[0.2] hover:bg-white/[0.03] transition-all text-left group cursor-pointer"
              title="Click to test in-browser Web Audio API synthesis"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl sm:text-3xl font-display font-bold text-platinum">
                  {isPlayingAudio ? '♪ ♫' : '<5 ms'}
                </span>
                <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'text-platinum animate-bounce' : 'text-platinum-muted/60 group-hover:text-platinum'}`} />
              </div>
              <p className="text-xs font-medium text-platinum mt-1">Web Audio API</p>
              <p className="text-[10px] text-platinum-muted font-mono tracking-widest uppercase">
                {isPlayingAudio ? 'Synthesizing...' : 'Click to preview audio'}
              </p>
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
