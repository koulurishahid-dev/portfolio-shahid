export interface Capability {
  id: string;
  number: string;
  name: string;
  shortTag: string;
  badge: string;
  accent: string;
  accentGlow: string;
  description: string;
  detailedPoints: string[];
  technologies: string[];
  relatedProjectId: string;
  relatedProjectName: string;
  metrics: string[];
}

export interface ProjectImage {
  url: string;
  caption: string;
  label: string;
}

export interface Hotspot {
  x: number; // percentage
  y: number; // percentage
  title: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  number: string;
  name: string;
  category: string;
  status: string;
  tagline: string;
  description: string;
  fullNarrative: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  isLive: boolean;
  buttonLabel: string;
  keyFeatures: string[];
  architecture: {
    stack: string;
    highlights: string[];
    performanceScore?: string;
  };
  images: ProjectImage[];
  hotspots?: Hotspot[];
  accentColor: string;
  gradient: string;
}

export interface JourneyMilestone {
  step: string;
  period: string;
  phase: string;
  title: string;
  status: string;
  statusColor: string;
  summary: string;
  highlights: string[];
  technologies: string[];
  metrics: string;
}

export const CAPABILITIES_DATA: Capability[] = [
  {
    id: 'frontend',
    number: '01',
    name: 'Frontend Development',
    shortTag: 'Reactive & Modern UI',
    badge: 'Core Competency',
    accent: '#00F0FF',
    accentGlow: 'rgba(0, 240, 255, 0.4)',
    description:
      'Engineering high-performance, accessible, and reactive user interfaces using modern React 19, Next.js, and TypeScript. Obsessed with fluid animations, zero cumulative layout shift (CLS), and intuitive component architecture.',
    detailedPoints: [
      'Component-driven UI architecture with React 19 and Next.js App Router',
      'Pixel-perfect responsive design tailored for mobile, tablet, and widescreen viewports',
      'Fluid micro-interactions and GPU-accelerated motion via Framer Motion & CSS',
      'Accessibility best practices following WCAG guidelines and ARIA landmarks',
    ],
    technologies: ['React 19', 'Next.js 14/15', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'HTML5/CSS3'],
    relatedProjectId: 'slrj-digital',
    relatedProjectName: 'SLRJ Digital Platform',
    metrics: ['Sub-second LCP', '100% Mobile Ready', 'Clean Modularity'],
  },
  {
    id: 'backend',
    number: '02',
    name: 'Backend Development',
    shortTag: 'API & Server Architecture',
    badge: 'Continuous Growth',
    accent: '#8B5CF6',
    accentGlow: 'rgba(139, 92, 246, 0.4)',
    description:
      'Designing robust server-side APIs, token-based authentication workflows, and asynchronous request handling. Dedicated to clean separation of concerns, secure REST principles, and scalable micro-services.',
    detailedPoints: [
      'RESTful API architecture using Node.js and Express with controller/service patterns',
      'Secure authentication workflows using JWT, refresh tokens, and password hashing',
      'Asynchronous task handling, error logging middleware, and input sanitization',
      'Integration with external third-party services and webhooks',
    ],
    technologies: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth', 'WebSockets', 'Serverless'],
    relatedProjectId: 'smart-medicine',
    relatedProjectName: 'Smart Medicine Telemetry API',
    metrics: ['Stateless Token Auth', 'Clean Controllers', 'Optimized Latency'],
  },
  {
    id: 'aiml',
    number: '03',
    name: 'AI & Machine Learning',
    shortTag: 'Models & Applied Intelligence',
    badge: 'Academic Specialization',
    accent: '#38BDF8',
    accentGlow: 'rgba(56, 189, 248, 0.4)',
    description:
      'Studying AI/ML engineering as an undergraduate, exploring neural network paradigms, supervised learning models, and computer vision. Connecting machine intelligence with practical user-facing software.',
    detailedPoints: [
      'Theoretical & mathematical grounding in linear algebra, statistics, and neural layers',
      'Hands-on experimentation with classification, predictive algorithms, and computer vision',
      'Integrating model inference endpoints into modern web and mobile applications',
      'Prompt engineering and emerging LLM agent workflows',
    ],
    technologies: ['Python', 'TensorFlow', 'PyTorch Basics', 'Scikit-Learn', 'OpenCV', 'AI Workflows'],
    relatedProjectId: 'smart-medicine',
    relatedProjectName: 'Smart Medicine Predictive Engine',
    metrics: ['B.Tech AI/ML Student', 'Predictive Analysis', 'Neural Workflows'],
  },
  {
    id: 'database',
    number: '04',
    name: 'Database Management',
    shortTag: 'Data Integrity & Schemas',
    badge: 'Persistence Layer',
    accent: '#10B981',
    accentGlow: 'rgba(16, 185, 129, 0.4)',
    description:
      'Structuring relational schemas, modeling entity relationships, and managing data lifecycles. Focused on ACID compliance, relational foreign keys, efficient indexing, and document stores.',
    detailedPoints: [
      'Relational database design and query crafting with PostgreSQL and SQL',
      'Document modeling for dynamic, evolving datasets using MongoDB',
      'ORM integration and type-safe schema migrations using Prisma',
      'Caching concepts and query optimization to minimize latency',
    ],
    technologies: ['PostgreSQL', 'MongoDB', 'Prisma ORM', 'SQL', 'Schema Normalization', 'Redis Basics'],
    relatedProjectId: 'slrj-learn',
    relatedProjectName: 'SLRJ Learn Knowledge Base',
    metrics: ['Type-safe Queries', 'ACID Principles', 'Normalized Schemas'],
  },
  {
    id: 'uiux',
    number: '05',
    name: 'UI/UX Design',
    shortTag: 'Ergonomics & Visual Polish',
    badge: 'User Centric',
    accent: '#EC4899',
    accentGlow: 'rgba(236, 72, 153, 0.4)',
    description:
      'Translating user needs into sleek, purposeful interfaces. Designing structured wireframes, coherent color tokens, responsive typographic scales, and delightful micro-feedback.',
    detailedPoints: [
      'Figma wireframing, interactive prototyping, and developer component handoff',
      'Dark mode aesthetic specialization with precise contrast ratios and glowing accents',
      'Intuitive user flows that reduce cognitive friction and simplify multi-step tasks',
      'Design token systems ensuring typography and spacing harmony across entire apps',
    ],
    technologies: ['Figma', 'Design Systems', 'Dark UI Ergonomics', 'Wireframing', 'Color Harmony', 'Micro-interactions'],
    relatedProjectId: 'slrj-digital',
    relatedProjectName: 'SLRJ Digital Brand System',
    metrics: ['High Visual Polish', 'Figma Prototyping', 'WCAG Contrast'],
  },
  {
    id: 'fullstack',
    number: '06',
    name: 'Full Stack Development',
    shortTag: 'End-to-End Synergy',
    badge: 'Unified Systems',
    accent: '#06B6D4',
    accentGlow: 'rgba(6, 182, 212, 0.4)',
    description:
      'Unifying client aesthetics, business logic, persistence layers, and edge deployment into cohesive, production-ready software systems that scale effortlessly.',
    detailedPoints: [
      'End-to-end full stack execution using the TypeScript/JavaScript ecosystem',
      'Bridging front-end state with backend databases seamlessly via REST/RPC',
      'Edge deployment pipelines on Vercel and modern cloud providers',
      'Continuous code quality control through linting, modularity, and clean structure',
    ],
    technologies: ['TypeScript', 'Next.js Fullstack', 'Vercel Edge', 'Git/GitHub', 'npm/Vite', 'CI/CD Basics'],
    relatedProjectId: 'slrj-digital',
    relatedProjectName: 'SLRJ Digital Agency Hub',
    metrics: ['Full Lifecycle', 'Unified TypeScript', 'Edge Deployment'],
  },
  {
    id: 'problem-solving',
    number: '07',
    name: 'Problem Solving',
    shortTag: 'Logic & Complexity',
    badge: 'Engineering Mindset',
    accent: '#F59E0B',
    accentGlow: 'rgba(245, 158, 11, 0.4)',
    description:
      'Approaching engineering challenges with methodical problem decomposition. Leveraging algorithm fundamentals, Big-O efficiency analysis, and defensive coding techniques.',
    detailedPoints: [
      'Algorithmic problem decomposition and data structure selection',
      'Time and space complexity profiling (Big-O notation)',
      'Systematic debugging, root-cause isolation, and defensive error handling',
      'Continuous coding practice and exploring real-world engineering trade-offs',
    ],
    technologies: ['Data Structures (DSA)', 'Algorithms', 'Big-O Analysis', 'Systematic Debugging', 'Code Optimization'],
    relatedProjectId: 'slrj-learn',
    relatedProjectName: 'SLRJ Learn CS Roadmaps',
    metrics: ['Modular Decomposition', 'Optimized Big-O', 'Systematic Debugging'],
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'slrj-digital',
    number: '01',
    name: 'SLRJ Digital',
    category: 'Technology Venture · Web Agency',
    status: 'Active Production Venture',
    tagline: 'Modern Web Solutions & High-Performance Digital Footprints',
    description:
      'My founded technology venture focused on helping modern businesses establish a distinctive, high-conversion digital presence through bespoke web development and software solutions.',
    fullNarrative:
      'SLRJ Digital represents my flagship initiative where engineering rigor meets product delivery. Built to solve the common issue of sluggish, cookie-cutter agency websites, SLRJ Digital delivers custom-crafted web experiences with sub-second load times, smooth 60fps micro-animations, and airtight SEO foundations. From architectural scoping to production deployment on global CDN edge nodes, each solution is crafted for modern business acceleration.',
    tags: ['Next.js 14', 'React 19', 'TypeScript', 'Tailwind CSS', 'Vercel Edge', 'SEO Architecture'],
    liveUrl: 'https://www.slrjdigital.in',
    repoUrl: 'https://github.com/koulurishahid-dev',
    isLive: true,
    buttonLabel: 'VISIT LIVE WEBSITE',
    keyFeatures: [
      '99+ Lighthouse performance score with zero layout shifts and sub-second LCP',
      'Custom bespoke design language tailored to high-growth tech ventures',
      'Integrated dynamic contact and project consultation dispatch systems',
      'Deployed on global edge infrastructure ensuring instant response worldwide',
    ],
    architecture: {
      stack: 'Next.js App Router + React 19 + Tailwind CSS + Vercel Edge',
      highlights: [
        'Zero-runtime CSS overhead with optimized Tailwind compile pipeline',
        'Pre-rendered static pages with incremental edge cache invalidation',
        'Fully responsive glassmorphism aesthetic with accessible dark mode ergonomics',
      ],
      performanceScore: '99/100',
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
        caption: 'Production Analytics & Scalable Web Dashboard',
        label: 'Platform Architecture',
      },
      {
        url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80',
        caption: 'Responsive Layouts & Ergonomic Interface Design',
        label: 'UI & Ergonomics',
      },
      {
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
        caption: 'Data Visualizations & Performance Metrics',
        label: 'Client Telemetry',
      },
    ],
    hotspots: [
      {
        x: 25,
        y: 35,
        title: 'Edge Caching Node',
        description: 'Vercel Edge Network handles global static generation and instant routing.',
      },
      {
        x: 75,
        y: 40,
        title: 'Performance Optimization',
        description: 'Image optimization and tree-shaken JS bundles yield 99+ Lighthouse scores.',
      },
      {
        x: 50,
        y: 80,
        title: 'Responsive Glass UI',
        description: 'Layered backdrop filters with subtle luminous borders across all breakpoints.',
      },
    ],
    accentColor: '#38BDF8',
    gradient: 'from-sky-500/20 via-blue-600/10 to-indigo-600/20',
  },
  {
    id: 'smart-medicine',
    number: '02',
    name: 'Smart Medicine',
    category: 'Healthcare Tech · Mobile Ecosystem',
    status: 'In Development · Concept Staging',
    tagline: 'Intelligent Patient Adherence & Connected Health Ecosystem',
    description:
      'An intelligent healthcare concept designed to eliminate missed doses, streamline pharmacy access, coordinate doctor appointments, and provide peace of mind to patients and caregivers.',
    fullNarrative:
      'Medication non-adherence leads to hundreds of thousands of preventable health complications each year. Smart Medicine was conceived to bridge this critical gap through a seamless companion application. Combining automated dosage reminders, digital prescription synchronization, real-time pharmacy inventory lookup, and doctor scheduling, the platform aims to make everyday healthcare management effortless and fail-safe.',
    tags: ['React Native', 'Expo', 'Node.js', 'Express', 'PostgreSQL', 'Mobile Health'],
    liveUrl: 'https://github.com/koulurishahid-dev',
    repoUrl: 'https://github.com/koulurishahid-dev',
    isLive: false,
    buttonLabel: 'VIEW REPOSITORY & SPECS',
    keyFeatures: [
      'Adaptive push notification engine with snooze, check-off, and caregiver fallback alerts',
      'Local pharmacy stock locator linking patient prescriptions with nearby inventories',
      'Secure prescription scanner and digital medicine cabinet organizer',
      'Appointment scheduler with doctor consultation timeline integration',
    ],
    architecture: {
      stack: 'React Native + Expo Client + Node.js REST API + PostgreSQL',
      highlights: [
        'Offline-first mobile storage with SQLite sync for uninterrupted reminders',
        'Role-based access control protecting sensitive health telemetry',
        'Designed for low battery drain with background scheduler alarms',
      ],
      performanceScore: 'Prototype Phase',
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80',
        caption: 'Smart Dose Scheduling & Patient Health Logs',
        label: 'Mobile Experience',
      },
      {
        url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=1200&auto=format&fit=crop&q=80',
        caption: 'Pharmacy Inventory Synchronization & Orders',
        label: 'Pharmacy Portal',
      },
      {
        url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&auto=format&fit=crop&q=80',
        caption: 'Doctor Consultation & Caregiver Monitoring Matrix',
        label: 'Caregiver Portal',
      },
    ],
    hotspots: [
      {
        x: 30,
        y: 30,
        title: 'Adherence Engine',
        description: 'Persistent local notifications ensure critical doses are never missed.',
      },
      {
        x: 65,
        y: 60,
        title: 'Prescription Vault',
        description: 'Encrypted document store for doctor scripts and dosage instructions.',
      },
    ],
    accentColor: '#8B5CF6',
    gradient: 'from-violet-500/20 via-purple-600/10 to-indigo-600/20',
  },
  {
    id: 'slrj-learn',
    number: '03',
    name: 'SLRJ Learn',
    category: 'Educational Platform · Developer Hub',
    status: 'In Active Development',
    tagline: 'Open Knowledge Architecture & Computer Science Curricula',
    description:
      'An open learning initiative under SLRJ Digital curating structured computer science notes, interactive coding roadmaps, and tutorials for engineering students.',
    fullNarrative:
      'Navigating modern computer science can be overwhelming with fragmented tutorials and outdated documentation. SLRJ Learn curates structured, battle-tested roadmaps across Data Structures & Algorithms, modern React frameworks, Backend architecture, and AI/ML fundamentals. Designed with an emphasis on clarity and practical examples, it enables learners to learn deeply, build fearlessly, and grow continuously.',
    tags: ['Next.js 14', 'React', 'TypeScript', 'Markdown/MDX', 'Open Source', 'Tailwind CSS'],
    liveUrl: 'https://github.com/slrjdigital-ai/SLRJ-LEARN',
    repoUrl: 'https://github.com/slrjdigital-ai/SLRJ-LEARN',
    isLive: true,
    buttonLabel: 'VIEW OPEN REPOSITORY',
    keyFeatures: [
      'Structured curriculum modules spanning algorithms, modern web, and AI principles',
      'Clean interactive documentation with copyable code snippets and syntax highlighting',
      'Open-source repository welcoming student contributions and peer reviews',
      'Quick reference cheat sheets and architecture decision records',
    ],
    architecture: {
      stack: 'Next.js Static Generation + MDX Components + GitHub Actions CI',
      highlights: [
        'Instantaneous page transitions via static pre-rendering of all documentation',
        'Syntax highlighting with tree-sitter inspired dark theme styling',
        'Searchable index across all modules with keyboard shortcut navigation',
      ],
      performanceScore: 'Open Source',
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80',
        caption: 'Structured Developer Roadmap & Module Explorer',
        label: 'Roadmap Catalog',
      },
      {
        url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80',
        caption: 'Interactive Code Walkthroughs & Documentation',
        label: 'Knowledge Base',
      },
      {
        url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80',
        caption: 'Open Source Engineering Practices & GitHub Hub',
        label: 'Open Source Repo',
      },
    ],
    hotspots: [
      {
        x: 40,
        y: 40,
        title: 'MDX Core',
        description: 'Dynamic Markdown parsing renders interactive React widgets inside docs.',
      },
      {
        x: 70,
        y: 70,
        title: 'Community Forkable',
        description: 'Fully open on GitHub for collaborative notes and student enrichment.',
      },
    ],
    accentColor: '#06B6D4',
    gradient: 'from-cyan-500/20 via-teal-600/10 to-blue-600/20',
  },
];

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    step: '01',
    period: '2023 — 2024',
    phase: 'Foundations & Computer Science',
    title: 'Algorithmic Grounding & University Path',
    status: 'Completed',
    statusColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/40',
    summary:
      'Embarked on undergraduate B.Tech in Artificial Intelligence & Machine Learning. Mastered programming logic, core computational thinking, and data structures.',
    highlights: [
      'Mastered Python and modern JavaScript (ES6+) through daily algorithmic exercises',
      'Implemented foundational data structures (Linked Lists, Trees, Stacks, Queues)',
      'Built disciplined Git version control workflows and terminal proficiency',
    ],
    technologies: ['Python', 'JavaScript ES6+', 'Data Structures', 'Algorithms', 'Git/GitHub'],
    metrics: 'B.Tech AI/ML Enrolled',
  },
  {
    step: '02',
    period: '2024 — 2025',
    phase: 'Architecture & Modern Web',
    title: 'Mastering the React & Next.js Ecosystem',
    status: 'Completed',
    statusColor: 'text-violet-400 border-violet-500/30 bg-violet-950/40',
    summary:
      'Advanced from fundamental scripting to scalable front-end and full-stack software development. Built reactive web applications with state management and dynamic APIs.',
    highlights: [
      'Engineered interactive component systems using React 19, Next.js, and TypeScript',
      'Adopted Tailwind CSS for responsive fluid layouts and modern design tokens',
      'Integrated REST APIs, asynchronous data pipelines, and client error handling',
    ],
    technologies: ['React 19', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'REST APIs'],
    metrics: 'Production Web Mastery',
  },
  {
    step: '03',
    period: '2025 — 2026',
    phase: 'Entrepreneurship & Delivery',
    title: 'Founding SLRJ Digital',
    status: 'Active Venture',
    statusColor: 'text-sky-400 border-sky-500/30 bg-sky-950/40',
    summary:
      'Established SLRJ Digital as a technology venture delivering custom web solutions, digital strategies, and high-performance websites for businesses.',
    highlights: [
      'Launched SLRJ Digital web agency and client engagement infrastructure',
      'Architected websites achieving 99+ Lighthouse performance and SEO scores',
      'Managed end-to-end project lifecycles: requirements, UI prototyping, and Vercel CDN deployment',
    ],
    technologies: ['SLRJ Digital', 'Agency Operations', 'Client Solutions', 'Vercel Edge', 'Production Delivery'],
    metrics: 'Venture Founder',
  },
  {
    step: '04',
    period: '2026 & Beyond',
    phase: 'Innovation & Healthcare Tech',
    title: 'Smart Medicine & Autonomous Systems',
    status: 'Ongoing Evolution',
    statusColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/40',
    summary:
      'Expanding into mobile cross-platform systems and applied AI models. Prototyping Smart Medicine and exploring practical AI-driven healthcare assistance.',
    highlights: [
      'Developing Smart Medicine healthcare concept using React Native and Expo',
      'Training and integrating machine learning classification and prediction models',
      'Creating open-source learning repositories to empower fellow developer students',
    ],
    technologies: ['Healthcare Tech', 'React Native', 'Machine Learning', 'SLRJ Learn', 'Future Horizons'],
    metrics: 'Next-Gen Innovation',
  },
];
