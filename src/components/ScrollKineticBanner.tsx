import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface ScrollKineticBannerProps {
  variant?: 'hero-to-about' | 'projects-to-skills';
}

const TRACK_ONE_HERO = [
  'FOUNDER · SLRJ DIGITAL',
  'AI & ML ENGINEER',
  'FULL-STACK ARCHITECTURE',
  'PRODUCT DESIGNER',
  'TECHNOLOGY ENTREPRENEUR',
];

const TRACK_TWO_HERO = [
  'LEARN · BUILD · GROW',
  'REACT & NEXT.JS',
  'INTELLIGENT SYSTEMS',
  'DIGITAL EXPERIENCES',
  'FUTURE HORIZONS',
];

const TRACK_ONE_MID = [
  'IDEAS INTO REALITY',
  'PRODUCTION VENTURES',
  'CLIENT PLATFORMS',
  'SCALABLE CODEBASES',
  'REAL-WORLD IMPACT',
];

const TRACK_TWO_MID = [
  'ENGINEERING PRECISION',
  'MODERN TECH STACK',
  'CONTINUOUS EVOLUTION',
  'SYSTEMS THINKING',
  'SHAHID KOULURI · 2026',
];

export const ScrollKineticBanner: React.FC<ScrollKineticBannerProps> = ({
  variant = 'hero-to-about',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Heavy horizontal opposing scroll travel directly driven by scroll position
  const row1X = useTransform(scrollYProgress, [0, 1], ['8%', '-48%']);
  const row2X = useTransform(scrollYProgress, [0, 1], ['-48%', '8%']);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.25, 0.85, 0.25]);

  const row1Items = variant === 'hero-to-about' ? TRACK_ONE_HERO : TRACK_ONE_MID;
  const row2Items = variant === 'hero-to-about' ? TRACK_TWO_HERO : TRACK_TWO_MID;

  return (
    <div
      ref={containerRef}
      className="relative py-6 sm:py-10 bg-[#070709] border-y border-white/10 overflow-hidden select-none"
    >
      {/* Dynamic Red Center Highlight Glow */}
      <motion.div
        style={{ opacity: shouldReduceMotion ? 0.4 : glowOpacity }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-red-600/[0.07] to-transparent pointer-events-none"
      />

      {/* Row 1: Glides LEFT as you scroll down */}
      <motion.div
        style={{ x: shouldReduceMotion ? 0 : row1X }}
        className="flex items-center whitespace-nowrap will-change-transform mb-2.5 sm:mb-4"
      >
        {[...row1Items, ...row1Items, ...row1Items].map((text, idx) => (
          <div key={`r1-${idx}`} className="inline-flex items-center">
            <span
              className={`text-xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase px-3.5 sm:px-7 ${
                idx % 2 === 0 ? 'text-white' : 'text-red-500'
              }`}
            >
              {text}
            </span>
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rotate-45 bg-red-600 shadow-[0_0_12px_#EF4444] flex-shrink-0" />
          </div>
        ))}
      </motion.div>

      {/* Row 2: Glides RIGHT as you scroll down */}
      <motion.div
        style={{ x: shouldReduceMotion ? 0 : row2X }}
        className="flex items-center whitespace-nowrap will-change-transform"
      >
        {[...row2Items, ...row2Items, ...row2Items].map((text, idx) => (
          <div key={`r2-${idx}`} className="inline-flex items-center">
            <span
              className="text-xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase px-3.5 sm:px-7 text-transparent"
              style={{
                WebkitTextStroke:
                  idx % 2 === 0
                    ? '1.5px rgba(255, 255, 255, 0.55)'
                    : '1.5px rgba(239, 68, 68, 0.75)',
              }}
            >
              {text}
            </span>
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/70 flex-shrink-0" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};
