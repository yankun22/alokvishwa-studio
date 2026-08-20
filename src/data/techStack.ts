import { ArchitecturePillar, TechSkillCategory } from '../types';

export const ARCHITECTURE_PILLARS: ArchitecturePillar[] = [
  {
    id: 'webgl-3d',
    title: 'Hardware-Accelerated WebGL & 3D',
    badge: '60 FPS Pipeline',
    description: 'Three.js, React Three Fiber, GLSL shaders, and procedural PBR material systems engineered for 60 FPS performance across desktop and mobile GPUs.',
    iconName: 'Box',
    stats: '60 FPS',
    statLabel: 'Hardware Render Loop',
    tags: ['Three.js', 'React Three Fiber', 'GLSL Shaders', 'Drei', 'glTF Pipeline'],
    interactiveType: 'webgl'
  },
  {
    id: 'responsive-engine',
    title: 'Dual-Viewport Precision Engineering',
    badge: 'Zero Overflow Guarantee',
    description: 'Flawlessly optimized across 375px mobile, 390px modern smartphones, 768px tablets, and 1440px+ ultra-wide screens with strict 44x44px touch targets.',
    iconName: 'Smartphone',
    stats: '100%',
    statLabel: 'Mobile & Desktop Audit',
    tags: ['F12 Verified', 'Touch Targets >44px', 'Zero Layout Shift', 'Fluid Typography'],
    interactiveType: 'viewport'
  },
  {
    id: 'inbrowser-compute',
    title: 'In-Browser Runtime Compute & Audio',
    badge: 'WASM & Web Audio',
    description: 'Direct client execution via WebAssembly SQLite engines, multi-track Web Audio API nodes, and zero-server-cost client side calculations.',
    iconName: 'Cpu',
    stats: '0ms',
    statLabel: 'Server Spin-up Latency',
    tags: ['Sql.js WASM', 'Web Audio API', 'Web Workers', 'AudioWorklet', 'IndexedDB'],
    interactiveType: 'compute'
  },
  {
    id: 'performance-monorepo',
    title: 'Sub-Second Performance & Edge CI/CD',
    badge: 'Core Web Vitals',
    description: 'High-speed automated deployment pipelines on Vercel with edge middleware, optimized code splitting, and zero-latency CDN edge delivery.',
    iconName: 'Zap',
    stats: '100 / 100',
    statLabel: 'Lighthouse Performance Score',
    tags: ['Vercel Edge', 'Next.js App Router', 'Dynamic Imports', 'Code Splitting', 'CI/CD Automation'],
    interactiveType: 'vitals'
  }
];

export const SKILL_CATEGORIES: TechSkillCategory[] = [
  {
    title: 'Frontend Architecture',
    iconName: 'Layout',
    skills: [
      { name: 'Next.js 14+ (App Router / SSR / SSG)', level: 98, experience: 'Production Lead', highlight: true },
      { name: 'React 19 & TypeScript', level: 99, experience: 'Core Specialist', highlight: true },
      { name: 'Tailwind CSS & Design Systems', level: 96, experience: 'Awwwards-Caliber', highlight: true },
      { name: 'Framer Motion & Micro-Interactions', level: 95, experience: 'Kinetic Physics', highlight: true },
      { name: 'State Management (Zustand, Context, Redux)', level: 92, experience: 'Reactive Architect' },
    ]
  },
  {
    title: '3D Graphics & Spatial Web',
    iconName: 'Box',
    skills: [
      { name: 'Three.js & React Three Fiber (R3F)', level: 95, experience: 'WebGL 2.0 / PBR', highlight: true },
      { name: 'GLSL Custom Shader Programming', level: 88, experience: 'Vertex & Fragment', highlight: true },
      { name: 'HTML5 Canvas & SVG Graph Engines', level: 94, experience: 'Infinite Canvas' },
      { name: '3D Model Optimization & glTF Pipeline', level: 90, experience: 'Mesh Culling' },
    ]
  },
  {
    title: 'In-Browser Compute & Audio',
    iconName: 'Cpu',
    skills: [
      { name: 'Web Audio API & AudioWorklet', level: 92, experience: 'Synthesis & DSP', highlight: true },
      { name: 'WebAssembly (WASM) & SQLite', level: 90, experience: 'Client DB Engines', highlight: true },
      { name: 'Web Workers & Multithreading', level: 89, experience: 'Stochastic Compute' },
      { name: 'IndexedDB & Offline Architecture', level: 91, experience: 'Local-First' },
    ]
  },
  {
    title: 'Data Intelligence & Cloud DevOps',
    iconName: 'Workflow',
    skills: [
      { name: 'D3.js & Dynamic Data Visualizations', level: 93, experience: 'Graph Analytics', highlight: true },
      { name: 'Vercel Deployment & Edge Middleware', level: 96, experience: 'Monorepo & CI/CD', highlight: true },
      { name: 'Lighthouse & Core Web Vitals Optimization', level: 98, experience: 'Sub-second LCP' },
      { name: 'REST / GraphQL / WebSocket Telemetry', level: 93, experience: 'Real-time Feeds' },
    ]
  }
];

export const PROFILE_INFO = {
  name: 'Alok Vishwakarma',
  title: 'Principal Full-Stack Web Architect | Next.js (App Router), TypeScript, Three.js & Web Audio API',
  bio: 'Senior Full-Stack Web Architect with proven engineering mastery across 15 fully deployed web applications spanning Fintech engines, 3D WebGL configurators, Web Audio DAWs, in-browser SQL sandboxes, real estate portals, e-commerce storefronts, and client enterprise platforms.',
  email: 'alokvishwa1998@gmail.com',
  phone: '+91 8826001811',
  location: 'New Delhi, India 110042',
  website: 'https://alokvishwa-studio.vercel.app',
  github: 'https://github.com/yankun22',
  linkedin: 'https://www.linkedin.com/in/alokvishwa-studio',
  availabilityStatus: '✦ OPEN FOR PRIVATE COMMISSIONS & FULL-STACK ARCHITECTURE',
  experienceYears: '6+ Years',
  appsLive: 15,
};
