import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Send, 
  Github, 
  Linkedin, 
  CheckCircle2, 
  MessageSquare, 
  ShieldCheck, 
  Copy, 
  Check,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PROFILE_INFO } from '../data/techStack';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Web3D / Creative Studio',
    budget: '$10k - $25k',
    message: '',
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ffffff', '#f8fafc', '#94a3b8', '#38bdf8']
      });
    } catch {
      // ignore
    }

    const subject = encodeURIComponent(`Executive Project Inquiry: ${formData.projectType} from ${formData.name}`);
    const body = encodeURIComponent(
      `Hello Alok,\n\nName / Organization: ${formData.name}\nEmail: ${formData.email}\nScope: ${formData.projectType}\nBudget Bracket: ${formData.budget}\n\nProject Scope & Objectives:\n${formData.message}\n\nLooking forward to partnering!`
    );

    setTimeout(() => {
      window.location.href = `mailto:${PROFILE_INFO.email}?subject=${subject}&body=${body}`;
    }, 400);
  };

  return (
    <section id="contact" className="relative py-24 md:py-36 bg-[#060709]/60 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.08] text-platinum-muted text-[11px] font-mono mb-4 tracking-widest uppercase">
            <Mail className="w-3.5 h-3.5" />
            <span>PARTNERSHIP & ADVISORY</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-platinum tracking-tight">
            Direct Contact & Inquiries
          </h2>
          <p className="mt-4 text-sm sm:text-base text-platinum-muted font-light leading-relaxed">
            Ready to architect a high-converting web platform or integrate bespoke WebGL 3D systems? Connect directly with Alok.
          </p>
        </div>

        {/* Content Split: Direct Contact Card + Interactive Proposal Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          
          {/* Left Column (Span 5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Card */}
            <div className="p-7 sm:p-9 rounded-3xl bg-white/[0.015] border border-white/[0.08] backdrop-blur-2xl shadow-noir-card">
              <h3 className="font-sans font-bold text-2xl text-platinum mb-1">
                Alok Vishwakarma
              </h3>
              <p className="text-xs font-mono text-platinum-muted mb-6 tracking-wide">
                Principal Web Architect & Creative Technologist
              </p>

              {/* Status Pill */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-platinum text-xs font-mono flex items-center gap-3 mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                <span className="text-[11px] tracking-wider">{PROFILE_INFO.availabilityStatus}</span>
              </div>

              {/* Email Trigger */}
              <div className="space-y-3">
                <a
                  href={`mailto:${PROFILE_INFO.email}`}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.16] transition-all text-xs font-mono text-platinum group min-h-[44px]"
                >
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-platinum-muted" />
                    <span>{PROFILE_INFO.email}</span>
                  </div>
                  <span className="text-platinum group-hover:translate-x-0.5 transition-transform">
                    Send ↗
                  </span>
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="w-full flex items-center justify-center gap-2 p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.04] text-xs text-platinum-muted hover:text-platinum font-medium transition-colors min-h-[44px]"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400 font-mono">Email address copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-platinum-muted" />
                      <span>Copy Direct Email</span>
                    </>
                  )}
                </button>
              </div>

              {/* Social Channels */}
              <div className="mt-6 pt-6 border-t border-white/[0.06] flex items-center gap-3">
                <a
                  href={PROFILE_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-xs font-medium text-platinum transition-colors min-h-[44px]"
                >
                  <Linkedin className="w-4 h-4 text-platinum-muted" />
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href={PROFILE_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-xs font-medium text-platinum transition-colors min-h-[44px]"
                >
                  <Github className="w-4 h-4 text-platinum-muted" />
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>

            {/* Turnaround Guarantee Badge */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.015] border border-white/[0.06] text-xs text-platinum-muted flex items-center gap-3 font-light">
              <ShieldCheck className="w-5 h-5 text-platinum shrink-0" />
              <span>
                Rapid executive turnaround within <strong className="text-platinum font-medium">24 hours</strong> with comprehensive technical discovery.
              </span>
            </div>
          </div>

          {/* Right Column: Proposal Form (Span 7) */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-3xl bg-white/[0.015] border border-white/[0.08] backdrop-blur-2xl shadow-noir-card">
              <div className="flex items-center gap-2.5 mb-6">
                <MessageSquare className="w-5 h-5 text-platinum-muted" />
                <h3 className="font-sans font-bold text-2xl text-platinum">
                  Transmit Project Scope
                </h3>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-white/[0.05] text-platinum flex items-center justify-center mx-auto border border-white/[0.1]">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="font-sans font-bold text-xl text-platinum">
                    Proposal Ready in Email Client
                  </h4>
                  <p className="text-platinum-muted text-sm max-w-md mx-auto font-light">
                    Your email composer has been prefilled with the scope details. You can also write directly to{' '}
                    <span className="text-platinum font-mono">{PROFILE_INFO.email}</span>.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-3 rounded-xl bg-white/[0.05] text-platinum text-xs font-semibold hover:bg-white/[0.08] transition-colors min-h-[44px]"
                  >
                    Send Another Proposal
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-platinum-muted mb-2">
                        Your Name / Organization *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Eleanor Vance / Apex Studio"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-platinum text-sm focus:border-white/40 focus:ring-1 focus:ring-white/30 placeholder:text-platinum-dark min-h-[44px]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-platinum-muted mb-2">
                        Direct Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="eleanor@apexstudio.io"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-platinum text-sm focus:border-white/40 focus:ring-1 focus:ring-white/30 placeholder:text-platinum-dark min-h-[44px]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-platinum-muted mb-2">
                        Engineering Domain
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0a0b0e] border border-white/[0.06] text-platinum text-sm focus:border-white/40 focus:ring-1 focus:ring-white/30 min-h-[44px]"
                      >
                        <option value="Web3D / Three.js Graphics">Web3D / Three.js Graphics</option>
                        <option value="Fintech & Mathematical Simulation">Fintech & Data Systems</option>
                        <option value="Developer Tools & In-Browser WASM">Developer Tools & WASM</option>
                        <option value="Commercial E-Commerce & Portals">Commercial Portals & Commerce</option>
                        <option value="Complete Architecture Audit">Architecture Review / Advisory</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-platinum-muted mb-2">
                        Budget Bracket
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0a0b0e] border border-white/[0.06] text-platinum text-sm focus:border-white/40 focus:ring-1 focus:ring-white/30 min-h-[44px]"
                      >
                        <option value="< $10,000">&lt; $10,000 (Sprint / Audit)</option>
                        <option value="$10,000 - $25,000">$10,000 - $25,000 (Production System)</option>
                        <option value="$25,000 - $50,000">$25,000 - $50,000 (Enterprise Solution)</option>
                        <option value="$50,000+">$50,000+ (Multi-System Architecture)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-platinum-muted mb-2">
                      Project Vision & Technical Requirements *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline your architectural goals, desired stack, timeline, or key technical specifications..."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-platinum text-sm focus:border-white/40 focus:ring-1 focus:ring-white/30 placeholder:text-platinum-dark"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-white text-slate-950 font-bold text-sm shadow-sm hover:bg-slate-200 transition-all min-h-[48px]"
                  >
                    <span>Transmit Executive Proposal</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
