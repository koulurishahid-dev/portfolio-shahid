import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  useReducedMotion,
} from 'framer-motion';
import {
  Cpu,
  Zap,
  HeartPulse,
  Layers,
  ShieldCheck,
  Rocket,
  Compass,
  ArrowRight,
} from 'lucide-react';
import { VISION_AREAS, PERSONAL_INFO } from '../data/portfolioData';
import { TiltCard } from '../animations/TiltCard';
import { Magnetic } from '../animations/Magnetic';
import { useSmoothScroll } from '../animations/useSmoothScroll';
import { useMediaQuery } from '../hooks/useMediaQuery';

const renderVisionIcon = (name: string) => {
  switch (name) {
    case 'Cpu':
      return <Cpu className="w-6 h-6" />;
    case 'Zap':
      return <Zap className="w-6 h-6" />;
    case 'HeartPulse':
      return <HeartPulse className="w-6 h-6" />;
    case 'Layers':
      return <Layers className="w-6 h-6" />;
    case 'ShieldCheck':
      return <ShieldCheck className="w-6 h-6" />;
    case 'Rocket':
      return <Rocket className="w-6 h-6" />;
    default:
      return <Compass className="w-6 h-6" />;
  }
};

interface VisionCardItemProps {
  area: (typeof VISION_AREAS)[number];
  idx: number;
  scrollYProgress: MotionValue<number>;
  isDesktop: boolean;
  shouldReduceMotion: boolean | null;
}

const VisionCardItem: React.FC<VisionCardItemProps> = ({
  area,
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
    [85, 0, -65],
  ];
  const xRanges = [
    [-35, 0, -12],
    [0, 0, 0],
    [35, 0, 12],
  ];

  const desktopY = useTransform(scrollYProgress, [0.06, 0.5, 0.94], yRanges[colIdx]);
  const desktopX = useTransform(scrollYProgress, [0.06, 0.5, 0.94], xRanges[colIdx]);
  const desktopScale = useTransform(scrollYProgress, [0.06, 0.45, 0.94], [0.92, 1, 0.96]);

  const mobileY = useTransform(localProgress, [0, 1], [24, 0]);
  const mobileScale = useTransform(localProgress, [0, 1], [0.96, 1]);

  return (
    <motion.div
      ref={cardRef}
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
        scaleOnHover={isDesktop ? 1.02 : 1}
        className="rounded-3xl p-5 sm:p-7 bg-[#141418] border border-white/10 shadow-sm flex flex-col justify-between h-full group hover:border-red-500/40 transition-colors"
      >
        <div>
          <div className="w-12 h-12 rounded-2xl bg-[#1C1C22] border border-white/10 shadow-sm flex items-center justify-center text-red-400 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300 mb-5">
            {renderVisionIcon(area.iconName)}
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white mb-1 leading-snug">
            {area.title}
          </h3>
          <div className="text-xs font-semibold text-red-400 mb-3">
            {area.tagline}
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
            {area.description}
          </p>
        </div>
      </TiltCard>
    </motion.div>
  );
};

export const VisionSection: React.FC = () => {
  const { scrollTo } = useSmoothScroll();
  const sectionRef = useRef<HTMLElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 1024px)', true);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const { scrollYProgress: bannerProgress } = useScroll({
    target: bannerRef,
    offset: ['start 96%', 'start 65%'],
  });

  const wireY1 = useTransform(scrollYProgress, [0, 1], [-80, 140]);
  const wireRotate1 = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const wireY2 = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const wireRotate2 = useTransform(scrollYProgress, [0, 1], [0, -240]);

  const watermarkX = useTransform(scrollYProgress, [0, 1], [-120, 140]);
  const headerY = useTransform(scrollYProgress, [0, 1], isDesktop ? [35, -35] : [16, -16]);

  const bannerScale = useTransform(bannerProgress, [0, 1], [isDesktop ? 0.9 : 0.95, 1]);
  const bannerY = useTransform(bannerProgress, [0, 1], [35, 0]);
  const bannerOpacity = useTransform(bannerProgress, [0, 0.45, 1], [0.5, 0.9, 1]);

  return (
    <section
      id="vision"
      ref={sectionRef}
      className="py-16 sm:py-24 lg:py-32 bg-[#09090B] border-t border-white/10 relative overflow-hidden text-white"
    >
      {/* Ambient animated lighting */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/3 -right-20 w-[500px] h-[500px] rounded-full bg-red-950/25 blur-[130px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute -bottom-20 -left-20 w-[450px] h-[450px] rounded-full bg-red-900/15 blur-[140px] pointer-events-none"
      />

      {/* Horizontal Scrubbing Watermark */}
      <motion.div
        style={{ x: shouldReduceMotion ? 0 : watermarkX }}
        className="absolute top-16 left-0 whitespace-nowrap font-black text-[15vw] sm:text-[11vw] leading-none uppercase tracking-tighter text-transparent opacity-[0.035] pointer-events-none select-none will-change-transform"
      >
        <span style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.9)' }}>
          FUTURE VISION · LONG-TERM IMPACT
        </span>
      </motion.div>

      {/* Scroll-Driven Geometric Wireframe Elements */}
      <motion.div
        style={{
          y: shouldReduceMotion ? 0 : wireY1,
          rotate: shouldReduceMotion ? 0 : wireRotate1,
        }}
        className="absolute top-28 left-12 w-20 h-20 pointer-events-none opacity-30 hidden lg:block will-change-transform"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-red-500 fill-none stroke-[1.5]">
          <polygon points="50,5 95,28 95,72 50,95 5,72 5,28" />
          <line x1="50" y1="5" x2="50" y2="95" />
          <line x1="5" y1="28" x2="95" y2="72" />
          <line x1="95" y1="28" x2="5" y2="72" />
        </svg>
      </motion.div>

      <motion.div
        style={{
          y: shouldReduceMotion ? 0 : wireY2,
          rotate: shouldReduceMotion ? 0 : wireRotate2,
        }}
        className="absolute bottom-40 right-16 w-24 h-24 pointer-events-none opacity-30 hidden lg:block will-change-transform"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-rose-600 fill-none stroke-[1.5]">
          <circle cx="50" cy="50" r="40" strokeDasharray="4 3" />
          <polygon points="50,15 80,75 20,75" />
        </svg>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Scroll-based Parallax */}
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
              <span>CHAPTER 06 · FUTURE VISION</span>
              <span className="text-zinc-600 hidden sm:inline">|</span>
              <span className="text-zinc-300 font-sans hidden sm:inline">Applied AI &amp; Long-Term Horizons</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              Think Long-Term. Build Consistently.
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-zinc-300 leading-relaxed font-normal">
              {PERSONAL_INFO.vision.statement}
            </p>
          </motion.div>
        </motion.div>

        {/* 6 Vision Domains Grid with 3D Tilt & Wave Scroll Parallax */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-14 sm:mb-20">
          {VISION_AREAS.map((area, idx) => (
            <VisionCardItem
              key={area.title}
              area={area}
              idx={idx}
              scrollYProgress={scrollYProgress}
              isDesktop={isDesktop}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>

        {/* Scroll-Expanding Long-Term Vision Callout Banner */}
        <motion.div
          ref={bannerRef}
          style={{
            scale: shouldReduceMotion ? 1 : bannerScale,
            y: shouldReduceMotion ? 0 : bannerY,
            opacity: shouldReduceMotion ? 1 : bannerOpacity,
          }}
          className="rounded-3xl p-6 sm:p-10 lg:p-12 bg-gradient-to-r from-black via-zinc-950 to-neutral-900 border border-red-500/30 text-white shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 relative overflow-hidden will-change-transform"
        >
          {/* Ambient Glow */}
          <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-red-600/20 blur-3xl pointer-events-none" />

          <div className="space-y-3 max-w-2xl text-center sm:text-left relative z-10">
            <div className="text-xs font-bold uppercase tracking-wider text-red-400">
              The Founder&apos;s Outlook
            </div>
            <h4 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-tight">
              &ldquo;Great companies are built through consistency, experimentation, teamwork, and solving real problems.&rdquo;
            </h4>
            <p className="text-xs sm:text-sm text-zinc-300 font-light">
              Focusing on compounding engineering ability, operational understanding, and high-integrity partnerships.
            </p>
          </div>

          <div className="relative z-10 flex-shrink-0">
            <Magnetic strength={0.3}>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('#contact', { offset: -70 });
                }}
                data-cursor="pointer"
                data-cursor-text="CONNECT"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-red-600/30 hover:shadow-red-600/50 transition-all cursor-pointer group"
              >
                <span>Partner With Me</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Magnetic>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
