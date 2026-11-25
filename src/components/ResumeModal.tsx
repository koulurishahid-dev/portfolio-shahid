import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Printer,
  Mail,
  GraduationCap,
  Briefcase,
  Code2,
  Globe,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto print:p-0 print:m-0">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md print:hidden"
        />

        {/* Modal Sheet */}
        <motion.div
          data-lenis-prevent
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#121216] rounded-2xl sm:rounded-3xl shadow-2xl border border-white/15 p-4 sm:p-10 z-10 text-white print:bg-white print:text-black print:shadow-none print:border-none print:max-h-none print:overflow-visible print:p-4"
        >
          {/* Top Bar Actions (Hidden in Print) */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 sm:pb-6 border-b border-white/10 mb-5 sm:mb-6 print:hidden">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-red-400">
                Official Curriculum Vitae
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 font-medium text-xs transition-colors cursor-pointer shadow-sm shadow-red-600/30"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save as PDF</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Resume Content */}
          <div className="space-y-6">
            {/* Header */}
            <div className="border-b border-white/10 pb-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {PERSONAL_INFO.name}
              </h1>
              <p className="text-sm sm:text-base font-semibold text-red-400 mt-1">
                Founder of SLRJ Digital · B.Tech Artificial Intelligence &amp; Machine Learning
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-300 mt-3">
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-red-500" />
                  {PERSONAL_INFO.email}
                </span>
                <a
                  href={PERSONAL_INFO.social.slrjFounder}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-red-400 transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-red-500" />
                  slrjdigital.in/founder
                </a>
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>

            {/* Profile Summary */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">
                Professional Profile
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                Technology entrepreneur and B.Tech student specializing in Artificial Intelligence and Machine Learning. Founder of SLRJ Digital, leading web development initiatives and helping businesses establish their digital presence. Passionate about building practical software solutions, understanding user needs, and turning ideas into impactful technology ventures.
              </p>
            </div>

            {/* Entrepreneurial Experience */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Briefcase className="w-4 h-4 text-red-500" />
                <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Entrepreneurial Experience
                </h2>
              </div>
              <div className="p-4 rounded-xl bg-[#18181B] border border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <h3 className="text-sm font-bold text-white">
                    Founder — SLRJ Digital
                  </h3>
                  <span className="text-xs font-medium text-red-400">
                    2026 – Present · Andhra Pradesh, India
                  </span>
                </div>
                <p className="text-xs text-zinc-300 mb-3 leading-relaxed">
                  Founded SLRJ Digital, a technology and digital solutions initiative focused on helping businesses establish and improve their digital presence through modern web platforms.
                </p>
                <ul className="list-disc list-inside text-xs text-zinc-300 space-y-1">
                  <li>Building and managing digital client projects from scoping to deployment.</li>
                  <li>Delivering custom web solutions using modern React and Next.js ecosystems.</li>
                  <li>Coordinating a collaborative team of developers and creative builders.</li>
                  <li>Leading client discovery consultations, business development, and deliverables.</li>
                </ul>
              </div>
            </div>

            {/* Education */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="w-4 h-4 text-red-500" />
                <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Education
                </h2>
              </div>
              <div className="p-4 rounded-xl bg-[#18181B] border border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <h3 className="text-sm font-bold text-white">
                    Bachelor of Technology — Artificial Intelligence &amp; Machine Learning
                  </h3>
                  <span className="text-xs font-medium text-zinc-400">
                    Undergraduate Program
                  </span>
                </div>
                <p className="text-xs text-zinc-300">
                  Focusing on linear algebra, machine learning fundamentals, algorithm analysis, software engineering methodologies, and problem-solving.
                </p>
              </div>
            </div>

            {/* Key Technical Competencies */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Code2 className="w-4 h-4 text-red-500" />
                <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Technical Stack &amp; Skills
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-[#18181B] border border-white/10">
                  <span className="font-semibold text-white block mb-1">Frontend:</span>
                  <span className="text-zinc-300">HTML5, CSS3, JavaScript (ES6+), React.js, Responsive Web Design</span>
                </div>
                <div className="p-3 rounded-lg bg-[#18181B] border border-white/10">
                  <span className="font-semibold text-white block mb-1">Backend &amp; Languages:</span>
                  <span className="text-zinc-300">Node.js, Express.js, Python, REST API Design</span>
                </div>
                <div className="p-3 rounded-lg bg-[#18181B] border border-white/10">
                  <span className="font-semibold text-white block mb-1">Database Systems:</span>
                  <span className="text-zinc-300">MySQL, MongoDB, Schema Design Fundamentals</span>
                </div>
                <div className="p-3 rounded-lg bg-[#18181B] border border-white/10">
                  <span className="font-semibold text-white block mb-1">Tools &amp; Interests:</span>
                  <span className="text-zinc-300">Git, GitHub, AI/ML Concepts, Intelligent Automation, Vercel</span>
                </div>
              </div>
            </div>

            {/* Notable Projects */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">
                Notable Ventures &amp; Projects
              </h2>
              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-lg bg-[#18181B] border border-white/10">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-white">SLRJ Digital (slrjdigital.in)</span>
                    <span className="text-red-400 font-medium">Production Venture</span>
                  </div>
                  <p className="text-zinc-300">Official digital solutions and website development agency platform.</p>
                </div>
                <div className="p-3 rounded-lg bg-[#18181B] border border-white/10">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-white">Sonora — NAA PAATALU (sonora-pied.vercel.app)</span>
                    <span className="text-red-400 font-medium">Next.js 16 · Live PWA</span>
                  </div>
                  <p className="text-zinc-300">PWA music streaming &amp; vinyl listening sanctuary featuring turntable visuals, offline IndexedDB playback, synced lyrics, and MongoDB sync.</p>
                </div>
                <div className="p-3 rounded-lg bg-[#18181B] border border-white/10">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-white">Nisha Fashions Backend (github.com/koulurishahid-dev/Nisha-fashions)</span>
                    <span className="text-zinc-400 font-medium">Express 5 · REST API</span>
                  </div>
                  <p className="text-zinc-300">Modular e-commerce server architecture powered by Node.js, MongoDB, JWT authentication, and Stripe INR payment intents.</p>
                </div>
                <div className="p-3 rounded-lg bg-[#18181B] border border-white/10">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-white">Balaji Wall Decor (balajiwalldecor.com)</span>
                    <span className="text-zinc-400 font-medium">Client Website</span>
                  </div>
                  <p className="text-zinc-300">Product showcase and catalog platform for custom photo-frames and decor.</p>
                </div>
                <div className="p-3 rounded-lg bg-[#18181B] border border-white/10">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-white">SLRJ Client Dashboard (dashboard.slrjdigital.in)</span>
                    <span className="text-zinc-400 font-medium">Business Platform</span>
                  </div>
                  <p className="text-zinc-300">Internal management tool organizing client workflows, deliverables, and billing.</p>
                </div>
                <div className="p-3 rounded-lg bg-[#18181B] border border-white/10">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-white">Smart Medicine (Healthcare Concept)</span>
                    <span className="text-red-400 font-medium">Concept Staging</span>
                  </div>
                  <p className="text-zinc-300">Early-stage patient adherence companion with smart reminders and pharmacy locator.</p>
                </div>
              </div>
            </div>

            {/* Philosophy Footer in Print */}
            <div className="pt-4 border-t border-white/10 text-center text-xs text-zinc-400">
              <span className="font-bold text-white">Learn. Build. Grow.</span> — Great companies are built through consistency, experimentation, teamwork, and solving real problems.
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
