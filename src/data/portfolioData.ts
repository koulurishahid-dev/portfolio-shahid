export interface NavLink {
  label: string;
  href: string;
}

export interface AboutCard {
  role: string;
  badge: string;
  title: string;
  description: string;
  highlights: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  website: string;
  description: string;
  activities: string[];
  technologies: string[];
}

export interface SkillItem {
  name: string;
  category: 'frontend' | 'backend' | 'programming' | 'database' | 'other';
  status: 'Working Knowledge' | 'Learning' | 'Exploring';
  iconType: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  badge?: string;
  isConcept?: boolean;
  description: string;
  fullDescription: string;
  website: string;
  githubUrl?: string;
  technologies: string[];
  imageUrl: string;
  keyFeatures: string[];
  businessImpact?: string;
}

export interface VisionArea {
  title: string;
  tagline: string;
  description: string;
  iconName: string;
}

export interface LearningItem {
  area: string;
  focus: string;
  status: 'Active Study' | 'Hands-on Building' | 'Exploring Fundamentals';
  details: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Vision', href: '#vision' },
  { label: 'Contact', href: '#contact' },
];

export const PERSONAL_INFO = {
  name: 'Shahid Kouluri',
  role: 'Founder of SLRJ Digital',
  headline: 'Founder of SLRJ Digital | AI & ML Student | Aspiring Technology Entrepreneur | Web Developer',
  email: 'koulurishahid148@gmail.com',
  location: 'Andhra Pradesh, India',
  education: 'B.Tech — Artificial Intelligence and Machine Learning',
  availability: 'Open to collaborations and meaningful opportunities.',
  avatarUrl: '/shahid-portrait.jpg',
  social: {
    github: 'https://github.com/koulurishahid-dev',
    linkedin: 'https://www.linkedin.com/in/kouluri-shahid-2083a9393/',
    instagram: 'https://www.instagram.com/itz_shahiddd.k/',
    slrjDigital: 'https://www.slrjdigital.in/',
    slrjFounder: 'https://www.slrjdigital.in/founder',
  },
  hero: {
    badge: 'TECH ENTHUSIAST | FOUNDER | BUILDER',
    headingPrefix: 'Building',
    headingTech: 'Technology.',
    headingMid: 'Creating',
    headingPossibilities: 'Possibilities.',
    supportingText:
      "I'm Shahid Kouluri — Founder of SLRJ Digital, an AI/ML student and technology enthusiast passionate about building digital products and meaningful solutions.",
  },
  about: {
    heading: 'Beyond the Code.',
    intro1:
      'I am currently pursuing a Bachelor of Technology in Artificial Intelligence and Machine Learning. My interests extend beyond academics into entrepreneurship, software development, business strategy, and emerging technologies.',
    intro2:
      'I started SLRJ Digital to gain practical experience, work with real clients, collaborate with a team, and understand how technology businesses operate.',
    intro3:
      'I prefer practical learning over simply collecting theoretical knowledge. Every project gives me an opportunity to improve my technical skills, understand users, and develop better solutions.',
  },
  philosophy: {
    tagline: 'Learn. Build. Grow.',
    learn: 'Stay curious and continuously improve.',
    build: 'Turn knowledge into practical solutions.',
    grow: 'Improve through experience, consistency, and collaboration.',
    conclusion:
      'I believe that great companies are built through consistency, experimentation, teamwork, and solving real problems.',
  },
  vision: {
    heading: 'Think Long-Term. Build Consistently.',
    statement:
      'My ambition is to build technology-driven businesses that solve meaningful problems. My long-term vision is to develop useful technology products and eventually build a company that creates a meaningful impact.',
  },
};

export const ABOUT_CARDS: AboutCard[] = [
  {
    role: 'Student',
    badge: 'Academic Foundation',
    title: 'B.Tech in Artificial Intelligence & Machine Learning',
    description:
      'Building strong theoretical foundations in machine learning, mathematics, algorithm design, and computational systems.',
    highlights: ['AI & ML Specialization', 'Algorithms & Problem Solving', 'Applied Computer Science'],
  },
  {
    role: 'Entrepreneur',
    badge: 'Venture Leadership',
    title: 'Founder of SLRJ Digital',
    description:
      'Leading a digital solutions initiative providing website development and technology services to help businesses grow online.',
    highlights: ['Venture Inception', 'Client Engagements', 'End-to-End Delivery'],
  },
  {
    role: 'Developer',
    badge: 'Hands-on Building',
    title: 'Full-Stack Web & Software Engineering',
    description:
      'Translating user requirements into responsive, modern web platforms using React, Node.js, and clean software architecture.',
    highlights: ['Modern Web Interfaces', 'API Integrations', 'Clean Architecture'],
  },
  {
    role: 'Visionary',
    badge: 'Future Horizons',
    title: 'Exploring AI, Automation & Tech Products',
    description:
      'Investigating how intelligent systems and modern software can streamline complex everyday workflows and healthcare services.',
    highlights: ['Intelligent Automation', 'Healthcare Solutions', 'Scalable SaaS Models'],
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    company: 'SLRJ Digital',
    role: 'Founder',
    period: '2026 – Present',
    location: 'Andhra Pradesh, India',
    website: 'https://www.slrjdigital.in/founder',
    description:
      'Founded SLRJ Digital, a technology and digital solutions initiative focused on helping businesses establish and improve their digital presence.',
    activities: [
      'Building and managing digital projects from initial discovery to final deployment.',
      'Working on bespoke website development solutions for client businesses.',
      'Coordinating a small collaborative team of builders and designers.',
      'Exploring business development, client acquisition, and project scoping.',
      'Planning future digital products and scalable software solutions.',
      'Continuously improving user experience, website performance, and client workflows.',
    ],
    technologies: ['React.js', 'Next.js', 'Node.js', 'Tailwind CSS', 'Vercel', 'Client Management'],
  },
  {
    company: 'B.Tech in AI & ML',
    role: 'Undergraduate Scholar & Builder',
    period: '2024 – Present',
    location: 'Andhra Pradesh, India',
    website: 'https://github.com/koulurishahid-dev',
    description:
      'Undergoing rigorous engineering education specializing in Artificial Intelligence, Machine Learning algorithms, discrete mathematics, and software design.',
    activities: [
      'Studying core algorithms, data structures, and computational complexity.',
      'Experimenting with deep learning architectures, Python data science libraries, and automation.',
      'Participating in hackathons, engineering seminars, and technical workshops.',
      'Applying academic theory directly into real-world code through open-source projects.',
    ],
    technologies: ['Python', 'Data Structures & Algorithms', 'C / C++', 'Machine Learning', 'Linear Algebra', 'Git'],
  },
];

export const SKILLS_CATEGORIES = [
  {
    title: 'Frontend Development',
    description: 'Creating accessible, responsive, and intuitive web interfaces.',
    skills: [
      { name: 'HTML5', category: 'frontend', status: 'Working Knowledge', iconType: 'html' },
      { name: 'CSS3', category: 'frontend', status: 'Working Knowledge', iconType: 'css' },
      { name: 'JavaScript (ES6+)', category: 'frontend', status: 'Working Knowledge', iconType: 'js' },
      { name: 'React.js', category: 'frontend', status: 'Working Knowledge', iconType: 'react' },
    ],
  },
  {
    title: 'Backend Development',
    description: 'Structuring servers, APIs, and business logic pipelines.',
    skills: [
      { name: 'Node.js', category: 'backend', status: 'Working Knowledge', iconType: 'node' },
      { name: 'Express.js', category: 'backend', status: 'Working Knowledge', iconType: 'express' },
    ],
  },
  {
    title: 'Programming & Logic',
    description: 'Algorithmic thinking, problem-solving, and computer science fundamentals.',
    skills: [
      { name: 'Python', category: 'programming', status: 'Working Knowledge', iconType: 'python' },
    ],
  },
  {
    title: 'Database Management',
    description: 'Data persistence, schema design, and query structures.',
    skills: [
      { name: 'MySQL', category: 'database', status: 'Learning', iconType: 'mysql' },
      { name: 'MongoDB', category: 'database', status: 'Learning', iconType: 'mongodb' },
    ],
  },
  {
    title: 'Other Interests & Capabilities',
    description: 'Emerging technology areas, workflows, and developer tooling.',
    skills: [
      { name: 'Artificial Intelligence', category: 'other', status: 'Learning', iconType: 'ai' },
      { name: 'Machine Learning', category: 'other', status: 'Learning', iconType: 'ml' },
      { name: 'Automation', category: 'other', status: 'Exploring', iconType: 'automation' },
      { name: 'API Development', category: 'other', status: 'Working Knowledge', iconType: 'api' },
      { name: 'Responsive Web Design', category: 'other', status: 'Working Knowledge', iconType: 'responsive' },
      { name: 'Git & GitHub', category: 'other', status: 'Working Knowledge', iconType: 'git' },
    ],
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'slrj-digital',
    title: 'SLRJ Digital',
    category: 'Technology & Digital Solutions',
    badge: 'Entrepreneurial Venture',
    description:
      'My entrepreneurial initiative focused on creating digital solutions, building websites, and helping businesses grow online.',
    fullDescription:
      'SLRJ Digital is my flagship technology and web solutions initiative. Conceived to bridge the digital gap for modern businesses, it provides responsive website development, brand architecture, and performance-tuned digital solutions. It serves as my primary vehicle for client engagements and hands-on venture management.',
    website: 'https://www.slrjdigital.in/',
    technologies: ['React.js', 'Next.js', 'Tailwind CSS', 'Vercel Edge', 'Responsive Design'],
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
    keyFeatures: [
      'Bespoke digital presence and modern corporate web architecture',
      'High-performance responsive layouts optimized for mobile and desktop',
      'Client inquiry management and structured digital consultation flow',
    ],
    businessImpact: 'Serving as the official operating portal for all SLRJ Digital client services and digital initiatives.',
  },
  {
    id: 'sonora',
    title: 'Sonora — NAA PAATALU',
    category: 'Full-Stack PWA Music Platform',
    badge: 'Live Web App · GitHub',
    description:
      'A private Telugu music sanctuary and vinyl listening room built as an installable PWA with offline IndexedDB playback, turntable stage visuals, audio visualization, and cloud sync.',
    fullDescription:
      'Engineered with Next.js 16, React 19, TypeScript, Dexie (IndexedDB), and MongoDB/Mongoose, Sonora delivers an atmospheric midnight listening experience featuring interactive turntable studio stages, live audio visualizers, synchronized lyrics panels, offline library caching, sleep timers, listening analytics, and ZIP track imports.',
    website: 'https://sonora-pied.vercel.app',
    githubUrl: 'https://github.com/koulurishahid-dev/sonora',
    technologies: ['Next.js 16', 'React 19', 'TypeScript', 'MongoDB', 'Dexie IndexedDB', 'Framer Motion'],
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&auto=format&fit=crop&q=80',
    keyFeatures: [
      'Interactive vinyl turntable stage, real-time audio visualizer, and synced lyrics viewer',
      'Installable PWA with offline song storage via Dexie/IndexedDB and Service Worker',
      'Custom playlists, favorites, listening analytics dashboard, and MongoDB sync APIs',
    ],
    businessImpact: 'Deployed live on Vercel with open-source TypeScript architecture on GitHub.',
  },
  {
    id: 'nisha-fashions',
    title: 'Nisha Fashions Backend',
    category: 'E-Commerce REST API & Payments',
    badge: 'Backend Architecture · GitHub',
    description:
      'A modular Node.js and Express 5 e-commerce backend featuring JWT authentication, product & order pipelines, database seeders, and Stripe checkout payment intents.',
    fullDescription:
      'Built for an online fashion storefront using Express 5, Mongoose, bcryptjs, JWT cookie sessions, and Stripe SDK integration. Implements dedicated route controllers and schemas for Users, Products, Orders, and Customer Contacts alongside an automated database seeding workflow.',
    website: 'https://github.com/koulurishahid-dev/Nisha-fashions',
    githubUrl: 'https://github.com/koulurishahid-dev/Nisha-fashions',
    technologies: ['Node.js', 'Express.js 5', 'MongoDB', 'Stripe API', 'JWT Auth', 'bcryptjs'],
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80',
    keyFeatures: [
      'RESTful API architecture separating User, Product, Order, and Contact routes & controllers',
      'Stripe PaymentIntent endpoint calculating cart totals with INR currency processing',
      'Secure authentication using bcryptjs hashing, JSON Web Tokens, and HTTP-only cookies',
    ],
    businessImpact: 'Provides complete server infrastructure for secure storefront inventory, user sessions, and online payments.',
  },
  {
    id: 'balaji-wall-decor',
    title: 'Balaji Wall Decor',
    category: 'Client Website Development',
    badge: 'Client Project',
    description:
      'A website project for a photo-frame business, focused on presenting products, improving customer experience, and supporting online enquiries and orders.',
    fullDescription:
      'A client web platform developed for Balaji Wall Decor, an established photo-frame and decor business. The project was engineered to showcase their extensive portfolio of custom photo frames, streamline customer exploration, improve product visual appeal, and provide a direct online channel for customer inquiries and orders.',
    website: 'https://balajiwalldecor.com/',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI', 'Catalog Architecture'],
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1200&auto=format&fit=crop&q=80',
    keyFeatures: [
      'Comprehensive product catalog tailored for photo-frames and customized wall decor',
      'Optimized image galleries allowing customers to inspect framing details',
      'Direct order and inquiry routing supporting rapid business responses',
    ],
    businessImpact: 'Helped the business transition from purely local in-person sales to an active digital catalog with direct online inquiries.',
  },
  {
    id: 'slrj-dashboard',
    title: 'SLRJ Client Dashboard',
    category: 'Business Management Platform',
    badge: 'Internal Management Platform',
    description:
      'A dashboard initiative designed to organize client-related workflows, project information, invoices, pricing documents, and deliverables.',
    fullDescription:
      'An internal management platform initiative engineered to streamline operational overhead at SLRJ Digital. Designed to centralize client project status, service deliverables, billing invoices, pricing breakdowns, and communication logs within a single intuitive, secure dashboard.',
    website: 'https://dashboard.slrjdigital.in/',
    technologies: ['React.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'REST APIs'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
    keyFeatures: [
      'Centralized client directory with project milestones and delivery timelines',
      'Invoice tracking, pricing structure records, and quote generation tools',
      'Structured file repositories for project deliverables and assets',
    ],
    businessImpact: 'Streamlines internal coordination, prevents project delays, and provides clients with clear progress transparency.',
  },
  {
    id: 'smart-medicine',
    title: 'Smart Medicine',
    category: 'Future Technology Product',
    badge: 'Concept & Development Initiative',
    isConcept: true,
    description:
      'An early-stage technology concept focused on making healthcare-related services more accessible through reminders, appointments, medicine discovery, and other useful digital features.',
    fullDescription:
      'Smart Medicine is an early-stage healthcare technology concept designed to address patient adherence and everyday medical logistical friction. The envisioned platform explores automated dosage notifications, caregiver updates, local pharmacy inventory discovery, and direct appointment booking within a unified digital companion.',
    website: 'https://github.com/koulurishahid-dev',
    technologies: ['React Native / React', 'Node.js', 'Database Architecture', 'Mobile UI Design', 'Health Tech'],
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80',
    keyFeatures: [
      'Automated dose scheduling engine designed to reduce missed medications',
      'Nearby pharmacy medicine inventory search and availability query concepts',
      'Caregiver notification fallback and scheduled appointment tracking',
    ],
    businessImpact: 'Research and prototyping initiative addressing healthcare accessibility and medication adherence.',
  },
];

export const VISION_AREAS: VisionArea[] = [
  {
    title: 'Artificial Intelligence & Machine Learning',
    tagline: 'Practical Intelligence for Real Problems',
    description:
      'Harnessing applied machine learning and data models to create software that automates mundane operations and delivers actionable insights.',
    iconName: 'Cpu',
  },
  {
    title: 'Automation & Intelligent Systems',
    tagline: 'Eliminating Operational Friction',
    description:
      'Developing automated pipelines and integrated business workflows that help enterprises operate with greater speed, consistency, and precision.',
    iconName: 'Zap',
  },
  {
    title: 'Healthcare Technology',
    tagline: 'Accessible Patient Solutions',
    description:
      'Exploring digital companions, medication adherence systems, and simplified appointment coordination to improve everyday patient care.',
    iconName: 'HeartPulse',
  },
  {
    title: 'SaaS Products & Software',
    tagline: 'Scalable Software Architecture',
    description:
      'Building subscription software solutions and specialized web tools designed to solve specific pain points for modern enterprises.',
    iconName: 'Layers',
  },
  {
    title: 'Scalable Software Solutions',
    tagline: 'Architected for Resilience',
    description:
      'Writing clean, maintainable codebases backed by modern frameworks, modular architectures, and secure data handling.',
    iconName: 'ShieldCheck',
  },
  {
    title: 'Entrepreneurship & Innovation',
    tagline: 'Value Creation Through Action',
    description:
      'Fostering a builder mindset that turns theoretical ideas into commercially viable ventures, creating real economic value and employment.',
    iconName: 'Rocket',
  },
];

export const LEARNING_JOURNEY: LearningItem[] = [
  {
    area: 'Full-Stack Web Development',
    focus: 'React.js, Next.js, and Modern Client-Side Engineering',
    status: 'Active Study',
    details: 'Mastering component lifecycles, state management, reactive patterns, and responsive UI optimization.',
  },
  {
    area: 'JavaScript & React Ecosystem',
    focus: 'ES6+, Asynchronous Programming & Component Architecture',
    status: 'Active Study',
    details: 'Strengthening core language fundamentals, Promises, async/await, and React Hooks patterns.',
  },
  {
    area: 'Backend Development & APIs',
    focus: 'Node.js, Express.js & RESTful Standards',
    status: 'Active Study',
    details: 'Designing clean server endpoints, authentication workflows, request sanitization, and database connectors.',
  },
  {
    area: 'Python & Problem-Solving',
    focus: 'Algorithmic Thinking & Clean Coding Habits',
    status: 'Active Study',
    details: 'Practicing algorithmic problem solving, scripting, and modular object-oriented programming in Python.',
  },
  {
    area: 'Data Structures & Algorithms',
    focus: 'Computational Foundations & Big-O Complexity',
    status: 'Active Study',
    details: 'Studying fundamental data structures, search algorithms, sorting methodologies, and efficiency trade-offs.',
  },
  {
    area: 'Artificial Intelligence & Machine Learning',
    focus: 'Core B.Tech Academic Curriculum & Predictive Models',
    status: 'Active Study',
    details: 'Engaging with supervised learning algorithms, neural network fundamentals, and data preprocessing techniques.',
  },
  {
    area: 'Business Development & Automation',
    focus: 'Venture Management, Client Acquisition & Workflows',
    status: 'Hands-on Building',
    details: 'Applying entrepreneurial learnings daily through SLRJ Digital operations, client engagements, and process automation.',
  },
];
