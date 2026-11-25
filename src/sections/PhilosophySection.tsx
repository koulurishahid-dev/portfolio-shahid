import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  useReducedMotion,
} from 'framer-motion';
import {
  Sparkles,
  BookOpen,
  Hammer,
  TrendingUp,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { TiltCard } from '../animations/TiltCard';
import { useMediaQuery } from '../hooks/useMediaQuery';

const PILLARS = [
  {
    word: 'Learn',
    tagline: 'Stay curious and continuously improve.',
    description:
      'Engage deeply with core computer science principles, emerging technology paradigms, and real user feedback. Never stop asking questions.',
    icon: BookOpen,
  },
  {
    word: 'Build',
    tagline: 'Turn knowledge into practical solutions.',
    description:
      'Theory is only valuable when tested against reality. Write code, ship digital projects, test in production, and solve tangible pain points.',
    icon: Hammer,
  },
  {
    word: 'Grow',
    tagline: 'Improve through experience, consistency, and collaboration.',
    description:
      'Compounding consistency produces excellence. Expand operational ability, lead with humility, and build meaningful partnerships.',
    icon: TrendingUp,
  },
];

interface PillarCardItemProps {
  pillar: (typeof PILLARS)[number];
  idx: number;
  scrollYProgress: MotionValue<number>;
  isMultiCol: boolean;
  shouldReduceMotion: boolean | null;
}

const PillarCardItem: React.FC<PillarCardItemProps> = ({
  pillar,
  idx,
  scrollYProgress,
  isMultiCol,
  shouldReduceMotion,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = pillar.icon;

  const { scrollYProgress: localProgress } = useScroll({
    target: cardRef,
    offset: ['start 95%', 'start 65%'],
  });

  const yRanges = [
    [65, 0, -40],
    [25, 0, 20],
    [90, 0, -60],
  ];
  const xRanges = [
    [-36, 0, -18],
    [0, 0, 0],
    [36, 0, 18],
  ];
  const rotateRanges = [
    [-3.5, 0, 1.8],
    [0, 0, 0],
    [3.5, 0, -1.8],
  ];

  const y = useTransform(scrollYProgress, [0.1, 0.5, 0.92], yRanges[idx]);
  const x = useTransform(scrollYProgress, [0.1, 0.5, 0.92], xRanges[idx]);
  const rotate = useTransform(scrollYProgress, [0.1, 0.5, 0.92], rotateRanges[idx]);
  const scale = useTransform(scrollYProgress, [0.1, 0.5, 0.92], [0.92, 1, 0.96]);

  const mobileY = useTransform(localProgress, [0, 1], [24, 0]);
  const mobileScale = useTransform(localProgress, [0, 1], [0.96, 1]);

  return (
    <motion.div
      ref={cardRef}
      style={
        shouldReduceMotion
          ? undefined
          : isMultiCol
            ? { y, x, rotate, scale }
            : { y: mobileY, scale: mobileScale }
      }
      className="h-full will-change-transform"
    >
      <TiltCard
        maxRotation={isMultiCol ? 8 : 0}
        scaleOnHover={isMultiCol ? 1.02 : 1}
        className="rounded-3xl p-6 sm:p-8 bg-[#141418] border border-white/10 shadow-sm flex flex-col justify-between h-full group hover:border-red-500/40 transition-colors"
      >
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#1C1C22] border border-white/10 shadow-sm flex items-center justify-center text-red-400 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
              <Icon className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black text-zinc-600 font-mono">
              0{idx + 1}
            </span>
          </div>

          <h3 className="text-2xl font-extrabold text-white tracking-tight mb-2">
            {pillar.word}
          </h3>

          <div className="text-xs font-semibold text-red-400 mb-3 leading-snug">
            {pillar.tagline}
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
            {pillar.description}
          </p>
        </div>
      </TiltCard>
    </motion.div>
  );
};

export const PhilosophySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isMultiCol = useMediaQuery('(min-width: 768px)', true);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Heavy kinetic word split & converge while scrolling (bounded on narrow phones)
  const wordShift = isMultiCol ? 85 : 16;
  const wordTailShift = isMultiCol ? 45 : 8;

  const learnX = useTransform(scrollYProgress, [0.05, 0.45, 0.9], [-wordShift, 0, -wordTailShift]);
  const learnScale = useTransform(scrollYProgress, [0.05, 0.45, 0.9], [0.85, 1.04, 0.94]);
  const learnOpacity = useTransform(scrollYProgress, [0.05, 0.35, 0.9], [0.35, 1, 0.5]);

  const buildY = useTransform(scrollYProgress, [0.05, 0.45, 0.9], [isMultiCol ? 45 : 20, 0, isMultiCol ? -30 : -14]);
  const buildScale = useTransform(scrollYProgress, [0.05, 0.45, 0.9], [0.86, 1.05, 0.95]);
  const buildOpacity = useTransform(scrollYProgress, [0.08, 0.4, 0.9], [0.35, 1, 0.5]);

  const growX = useTransform(scrollYProgress, [0.05, 0.45, 0.9], [wordShift, 0, wordTailShift]);
  const growScale = useTransform(scrollYProgress, [0.05, 0.45, 0.9], [0.85, 1.04, 0.94]);
  const growOpacity = useTransform(scrollYProgress, [0.1, 0.45, 0.9], [0.35, 1, 0.5]);

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-28 lg:py-36 bg-[#0B0B0E] border-t border-white/10 relative overflow-hidden text-white"
    >
      {/* Background Soft Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[300px] sm:h-[350px] bg-red-950/20 blur-[130px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Core Statement Banner */}
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-20 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/60 border border-red-500/30 text-red-400 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-5 sm:mb-6">
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              <span>Guiding Principles</span>
            </div>

            <h2 className="text-[2.25rem] sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none mb-5 sm:mb-6">
              <motion.span
                style={{
                  x: shouldReduceMotion ? 0 : learnX,
                  scale: shouldReduceMotion ? 1 : learnScale,
                  opacity: shouldReduceMotion ? 1 : learnOpacity,
                }}
                className="text-red-500 inline-block origin-center will-change-transform"
              >
                Learn.
              </motion.span>{' '}
              <motion.span
                style={{
                  y: shouldReduceMotion ? 0 : buildY,
                  scale: shouldReduceMotion ? 1 : buildScale,
                  opacity: shouldReduceMotion ? 1 : buildOpacity,
                }}
                className="text-white inline-block origin-center will-change-transform"
              >
                Build.
              </motion.span>{' '}
              <motion.span
                style={{
                  x: shouldReduceMotion ? 0 : growX,
                  scale: shouldReduceMotion ? 1 : growScale,
                  opacity: shouldReduceMotion ? 1 : growOpacity,
                }}
                className="text-red-500 inline-block origin-center will-change-transform"
              >
                Grow.
              </motion.span>
            </h2>

            <p className="text-sm sm:text-lg md:text-xl text-zinc-300 leading-relaxed font-normal max-w-2xl mx-auto">
              {PERSONAL_INFO.philosophy.conclusion}
            </p>
          </motion.div>
        </div>

        {/* 3 Pillars Grid with 3D Tilt & Scrubbed Column Fanning */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 max-w-5xl mx-auto">
          {PILLARS.map((pillar, idx) => (
            <PillarCardItem
              key={pillar.word}
              pillar={pillar}
              idx={idx}
              scrollYProgress={scrollYProgress}
              isMultiCol={isMultiCol}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
