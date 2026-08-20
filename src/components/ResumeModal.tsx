import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Printer, 
  Download,
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Github, 
  Linkedin, 
  CheckCircle2,
  Loader2,
  FileText
} from 'lucide-react';
import { PROFILE_INFO } from '../data/techStack';
import { downloadResumeAsPDF } from '../utils/pdfGenerator';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDirectDownload = async () => {
    setIsGeneratingPDF(true);
    setDownloadSuccess(false);
    try {
      const success = await downloadResumeAsPDF('resume-printable-document', 'Alok_Vishwakarma_Resume.pdf');
      if (success) {
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
      // Fallback
      window.print();
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="resume-print-wrapper fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto print:p-0 print:m-0 print:static print:overflow-visible">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#030304]/90 backdrop-blur-xl print:hidden"
        />

        {/* Modal Container / Resume Document */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 16 }}
          transition={{ duration: 0.2 }}
          id="resume-printable-document"
          className="relative w-full max-w-4xl rounded-3xl bg-[#0a0b0e] border border-white/[0.12] p-6 sm:p-10 shadow-2xl z-10 my-8 max-h-[90vh] overflow-y-auto print:max-h-none print:border-none print:shadow-none print:bg-white print:text-black print:p-0 print:m-0 print:rounded-none"
        >
          {/* Header Action Bar (Hidden when printed) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/[0.08] print:hidden no-pdf-export">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-platinum">
                <FileText className="w-4 h-4 text-platinum" />
              </div>
              <div>
                <span className="text-xs font-mono font-semibold text-platinum block">
                  Alok Vishwakarma — Master Resume
                </span>
                <span className="text-[11px] text-platinum-dark font-mono">
                  A4 Executive Format • 15 Production Deployments
                </span>
              </div>
            </div>

            {/* Dual Download Controls */}
            <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
              {/* Direct PDF Download Button */}
              <button
                onClick={handleDirectDownload}
                disabled={isGeneratingPDF}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-slate-950 hover:bg-slate-200 active:scale-[0.98] font-bold text-xs shadow-sm transition-all min-h-[40px] disabled:opacity-75 cursor-pointer"
                title="Download PDF file directly to your downloads"
              >
                {isGeneratingPDF ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Generating PDF...</span>
                  </>
                ) : downloadSuccess ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Downloaded!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </>
                )}
              </button>

              {/* Native Print / Browser PDF Save Button */}
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] text-platinum hover:bg-white/[0.08] hover:text-white border border-white/[0.08] font-medium text-xs shadow-sm transition-colors min-h-[40px] cursor-pointer"
                title="Open browser print dialog to print or save as PDF"
              >
                <Printer className="w-3.5 h-3.5 text-platinum-muted" />
                <span>Print / Save PDF</span>
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2.5 rounded-xl bg-white/[0.04] text-platinum-muted hover:text-white border border-white/[0.08] min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close resume"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Printable Resume Content Body */}
          <div className="space-y-6 sm:space-y-7 text-sm text-platinum-muted print:text-slate-800 print:space-y-5">
            
            {/* Header / Contact Matrix */}
            <div className="border-b border-white/[0.08] print:border-slate-300 pb-5 print:pb-4 print-section">
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                <h1 className="font-display font-black text-2xl sm:text-3xl text-platinum print:text-black tracking-tight uppercase">
                  Alok Vishwakarma
                </h1>
                <span className="font-mono text-xs font-semibold text-platinum-muted print:text-slate-700">
                  New Delhi, India • Open for Roles & Contracts
                </span>
              </div>

              <p className="text-sm sm:text-base text-platinum font-semibold mt-1 print:text-slate-900 leading-snug">
                Principal Full-Stack Web Architect | Next.js (App Router), TypeScript, Three.js & Web Audio API
              </p>
              
              {/* Contact Information Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3.5 text-xs font-mono text-platinum-muted print:text-slate-700">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-platinum shrink-0 print:text-black" />
                  <span>New Delhi, India 110042</span>
                </div>
                <a href="tel:+918826001811" className="hover:text-white flex items-center gap-1.5 print:text-slate-800">
                  <Phone className="w-3 h-3 text-platinum shrink-0 print:text-black" />
                  <span>+91 8826001811</span>
                </a>
                <a href={`mailto:${PROFILE_INFO.email}`} className="hover:text-white flex items-center gap-1.5 print:text-slate-800">
                  <Mail className="w-3 h-3 text-platinum shrink-0 print:text-black" />
                  <span>alokvishwa1998@gmail.com</span>
                </a>
                <a href="https://alokvishwa-studio.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1.5 print:text-sky-800">
                  <Globe className="w-3 h-3 text-platinum shrink-0 print:text-black" />
                  <span>alokvishwa-studio.vercel.app</span>
                </a>
                <a href={PROFILE_INFO.github} target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1.5 print:text-sky-800">
                  <Github className="w-3 h-3 text-platinum shrink-0 print:text-black" />
                  <span>github.com/yankun22</span>
                </a>
                <a href={PROFILE_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1.5 print:text-sky-800">
                  <Linkedin className="w-3 h-3 text-platinum shrink-0 print:text-black" />
                  <span>linkedin.com/in/alokvishwa-studio</span>
                </a>
              </div>
            </div>

            {/* EXECUTIVE SUMMARY */}
            <div className="print-section">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-platinum print:text-black mb-2 border-b border-white/[0.06] print:border-slate-300 pb-1">
                EXECUTIVE SUMMARY
              </h2>
              <p className="leading-relaxed font-light text-slate-300 print:text-slate-800 text-xs sm:text-sm">
                Senior Full-Stack Web Architect with proven engineering mastery across 15 fully deployed web applications spanning Fintech engines, 3D WebGL configurators, Web Audio DAWs, in-browser SQL sandboxes, real estate portals, e-commerce storefronts, and client enterprise platforms. Specializes in building modern Next.js/React applications with strict type safety, modular micro-frontends, D3/Canvas visualizations, and dual-viewport mobile/desktop responsiveness (F12 audited). Expert in deploying standalone multi-application monorepos on Vercel with zero latency bottlenecks and sub-second load performance.
              </p>
            </div>

            {/* TECHNICAL EXPERTISE */}
            <div className="print-section print-avoid-break">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-platinum print:text-black mb-2.5 border-b border-white/[0.06] print:border-slate-300 pb-1">
                TECHNICAL EXPERTISE
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] print:border-slate-300 print:bg-slate-50 print:p-2.5">
                  <strong className="text-platinum print:text-black block mb-0.5 font-semibold">Frontend & Web3D:</strong>
                  <span>React, Next.js (App Router), TypeScript, JavaScript (ES6+), Three.js, React Three Fiber (R3F), Web Audio API, HTML5 Canvas, Tailwind CSS, Framer Motion, D3.js, Leaflet / MapLibre</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] print:border-slate-300 print:bg-slate-50 print:p-2.5">
                  <strong className="text-platinum print:text-black block mb-0.5 font-semibold">Backend & Systems:</strong>
                  <span>Node.js, Express, RESTful APIs, SQLite / Sql.js (WebAssembly), PostgreSQL, Client-Side Data Caching, LocalStorage State Engines</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] print:border-slate-300 print:bg-slate-50 print:p-2.5">
                  <strong className="text-platinum print:text-black block mb-0.5 font-semibold">DevOps & Cloud:</strong>
                  <span>Vercel (Monorepo Multi-Deployment), Git, GitHub Actions, SPA Client-Side Rewrites, Webpack/Vite Optimization, CI/CD Automation</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] print:border-slate-300 print:bg-slate-50 print:p-2.5">
                  <strong className="text-platinum print:text-black block mb-0.5 font-semibold">UI/UX & Quality:</strong>
                  <span>Mobile-First Responsive Architecture (F12 DevTools Audited), 60fps Performance Profiling, PDF/SVG Dynamic Exporters, Cross-Browser Compatibility</span>
                </div>
              </div>
            </div>

            {/* PROFESSIONAL EXPERIENCE */}
            <div className="print-section">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-platinum print:text-black mb-3 border-b border-white/[0.06] print:border-slate-300 pb-1">
                PROFESSIONAL EXPERIENCE
              </h2>
              <div className="space-y-4">
                {/* Role 1 */}
                <div className="print-role border-l-2 border-white/20 print:border-slate-400 pl-3.5 space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5">
                    <h3 className="font-semibold text-platinum print:text-black text-xs sm:text-sm">
                      Senior Full-Stack Developer & Technical Consultant
                    </h3>
                    <span className="font-mono text-[11px] text-platinum-muted print:text-slate-600 font-medium">
                      January 2023 – Present
                    </span>
                  </div>
                  <p className="text-xs font-mono text-slate-400 print:text-slate-600">
                    Freelance Engineering & Client Solutions • New Delhi, India (Remote)
                  </p>
                  <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-slate-300 print:text-slate-700 font-light">
                    <li>
                      Architected, developed, and deployed 15 complete production web systems across e-commerce, automotive, culinary, luxury real estate, developer tooling, and financial modeling.
                    </li>
                    <li>
                      Standardized automated monorepo CI/CD pipelines deploying isolated sub-applications to Vercel with automated routing and zero downtime.
                    </li>
                    <li>
                      Enforced strict dual-viewport responsiveness protocols, guaranteeing 100% layout integrity across mobile (375px/390px) and ultra-wide desktop viewports.
                    </li>
                  </ul>
                </div>

                {/* Role 2 */}
                <div className="print-role border-l-2 border-white/20 print:border-slate-400 pl-3.5 space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5">
                    <h3 className="font-semibold text-platinum print:text-black text-xs sm:text-sm">
                      Frontend Web Developer
                    </h3>
                    <span className="font-mono text-[11px] text-platinum-muted print:text-slate-600 font-medium">
                      2021 – 2023
                    </span>
                  </div>
                  <p className="text-xs font-mono text-slate-400 print:text-slate-600">
                    Digital Systems & Web Solutions • India
                  </p>
                  <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-slate-300 print:text-slate-700 font-light">
                    <li>
                      Engineered high-conversion business portals and client dashboards with optimized bundle sizes and sub-1.2s First Contentful Paint (FCP).
                    </li>
                    <li>
                      Integrated complex state management, data visualization charts, and interactive canvas components using React and Tailwind CSS.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* PRODUCTION PORTFOLIO APPLICATIONS (ALL 15 LIVE DEPLOYMENTS) */}
            <div className="print-section">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-platinum print:text-black mb-3 border-b border-white/[0.06] print:border-slate-300 pb-1">
                PRODUCTION PORTFOLIO APPLICATIONS (ALL 15 LIVE DEPLOYMENTS)
              </h2>

              {/* Group I */}
              <div className="space-y-2 mb-4">
                <h3 className="text-[11px] font-mono font-semibold text-platinum-muted uppercase print:text-black tracking-wider">
                  I. COMMERCIAL CLIENT PORTALS, E-COMMERCE & BUSINESS SYSTEMS
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-xl bg-white/[0.015] border border-white/[0.05] print-project-card">
                    <div className="flex items-center justify-between text-xs mb-0.5">
                      <strong className="text-platinum print:text-black">1. Chelvie Coffee</strong>
                      <a href="https://chelvie-coffee.vercel.app" target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] text-platinum hover:underline print:text-sky-800">
                        chelvie-coffee.vercel.app ↗
                      </a>
                    </div>
                    <span className="text-[10px] font-mono text-platinum-dark print:text-slate-600 block mb-0.5">Next.js • React • Tailwind CSS • Framer Motion</span>
                    <p className="text-xs text-slate-300 print:text-slate-700 font-light leading-snug">
                      Artisanal specialty coffee e-commerce storefront with interactive brew flavor profiles and dynamic cart drawer.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/[0.015] border border-white/[0.05] print-project-card">
                    <div className="flex items-center justify-between text-xs mb-0.5">
                      <strong className="text-platinum print:text-black">2. Sukhmani Car Bazar</strong>
                      <a href="https://sukhmani-car-bazar.vercel.app" target="_blank" rel="noopener noreferrer" className="font-mono text-platinum hover:underline text-[11px] print:text-sky-800">
                        sukhmani-car-bazar.vercel.app ↗
                      </a>
                    </div>
                    <span className="text-[10px] font-mono text-platinum-dark print:text-slate-600 block mb-0.5">Next.js • React • Tailwind CSS • Lead Engine</span>
                    <p className="text-xs text-slate-300 print:text-slate-700 font-light leading-snug">
                      Automotive dealership inventory portal with real-time vehicle filtering and financing calculators.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/[0.015] border border-white/[0.05] print-project-card">
                    <div className="flex items-center justify-between text-xs mb-0.5">
                      <strong className="text-platinum print:text-black">3. The Immigrant Cafe</strong>
                      <a href="https://theimmigrantcafe.vercel.app" target="_blank" rel="noopener noreferrer" className="font-mono text-platinum hover:underline text-[11px] print:text-sky-800">
                        theimmigrantcafe.vercel.app ↗
                      </a>
                    </div>
                    <span className="text-[10px] font-mono text-platinum-dark print:text-slate-600 block mb-0.5">React • Tailwind CSS • Framer Motion</span>
                    <p className="text-xs text-slate-300 print:text-slate-700 font-light leading-snug">
                      Hospitality platform with interactive digital culinary menus and direct table reservation scheduling.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/[0.015] border border-white/[0.05] print-project-card">
                    <div className="flex items-center justify-between text-xs mb-0.5">
                      <strong className="text-platinum print:text-black">4. Shree Pratham</strong>
                      <a href="https://shreepratham.vercel.app" target="_blank" rel="noopener noreferrer" className="font-mono text-platinum hover:underline text-[11px] print:text-sky-800">
                        shreepratham.vercel.app ↗
                      </a>
                    </div>
                    <span className="text-[10px] font-mono text-platinum-dark print:text-slate-600 block mb-0.5">Next.js • TypeScript • Tailwind CSS</span>
                    <p className="text-xs text-slate-300 print:text-slate-700 font-light leading-snug">
                      Enterprise business services hub featuring structured service catalogs and corporate inquiry routing.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/[0.015] border border-white/[0.05] print-project-card md:col-span-2">
                    <div className="flex items-center justify-between text-xs mb-0.5">
                      <strong className="text-platinum print:text-black">5. GigHunter</strong>
                      <a href="https://gighunter-zeta.vercel.app" target="_blank" rel="noopener noreferrer" className="font-mono text-platinum hover:underline text-[11px] print:text-sky-800">
                        gighunter-zeta.vercel.app ↗
                      </a>
                    </div>
                    <span className="text-[10px] font-mono text-platinum-dark print:text-slate-600 block mb-0.5">React • Tailwind CSS • LocalStorage Engine</span>
                    <p className="text-xs text-slate-300 print:text-slate-700 font-light leading-snug">
                      Talent marketplace platform with multi-category gig discovery, skill-matching filter algorithms, and client proposal submission workflows.
                    </p>
                  </div>
                </div>
              </div>

              {/* Group II */}
              <div className="space-y-2 mb-4">
                <h3 className="text-[11px] font-mono font-semibold text-platinum-muted uppercase print:text-black tracking-wider">
                  II. ADVANCED CREATIVE, WEB3D & WEB AUDIO ENGINEERING
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="p-2.5 rounded-xl bg-white/[0.015] border border-white/[0.05] print-project-card">
                    <div className="flex items-center justify-between text-xs mb-0.5">
                      <strong className="text-platinum print:text-black">6. SpatialCore (3D)</strong>
                      <a href="https://spatialcore-five.vercel.app" target="_blank" rel="noopener noreferrer" className="font-mono text-platinum hover:underline text-[10px] print:text-sky-800">
                        spatialcore-five.vercel.app ↗
                      </a>
                    </div>
                    <span className="text-[10px] font-mono text-platinum-dark print:text-slate-600 block mb-0.5">Three.js • R3F • Next.js</span>
                    <p className="text-xs text-slate-300 print:text-slate-700 font-light leading-snug">
                      Real-time 3D product studio with PBR materials, orbit physics, and exploded-view animations at steady 60 FPS.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/[0.015] border border-white/[0.05] print-project-card">
                    <div className="flex items-center justify-between text-xs mb-0.5">
                      <strong className="text-platinum print:text-black">7. SoundPulse (DAW)</strong>
                      <a href="https://soundpulse-five.vercel.app" target="_blank" rel="noopener noreferrer" className="font-mono text-platinum hover:underline text-[10px] print:text-sky-800">
                        soundpulse-five.vercel.app ↗
                      </a>
                    </div>
                    <span className="text-[10px] font-mono text-platinum-dark print:text-slate-600 block mb-0.5">Web Audio API • Canvas</span>
                    <p className="text-xs text-slate-300 print:text-slate-700 font-light leading-snug">
                      Web audio workstation with 3-band parametric EQ, waveform region slicing, client WAV export, and drum pad.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/[0.015] border border-white/[0.05] print-project-card">
                    <div className="flex items-center justify-between text-xs mb-0.5">
                      <strong className="text-platinum print:text-black">8. CanvasFlow</strong>
                      <a href="https://canvasflow-drab.vercel.app" target="_blank" rel="noopener noreferrer" className="font-mono text-platinum hover:underline text-[10px] print:text-sky-800">
                        canvasflow-drab.vercel.app ↗
                      </a>
                    </div>
                    <span className="text-[10px] font-mono text-platinum-dark print:text-slate-600 block mb-0.5">Canvas / SVG • Next.js</span>
                    <p className="text-xs text-slate-300 print:text-slate-700 font-light leading-snug">
                      Infinite whiteboard canvas with magnetic connectors, freehand smoothing brushes, and high-res vector exports.
                    </p>
                  </div>
                </div>
              </div>

              {/* Group III */}
              <div className="space-y-2">
                <h3 className="text-[11px] font-mono font-semibold text-platinum-muted uppercase print:text-black tracking-wider">
                  III. DATA INTELLIGENCE, DEVELOPER TOOLS & SAAS DASHBOARDS
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-xl bg-white/[0.015] border border-white/[0.05] print-project-card">
                    <div className="flex items-center justify-between text-xs mb-0.5">
                      <strong className="text-platinum print:text-black">9. WealthFlow</strong>
                      <a href="https://wealthflow-zeta.vercel.app" target="_blank" rel="noopener noreferrer" className="font-mono text-platinum hover:underline text-[10px] print:text-sky-800">
                        wealthflow-zeta.vercel.app ↗
                      </a>
                    </div>
                    <span className="text-[10px] font-mono text-platinum-dark print:text-slate-600 block mb-0.5">Next.js • Recharts • jsPDF</span>
                    <p className="text-xs text-slate-300 print:text-slate-700 font-light leading-snug">
                      500-iteration stochastic Monte Carlo engine plotting 10/25/50-yr confidence bands and automated client PDF reports.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/[0.015] border border-white/[0.05] print-project-card">
                    <div className="flex items-center justify-between text-xs mb-0.5">
                      <strong className="text-platinum print:text-black">10. IncidentPulse</strong>
                      <a href="https://incidentpulse.vercel.app" target="_blank" rel="noopener noreferrer" className="font-mono text-platinum hover:underline text-[10px] print:text-sky-800">
                        incidentpulse.vercel.app ↗
                      </a>
                    </div>
                    <span className="text-[10px] font-mono text-platinum-dark print:text-slate-600 block mb-0.5">Next.js • Tailwind • Cmd+K</span>
                    <p className="text-xs text-slate-300 print:text-slate-700 font-light leading-snug">
                      DevOps telemetry deck with simulated live WebSocket anomaly streams, Command Palette, and SLA countdowns.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/[0.015] border border-white/[0.05] print-project-card">
                    <div className="flex items-center justify-between text-xs mb-0.5">
                      <strong className="text-platinum print:text-black">11. CodeForge</strong>
                      <a href="https://codeforge-one-phi.vercel.app" target="_blank" rel="noopener noreferrer" className="font-mono text-platinum hover:underline text-[10px] print:text-sky-800">
                        codeforge-one-phi.vercel.app ↗
                      </a>
                    </div>
                    <span className="text-[10px] font-mono text-platinum-dark print:text-slate-600 block mb-0.5">Sql.js (WASM) • Monaco Editor</span>
                    <p className="text-xs text-slate-300 print:text-slate-700 font-light leading-snug">
                      Isolated iframe code sandbox with real-time SQLite WASM querying and regex state visualizer.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/[0.015] border border-white/[0.05] print-project-card">
                    <div className="flex items-center justify-between text-xs mb-0.5">
                      <strong className="text-platinum print:text-black">12. NexusWiki</strong>
                      <a href="https://nexuswiki-five.vercel.app" target="_blank" rel="noopener noreferrer" className="font-mono text-platinum hover:underline text-[10px] print:text-sky-800">
                        nexuswiki-five.vercel.app ↗
                      </a>
                    </div>
                    <span className="text-[10px] font-mono text-platinum-dark print:text-slate-600 block mb-0.5">React • D3.js • PrismJS</span>
                    <p className="text-xs text-slate-300 print:text-slate-700 font-light leading-snug">
                      Note-taking knowledge base with [[WikiLink]] parsing, LaTeX math, and interactive D3 force knowledge graphs.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/[0.015] border border-white/[0.05] print-project-card">
                    <div className="flex items-center justify-between text-xs mb-0.5">
                      <strong className="text-platinum print:text-black">13. VoyagePlanner</strong>
                      <a href="https://voyageplanner-three.vercel.app" target="_blank" rel="noopener noreferrer" className="font-mono text-platinum hover:underline text-[10px] print:text-sky-800">
                        voyageplanner-three.vercel.app ↗
                      </a>
                    </div>
                    <span className="text-[10px] font-mono text-platinum-dark print:text-slate-600 block mb-0.5">Next.js • Leaflet • dnd-kit</span>
                    <p className="text-xs text-slate-300 print:text-slate-700 font-light leading-snug">
                      Route-optimized itinerary architect with drag-drop timeline scheduling and multi-currency bill splitting.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/[0.015] border border-white/[0.05] print-project-card">
                    <div className="flex items-center justify-between text-xs mb-0.5">
                      <strong className="text-platinum print:text-black">14. VitalPulse</strong>
                      <a href="https://vitalpulse-iota.vercel.app" target="_blank" rel="noopener noreferrer" className="font-mono text-platinum hover:underline text-[10px] print:text-sky-800">
                        vitalpulse-iota.vercel.app ↗
                      </a>
                    </div>
                    <span className="text-[10px] font-mono text-platinum-dark print:text-slate-600 block mb-0.5">Next.js • Chart.js • Lucide</span>
                    <p className="text-xs text-slate-300 print:text-slate-700 font-light leading-snug">
                      Clinical biometric analytics hub with dynamic time-series charts, medication adherence, and risk calculators.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/[0.015] border border-white/[0.05] print-project-card md:col-span-2">
                    <div className="flex items-center justify-between text-xs mb-0.5">
                      <strong className="text-platinum print:text-black">15. HavenRealty</strong>
                      <a href="https://havenrealty-omega.vercel.app" target="_blank" rel="noopener noreferrer" className="font-mono text-platinum hover:underline text-[10px] print:text-sky-800">
                        havenrealty-omega.vercel.app ↗
                      </a>
                    </div>
                    <span className="text-[10px] font-mono text-platinum-dark print:text-slate-600 block mb-0.5">Next.js • Framer Motion • SVG Canvas</span>
                    <p className="text-xs text-slate-300 print:text-slate-700 font-light leading-snug">
                      Luxury architectural real estate platform with interactive SVG floor plan room hotspots and mortgage engines.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* EDUCATION & CREDENTIALS */}
            <div className="print-section print-avoid-break pt-1">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-platinum print:text-black mb-2 border-b border-white/[0.06] print:border-slate-300 pb-1">
                EDUCATION & CREDENTIALS
              </h2>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] print:border-slate-300 print:bg-slate-50 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-platinum print:text-black text-xs sm:text-sm">
                    Bachelor of Arts (BA)
                  </h3>
                  <p className="text-xs text-slate-400 print:text-slate-600 font-mono mt-0.5">
                    University of Delhi (DU) • New Delhi, India
                  </p>
                </div>
                <span className="font-mono text-xs text-platinum-muted print:text-slate-600 font-medium">
                  Expected 2027
                </span>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
