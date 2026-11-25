import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  useReducedMotion,
} from 'framer-motion';
import {
  GraduationCap,
  Briefcase,
  Code2,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { ABOUT_CARDS, PERSONAL_INFO } from '../data/portfolioData';
import { TiltCard } from '../animations/TiltCard';
import { useMediaQuery } from '../hooks/useMediaQuery';

const renderCardIcon = (role: string) => {
  switch (role) {
    case 'Student':
      return <GraduationCap className="w-5 h-5" />;
    case 'Entrepreneur':
      return <Briefcase className="w-5 h-5" />;
    case 'Developer':
      return <Code2 className="w-5 h-5" />;
    case 'Visionary':
      return <Sparkles className="w-5 h-5" />;
    default:
      return <CheckCircle2 className="w-5 h-5" />;
  }
};

interface AboutCardItemProps {
  card: (typeof ABOUT_CARDS)[number];
  idx: number;
  scrollYProgress: MotionValue<number>;
  isDesktop: boolean;
  shouldReduceMotion: boolean | null;
}

const AboutCardItem: React.FC<AboutCardItemProps> = ({
  card,
  idx,
  scrollYProgress,
  isDesktop,
  shouldReduceMotion,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: localProgress } = useScroll({
    target: cardRef,
    offset: ['start 95%', 'start 62%'],
  });

  // Per-column distinct parallax speeds & converging/fanning trajectories on desktop
  const yRanges = [
    [80, 0, -50],
    [35, 0, 25],
    [60, 0, -25],
    [100, 0, -65],
  ];
  const xRanges = [
    [-40, 0, -18],
    [-14, 0, -6],
    [14, 0, 6],
    [40, 0, 18],
  ];
  const rotateRanges = [
    [-3, 0, 1.5],
    [-1.2, 0, 0.8],
    [1.2, 0, -0.8],
    [3, 0, -1.5],
  ];

  const desktopY = useTransform(scrollYProgress, [0.08, 0.48, 0.92], yRanges[idx % 4]);
  const desktopX = useTransform(scrollYProgress, [0.08, 0.48, 0.92], xRanges[idx % 4]);
  const desktopRotate = useTransform(scrollYProgress, [0.08, 0.48, 0.92], rotateRanges[idx % 4]);
  const desktopScale = useTransform(scrollYProgress, [0.05, 0.45, 0.95], [0.92, 1, 0.96]);

  // Clean uniform mobile card scroll rise without vertical collision
  const mobileY = useTransform(localProgress, [0, 1], [28, 0]);
  const mobileScale = useTransform(localProgress, [0, 1], [0.95, 1]);

  return (
    <motion.div
      ref={cardRef}
      style={
        shouldReduceMotion
          ? undefined
          : isDesktop
            ? { y: desktopY, x: desktopX, rotate: desktopRotate, scale: desktopScale }
            : { y: mobileY, scale: mobileScale }
      }
      className="h-full will-change-transform"
    >
      <TiltCard
        maxRotation={isDesktop ? 8 : 0}
        scaleOnHover={isDesktop ? 1.02 : 1}
        className="rounded-3xl p-5 sm:p-7 bg-[#141418] border border-white/10 shadow-sm flex flex-col justify-between h-full group hover:border-red-500/40 transition-colors duration-300"
      >
        <div>
          {/* Card Icon & Badge */}
          <div className="flex items-center justify-between mb-5">
            <div className="w-12 h-12 rounded-2xl bg-[#1C1C22] border border-white/10 shadow-sm flex items-center justify-center text-red-400 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
              {renderCardIcon(card.role)}
            </div>
            <span className="text-[11px] font-semibold text-red-300 bg-red-950/60 border border-red-500/30 px-2.5 py-0.5 rounded-full">
              {card.badge}
            </span>
          </div>

          {/* Title & Role */}
          <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
            {card.role}
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white mb-3 leading-snug">
            {card.title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6 font-normal">
            {card.description}
          </p>
        </div>

        {/* Highlights List */}
        <div className="pt-4 border-t border-white/10 space-y-2">
          {card.highlights.map((h, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-xs font-medium text-zinc-300"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
              <span>{h}</span>
            </div>
          ))}
        </div>
      </TiltCard>
    </motion.div>
  );
};

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 1024px)', true);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], isDesktop ? [40, -40] : [18, -18]);
  const watermarkX = useTransform(scrollYProgress, [0, 1], [-120, 140]);
  const orbY = useTransform(scrollYProgress, [0, 1], [-50, 70]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-16 sm:py-24 lg:py-32 bg-[#09090B] border-t border-white/10 relative overflow-hidden text-white"
    >
      {/* Background ambient accent moving on scroll */}
      <motion.div
        style={{ y: shouldReduceMotion ? 0 : orbY }}
        className="absolute top-1/3 -left-16 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-red-950/25 blur-[130px] pointer-events-none"
      />

      {/* Horizontal Scrolling Section Watermark */}
      <motion.div
        style={{ x: shouldReduceMotion ? 0 : watermarkX }}
        className="absolute top-12 sm:top-14 left-0 whitespace-nowrap font-black text-[15vw] sm:text-[11vw] leading-none uppercase tracking-tighter text-transparent opacity-[0.03] pointer-events-none select-none will-change-transform"
      >
        <span style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.9)' }}>
          MY STORY · IDENTITY · BUILDER
        </span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Scrubbed Parallax */}
        <motion.div
          style={{ y: shouldReduceMotion ? 0 : headerY }}
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-20 lg:mb-24 will-change-transform"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-red-950/60 border border-red-500/30 text-red-400 text-[11px] sm:text-xs font-mono font-semibold tracking-wider uppercase mb-4 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>CHAPTER 02 · MY STORY</span>
              <span className="text-zinc-600 hidden sm:inline">|</span>
              <span className="text-zinc-300 font-sans hidden sm:inline">Identity &amp; Approach</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5 sm:mb-6">
              Beyond the Code.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-4 text-sm sm:text-base md:text-lg text-zinc-300 leading-relaxed font-normal"
          >
            <p>{PERSONAL_INFO.about.intro1}</p>
            <p>{PERSONAL_INFO.about.intro2}</p>
            <p className="font-semibold text-white">
              {PERSONAL_INFO.about.intro3}
            </p>
          </motion.div>
        </motion.div>

        {/* 4 Informational Cards with Active Scroll-Scrubbed Stagger & Fanning */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {ABOUT_CARDS.map((card, idx) => (
            <AboutCardItem
              key={card.role}
              card={card}
              idx={idx}
              scrollYProgress={scrollYProgress}
              isDesktop={isDesktop}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
