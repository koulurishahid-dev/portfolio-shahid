import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import {
  BookOpen,
} from 'lucide-react';
import { LEARNING_JOURNEY } from '../data/portfolioData';
import { TiltCard } from '../animations/TiltCard';
import { useMediaQuery } from '../hooks/useMediaQuery';

interface JourneyStepCardProps {
  item: (typeof LEARNING_JOURNEY)[number];
  idx: number;
  isDesktop: boolean;
  shouldReduceMotion: boolean | null;
}

const JourneyStepCard: React.FC<JourneyStepCardProps> = ({
  item,
  idx,
  isDesktop,
  shouldReduceMotion,
}) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const fromLeft = idx % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ['start 96%', 'start 66%'],
  });

  const shift = isDesktop ? 65 : 16;
  const x = useTransform(scrollYProgress, [0, 1], [fromLeft ? -shift : shift, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.45, 0.9, 1]);

  return (
    <motion.div
      ref={rowRef}
      style={{
        x: shouldReduceMotion ? 0 : x,
        scale: shouldReduceMotion ? 1 : scale,
        opacity: shouldReduceMotion ? 1 : opacity,
      }}
      className="will-change-transform"
    >
      <TiltCard
        maxRotation={isDesktop ? 3 : 0}
        scaleOnHover={isDesktop ? 1.01 : 1}
        className="rounded-2xl p-4 sm:p-6 bg-[#141418] border border-white/10 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-red-500/40 transition-colors"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#1C1C22] border border-white/10 flex items-center justify-center text-red-400 font-bold text-xs flex-shrink-0 mt-0.5 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
            0{idx + 1}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="text-base font-bold text-white">
                {item.area}
              </h3>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-red-950/60 text-red-300 border border-red-500/30">
                {item.status}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-red-400 mb-1">
              {item.focus}
            </p>
            <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed">
              {item.details}
            </p>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
};

export const LearningJourneySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 768px)', true);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], isDesktop ? [35, -35] : [16, -16]);
  const watermarkX = useTransform(scrollYProgress, [0, 1], [120, -120]);

  return (
    <section
      id="learning"
      ref={sectionRef}
      className="py-16 sm:py-24 lg:py-32 bg-[#09090B] border-t border-white/10 relative overflow-hidden text-white"
    >
      {/* Horizontal Scrubbing Watermark */}
      <motion.div
        style={{ x: shouldReduceMotion ? 0 : watermarkX }}
        className="absolute top-12 sm:top-14 left-0 whitespace-nowrap font-black text-[15vw] sm:text-[11vw] leading-none uppercase tracking-tighter text-transparent opacity-[0.03] pointer-events-none select-none will-change-transform"
      >
        <span style={{ WebkitTextStroke: '1.5px rgba(239,68,68,0.85)' }}>
          LEARNING · EVOLUTION · RESEARCH
        </span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          style={{ y: shouldReduceMotion ? 0 : headerY }}
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-20 will-change-transform"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/60 border border-red-500/30 text-red-400 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-4">
              <BookOpen className="w-3.5 h-3.5 text-red-400" />
              <span>Continuous Knowledge Expansion</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              Always Learning. Always Improving.
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-zinc-300 leading-relaxed max-w-2xl mx-auto">
              A transparent view into my current study paths, engineering curricula, and practical development goals.
            </p>
          </motion.div>
        </motion.div>

        {/* Interlocking Horizontal Scroll Staircase */}
        <div className="max-w-4xl mx-auto space-y-3.5 sm:space-y-4">
          {LEARNING_JOURNEY.map((item, idx) => (
            <JourneyStepCard
              key={item.area}
              item={item}
              idx={idx}
              isDesktop={isDesktop}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
