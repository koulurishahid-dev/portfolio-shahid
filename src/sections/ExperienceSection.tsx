import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import {
  ExternalLink,
  Calendar,
  MapPin,
  CheckCircle2,
  Globe,
  Sparkles,
  GraduationCap,
} from 'lucide-react';
import { EXPERIENCE_DATA } from '../data/portfolioData';
import { TiltCard } from '../animations/TiltCard';
import { Magnetic } from '../animations/Magnetic';
import { useMediaQuery } from '../hooks/useMediaQuery';

interface ExperienceCardItemProps {
  exp: (typeof EXPERIENCE_DATA)[number];
  idx: number;
  isDesktop: boolean;
  shouldReduceMotion: boolean | null;
}

const ExperienceCardItem: React.FC<ExperienceCardItemProps> = ({
  exp,
  idx,
  isDesktop,
  shouldReduceMotion,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isFounder = idx === 0;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 96%', 'start 62%'],
  });

  const cardX = useTransform(scrollYProgress, [0, 1], [isDesktop ? 55 : 0, 0]);
  const cardScale = useTransform(scrollYProgress, [0, 1], [isDesktop ? 0.93 : 0.96, 1]);
  const cardRotate = useTransform(scrollYProgress, [0, 1], [isDesktop ? 2 : 0, 0]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.45, 0.92, 1]);

  return (
    <div ref={cardRef} className="relative">
      {/* Timeline Node Marker */}
      <div className="absolute -left-6 sm:-left-12 top-7 sm:top-8 -translate-x-[calc(50%-1px)] flex items-center justify-center">
        <span className="relative flex h-5 w-5 sm:h-6 sm:w-6">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-60" />
          <span className="relative inline-flex rounded-full h-5 w-5 sm:h-6 sm:w-6 bg-[#18181B] border-2 border-red-500 shadow-md items-center justify-center">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500" />
          </span>
        </span>
      </div>

      {/* Scrubbed Scroll-Driven Experience Card */}
      <motion.div
        style={{
          x: shouldReduceMotion ? 0 : cardX,
          scale: shouldReduceMotion ? 1 : cardScale,
          rotate: shouldReduceMotion ? 0 : cardRotate,
          opacity: shouldReduceMotion ? 1 : cardOpacity,
        }}
        className="will-change-transform origin-left"
      >
        <TiltCard
          maxRotation={isDesktop ? 3 : 0}
          scaleOnHover={isDesktop ? 1.01 : 1}
          className="rounded-3xl bg-[#141418] p-5 sm:p-10 border border-white/10 shadow-xl relative overflow-hidden group hover:border-red-500/40 transition-colors"
        >
          {/* Ambient Top Accent Bar */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-red-600 via-rose-500 to-red-600" />

          {/* Header: Role, Organization, Period, Location */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center text-white font-extrabold text-lg shadow-md flex-shrink-0">
                {isFounder ? (
                  'SLRJ'
                ) : (
                  <GraduationCap className="w-7 h-7 text-white" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                    {isFounder ? 'Primary Venture' : 'Academic Specialization'}
                  </span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-red-950/60 text-red-300 border border-red-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span>Active</span>
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  {exp.role} — {exp.company}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 mt-2 font-medium">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-red-500" />
                    {exp.period}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                    {exp.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <Magnetic strength={0.25}>
              <a
                href={exp.website}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="pointer"
                data-cursor-text="VISIT"
                className="self-start inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white border border-red-500/40 text-xs font-semibold transition-all duration-200 cursor-pointer shadow-sm shadow-red-600/30 group/btn"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{isFounder ? 'Visit Founder Page' : 'View GitHub'}</span>
                <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
              </a>
            </Magnetic>
          </div>

          {/* Core Description */}
          <div className="py-6">
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
              {exp.description}
            </p>
          </div>

          {/* Responsibilities and Activities */}
          <div className="space-y-3 pt-2 pb-6 border-b border-white/10">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-red-500" />
              <span>Core Activities &amp; Hands-on Responsibilities</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {exp.activities.map((act, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#1C1C22] border border-white/10 text-xs sm:text-sm text-zinc-300 font-normal leading-snug group/item hover:bg-[#23232B] hover:border-red-500/30 transition-all"
                >
                  <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>{act}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div className="pt-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider mr-1">
                Stack:
              </span>
              {exp.technologies.map((t) => (
                <span
                  key={t}
                  className="text-xs font-medium px-3 py-1 rounded-lg bg-[#1C1C22] text-zinc-300 border border-white/10"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="text-xs font-semibold text-red-400">
              Learn · Build · Grow
            </div>
          </div>
        </TiltCard>
      </motion.div>
    </div>
  );
};

export const ExperienceSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 768px)', true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 70%'],
  });

  const { scrollYProgress: sectionProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const watermarkX = useTransform(sectionProgress, [0, 1], [100, -140]);
  const headerY = useTransform(sectionProgress, [0, 1], isDesktop ? [35, -35] : [16, -16]);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="py-16 sm:py-24 lg:py-32 bg-[#0B0B0E] border-t border-white/10 relative overflow-hidden text-white"
    >
      {/* Horizontal Moving Watermark */}
      <motion.div
        style={{ x: shouldReduceMotion ? 0 : watermarkX }}
        className="absolute top-12 sm:top-16 left-0 whitespace-nowrap font-black text-[15vw] sm:text-[11vw] leading-none uppercase tracking-tighter text-transparent opacity-[0.03] pointer-events-none select-none will-change-transform"
      >
        <span style={{ WebkitTextStroke: '1.5px rgba(239,68,68,0.85)' }}>
          EXPERIENCE · SLRJ DIGITAL · VENTURE
        </span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          style={{ y: shouldReduceMotion ? 0 : headerY }}
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 lg:mb-20 will-change-transform"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-red-950/60 border border-red-500/30 text-red-400 text-[11px] sm:text-xs font-mono font-semibold tracking-wider uppercase mb-4 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>CHAPTER 03 · SLRJ DIGITAL</span>
              <span className="text-zinc-600 hidden sm:inline">|</span>
              <span className="text-zinc-300 font-sans hidden sm:inline">Primary Venture Leadership</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              Building Beyond the Classroom.
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-zinc-300 leading-relaxed max-w-2xl mx-auto font-normal">
              Translating engineering knowledge into practical client delivery, coordinating workflows, and leading technology initiatives.
            </p>
          </motion.div>
        </motion.div>

        {/* Timeline Layout with Progressive Line Drawing */}
        <div className="max-w-4xl mx-auto relative pl-6 sm:pl-12 space-y-10 sm:space-y-16">
          {/* Background Track Line */}
          <div className="absolute left-2 sm:left-4 top-4 bottom-8 w-[2px] bg-zinc-800" />

          {/* Progressive Animated Line Drawing with leading spark */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-2 sm:left-4 top-4 w-[2px] bg-gradient-to-b from-red-600 via-rose-500 to-red-600 shadow-[0_0_8px_#EF4444]"
          >
            <div className="absolute bottom-0 -left-[3px] w-2 h-2 rounded-full bg-red-400 shadow-[0_0_10px_#EF4444]" />
          </motion.div>

          {EXPERIENCE_DATA.map((exp, idx) => (
            <ExperienceCardItem
              key={exp.company}
              exp={exp}
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
