import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Printer, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Github, 
  Linkedin, 
  ExternalLink,
  Briefcase,
  GraduationCap,
  Layers,
  Cpu,
  ShieldCheck
} from 'lucide-react';
import { PROFILE_INFO } from '../data/techStack';

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
          className="fixed inset-0 bg-[#030304]/90 backdrop-blur-xl print:hidden"
        />

        {/* Modal Container / Resume Document */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl rounded-3xl bg-[#0a0b0e] border border-white/[0.12] p-6 sm:p-10 shadow-2xl z-10 my-8 max-h-[90vh] overflow-y-auto print:max-h-none print:border-none print:shadow-none print:bg-white print:text-black print:p-6 print:rounded-none"
        >
          {/* Header Action Bar (Hidden when printed) */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/[0.08] print:hidden">
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-full text-xs font-mono bg-white/[0.03] text-platinum border border-white/[0.1]">
                Verified Master Resume (15 Systems)
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-950 hover:bg-slate-200 font-bold text-xs shadow-sm transition-colors min-h-[40px]"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save PDF</span>
              </button>
              <button
                onClick={onClose}
                className="p-2.5 rounded-xl bg-white/[0.04] text-platinum-muted hover:text-white border border-white/[0.08] min-h-[40px] min-w-[40px] flex items-center justify-center"
                aria-label="Close resume"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Resume Body */}
          <div className="space-y-8 print:space-y-6 text-sm text-platinum-muted print:text-slate-800">
            
            {/* Header / Contact Matrix */}
            <div className="border-b border-white/[0.08] print:border-black/20 pb-6">
              <h1 className="font-display font-black text-2xl sm:text-4xl text-platinum print:text-black tracking-tight uppercase">
                Alok Vishwakarma
              </h1>
              <p className="text-base sm:text-lg text-platinum font-semibold mt-1 print:text-black">
                Principal Full-Stack Web Architect | Next.js (App Router), TypeScript, Three.js & Web Audio API
              </p>
              
              {/* Contact Information Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 mt-4 text-xs font-mono text-platinum-muted print:text-slate-700">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-platinum shrink-0 print:text-black" />
                  <span>New Delhi, India 110042</span>
                </div>
                <a href="tel:+918826001811" className="hover:text-white flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-platinum shrink-0 print:text-black" />
                  <span>+91 8826001811</span>
                </a>
                <a href={`mailto:${PROFILE_INFO.email}`} className="hover:text-white flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-platinum shrink-0 print:text-black" />
                  <span>alokvishwa1998@gmail.com</span>
                </a>
                <a href="https://alokvishwa-studio.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-platinum shrink-0 print:text-black" />
                  <span>alokvishwa-studio.vercel.app</span>
                </a>
                <a href={PROFILE_INFO.github} target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1.5">
                  <Github className="w-3.5 h-3.5 text-platinum shrink-0 print:text-black" />
                  <span>github.com/yankun22</span>
                </a>
                <a href={PROFILE_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1.5">
                  <Linkedin className="w-3.5 h-3.5 text-platinum shrink-0 print:text-black" />
                  <span>linkedin.com/in/alokvishwa-studio</span>
                </a>
              </div>
            </div>

            {/* EXECUTIVE SUMMARY */}
            <div>
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-platinum print:text-black mb-2.5">
                EXECUTIVE SUMMARY
              </h2>
              <p className="leading-relaxed font-light text-slate-300 print:text-slate-800">
                Senior Full-Stack Web Architect with proven engineering mastery across 15 fully deployed web applications spanning Fintech engines, 3D WebGL configurators, Web Audio DAWs, in-browser SQL sandboxes, real estate portals, e-commerce storefronts, and client enterprise platforms. Specializes in building modern Next.js/React applications with strict type safety, modular micro-frontends, D3/Canvas visualizations, and dual-viewport mobile/desktop responsiveness (F12 audited). Expert in deploying standalone multi-application monorepos on Vercel with zero latency bottlenecks and sub-second load performance.
              </p>
            </div>

            {/* TECHNICAL EXPERTISE */}
            <div>
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-platinum print:text-black mb-3">
                TECHNICAL EXPERTISE
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] print:border-slate-300 print:bg-slate-50">
                  <strong className="text-platinum print:text-black block mb-1">Frontend & Web3D:</strong>
                  React, Next.js (App Router), TypeScript, JavaScript (ES6+), Three.js, React Three Fiber (R3F), Web Audio API, HTML5 Canvas, Tailwind CSS, Framer Motion, D3.js, Leaflet / MapLibre
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] print:border-slate-300 print:bg-slate-50">
                  <strong className="text-platinum print:text-black block mb-1">Backend & Systems:</strong>
                  Node.js, Express, RESTful APIs, SQLite / Sql.js (WebAssembly), PostgreSQL, Client-Side Data Caching, LocalStorage State Engines
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] print:border-slate-300 print:bg-slate-50">
                  <strong className="text-platinum print:text-black block mb-1">DevOps & Cloud:</strong>
                  Vercel (Monorepo Multi-Deployment), Git, GitHub Actions, SPA Client-Side Rewrites, Webpack/Vite Optimization, CI/CD Automation
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] print:border-slate-300 print:bg-slate-50">
                  <strong className="text-platinum print:text-black block mb-1">UI/UX & Quality:</strong>
                  Mobile-First Responsive Architecture (F12 DevTools Audited), 60fps Performance Profiling, PDF/SVG Dynamic Exporters, Cross-Browser Compatibility
                </div>
              </div>
            </div>

            {/* PROFESSIONAL EXPERIENCE */}
            <div>
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-platinum print:text-black mb-4">
                PROFESSIONAL EXPERIENCE
              </h2>
              <div className="space-y-6">
                {/* Role 1 */}
                <div className="border-l-2 border-white/20 print:border-slate-400 pl-4 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="font-semibold text-platinum print:text-black text-sm">
                      Senior Full-Stack Developer & Technical Consultant
                    </h3>
                    <span className="font-mono text-xs text-platinum-muted print:text-slate-600">
                      January 2023 – Present
                    </span>
                  </div>
                  <p className="text-xs font-mono text-slate-400 print:text-slate-600">
                    Freelance Engineering & Client Solutions • New Delhi, India (Remote)
                  </p>
                  <ul className="list-disc list-outside ml-4 space-y-1.5 text-xs text-slate-300 print:text-slate-700 font-light">
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
                <div className="border-l-2 border-white/20 print:border-slate-400 pl-4 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="font-semibold text-platinum print:text-black text-sm">
                      Frontend Web Developer
                    </h3>
                    <span className="font-mono text-xs text-platinum-muted print:text-slate-600">
                      2021 – 2023
                    </span>
                  </div>
                  <p className="text-xs font-mono text-slate-400 print:text-slate-600">
                    Digital Systems & Web Solutions • India
                  </p>
                  <ul className="list-disc list-outside ml-4 space-y-1.5 text-xs text-slate-300 print:text-slate-700 font-light">
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
            <div>
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-platinum print:text-black mb-4">
                PRODUCTION PORTFOLIO APPLICATIONS (ALL 15 LIVE DEPLOYMENTS)
              </h2>

              {/* Group I */}
              <div className="space-y-3 mb-5">
                <h3 className="text-xs font-mono font-semibold text-platinum-muted uppercase print:text-black tracking-wider">
                  I. COMMERCIAL CLIENT PORTALS, E-COMMERCE & BUSINESS SYSTEMS
                </h3>
                <div className="space-y-2.5">
                  <div className="p-3 rounded-xl bg-white/[0.015] border border-white/[0.05] print:border-slate-200">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <strong className="text-platinum print:text-black">1. Chelvie Coffee</strong>
                      <a href="https://chelvie-coffee.vercel.app" target="_blank" rel="noopener noreferrer" className="font-mono text-platinum hover:underline flex items-center gap-1 print:text-blue-700">
                        chelvie-coffee.vercel.app ↗
                      </a>
                    </div>
                    <span className="text-[10px] font-mono text-platinum-dark block mb-1">Next.js • React • Tailwind CSS • Framer Motion</span>
                    <p className="text-xs text-slate-300 print:text-slate-700 font-light">
                      Artisanal specialty coffee e-commerce storefront featuring interactive brew flavor profiles, dynamic shopping cart drawer, and sleek editorial roast catalogs.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.015] border border-white/[0.05] print:border-slate-200">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <strong className="text-platinum print:text-black">2. Sukhmani Car Bazar</strong>
                      <a href="https://sukhmani-car-bazar.vercel.app" target="_blank" rel="noopener noreferrer" className="font-mono text-platinum hover:underline flex items-center gap-1 print:text-blue-700">
                        sukhmani-car-bazar.vercel.app ↗
                      </a>
                    </div>
                    <span className="text-[10px] font-mono text-platinum-dark block mb-1">Next.js • React • Tailwind CSS • Lead Engine</span>
                    <p className="text-xs text-slate-300 print:text-slate-700 font-light">
                      High-performance automotive inventory & dealership portal featuring real-time vehicle filtering, financing calculators, and dynamic lead acquisition forms.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.015] border border-white/[0.05] print:border-slate-200">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <strong className="text-platinum print:text-black">3. The Immigrant Cafe</strong>
                      <a href="https://theimmigrantcafe.vercel.app" target="_blank" rel="noopener noreferrer" className="font-mono text-platinum hover:underline flex items-center gap-1 print:text-blue-700">
                        theimmigrantcafe.vercel.app ↗
                      </a>
                    </div>
                    <span className="text-[10px] font-mono text-platinum-dark block mb-1">React • Tailwind CSS • Framer Motion • UI/UX</span>
                    <p className="text-xs text-slate-300 print:text-slate-700 font-light">
                      Boutique hospitality platform with interactive digital culinary menus, smooth editorial imagery transitions, and direct table reservation scheduling.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.015] border border-white/[0.05] print:border-slate-200">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <strong className="text-platinum print:text-black">4. Shree Pratham</strong>
                      <a href="https://shreepratham.vercel.app" target="_blank" rel="noopener noreferrer" className="font-mono text-platinum hover:underline flex items-center gap-1 print:text-blue-700">
                        shreepratham.vercel.app ↗
                      </a>
                    </div>
                    <span className="text-[10px] font-mono text-platinum-dark block mb-1">Next.js • TypeScript • Tailwind CSS</span>
                    <p className="text-xs text-slate-300 print:text-slate-700 font-light">
                      Enterprise business services hub featuring structured service catalogs, corporate inquiry routing, and mobile-optimized service showcase decks.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.015] border border-white/[0.05] print:border-slate-200">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <strong className="text-platinum print:text-black">5. GigHunter</strong>
                      <a href="https://gighunter-zeta.vercel.app" target="_blank" rel="noopener noreferrer" className="font-mono text-platinum hover:underline flex items-center gap-1 print:text-blue-700">
                        gighunter-zeta.vercel.app ↗
                      </a>
                    </div>
                    <span className="text-[10px] font-mono text-platinum-dark block mb-1">React • Tailwind CSS • LocalStorage Engine</span>
                    <p className="text-xs text-slate-300 print:text-slate-700 font-light">
                      Talent marketplace platform with multi-category gig discovery, skill-matching filter algorithms, and client proposal submission workflows.
                    </p>
                  </div>
                </div>
              </div>

              {/* Group II */}
              <div className="space-y-3 mb-5">
                <h3 className="text-xs font-mono font-semibold text-platinum-muted uppercase print:text-black tracking-wider">
                  II. ADVANCED CREATIVE, WEB3D & WEB AUDIO ENGINEERING
                </h3>
                <div className="space-y-2.5">
                  <div className="p-3 rounded-xl bg-white/[0.015] border border-white/[0.05] print:border-slate-200">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <strong className="text-platinum print:text-black">6. SpatialCore — 3D Interactive Product Studio</strong>
                      <a href="https://spatialcore-five.vercel.app" target="_blank" rel="noopener noreferrer" className="font-mono text-platinum hover:underline flex items-center gap-1 print:text-blue-700">
                        spatialcore-five.vercel.app ↗
                      </a>
                    </div>
                    <span className="text-[10px] font-mono text-platinum-dark block mb-1">Three.js • React Three Fiber • Next.js • Tailwind CSS</span>
                    <p className="text-xs text-slate-300 print:text-slate-700 font-light">
                      Real-time 3D product customization studio with PBR materials (Carbon Fiber, Matte Leather), orbit physics, and spring-based exploded-view engineering animations at steady 60 FPS.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.015] border border-white/[0.05] print:border-slate-200">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <strong className="text-platinum print:text-black">7. SoundPulse — Web Audio DAW & Stem Slicer</strong>
                      <a href="https://soundpulse-five.vercel.app" target="_blank" rel="noopener noreferrer" className="font-mono text-platinum hover:underline flex items-center gap-1 print:text-blue-700">
                        soundpulse-five.vercel.app ↗
                      </a>
                    </div>
                    <span className="text-[10px] font-mono text-platinum-dark block mb-1">Web Audio API • Wavesurfer.js • React (Vite) • HTML5 Canvas</span>
                    <p className="text-xs text-slate-300 print:text-slate-700 font-light">
                      Browser-based digital audio workstation featuring 3-band parametric EQ, live waveform region slicing, client-side WAV export, and a zero-latency touch/keyboard drum machine.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.015] border border-white/[0.05] print:border-slate-200">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <strong className="text-platinum print:text-black">8. CanvasFlow — Infinite Diagramming & Whiteboard</strong>
                      <a href="https://canvasflow-drab.vercel.app" target="_blank" rel="noopener noreferrer" className="font-mono text-platinum hover:underline flex items-center gap-1 print:text-blue-700">
                        canvasflow-drab.vercel.app ↗
                      </a>
                    </div>
                    <span className="text-[10px] font-mono text-platinum-dark block mb-1">Next.js • HTML5 Canvas / SVG • Framer Motion • Lucide</span>
                    <p className="text-xs text-slate-300 print:text-slate-700 font-light">
                      Infinite pan/zoom diagramming canvas with smart magnetic connectors, freehand smoothing brushes, full undo/redo state stacks, and high-res vector PNG/SVG exports.
                    </p>
                  </div>
                </div>
              </div>

              {/* Group III */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-semibold text-platinum-muted uppercase print:text-black tracking-wider">
                  III. DATA INTELLIGENCE, DEVELOPER TOOLS & SAAS DASHBOARDS
                </h3>
                <div className="space-y-2.5">
                  <div className="p-3 rounded-xl bg-white/[0.015] border border-white/[0.05] print:border-slate-200">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <strong className="text-platinum print:text-black">9. WealthFlow — Multi-Asset Portfolio & Monte Carlo Simulator</strong>
                      <a href="https://wealthflow-zeta.vercel.app" target="_blank" rel="noopener noreferrer" className="font-mono text-platinum hover:underline flex items-center gap-1 print:text-blue-700">
                        wealthflow-zeta.vercel.app ↗
                      </a>
                    </div>
                    <span className="text-[10px] font-mono text-platinum-dark block mb-1">Next.js • Recharts • jsPDF • TypeScript • Tailwind CSS</span>
                    <p className="text-xs text-slate-300 print:text-slate-700 font-light">
                      Fintech asset management platform featuring a 500-iteration stochastic Monte Carlo engine plotting 10/25/50-year confidence bands and automated client-side PDF reports.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.015] border border-white/[0.05] print:border-slate-200">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <strong className="text-platinum print:text-black">10. IncidentPulse — Real-Time DevOps Command Center</strong>
                      <a href="https://incidentpulse.vercel.app" target="_blank" rel="noopener noreferrer" className="font-mono text-platinum hover:underline flex items-center gap-1 print:text-blue-700">
                        incidentpulse.vercel.app ↗
                      </a>
                    </div>
                    <span className="text-[10px] font-mono text-platinum-dark block mb-1">Next.js • Tailwind CSS • Framer Motion • date-fns</span>
                    <p className="text-xs text-slate-300 print:text-slate-700 font-light">
                      DevOps telemetry deck featuring simulated live WebSocket anomaly streams, keyboard-first Command Palette (Cmd+K), SLA countdown timers, and service dependency topology maps.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.015] border border-white/[0.05] print:border-slate-200">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <strong className="text-platinum print:text-black">11. CodeForge — Interactive Code Sandbox & SQL Studio</strong>
                      <a href="https://codeforge-one-phi.vercel.app" target="_blank" rel="noopener noreferrer" className="font-mono text-platinum hover:underline flex items-center gap-1 print:text-blue-700">
                        codeforge-one-phi.vercel.app ↗
                      </a>
                    </div>
                    <span className="text-[10px] font-mono text-platinum-dark block mb-1">Sql.js (SQLite WASM) • Monaco / CodeMirror • React (Vite)</span>
                    <p className="text-xs text-slate-300 print:text-slate-700 font-light">
                      Developer workbench combining an isolated iframe HTML/CSS/JS execution sandbox with real-time SQLite WASM querying and regex railroad state-machine visualizers.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.015] border border-white/[0.05] print:border-slate-200">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <strong className="text-platinum print:text-black">12. NexusWiki — Bi-Directional Knowledge Graph Engine</strong>
                      <a href="https://nexuswiki-five.vercel.app" target="_blank" rel="noopener noreferrer" className="font-mono text-platinum hover:underline flex items-center gap-1 print:text-blue-700">
                        nexuswiki-five.vercel.app ↗
                      </a>
                    </div>
                    <span className="text-[10px] font-mono text-platinum-dark block mb-1">React (Vite) • D3.js • PrismJS • Tailwind CSS</span>
                    <p className="text-xs text-slate-300 print:text-slate-700 font-light">
                      Interconnected note-taking app featuring dynamic [[WikiLink]] parsing, real-time LaTeX math rendering, dynamic backlinks indexing, and interactive D3 force-directed knowledge cluster graphs.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.015] border border-white/[0.05] print:border-slate-200">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <strong className="text-platinum print:text-black">13. VoyagePlanner — Route-Optimized Itinerary Architect</strong>
                      <a href="https://voyageplanner-three.vercel.app" target="_blank" rel="noopener noreferrer" className="font-mono text-platinum hover:underline flex items-center gap-1 print:text-blue-700">
                        voyageplanner-three.vercel.app ↗
                      </a>
                    </div>
                    <span className="text-[10px] font-mono text-platinum-dark block mb-1">Next.js • Leaflet / MapLibre • dnd-kit • Tailwind CSS</span>
                    <p className="text-xs text-slate-300 print:text-slate-700 font-light">
                      Travel itinerary architect featuring interactive waypoint routing, drag-and-drop multi-day timeline scheduling, multi-currency bill splitting, and weather forecast telemetry.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.015] border border-white/[0.05] print:border-slate-200">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <strong className="text-platinum print:text-black">14. VitalPulse — Clinical Biometrics & Health Analytics</strong>
                      <a href="https://vitalpulse-iota.vercel.app" target="_blank" rel="noopener noreferrer" className="font-mono text-platinum hover:underline flex items-center gap-1 print:text-blue-700">
                        vitalpulse-iota.vercel.app ↗
                      </a>
                    </div>
                    <span className="text-[10px] font-mono text-platinum-dark block mb-1">Next.js • Chart.js • Lucide-react • Tailwind CSS</span>
                    <p className="text-xs text-slate-300 print:text-slate-700 font-light">
                      Clinical health analytics hub with dynamic time-series biometric charts (Blood Pressure, Glucose, Sleep Stages), medication adherence tracking, and cardiovascular risk calculators.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.015] border border-white/[0.05] print:border-slate-200">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <strong className="text-platinum print:text-black">15. HavenRealty — Spatial Property & Booking Portal</strong>
                      <a href="https://havenrealty-omega.vercel.app" target="_blank" rel="noopener noreferrer" className="font-mono text-platinum hover:underline flex items-center gap-1 print:text-blue-700">
                        havenrealty-omega.vercel.app ↗
                      </a>
                    </div>
                    <span className="text-[10px] font-mono text-platinum-dark block mb-1">Next.js • Framer Motion • SVG Canvas • Tailwind CSS</span>
                    <p className="text-xs text-slate-300 print:text-slate-700 font-light">
                      Luxury architectural real estate platform with interactive SVG floor plan room hotspots, conflict-free seasonal date booking calendars, and real-time mortgage amortization engines.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* EDUCATION & CREDENTIALS */}
            <div className="pt-2">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-platinum print:text-black mb-3">
                EDUCATION & CREDENTIALS
              </h2>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] print:border-slate-300 print:bg-slate-50 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-platinum print:text-black text-sm">
                    Bachelor of Arts (BA)
                  </h3>
                  <p className="text-xs text-slate-400 print:text-slate-600 font-mono mt-0.5">
                    University of Delhi (DU) • New Delhi, India
                  </p>
                </div>
                <span className="font-mono text-xs text-platinum-muted print:text-slate-600">
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
