import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  Layers,
} from 'lucide-react';

interface FloatingSkill {
  name: string;
  category: string;
  level: string;
  angle: number; // degrees on orbit
  radius: number; // orbital radius in px
  color: string;
  glowColor: string;
  description: string;
}

const FLOATING_SKILLS: FloatingSkill[] = [
  {
    name: 'React 19',
    category: 'Frontend Core',
    level: 'Advanced',
    angle: 0,
    radius: 175,
    color: '#00F0FF',
    glowColor: 'rgba(0, 240, 255, 0.4)',
    description: 'Component architecture, React 19 hooks, and reactive state optimization.',
  },
  {
    name: 'Next.js 14/15',
    category: 'Full Stack Framework',
    level: 'Primary',
    angle: 42,
    radius: 235,
    color: '#FFFFFF',
    glowColor: 'rgba(255, 255, 255, 0.3)',
    description: 'App Router, Server-Side Rendering (SSR), edge deployment, and SEO routing.',
  },
  {
    name: 'TypeScript',
    category: 'Language',
    level: 'Core',
    angle: 88,
    radius: 165,
    color: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.4)',
    description: 'Strict typing, generic interfaces, and enterprise code maintainability.',
  },
  {
    name: 'Node.js & Express',
    category: 'Backend',
    level: 'Practitioner',
    angle: 135,
    radius: 245,
    color: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    description: 'RESTful API routing, asynchronous event handling, and JWT authentication.',
  },
  {
    name: 'Python',
    category: 'AI & Data',
    level: 'Academic Core',
    angle: 180,
    radius: 180,
    color: '#FBBF24',
    glowColor: 'rgba(251, 191, 36, 0.4)',
    description: 'Algorithmic problem solving, data structures, and neural network foundations.',
  },
  {
    name: 'Tailwind CSS',
    category: 'UI Styling',
    level: 'Expert',
    angle: 220,
    radius: 230,
    color: '#06B6D4',
    glowColor: 'rgba(6, 182, 212, 0.4)',
    description: 'Zero-runtime utility styling, responsive breakpoints, and dark mode ergonomics.',
  },
  {
    name: 'PostgreSQL',
    category: 'Database',
    level: 'Relational',
    angle: 265,
    radius: 170,
    color: '#818CF8',
    glowColor: 'rgba(129, 140, 248, 0.4)',
    description: 'Relational schema modeling, foreign keys, and performant structured queries.',
  },
  {
    name: 'Framer Motion',
    category: 'Animation',
    level: 'Advanced',
    angle: 315,
    radius: 240,
    color: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    description: 'Physics-based spring motion, layout animations, and gesture interactions.',
  },
];

interface CentralCoreProps {
  onExploreCapabilities?: () => void;
  onExploreProjects?: () => void;
}

export const CentralCore: React.FC<CentralCoreProps> = ({
  onExploreCapabilities,
  onExploreProjects,
}) => {
  const [activeSkill, setActiveSkill] = useState<FloatingSkill | null>(null);

  return (
    <div className="relative w-full py-12 md:py-20 flex flex-col items-center justify-center select-none overflow-visible">
      {/* Central Cosmic Matrix Container */}
      <div className="relative w-full max-w-4xl min-h-[580px] sm:min-h-[640px] md:min-h-[700px] flex items-center justify-center">
        {/* Orbital Guide Rings with Electric Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Outer Ring */}
          <div
            className="w-[480px] h-[480px] sm:w-[580px] sm:h-[580px] md:w-[680px] md:h-[680px] rounded-full border border-sky-500/15 border-dashed animate-spin"
            style={{ animationDuration: '90s' }}
          />
          {/* Middle Ring */}
          <div
            className="w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] md:w-[520px] md:h-[520px] rounded-full border border-violet-500/20 border-dotted animate-spin"
            style={{ animationDuration: '60s', animationDirection: 'reverse' }}
          />
          {/* Inner Ring */}
          <div className="w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px] rounded-full border border-cyan-400/25 shadow-[0_0_25px_rgba(0,240,255,0.1)]" />

          {/* Ambient center radial glow */}
          <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-cyan-500/20 via-violet-600/20 to-blue-600/10 blur-3xl animate-pulse" />
        </div>

        {/* Central Core Identity Sphere / Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-20 w-[90%] max-w-[440px] sm:max-w-[480px] rounded-[32px] sm:rounded-[38px] p-7 sm:p-9 md:p-10 backdrop-blur-2xl bg-[#0B0D14]/85 border-2 border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(0,240,255,0.12)] text-center flex flex-col items-center"
        >
          {/* Top Status Telemetry */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-cyan-500/30 text-[11px] font-mono tracking-widest text-cyan-300 uppercase mb-5 sm:mb-6 shadow-[0_0_12px_rgba(6,182,212,0.2)]">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
            <span className="font-semibold">CORE NEXUS ACTIVE · FULL STACK</span>
          </div>

          {/* Glowing Monogram / Avatar Emblem */}
          <div className="relative mb-5 group cursor-pointer">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-cyan-400 via-violet-600 to-blue-600 p-[2px] shadow-[0_0_30px_rgba(0,240,255,0.35)] transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full rounded-2xl bg-[#08090D] flex flex-col items-center justify-center">
                <span className="font-kanit font-black text-2xl sm:text-3xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-violet-300">
                  SK
                </span>
                <span className="text-[9px] font-mono tracking-wider text-cyan-400/80 -mt-0.5">
                  SLRJ
                </span>
              </div>
            </div>
            {/* Pulsing halo */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-600 blur-md opacity-40 group-hover:opacity-80 transition duration-500 -z-10" />
          </div>

          {/* Name & Title */}
          <h3 className="font-kanit font-black text-2xl sm:text-3xl md:text-4xl uppercase text-white tracking-tight leading-tight mb-2">
            SHAHID KOULURI
          </h3>
          <p className="font-mono text-xs sm:text-sm text-cyan-300 uppercase tracking-widest font-semibold mb-4">
            Full Stack Developer &amp; AI/ML Engineer
          </p>

          {/* Short Narrative Introduction */}
          <p className="font-kanit font-light text-xs sm:text-sm leading-relaxed text-[#D7E2EA]/80 max-w-sm mb-6">
            Translating complex ideas into responsive web architectures, intelligent health applications, and venture-grade digital products.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 w-full">
            <button
              type="button"
              onClick={onExploreCapabilities}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-kanit font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Explore Capabilities</span>
            </button>

            <button
              type="button"
              onClick={onExploreProjects}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/20 text-[#D7E2EA] hover:text-white font-kanit font-semibold text-xs sm:text-sm uppercase tracking-wider hover:border-cyan-400/50 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>Discover Projects</span>
            </button>
          </div>
        </motion.div>

        {/* Floating Interactive Skill Satellites (Desktop & Tablet) */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none z-30">
          {FLOATING_SKILLS.map((skill, index) => {
            const rad = (skill.angle * Math.PI) / 180;
            const x = Math.cos(rad) * skill.radius;
            const y = Math.sin(rad) * skill.radius;

            const isHovered = activeSkill?.name === skill.name;

            return (
              <div
                key={skill.name}
                className="absolute top-1/2 left-1/2 pointer-events-auto"
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  whileHover={{ scale: 1.15 }}
                  onMouseEnter={() => setActiveSkill(skill)}
                  onMouseLeave={() => setActiveSkill(null)}
                  onClick={() => setActiveSkill(isHovered ? null : skill)}
                  className="group relative cursor-pointer"
                >
                  {/* Skill Badge Pill */}
                  <div
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-xl bg-[#090B10]/90 border text-xs font-mono font-medium tracking-wide transition-all duration-300 shadow-lg"
                    style={{
                      borderColor: isHovered ? skill.color : 'rgba(255, 255, 255, 0.15)',
                      color: isHovered ? '#FFFFFF' : '#D7E2EA',
                      boxShadow: isHovered ? `0 0 20px ${skill.glowColor}` : '0 4px 15px rgba(0,0,0,0.5)',
                    }}
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse"
                      style={{ backgroundColor: skill.color }}
                    />
                    <span>{skill.name}</span>
                  </div>

                  {/* Hover Detail Card */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 p-3.5 rounded-2xl bg-[#0D101A]/95 border border-cyan-500/40 backdrop-blur-2xl shadow-[0_15px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(0,240,255,0.2)] z-50 text-left pointer-events-none"
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider mb-1">
                          <span style={{ color: skill.color }}>{skill.category}</span>
                          <span className="text-white/60">{skill.level}</span>
                        </div>
                        <p className="text-xs text-[#D7E2EA] font-kanit font-light leading-snug">
                          {skill.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile & Small Screen Floating Skills Grid Bar */}
      <div className="lg:hidden w-full max-w-xl mx-auto mt-6 px-4">
        <div className="text-center mb-3">
          <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400/80">
            Tap a Core Competency
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {FLOATING_SKILLS.map((skill) => {
            const isSelected = activeSkill?.name === skill.name;
            return (
              <button
                key={skill.name}
                type="button"
                onClick={() => setActiveSkill(isSelected ? null : skill)}
                className="px-3 py-1.5 rounded-full text-xs font-mono border transition-all duration-200 cursor-pointer flex items-center gap-1.5"
                style={{
                  backgroundColor: isSelected ? 'rgba(0, 240, 255, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                  borderColor: isSelected ? skill.color : 'rgba(255, 255, 255, 0.12)',
                  color: isSelected ? '#FFFFFF' : '#D7E2EA',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: skill.color }} />
                <span>{skill.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Skill Info Panel on Mobile */}
        <AnimatePresence>
          {activeSkill && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 rounded-2xl bg-[#0D101A] border border-cyan-500/30 text-left"
            >
              <div className="flex items-center justify-between text-xs font-mono uppercase text-cyan-300 mb-1">
                <span>{activeSkill.category}</span>
                <span className="text-white/60">{activeSkill.level}</span>
              </div>
              <h4 className="text-white font-bold text-sm mb-1">{activeSkill.name}</h4>
              <p className="text-xs text-[#D7E2EA]/80 font-light">{activeSkill.description}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
