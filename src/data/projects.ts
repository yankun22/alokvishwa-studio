import { Project } from '../types';

export const PROJECTS: Project[] = [
  // I. Web3D, Creative Engineering & Web Audio
  {
    id: 'spatialcore',
    numberPrefix: '01',
    title: 'SpatialCore',
    url: 'https://spatialcore-five.vercel.app/',
    category: 'Web3D & Web Audio',
    stack: ['Three.js', 'React Three Fiber', 'WebGL', 'GLSL Shaders', 'Next.js'],
    summary: 'Real-time 3D product customization studio with procedural PBR materials and 60 FPS exploded-view engineering animations. Enables continuous geometry deformation and dynamic studio lighting.',
    highlights: [
      '60 FPS WebGL rendering pipeline with custom GLSL shader passes',
      'Interactive exploded component view & assembly sequencing',
      'Configurable studio lighting, HDR environments, and high-res glTF export'
    ],
    status: 'Live on Vercel',
    metrics: '60 FPS • WebGL 2.0',
    architectureDetails: {
      frontendStack: 'Next.js 14 (App Router) + React Three Fiber + Drei',
      engineOrRuntime: 'Three.js WebGL Pipeline with Custom GLSL Shaders',
      stateAndData: 'Zustand Reactive Store + glTF Mesh Buffers',
      performanceWins: 'Instanced mesh rendering, zero memory leaks across route transitions, sub-50ms texture swap latency.',
      keyFeatures: [
        'Exploded engineering view with synchronized kinematic lerping',
        'Dynamic metallic, roughness, and transmission material tuning',
        'Viewport screenshot capture and multi-format 3D asset exporter'
      ]
    }
  },
  {
    id: 'soundpulse',
    numberPrefix: '02',
    title: 'SoundPulse',
    url: 'https://soundpulse-five.vercel.app/',
    category: 'Web3D & Web Audio',
    stack: ['Web Audio API', 'Wavesurfer.js', 'React', 'TypeScript', 'Canvas'],
    summary: 'In-browser Digital Audio Workstation (DAW) featuring a 3-band parametric EQ, waveform slicer, and zero-latency drum machine. Delivers real-time biquad audio filtering and harmonic synthesis.',
    highlights: [
      'Direct Web Audio API node graph with zero-latency audio worklet routing',
      'Interactive sample slicing and dynamic waveform visualizer',
      'Multi-track sequencer with 8 velocity-sensitive percussion triggers'
    ],
    status: 'Live on Vercel',
    metrics: '<5ms Latency • AudioWorklet',
    architectureDetails: {
      frontendStack: 'React 18 + Vite + TypeScript',
      engineOrRuntime: 'Native Web Audio API (BiquadFilter, GainNode, Convolver)',
      stateAndData: 'Custom AudioGraph Dispatcher + Binary AudioBuffers',
      performanceWins: 'Sub-5ms trigger response using high-precision performance.now audio clocks.',
      keyFeatures: [
        '8-pad drum machine with customizable sound banks & sample import',
        'Real-time FFT audio visualizer with high-frequency responsive Canvas',
        '3-band parametric EQ with draggable curve frequency points'
      ]
    }
  },
  {
    id: 'canvasflow',
    numberPrefix: '03',
    title: 'CanvasFlow',
    url: 'https://canvasflow-drab.vercel.app/',
    category: 'Web3D & Web Audio',
    stack: ['Next.js', 'HTML5 Canvas / SVG', 'Framer Motion', 'TypeScript'],
    summary: 'Infinite collaborative diagramming canvas equipped with magnetic snapping connectors, freehand smoothing, and vector exports. Provides spatial ideation with real-time viewport zoom and pan physics.',
    highlights: [
      'Infinite infinite-pan canvas with high-performance SVG Bezier connectors',
      'Magnetic node snapping and intelligent orthogonal auto-routing',
      'Lossless SVG and PNG high-resolution diagram export pipeline'
    ],
    status: 'Live on Vercel',
    metrics: 'Infinite Grid • 60 FPS',
    architectureDetails: {
      frontendStack: 'Next.js 14 + Framer Motion + Tailwind CSS',
      engineOrRuntime: 'Hybrid HTML5 Canvas & SVG Graph Coordinate Engine',
      stateAndData: 'Zustand Spatial Graph Store with Undo/Redo Stacks',
      performanceWins: 'Spatial index viewport culling keeping DOM node count under 100 on large diagrams.',
      keyFeatures: [
        'Smart connector anchors with dynamic Bezier & cubic curve rendering',
        'Multi-select, grouping, and fluid drag-and-drop mechanics',
        'Custom node templates for cloud architecture, flowcharts, and mind maps'
      ]
    }
  },

  // II. Fintech, Data Intelligence & Systems
  {
    id: 'wealthflow',
    numberPrefix: '04',
    title: 'WealthFlow',
    url: 'https://wealthflow-zeta.vercel.app/',
    category: 'Fintech & Data Systems',
    stack: ['Next.js', 'Recharts', 'jsPDF', 'TypeScript', 'Tailwind CSS'],
    summary: 'Multi-asset wealth management platform powered by a 500-iteration Monte Carlo stochastic mathematical simulation engine. Generates actuarial asset projections and dynamic PDF audits.',
    highlights: [
      '500-iteration Monte Carlo probability simulation model',
      'High-throughput visual analytics with responsive SVG chart layers',
      'Client-side vector PDF financial prospectus and balance sheet generator'
    ],
    status: 'Live on Vercel',
    metrics: '500+ Iterations • <15ms',
    architectureDetails: {
      frontendStack: 'Next.js + TypeScript + Tailwind CSS',
      engineOrRuntime: 'Custom In-Browser Monte Carlo Numerical Engine',
      stateAndData: 'Immer + React Context with Local Storage Persistence',
      performanceWins: 'Web Worker offloading for stochastic iterations, instantaneous responsive chart re-renders.',
      keyFeatures: [
        'Asset allocation rebalancing with risk tolerance slider matrices',
        'Historical backtesting across global equities, bonds, and real estate',
        'Comprehensive vector PDF report generation with jsPDF and html2canvas'
      ]
    }
  },
  {
    id: 'incidentpulse',
    numberPrefix: '05',
    title: 'IncidentPulse',
    url: 'https://incidentpulse.vercel.app/',
    category: 'Fintech & Data Systems',
    stack: ['Next.js', 'Tailwind CSS', 'date-fns', 'Framer Motion', 'TypeScript'],
    summary: 'DevOps mission command center featuring simulated WebSocket telemetry streams, lightning-fast Cmd+K palette, and real-time SLA timers. Organizes severity incident triaging and runbook automation.',
    highlights: [
      'Real-time streaming telemetry with live incident state orchestration',
      'Instant global keyboard navigation via modal Cmd+K command palette',
      'Precision SLA countdown timers and automated post-mortem workflow generation'
    ],
    status: 'Live on Vercel',
    metrics: 'Real-Time Telemetry • Cmd+K',
    architectureDetails: {
      frontendStack: 'Next.js + TypeScript + Tailwind CSS + Framer Motion',
      engineOrRuntime: 'Simulated WebSocket Event Dispatcher + Reactive Polling',
      stateAndData: 'Context-driven Incident State Machine',
      performanceWins: 'Zero layout shift during high-frequency live event ingest.',
      keyFeatures: [
        'Global quick search and command palette with keyboard shortcuts',
        'Live SLA breach warning thresholds with sound and visual alerts',
        'Service health status matrix across global microservices'
      ]
    }
  },
  {
    id: 'codeforge',
    numberPrefix: '06',
    title: 'CodeForge',
    url: 'https://codeforge-one-phi.vercel.app/',
    category: 'Fintech & Data Systems',
    stack: ['Sql.js (WASM)', 'Monaco Editor', 'React', 'TypeScript'],
    summary: 'Developer sandbox featuring in-browser SQLite WASM execution & regex railroad visualizer. Executes arbitrary SQL queries client-side with zero server latency and provides instant syntax validation.',
    highlights: [
      'In-browser WASM SQLite database engine running entirely on the client',
      'Embedded Microsoft Monaco Editor with intelligent IntelliSense autocomplete',
      'Dynamic regex syntax parser with interactive visual railroad diagrams'
    ],
    status: 'Live on Vercel',
    metrics: '100% In-Browser WASM • 0ms',
    architectureDetails: {
      frontendStack: 'React + Monaco Editor + Tailwind CSS',
      engineOrRuntime: 'Sql.js WebAssembly SQLite 3.42 Engine',
      stateAndData: 'Client In-Memory Buffer with IndexedDB schema sync',
      performanceWins: 'Complete client-side sandbox execution without database backend spin-up cost.',
      keyFeatures: [
        'Query execution with tabular data rendering and execution time profiling',
        'Regex railroad parse tree visualizer with step-by-step match tester',
        'Pre-populated database schemas for instant analytics sandboxing'
      ]
    }
  },
  {
    id: 'nexuswiki',
    numberPrefix: '07',
    title: 'NexusWiki',
    url: 'https://nexuswiki-five.vercel.app/',
    category: 'Fintech & Data Systems',
    stack: ['React', 'D3.js', 'PrismJS', 'TypeScript', 'Tailwind CSS'],
    summary: 'Bi-directional note-taking vault with interactive D3.js force-directed knowledge cluster graphs. Automatically maps associative thought connections and resolves backlink references in real time.',
    highlights: [
      'Interactive D3.js force-directed physics graph visualizing node relationships',
      'Full bi-directional [[WikiLink]] parsing and automated backlink resolver',
      'Rich Markdown editor with syntax highlighting and live preview dual pane'
    ],
    status: 'Live on Vercel',
    metrics: 'D3 Graph • Bi-Directional',
    architectureDetails: {
      frontendStack: 'React + Vite + TypeScript + Tailwind CSS',
      engineOrRuntime: 'D3-Force Simulation Engine + Custom Markdown AST Parser',
      stateAndData: 'In-memory Graph Adjacency Matrix & LocalStorage Sync',
      performanceWins: 'D3 force simulation throttled using requestAnimationFrame for butter-smooth 60 FPS physics.',
      keyFeatures: [
        'Dual-pane split editing with instantaneous preview synchronization',
        'Interactive graph node clustering by document tags and backlinks',
        'Full-text fuzzy search across all vault markdown files'
      ]
    }
  },
  {
    id: 'voyageplanner',
    numberPrefix: '08',
    title: 'VoyagePlanner',
    url: 'https://voyageplanner-three.vercel.app/',
    category: 'Fintech & Data Systems',
    stack: ['Next.js', 'Leaflet / MapLibre', 'dnd-kit', 'TypeScript'],
    summary: 'Travel route architect with interactive waypoint maps and multi-currency expense splitting. Offers drag-and-drop schedule reordering, geographic waypoint clustering, and real-time budget consolidation.',
    highlights: [
      'Interactive geospatial mapping with custom route path rendering',
      'Fluid drag-and-drop itinerary reorganization with @dnd-kit',
      'Multi-currency expense conversion and split-bill settlement calculator'
    ],
    status: 'Live on Vercel',
    metrics: 'Geospatial Maps • dnd-kit',
    architectureDetails: {
      frontendStack: 'Next.js + dnd-kit + Tailwind CSS',
      engineOrRuntime: 'Leaflet / MapLibre OpenStreetMap Cartography',
      stateAndData: 'Zustand Itinerary Store with GeoJSON layer caching',
      performanceWins: 'Marker clustering and lazy tile rendering across international map zooms.',
      keyFeatures: [
        'Day-by-day itinerary timelines with transit duration estimators',
        'Collaborative budget breakdown with auto-converted exchange rates',
        'Print-ready travel PDF summary with itinerary checkpoints'
      ]
    }
  },
  {
    id: 'vitalpulse',
    numberPrefix: '09',
    title: 'VitalPulse',
    url: 'https://vitalpulse-iota.vercel.app/',
    category: 'Fintech & Data Systems',
    stack: ['Next.js', 'Chart.js', 'Tailwind CSS', 'TypeScript'],
    summary: 'Clinical biometrics telemetry dashboard with time-series vitals and cardiovascular risk calculators. Visualizes vital biomarker trends, lipid panels, and algorithmic patient health scores.',
    highlights: [
      'Time-series biometric charts with dynamic threshold anomaly detection',
      'Cardiovascular risk calculator based on clinical Framingham models',
      'Encrypted client-side health telemetry records with printable summaries'
    ],
    status: 'Live on Vercel',
    metrics: 'Clinical Metrics • Anomaly Viz',
    architectureDetails: {
      frontendStack: 'Next.js + Chart.js + Tailwind CSS',
      engineOrRuntime: 'Canvas Time-Series Charting Engine',
      stateAndData: 'Typed Medical Record Schemas with Local Encrypted Store',
      performanceWins: 'Optimized canvas redraw loops avoiding CPU spikes during data streaming.',
      keyFeatures: [
        'Multi-axis vital sign correlation (Blood Pressure, Glucose, SpO2, Heart Rate)',
        'Personalized risk stratification and clinical guideline checklists',
        'Mobile-friendly clinical triage view optimized for tablet rounds'
      ]
    }
  },
  {
    id: 'havenrealty',
    numberPrefix: '10',
    title: 'HavenRealty',
    url: 'https://havenrealty-omega.vercel.app/',
    category: 'Fintech & Data Systems',
    stack: ['Next.js', 'Framer Motion', 'SVG Canvas', 'TypeScript'],
    summary: 'Luxury architectural property portal with interactive SVG floor plans and mortgage ROI models. Delivers editorial real estate presentation with high-res galleries and immersive floor navigation.',
    highlights: [
      'Interactive SVG floor plans with room-by-room metadata hotspots',
      'Dynamic mortgage calculator with principal, interest, and tax breakdown',
      'Cinematic full-bleed property galleries with smooth transition kinematics'
    ],
    status: 'Live on Vercel',
    metrics: 'SVG Floor Plans • Real Estate',
    architectureDetails: {
      frontendStack: 'Next.js + Framer Motion + Tailwind CSS',
      engineOrRuntime: 'Custom Interactive SVG Spatial Coordinate Mapper',
      stateAndData: 'Property Listing State Engine with Filter Facets',
      performanceWins: 'Priority image loading and blur-up placeholders for ultra-fast LCP.',
      keyFeatures: [
        'Floor-by-floor interactive blueprint with 360 tour hooks',
        'Comprehensive amortization schedule with monthly equity curves',
        'Direct agent consultation booking with instant schedule confirmation'
      ]
    }
  },

  // III. Commercial Client Portals & E-Commerce
  {
    id: 'chelvie-coffee',
    numberPrefix: '11',
    title: 'Chelvie Coffee',
    url: 'https://chelvie-coffee.vercel.app/',
    category: 'Commercial & Platforms',
    stack: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
    summary: 'Artisanal specialty coffee e-commerce storefront with interactive brew flavor notes. Features origin tasting matrices, roast profile selectors, and custom subscription flows.',
    highlights: [
      'Artisanal coffee flavor wheel & single-origin discovery matrix',
      'Custom recurring roast subscription configurator with grind size options',
      'Ultra-refined editorial typography and liquid smooth checkout flows'
    ],
    status: 'Live on Vercel',
    metrics: 'Specialty Roast • E-Commerce',
    architectureDetails: {
      frontendStack: 'Next.js 14 + TypeScript + Tailwind CSS + Framer Motion',
      engineOrRuntime: 'Client-side Cart & Subscription State Machine',
      stateAndData: 'Zustand Persistent Cart Store + Dynamic Pricing Engine',
      performanceWins: 'Instant product filter hydration and sub-second page transitions.',
      keyFeatures: [
        'Single-origin tasting notes radar and brewing guide modal',
        'Interactive coffee subscription cadence & blend customizer',
        'Mobile-optimized slide-out cart drawer with instant tax/shipping calculation'
      ]
    }
  },
  {
    id: 'sukhmani-car-bazar',
    numberPrefix: '12',
    title: 'Sukhmani Car Bazar',
    url: 'https://sukhmani-car-bazar.vercel.app/',
    category: 'Commercial & Platforms',
    stack: ['Next.js', 'React', 'Lead Engine', 'TypeScript'],
    summary: 'High-performance automotive inventory & dealership lead generation system. Features faceted search filtering, EMI loan estimation widgets, and WhatsApp booking triggers.',
    highlights: [
      'Multi-facet vehicle filtering by make, budget, transmission, and mileage',
      'Real-time automotive EMI loan calculator with downpayment adjusters',
      'Direct WhatsApp and phone lead generation conversion funnels'
    ],
    status: 'Live on Vercel',
    metrics: 'Automotive Portal • Lead Gen',
    architectureDetails: {
      frontendStack: 'Next.js + React + Tailwind CSS',
      engineOrRuntime: 'Client Search Engine & Query Param State Sync',
      stateAndData: 'Structured Automotive Catalog Data Layer',
      performanceWins: 'Instant client-side filter computation across full vehicle fleet.',
      keyFeatures: [
        'High-converting vehicle detail modal with key specifications',
        'EMI loan installment calculator with interactive slider inputs',
        'One-touch test drive booking with instant customer notifications'
      ]
    }
  },
  {
    id: 'theimmigrantcafe',
    numberPrefix: '13',
    title: 'The Immigrant Cafe',
    url: 'https://theimmigrantcafe.vercel.app/',
    category: 'Commercial & Platforms',
    stack: ['React', 'Tailwind CSS', 'UI/UX', 'Framer Motion'],
    summary: 'Boutique hospitality experience with digital menus and table reservation booking. Designed with warm gastronomy aesthetics, fluid parallax scrolling, and instant confirmation.',
    highlights: [
      'Interactive digital menu with dietary badges and allergen filtering',
      'Seamless reservation scheduler with real-time party size selection',
      'Editorial gastronomy storytelling with atmospheric motion transitions'
    ],
    status: 'Live on Vercel',
    metrics: 'Hospitality UX • Reservations',
    architectureDetails: {
      frontendStack: 'React + Framer Motion + Tailwind CSS',
      engineOrRuntime: 'Smooth Motion Orchestration with AnimatePresence',
      stateAndData: 'Menu & Booking State Engine with Validation',
      performanceWins: 'Ultra-lightweight bundle size (<45KB initial gzipped payload).',
      keyFeatures: [
        'Category-based culinary browsing (Coffee, Bakery, Mains, Cocktails)',
        'Table reservation workflow with calendar date & time slot selection',
        'Mobile-first responsive layout with sticky quick-order drawer'
      ]
    }
  },
  {
    id: 'shreepratham',
    numberPrefix: '14',
    title: 'Shree Pratham',
    url: 'https://shreepratham.vercel.app/',
    category: 'Commercial & Platforms',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    summary: 'Enterprise corporate services hub with structured service showcases and client inquiry funnels. Built for authority with case study highlights and consultation scheduling.',
    highlights: [
      'Comprehensive corporate service matrix with interactive scope cards',
      'Client inquiry request form with validation and lead capture',
      'Trust badges, client testimonial carousels, and corporate milestone timeline'
    ],
    status: 'Live on Vercel',
    metrics: 'Enterprise Services • Hub',
    architectureDetails: {
      frontendStack: 'Next.js + TypeScript + Tailwind CSS',
      engineOrRuntime: 'Server-Rendered Static Generation with Dynamic Hydration',
      stateAndData: 'React Hook Form + Zod Validation Layer',
      performanceWins: 'Perfect 100/100 Google Lighthouse SEO and Accessibility scores.',
      keyFeatures: [
        'Modular enterprise capability showcase with deep service breakdowns',
        'Direct consultation quote request workflow',
        'Corporate compliance, mission architecture, and leadership profiles'
      ]
    }
  },
  {
    id: 'gighunter',
    numberPrefix: '15',
    title: 'GigHunter',
    url: 'https://gighunter-zeta.vercel.app/',
    category: 'Commercial & Platforms',
    stack: ['React', 'Tailwind CSS', 'LocalStorage', 'TypeScript'],
    summary: 'Talent marketplace with skill-matching algorithms and proposal submission workflows. Features applicant rating matrices, budget filters, and persistent local workflow state.',
    highlights: [
      'Skill-matching discovery engine matching talent with project scopes',
      'Interactive proposal submission form with attachment previews',
      'Persistent local workflow state supporting full gig creation cycles'
    ],
    status: 'Live on Vercel',
    metrics: 'Talent Marketplace • SaaS',
    architectureDetails: {
      frontendStack: 'React + TypeScript + Tailwind CSS',
      engineOrRuntime: 'Client-Side Faceted Search & Ranking Algorithm',
      stateAndData: 'LocalStorage Persistent Storage with Schema Versioning',
      performanceWins: 'Zero backend cold start latency; operates entirely offline or online.',
      keyFeatures: [
        'Gig posting builder with scope of work, budget, and deadline milestones',
        'Freelancer profile builder with portfolio links and skill badges',
        'Proposal submission and candidate review dashboard'
      ]
    }
  }
];

export const CATEGORIES: { label: string; value: import('../types').ProjectCategory; count: number }[] = [
  { label: 'All Exhibitions (15)', value: 'All', count: 15 },
  { label: 'Web3D & Web Audio', value: 'Web3D & Web Audio', count: 3 },
  { label: 'Fintech & Data Systems', value: 'Fintech & Data Systems', count: 7 },
  { label: 'Commercial & Platforms', value: 'Commercial & Platforms', count: 5 },
];
