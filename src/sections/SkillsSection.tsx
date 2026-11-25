import React, { useState, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  MotionValue,
  useReducedMotion,
} from 'framer-motion';
import {
  Code2,
  Server,
  Binary,
  Database,
  Sparkles,
  Layers,
} from 'lucide-react';
import { SKILLS_CATEGORIES } from '../data/portfolioData';
import { TiltCard } from '../animations/TiltCard';
import { useMediaQuery } from '../hooks/useMediaQuery';

const renderCategoryIcon = (title: string) => {
  switch (title) {
    case 'Frontend Development':
      return <Code2 className="w-5 h-5" />;
    case 'Backend Development':
      return <Server className="w-5 h-5" />;
    case 'Programming & Logic':
      return <Binary className="w-5 h-5" />;
    case 'Database Management':
      return <Database className="w-5 h-5" />;
    case 'Other Interests & Capabilities':
      return <Sparkles className="w-5 h-5" />;
    default:
      return <Layers className="w-5 h-5" />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Working Knowledge':
      return (
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-950/60 text-red-300 border border-red-500/30">
          Working Knowledge
        </span>
      );
    case 'Learning':
      return (
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/10 text-zinc-200 border border-white/20">
          Active Learning
        </span>
      );
    case 'Exploring':
      return (
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
          Exploring
        </span>
      );
    default:
      return null;
  }
};

interface SkillCardItemProps {
  cat: (typeof SKILLS_CATEGORIES)[number];
  idx: number;
  scrollYProgress: MotionValue<number>;
  isDesktop: boolean;
  shouldReduceMotion: boolean | null;
}

const SkillCardItem: React.FC<SkillCardItemProps> = ({
  cat,
  idx,
  scrollYProgress,
  isDesktop,
  shouldReduceMotion,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: localProgress } = useScroll({
    target: cardRef,
    offset: ['start 95%', 'start 65%'],
  });

  const colIdx = idx % 3;

  const yRanges = [
    [60, 0, -45],
    [25, 0, 20],
    [90, 0, -65],
  ];
  const xRanges = [
    [-28, 0, -14],
    [0, 0, 0],
    [28, 0, 14],
  ];

  const desktopY = useTransform(scrollYProgress, [0.05, 0.5, 0.95], yRanges[colIdx]);
  const desktopX = useTransform(scrollYProgress, [0.05, 0.5, 0.95], xRanges[colIdx]);
  const desktopScale = useTransform(scrollYProgress, [0.05, 0.45, 0.95], [0.94, 1, 0.97]);

  const mobileY = useTransform(localProgress, [0, 1], [24, 0]);
  const mobileScale = useTransform(localProgress, [0, 1], [0.96, 1]);

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <motion.div
        style={
          shouldReduceMotion
            ? undefined
            : isDesktop
              ? { y: desktopY, x: desktopX, scale: desktopScale }
              : { y: mobileY, scale: mobileScale }
        }
        className="h-full will-change-transform"
      >
        <TiltCard
          maxRotation={isDesktop ? 6 : 0}
          scaleOnHover={isDesktop ? 1.015 : 1}
          className="rounded-3xl p-5 sm:p-7 bg-[#141418] border border-white/10 shadow-sm flex flex-col justify-between h-full group hover:border-red-500/40 transition-colors"
        >
          <div>
            {/* Category Title & Icon */}
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1C1C22] border border-white/10 shadow-sm flex items-center justify-center text-red-400 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300 flex-shrink-0">
                {renderCategoryIcon(cat.title)}
              </div>
              <div>
                <h3 className="text-base font-bold text-white leading-snug">
                  {cat.title}
                </h3>
                <p className="text-xs text-zinc-400 font-normal">
                  {cat.description}
                </p>
              </div>
            </div>

            {/* Skills List with Hover Depth */}
            <div className="mt-5 space-y-2.5">
              {cat.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#18181B] border border-white/10 text-xs text-zinc-200 shadow-sm hover:border-red-500/40 hover:translate-x-1 transition-all duration-200"
                >
                  <span className="font-semibold text-white">
                    {skill.name}
                  </span>
                  {getStatusBadge(skill.status)}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-5 border-t border-white/10 text-[11px] text-zinc-400 font-medium flex items-center justify-between">
            <span>{cat.skills.length} competencies</span>
            <span className="text-red-400 font-semibold">Verified</span>
          </div>
        </TiltCard>
      </motion.div>
    </motion.div>
  );
};

export const SkillsSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 1024px)', true);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const watermarkX = useTransform(scrollYProgress, [0, 1], [-120, 120]);
  const headerY = useTransform(scrollYProgress, [0, 1], isDesktop ? [35, -35] : [16, -16]);

  const filterTabs = [
    { id: 'all', label: 'All Technologies' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'programming', label: 'Programming' },
    { id: 'database', label: 'Database' },
    { id: 'other', label: 'Emerging & Tools' },
  ];

  const filteredCategories = SKILLS_CATEGORIES.filter((cat) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'frontend') return cat.title.includes('Frontend');
    if (selectedFilter === 'backend') return cat.title.includes('Backend');
    if (selectedFilter === 'programming') return cat.title.includes('Programming');
    if (selectedFilter === 'database') return cat.title.includes('Database');
    if (selectedFilter === 'other') return cat.title.includes('Other');
    return true;
  });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-16 sm:py-24 lg:py-32 bg-[#09090B] border-t border-white/10 relative overflow-hidden text-white"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-10 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-red-950/20 blur-[130px] pointer-events-none" />

      {/* Horizontal Scrolling Watermark */}
      <motion.div
        style={{ x: shouldReduceMotion ? 0 : watermarkX }}
        className="absolute top-12 sm:top-14 left-0 whitespace-nowrap font-black text-[15vw] sm:text-[11vw] leading-none uppercase tracking-tighter text-transparent opacity-[0.03] pointer-events-none select-none will-change-transform"
      >
        <span style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.9)' }}>
          TECHNOLOGY · STACK · CAPABILITIES
        </span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          style={{ y: shouldReduceMotion ? 0 : headerY }}
          className="max-w-3xl mx-auto text-center mb-10 sm:mb-16 will-change-transform"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-red-950/60 border border-red-500/30 text-red-400 text-[11px] sm:text-xs font-mono font-semibold tracking-wider uppercase mb-4 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>CHAPTER 05 · TECHNOLOGY</span>
              <span className="text-zinc-600 hidden sm:inline">|</span>
              <span className="text-zinc-300 font-sans hidden sm:inline">Tools &amp; Technical Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              My Technology Stack.
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-zinc-300 leading-relaxed max-w-2xl mx-auto">
              A transparent overview of the languages, frameworks, and emerging technology domains I actively build with and study.
            </p>
          </motion.div>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-7 sm:mt-8">
            {filterTabs.map((tab) => {
              const isActive = selectedFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedFilter(tab.id)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-red-600 text-white shadow-sm shadow-red-600/30'
                      : 'bg-[#18181B] text-zinc-400 hover:text-white hover:bg-[#27272A] border border-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Categorized Skills Grid with Wave Parallax */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((cat, idx) => (
              <SkillCardItem
                key={cat.title}
                cat={cat}
                idx={idx}
                scrollYProgress={scrollYProgress}
                isDesktop={isDesktop}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
