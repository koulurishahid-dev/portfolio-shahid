import React, { useState, useRef, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Briefcase,
  Sparkles,
  ChevronDown,
  Globe,
  Cpu,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { HeroBackground } from '../components/HeroBackground';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '../components/SocialIcons';
import { TiltCard } from '../animations/TiltCard';
import { Magnetic } from '../animations/Magnetic';
import { useSmoothScroll } from '../animations/useSmoothScroll';
import { useMediaQuery } from '../hooks/useMediaQuery';

const DYNAMIC_ROLES = [
  'Founder · SLRJ Digital',
  'B.Tech AI & ML Student',
  'Full-Stack Web Developer',
  'Technology Entrepreneur',
];

export const HeroSection: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [roleIndex, setRoleIndex] = useState(0);
  const { scrollTo } = useSmoothScroll();
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 1024px)', true);

  // Dynamic role cycler
  useEffect(() => {
    if (shouldReduceMotion) return;
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % DYNAMIC_ROLES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [shouldReduceMotion]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Scroll-scrubbed multi-plane motion (horizontal split enabled only on lg+ multi-column)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);
  const heroScale = useTransform(scrollYProgress, [0, 0.85], [1, 0.94]);

  const leftColX = useTransform(scrollYProgress, [0, 1], [0, isDesktop ? -60 : 0]);
  const leftColY = useTransform(scrollYProgress, [0, 1], [0, isDesktop ? -75 : -35]);

  const rightColX = useTransform(scrollYProgress, [0, 1], [0, isDesktop ? 60 : 0]);
  const rightColY = useTransform(scrollYProgress, [0, 1], [0, isDesktop ? 40 : -20]);
  const rightRotate = useTransform(scrollYProgress, [0, 1], [0, isDesktop ? 3 : 0]);

  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scrollCueY = useTransform(scrollYProgress, [0, 0.2], [0, 18]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100svh] flex flex-col justify-center pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-28 lg:pb-10 overflow-hidden bg-[#09090B] text-white"
    >
      {/* Dynamic Architectural Canvas Background */}
      <HeroBackground mousePos={mousePos} scrollYProgress={scrollYProgress} />

      <motion.div
        style={{
          opacity: shouldReduceMotion ? 1 : heroOpacity,
          scale: shouldReduceMotion ? 1 : heroScale,
        }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full will-change-transform my-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* LEFT COLUMN: Identity, Balanced Headline, CTAs & Fact Strip */}
          <motion.div
            style={{
              x: shouldReduceMotion ? 0 : leftColX,
              y: shouldReduceMotion ? 0 : leftColY,
            }}
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left will-change-transform"
          >
            {/* Status & Location Telemetry Pills */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-4 sm:mb-5"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950/60 border border-red-500/35 text-red-400 text-[10px] sm:text-[11px] font-mono font-semibold tracking-wider uppercase backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span>Available for Collaborations</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#141418]/90 border border-white/10 text-zinc-400 text-[10px] sm:text-[11px] font-mono">
                <MapPin className="w-3 h-3 text-red-500 flex-shrink-0" />
                <span>Andhra Pradesh, India</span>
              </div>
            </motion.div>

            {/* Founder Name & Live Cycling Role Strip */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 mb-3.5 sm:mb-4"
            >
              <span className="w-1 h-4 sm:h-5 rounded-full bg-red-600 hidden sm:inline-block shadow-[0_0_10px_#EF4444]" />
              <span className="text-xs sm:text-sm md:text-base font-extrabold tracking-[0.18em] sm:tracking-[0.22em] uppercase text-white">
                SHAHID KOULURI
              </span>
              <span className="text-zinc-600 hidden sm:inline">/</span>
              <div className="h-6 overflow-hidden flex items-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={DYNAMIC_ROLES[roleIndex]}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="text-xs sm:text-sm font-mono font-semibold text-red-400"
                  >
                    {DYNAMIC_ROLES[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Commanding Balanced 2-Line Display Headline */}
            <h1 className="text-[2.1rem] leading-[1.08] sm:text-5xl lg:text-[3.25rem] xl:text-[3.9rem] font-black text-white tracking-tight mb-4 sm:mb-5 max-w-2xl">
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ opacity: 0, y: 36 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block lg:whitespace-nowrap"
                >
                  <span className="text-white">Building </span>
                  <span className="text-red-500 drop-shadow-[0_0_24px_rgba(239,68,68,0.3)]">
                    Technology.
                  </span>
                </motion.span>
              </span>

              <span className="block overflow-hidden mt-1">
                <motion.span
                  initial={{ opacity: 0, y: 36 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block lg:whitespace-nowrap"
                >
                  <span className="text-white">Creating </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-white">
                    Possibilities.
                  </span>
                </motion.span>
              </span>
            </h1>

            {/* Animated Laser Underline Highlight */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.75, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
              className="w-24 sm:w-32 h-[2px] bg-gradient-to-r from-red-600 via-rose-400 to-transparent mb-5 origin-center lg:origin-left shadow-[0_0_12px_rgba(239,68,68,0.65)]"
            />

            {/* Supporting Bio Text */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-base md:text-lg text-zinc-300 leading-relaxed max-w-xl font-normal mb-6 sm:mb-7"
            >
              {PERSONAL_INFO.hero.supportingText}
            </motion.p>

            {/* Primary CTA Buttons & Social Shortcuts */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.42 }}
              className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-3.5 mb-7 sm:mb-8 w-full sm:w-auto"
            >
              <Magnetic strength={0.2} className="w-full sm:w-auto">
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#projects', { offset: -70 });
                  }}
                  data-cursor="pointer"
                  data-cursor-text="WORK"
                  className="w-full sm:w-auto relative overflow-hidden inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-[0_0_24px_rgba(220,38,38,0.4)] hover:shadow-[0_0_32px_rgba(220,38,38,0.65)] transition-all duration-200 cursor-pointer active:scale-95 group"
                >
                  <span className="relative z-10">Explore My Work</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </a>
              </Magnetic>

              <Magnetic strength={0.2} className="w-full sm:w-auto">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#contact', { offset: -70 });
                  }}
                  data-cursor="pointer"
                  data-cursor-text="HELLO"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#141418] hover:bg-white text-white hover:text-black font-semibold text-sm border border-white/15 hover:border-white transition-all duration-200 cursor-pointer active:scale-95"
                >
                  <span>Let&apos;s Connect</span>
                </a>
              </Magnetic>

              {/* Social Shortcut Icons */}
              <div className="flex items-center justify-center gap-2 pt-1 sm:pt-0 sm:pl-1">
                <a
                  href={PERSONAL_INFO.social.slrjDigital}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="SLRJ Digital Website"
                  data-cursor="pointer"
                  className="w-11 h-11 rounded-xl bg-[#141418] hover:bg-red-600 border border-white/10 hover:border-red-500 text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-200"
                >
                  <Globe className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  data-cursor="pointer"
                  className="w-11 h-11 rounded-xl bg-[#141418] hover:bg-red-600 border border-white/10 hover:border-red-500 text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-200"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  data-cursor="pointer"
                  className="w-11 h-11 rounded-xl bg-[#141418] hover:bg-red-600 border border-white/10 hover:border-red-500 text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-200"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  data-cursor="pointer"
                  className="w-11 h-11 rounded-xl bg-[#141418] hover:bg-red-600 border border-white/10 hover:border-red-500 text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-200"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* 3-Column Core Fact Strip (Cleanly scaled down for mobile screens too) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.52 }}
              className="grid grid-cols-3 gap-2.5 sm:gap-5 w-full max-w-xl pt-5 border-t border-white/10"
            >
              <div className="text-left">
                <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider sm:tracking-widest text-red-400 font-semibold">
                  Venture
                </div>
                <div className="text-[11px] sm:text-sm font-bold text-white mt-0.5 truncate">
                  SLRJ Digital
                </div>
                <div className="text-[10px] sm:text-[11px] text-zinc-500 truncate">Founder · Live</div>
              </div>

              <div className="text-left border-l border-white/10 pl-2.5 sm:pl-5">
                <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider sm:tracking-widest text-red-400 font-semibold">
                  Engineering
                </div>
                <div className="text-[11px] sm:text-sm font-bold text-white mt-0.5 truncate">
                  B.Tech AI &amp; ML
                </div>
                <div className="text-[10px] sm:text-[11px] text-zinc-500 truncate">Full-Stack Focus</div>
              </div>

              <div className="text-left border-l border-white/10 pl-2.5 sm:pl-5">
                <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider sm:tracking-widest text-red-400 font-semibold">
                  Philosophy
                </div>
                <div className="text-[11px] sm:text-sm font-bold text-white mt-0.5 truncate">
                  Learn · Build
                </div>
                <div className="text-[10px] sm:text-[11px] text-zinc-500 truncate">&amp; Grow Daily</div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Unobstructed, Perfectly Proportioned Studio Portrait Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              x: shouldReduceMotion ? 0 : rightColX,
              y: shouldReduceMotion ? 0 : rightColY,
              rotate: shouldReduceMotion ? 0 : rightRotate,
            }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative will-change-transform"
          >
            {/* Sculpted Crimson Studio Halo directly behind portrait */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: [1, 1.08, 1],
                      opacity: [0.55, 0.8, 0.55],
                    }
              }
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 -m-4 rounded-full blur-3xl pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle at 50% 42%, rgba(220, 38, 38, 0.32) 0%, rgba(153, 27, 27, 0.14) 45%, transparent 72%)',
              }}
            />

            <div className="relative w-full max-w-[310px] sm:max-w-[360px] lg:max-w-[370px] xl:max-w-[395px]">
              {/* Clean Optical Corner Brackets clear of face */}
              <div className="hidden sm:block pointer-events-none absolute -top-2.5 -left-2.5 w-5 h-5 border-t-2 border-l-2 border-red-500/75" />
              <div className="hidden sm:block pointer-events-none absolute -bottom-2.5 -right-2.5 w-5 h-5 border-b-2 border-r-2 border-white/50" />

              <TiltCard maxRotation={isDesktop ? 5 : 0} scaleOnHover={1.015} className="w-full">
                {/* Metallic Gradient Hairline Frame */}
                <div className="rounded-[24px] p-[1px] bg-gradient-to-b from-white/25 via-red-500/40 to-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.85)]">
                  <div className="relative rounded-[23px] bg-[#0F0F13] overflow-hidden">
                    {/* Minimalist Top Studio HUD Bar */}
                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-[#141419]/90 text-[10px] font-mono tracking-widest uppercase">
                      <span className="text-zinc-400">ID // 01 · FOUNDER</span>
                      <a
                        href={PERSONAL_INFO.social.slrjFounder}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-red-400 hover:text-white transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        <span>slrjdigital.in/founder</span>
                      </a>
                    </div>

                    {/* Portrait Image Container (Clean, Unobstructed Subject) */}
                    <div className="relative aspect-[4/4.15] w-full overflow-hidden bg-[#09090B]">
                      <img
                        src={PERSONAL_INFO.avatarUrl}
                        alt="Shahid Kouluri — Founder of SLRJ Digital"
                        className="w-full h-full object-cover object-top hover:scale-[1.03] transition-transform duration-700"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (!target.src.includes('shahid-portrait.png')) {
                            target.src = '/shahid-portrait.png';
                          }
                        }}
                      />

                      {/* Smooth Studio Vignette & Bottom Gradient Melt */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F13] via-transparent to-black/15 pointer-events-none" />
                      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0F0F13] via-[#0F0F13]/85 to-transparent pointer-events-none" />

                      {/* Unified Identity Footer Card inside Frame */}
                      <div className="absolute bottom-3 left-3 right-3 p-3 sm:p-3.5 rounded-2xl bg-[#16161C]/90 backdrop-blur-md border border-white/15 shadow-xl flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm font-extrabold text-white tracking-tight truncate">
                            Shahid Kouluri
                          </div>
                          <div className="text-[11px] font-semibold text-red-400 flex items-center gap-1.5 mt-0.5 truncate">
                            <Briefcase className="w-3 h-3 flex-shrink-0" />
                            <span>Founder · SLRJ Digital</span>
                          </div>
                        </div>

                        <a
                          href={PERSONAL_INFO.social.slrjFounder}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="pointer"
                          className="w-9 h-9 rounded-xl bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-md shadow-red-600/30 transition-colors flex-shrink-0"
                          aria-label="Open SLRJ Founder Page"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                    {/* Integrated Bottom Capability Bar (No awkward face overlaps!) */}
                    <div className="px-4 py-2.5 bg-[#121217] border-t border-white/10 flex items-center justify-between gap-2 text-[10px] font-mono">
                      <span className="inline-flex items-center gap-1.5 text-zinc-300 truncate">
                        <Sparkles className="w-3 h-3 text-red-400 flex-shrink-0" />
                        <span>SLRJ Digital</span>
                      </span>
                      <span className="text-zinc-600">|</span>
                      <span className="inline-flex items-center gap-1.5 text-zinc-300 truncate">
                        <Cpu className="w-3 h-3 text-red-400 flex-shrink-0" />
                        <span>AI/ML &amp; Full-Stack</span>
                      </span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          </motion.div>
        </div>

        {/* Balanced Normal-Flow Scroll Cue on Desktop (Zero bottom edge crowding) */}
        <motion.div
          style={{
            opacity: shouldReduceMotion ? 1 : scrollCueOpacity,
            y: shouldReduceMotion ? 0 : scrollCueY,
          }}
          className="hidden lg:flex justify-center pt-8"
        >
          <button
            type="button"
            onClick={() => scrollTo('#about', { offset: -70 })}
            className="inline-flex flex-col items-center gap-1 text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"
            aria-label="Scroll down to explore"
          >
            <span>Scroll to Explore</span>
            <ChevronDown className="w-4 h-4 text-red-500 animate-bounce" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};
