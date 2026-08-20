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
      const success = await downloadResumeAsPDF('resume-page-1', 'resume-page-2', 'Alok_Vishwakarma_Resume.pdf');
      if (success) {
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
      window.print();
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="resume-print-wrapper fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto print:p-0 print:m-0 print:static print:overflow-visible">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#030304]/90 backdrop-blur-xl print:hidden"
        />

        {/* Modal Container / Resume Document Shell */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 16 }}
          transition={{ duration: 0.2 }}
          id="resume-printable-document"
          className="relative w-full max-w-4xl rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-2xl z-10 my-4 max-h-[92vh] overflow-y-auto print:max-h-none print:border-none print:shadow-none print:bg-white print:p-0 print:m-0 print:rounded-none"
        >
          {/* Header Action Bar (Hidden when printed or exported to PDF) */}
          <div className="sticky top-0 bg-[#0a0b0e] text-platinum border-b border-white/[0.1] px-5 py-3.5 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 print:hidden no-pdf-export">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-white/[0.06] border border-white/[0.1] text-platinum">
                <FileText className="w-4 h-4 text-platinum" />
              </div>
              <div>
                <span className="text-xs font-mono font-semibold text-platinum block">
                  Alok Vishwakarma — Master Resume
                </span>
                <span className="text-[11px] text-emerald-400 font-mono">
                  Exact 2-Page Executive A4 Division • 15 Deployments
                </span>
              </div>
            </div>

            {/* Dual Download Controls */}
            <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
              {/* Direct PDF Download Button */}
              <button
                onClick={handleDirectDownload}
                disabled={isGeneratingPDF}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-slate-950 hover:bg-slate-200 active:scale-[0.98] font-bold text-xs shadow-sm transition-all min-h-[38px] disabled:opacity-75 cursor-pointer"
                title="Download direct 2-page PDF file"
              >
                {isGeneratingPDF ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Rendering 2 Pages...</span>
                  </>
                ) : downloadSuccess ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Saved 2-Page PDF!</span>
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
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.08] text-platinum hover:bg-white/[0.16] hover:text-white border border-white/[0.12] font-medium text-xs shadow-sm transition-colors min-h-[38px] cursor-pointer"
                title="Open browser print dialog"
              >
                <Printer className="w-3.5 h-3.5 text-platinum-muted" />
                <span>Print / Save PDF</span>
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/[0.08] text-platinum-muted hover:text-white border border-white/[0.12] min-h-[38px] min-w-[38px] flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close resume"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* =========================================================================
              PAGE 1 OF RESUME (Header, Summary, Skills, Experience, Portfolio 1-7)
              ========================================================================= */}
          <div id="resume-page-1" className="resume-page bg-white text-slate-900 p-6 sm:p-9 relative">
            {/* Header Matrix */}
            <div className="mb-4">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <h1 className="font-extrabold text-2xl sm:text-3xl tracking-tight text-slate-950 uppercase font-sans">
                  ALOK VISHWAKARMA
                </h1>
                <div className="text-left sm:text-right text-[11px] font-mono text-slate-700 leading-tight">
                  <span className="block font-medium">New Delhi, India • Open for Roles</span>
                  <span className="block font-medium">& Contracts</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-slate-950 mt-1 leading-snug">
                Principal Full-Stack Web Architect |{' '}
                <span className="text-sky-700 font-bold">Next.js (App Router), TypeScript, Three.js & Web Audio API</span>
              </p>

              {/* Contact Icons Row */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2.5 text-[11px] text-slate-700 font-mono">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>New Delhi, India 110042</span>
                </div>
                <a href="tel:+918826001811" className="flex items-center gap-1.5 hover:text-sky-700">
                  <Phone className="w-3.5 h-3.5 text-slate-800 shrink-0" />
                  <span>+91 8826001811</span>
                </a>
                <a href={`mailto:${PROFILE_INFO.email}`} className="flex items-center gap-1.5 hover:text-sky-700">
                  <Mail className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>alokvishwa1998@gmail.com</span>
                </a>
                <a href="https://alokvishwa-studio.vercel.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-sky-700">
                  <Globe className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>alokvishwa-studio.vercel.app</span>
                </a>
                <a href={PROFILE_INFO.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-sky-700">
                  <Github className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                  <span>github.com/yankun22</span>
                </a>
                <a href={PROFILE_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-sky-700">
                  <Linkedin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>linkedin.com/in/alokvishwa-studio</span>
                </a>
              </div>
              <div className="w-full h-px bg-slate-300 mt-2.5" />
            </div>

            {/* EXECUTIVE SUMMARY */}
            <div className="mb-3.5">
              <h2 className="font-extrabold text-[11px] uppercase tracking-wider text-slate-950 border-b-2 border-slate-950 pb-0.5 mb-1.5">
                EXECUTIVE SUMMARY
              </h2>
              <p className="text-[10.5px] sm:text-[11px] leading-relaxed text-slate-800 text-justify">
                Senior Full-Stack Web Architect with proven engineering mastery across 15 fully deployed web applications spanning Fintech engines, 3D WebGL configurators, Web Audio DAWs, in-browser SQL sandboxes, real estate portals, e-commerce storefronts, and client enterprise platforms. Specializes in building modern Next.js/React applications with strict type safety, modular micro-frontends, D3/Canvas visualizations, and dual-viewport mobile/desktop responsiveness (F12 audited). Expert in deploying standalone multi-application monorepos on Vercel with zero latency bottlenecks and sub-second load performance.
              </p>
            </div>

            {/* TECHNICAL EXPERTISE */}
            <div className="mb-3.5">
              <h2 className="font-extrabold text-[11px] uppercase tracking-wider text-slate-950 border-b-2 border-slate-950 pb-0.5 mb-1.5">
                TECHNICAL EXPERTISE
              </h2>
              <div className="space-y-1 text-[10.5px] sm:text-[11px] text-slate-800">
                <div className="flex flex-col sm:flex-row">
                  <strong className="text-slate-950 font-bold sm:w-36 shrink-0">Frontend & Web3D:</strong>
                  <span>React, Next.js (App Router), TypeScript, JavaScript (ES6+), Three.js, React Three Fiber (R3F), Web Audio API, HTML5 Canvas, Tailwind CSS, Framer Motion, D3.js, Leaflet / MapLibre</span>
                </div>
                <div className="flex flex-col sm:flex-row">
                  <strong className="text-slate-950 font-bold sm:w-36 shrink-0">Backend & Systems:</strong>
                  <span>Node.js, Express, RESTful APIs, SQLite / Sql.js (WebAssembly), PostgreSQL, Client-Side Data Caching, LocalStorage State Engines</span>
                </div>
                <div className="flex flex-col sm:flex-row">
                  <strong className="text-slate-950 font-bold sm:w-36 shrink-0">DevOps & Cloud:</strong>
                  <span>Vercel (Monorepo Multi-Deployment), Git, GitHub Actions, SPA Client-Side Rewrites, Webpack/Vite Optimization, CI/CD Automation</span>
                </div>
                <div className="flex flex-col sm:flex-row">
                  <strong className="text-slate-950 font-bold sm:w-36 shrink-0">UI/UX & Quality:</strong>
                  <span>Mobile-First Responsive Architecture (F12 DevTools Audited), 60fps Performance Profiling, PDF/SVG Dynamic Exporters, Cross-Browser Compatibility</span>
                </div>
              </div>
            </div>

            {/* PROFESSIONAL EXPERIENCE */}
            <div className="mb-3.5">
              <h2 className="font-extrabold text-[11px] uppercase tracking-wider text-slate-950 border-b-2 border-slate-950 pb-0.5 mb-1.5">
                PROFESSIONAL EXPERIENCE
              </h2>
              
              {/* Role 1 */}
              <div className="mb-2.5">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <strong className="text-slate-950 font-bold text-[11.5px]">Senior Full-Stack Developer & Technical Consultant</strong>
                  <span className="text-[10.5px] font-mono text-slate-600 font-medium">January 2023 – Present</span>
                </div>
                <p className="text-[10.5px] text-sky-700 font-medium mb-1">
                  Freelance Engineering & Client Solutions • New Delhi, India (Remote)
                </p>
                <ul className="list-disc list-outside ml-4 space-y-0.5 text-[10.5px] text-slate-800 leading-snug">
                  <li>Architected, developed, and deployed 15 complete production web systems across e-commerce, automotive, culinary, luxury real estate, developer tooling, and financial modeling.</li>
                  <li>Standardized automated monorepo CI/CD pipelines deploying isolated sub-applications to Vercel with automated routing and zero downtime.</li>
                  <li>Enforced strict dual-viewport responsiveness protocols, guaranteeing 100% layout integrity across mobile (375px/390px) and ultra-wide desktop viewports.</li>
                </ul>
              </div>

              {/* Role 2 */}
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <strong className="text-slate-950 font-bold text-[11.5px]">Frontend Web Developer</strong>
                  <span className="text-[10.5px] font-mono text-slate-600 font-medium">2021 – 2023</span>
                </div>
                <p className="text-[10.5px] text-sky-700 font-medium mb-1">
                  Digital Systems & Web Solutions • India
                </p>
                <ul className="list-disc list-outside ml-4 space-y-0.5 text-[10.5px] text-slate-800 leading-snug">
                  <li>Engineered high-conversion business portals and client dashboards with optimized bundle sizes and sub-1.2s First Contentful Paint (FCP).</li>
                  <li>Integrated complex state management, data visualization charts, and interactive canvas components using React and Tailwind CSS.</li>
                </ul>
              </div>
            </div>

            {/* PRODUCTION PORTFOLIO APPLICATIONS (PAGE 1) */}
            <div>
              <h2 className="font-extrabold text-[11px] uppercase tracking-wider text-slate-950 border-b-2 border-slate-950 pb-0.5 mb-1.5">
                PRODUCTION PORTFOLIO APPLICATIONS (ALL 15 LIVE DEPLOYMENTS)
              </h2>
              
              <h3 className="font-bold text-[10.5px] text-sky-700 uppercase tracking-wide mb-1">
                I. COMMERCIAL CLIENT PORTALS, E-COMMERCE & BUSINESS SYSTEMS
              </h3>
              <div className="space-y-1.5 text-[10.5px]">
                {/* Item 1 */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                    <div>
                      <strong className="text-slate-950 font-bold">1. Chelvie Coffee</strong>{' '}
                      <a href="https://chelvie-coffee.vercel.app" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">
                        ↗ chelvie-coffee.vercel.app
                      </a>
                    </div>
                    <span className="text-sky-800 font-semibold text-[10px]">Next.js • React • Tailwind CSS • Framer Motion</span>
                  </div>
                  <p className="text-slate-700 leading-tight">
                    Artisanal specialty coffee e-commerce storefront featuring interactive brew flavor profiles, dynamic shopping cart drawer, and sleek editorial roast catalogs.
                  </p>
                </div>

                {/* Item 2 */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                    <div>
                      <strong className="text-slate-950 font-bold">2. Sukhmani Car Bazar</strong>{' '}
                      <a href="https://sukhmani-car-bazar.vercel.app" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">
                        ↗ sukhmani-car-bazar.vercel.app
                      </a>
                    </div>
                    <span className="text-sky-800 font-semibold text-[10px]">Next.js • React • Tailwind CSS • Lead Engine</span>
                  </div>
                  <p className="text-slate-700 leading-tight">
                    High-performance automotive inventory & dealership portal featuring real-time vehicle filtering, financing calculators, and dynamic lead acquisition forms.
                  </p>
                </div>

                {/* Item 3 */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                    <div>
                      <strong className="text-slate-950 font-bold">3. The Immigrant Cafe</strong>{' '}
                      <a href="https://theimmigrantcafe.vercel.app" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">
                        ↗ theimmigrantcafe.vercel.app
                      </a>
                    </div>
                    <span className="text-sky-800 font-semibold text-[10px]">React • Tailwind CSS • Framer Motion • UI/UX</span>
                  </div>
                  <p className="text-slate-700 leading-tight">
                    Boutique hospitality platform with interactive digital culinary menus, smooth editorial imagery transitions, and direct table reservation scheduling.
                  </p>
                </div>

                {/* Item 4 */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                    <div>
                      <strong className="text-slate-950 font-bold">4. Shree Pratham</strong>{' '}
                      <a href="https://shreepratham.vercel.app" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">
                        ↗ shreepratham.vercel.app
                      </a>
                    </div>
                    <span className="text-sky-800 font-semibold text-[10px]">Next.js • TypeScript • Tailwind CSS</span>
                  </div>
                  <p className="text-slate-700 leading-tight">
                    Enterprise business services hub featuring structured service catalogs, corporate inquiry routing, and mobile-optimized service showcase decks.
                  </p>
                </div>

                {/* Item 5 */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                    <div>
                      <strong className="text-slate-950 font-bold">5. GigHunter</strong>{' '}
                      <a href="https://gighunter-zeta.vercel.app" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">
                        ↗ gighunter-zeta.vercel.app
                      </a>
                    </div>
                    <span className="text-sky-800 font-semibold text-[10px]">React • Tailwind CSS • LocalStorage Engine</span>
                  </div>
                  <p className="text-slate-700 leading-tight">
                    Talent marketplace platform with multi-category gig discovery, skill-matching filter algorithms, and client proposal submission workflows.
                  </p>
                </div>
              </div>

              <h3 className="font-bold text-[10.5px] text-sky-700 uppercase tracking-wide mt-2 mb-1">
                II. ADVANCED CREATIVE, WEB3D & WEB AUDIO ENGINEERING
              </h3>
              <div className="space-y-1.5 text-[10.5px]">
                {/* Item 6 */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                    <div>
                      <strong className="text-slate-950 font-bold">6. SpatialCore — 3D Interactive Product Studio</strong>{' '}
                      <a href="https://spatialcore-five.vercel.app" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">
                        ↗ spatialcore-five.vercel.app
                      </a>
                    </div>
                    <span className="text-sky-800 font-semibold text-[10px]">Three.js • React Three Fiber • Next.js • Tailwind CSS</span>
                  </div>
                  <p className="text-slate-700 leading-tight">
                    Real-time 3D product customization studio with PBR materials (Carbon Fiber, Matte Leather), orbit physics, and spring-based exploded-view engineering animations at steady 60 FPS.
                  </p>
                </div>

                {/* Item 7 */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                    <div>
                      <strong className="text-slate-950 font-bold">7. SoundPulse — Web Audio DAW & Stem Slicer</strong>{' '}
                      <a href="https://soundpulse-five.vercel.app" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">
                        ↗ soundpulse-five.vercel.app
                      </a>
                    </div>
                    <span className="text-sky-800 font-semibold text-[10px]">Web Audio API • Wavesurfer.js • React (Vite) • HTML5 Canvas</span>
                  </div>
                  <p className="text-slate-700 leading-tight">
                    Browser-based digital audio workstation featuring 3-band parametric EQ, live waveform region slicing, client-side WAV export, and a zero-latency touch/keyboard drum machine.
                  </p>
                </div>
              </div>
            </div>

            {/* Page 1 Footer */}
            <div className="mt-4 pt-2 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-500 font-mono">
              <span className="hidden sm:inline">alokvishwa-studio.vercel.app</span>
              <span className="ml-auto font-medium">Alok Vishwakarma — Page 1 of 2</span>
            </div>
          </div>

          {/* =========================================================================
              PAGE 2 OF RESUME (Item 8, Portfolio 9-15, Education & Credentials)
              ========================================================================= */}
          <div id="resume-page-2" className="resume-page bg-white text-slate-900 p-6 sm:p-9 pt-4 relative border-t-2 border-dashed border-slate-300 print:border-none print:pt-0">
            {/* Page 2 Continuation header tag (screen only) */}
            <div className="text-[10px] font-mono text-slate-400 mb-2 uppercase tracking-widest print:hidden no-pdf-export">
              Page 2 Continuation
            </div>

            <div className="space-y-1.5 text-[10.5px]">
              {/* Item 8 */}
              <div className="mb-2">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <div>
                    <strong className="text-slate-950 font-bold">8. CanvasFlow — Infinite Diagramming & Whiteboard</strong>{' '}
                    <a href="https://canvasflow-drab.vercel.app" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">
                      ↗ canvasflow-drab.vercel.app
                    </a>
                  </div>
                  <span className="text-sky-800 font-semibold text-[10px]">Next.js • HTML5 Canvas / SVG • Framer Motion • Lucide</span>
                </div>
                <p className="text-slate-700 leading-tight">
                  Infinite pan/zoom diagramming canvas with smart magnetic connectors, freehand smoothing brushes, full undo/redo state stacks, and high-res vector PNG/SVG exports.
                </p>
              </div>

              <h3 className="font-bold text-[10.5px] text-sky-700 uppercase tracking-wide mt-2 mb-1">
                III. DATA INTELLIGENCE, DEVELOPER TOOLS & SAAS DASHBOARDS
              </h3>
              
              {/* Item 9 */}
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <div>
                    <strong className="text-slate-950 font-bold">9. WealthFlow — Multi-Asset Portfolio & Monte Carlo Simulator</strong>{' '}
                    <a href="https://wealthflow-zeta.vercel.app" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">
                      ↗ wealthflow-zeta.vercel.app
                    </a>
                  </div>
                  <span className="text-sky-800 font-semibold text-[10px]">Next.js • Recharts • jsPDF • TypeScript • Tailwind CSS</span>
                </div>
                <p className="text-slate-700 leading-tight">
                  Fintech asset management platform featuring a 500-iteration stochastic Monte Carlo engine plotting 10/25/50-year confidence bands and automated client-side PDF reports.
                </p>
              </div>

              {/* Item 10 */}
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <div>
                    <strong className="text-slate-950 font-bold">10. IncidentPulse — Real-Time DevOps Command Center</strong>{' '}
                    <a href="https://incidentpulse.vercel.app" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">
                      ↗ incidentpulse.vercel.app
                    </a>
                  </div>
                  <span className="text-sky-800 font-semibold text-[10px]">Next.js • Tailwind CSS • Framer Motion • date-fns</span>
                </div>
                <p className="text-slate-700 leading-tight">
                  DevOps telemetry deck featuring simulated live WebSocket anomaly streams, keyboard-first Command Palette (Cmd+K), SLA countdown timers, and service dependency topology maps.
                </p>
              </div>

              {/* Item 11 */}
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <div>
                    <strong className="text-slate-950 font-bold">11. CodeForge — Interactive Code Sandbox & SQL Studio</strong>{' '}
                    <a href="https://codeforge-one-phi.vercel.app" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">
                      ↗ codeforge-one-phi.vercel.app
                    </a>
                  </div>
                  <span className="text-sky-800 font-semibold text-[10px]">Sql.js (SQLite WASM) • Monaco / CodeMirror • React (Vite)</span>
                </div>
                <p className="text-slate-700 leading-tight">
                  Developer workbench combining an isolated iframe HTML/CSS/JS execution sandbox with real-time SQLite WASM querying and regex railroad state-machine visualizers.
                </p>
              </div>

              {/* Item 12 */}
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <div>
                    <strong className="text-slate-950 font-bold">12. NexusWiki — Bi-Directional Knowledge Graph Engine</strong>{' '}
                    <a href="https://nexuswiki-five.vercel.app" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">
                      ↗ nexuswiki-five.vercel.app
                    </a>
                  </div>
                  <span className="text-sky-800 font-semibold text-[10px]">React (Vite) • D3.js • PrismJS • Tailwind CSS</span>
                </div>
                <p className="text-slate-700 leading-tight">
                  Interconnected note-taking app featuring dynamic [[WikiLink]] parsing, real-time LaTeX math rendering, dynamic backlinks indexing, and interactive D3 force-directed knowledge cluster graphs.
                </p>
              </div>

              {/* Item 13 */}
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <div>
                    <strong className="text-slate-950 font-bold">13. VoyagePlanner — Route-Optimized Itinerary Architect</strong>{' '}
                    <a href="https://voyageplanner-three.vercel.app" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">
                      ↗ voyageplanner-three.vercel.app
                    </a>
                  </div>
                  <span className="text-sky-800 font-semibold text-[10px]">Next.js • Leaflet / MapLibre • dnd-kit • Tailwind CSS</span>
                </div>
                <p className="text-slate-700 leading-tight">
                  Travel itinerary architect featuring interactive waypoint routing, drag-and-drop multi-day timeline scheduling, multi-currency bill splitting, and weather forecast telemetry.
                </p>
              </div>

              {/* Item 14 */}
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <div>
                    <strong className="text-slate-950 font-bold">14. VitalPulse — Clinical Biometrics & Health Analytics</strong>{' '}
                    <a href="https://vitalpulse-iota.vercel.app" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">
                      ↗ vitalpulse-iota.vercel.app
                    </a>
                  </div>
                  <span className="text-sky-800 font-semibold text-[10px]">Next.js • Chart.js • Lucide-react • Tailwind CSS</span>
                </div>
                <p className="text-slate-700 leading-tight">
                  Clinical health analytics hub with dynamic time-series biometric charts (Blood Pressure, Glucose, Sleep Stages), medication adherence tracking, and cardiovascular risk calculators.
                </p>
              </div>

              {/* Item 15 */}
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <div>
                    <strong className="text-slate-950 font-bold">15. HavenRealty — Spatial Property & Booking Portal</strong>{' '}
                    <a href="https://havenrealty-omega.vercel.app" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">
                      ↗ havenrealty-omega.vercel.app
                    </a>
                  </div>
                  <span className="text-sky-800 font-semibold text-[10px]">Next.js • Framer Motion • SVG Canvas • Tailwind CSS</span>
                </div>
                <p className="text-slate-700 leading-tight">
                  Luxury architectural real estate platform with interactive SVG floor plan room hotspots, conflict-free seasonal date booking calendars, and real-time mortgage amortization engines.
                </p>
              </div>
            </div>

            {/* EDUCATION & CREDENTIALS */}
            <div className="mt-4 pt-2">
              <h2 className="font-extrabold text-[11px] uppercase tracking-wider text-slate-950 border-b-2 border-slate-950 pb-0.5 mb-1.5">
                EDUCATION & CREDENTIALS
              </h2>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline text-[11px] text-slate-800">
                <div>
                  <strong className="text-slate-950 font-bold">Bachelor of Arts (BA)</strong>
                  <p className="text-[10.5px] text-slate-600 font-mono mt-0.5">
                    University of Delhi (DU) • New Delhi, India
                  </p>
                </div>
                <span className="font-mono text-[10.5px] text-slate-600 font-medium">
                  Expected 2027
                </span>
              </div>
            </div>

            {/* Page 2 Footer */}
            <div className="mt-6 pt-2 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-500 font-mono">
              <span className="hidden sm:inline">alokvishwa-studio.vercel.app</span>
              <span className="ml-auto font-medium">Alok Vishwakarma — Page 2 of 2</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
