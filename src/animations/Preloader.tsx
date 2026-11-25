import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface PreloaderProps {
  onComplete: () => void;
}

const FIRST_NAME = 'SHAHID'.split('');
const LAST_NAME = 'KOULURI'.split('');

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.15,
    },
  },
};

const letterVariants = {
  initial: {
    opacity: 0,
    y: 40,
    scale: 0.85,
    filter: 'blur(6px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSkipped] = useState(() => {
    try {
      return typeof window !== 'undefined' && !!sessionStorage.getItem('sk_portfolio_seen_intro');
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (isSkipped) {
      onComplete();
      return;
    }

    const startTime = performance.now();
    const duration = 1350; // Smooth 1.35s cinematic load time

    let animFrame: number;

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progressRatio = Math.min(1, elapsed / duration);
      // Natural cubic-like progression
      const easedProgress = Math.floor(progressRatio * 100);

      setProgress(easedProgress);

      if (progressRatio < 1) {
        animFrame = requestAnimationFrame(update);
      } else {
        try {
          sessionStorage.setItem('sk_portfolio_seen_intro', 'true');
        } catch {
          // ignore
        }
        setTimeout(() => {
          setIsLoaded(true);
          setTimeout(() => {
            onComplete();
            ScrollTrigger.refresh();
          }, 650);
        }, 180);
      }
    };

    animFrame = requestAnimationFrame(update);

    const handleSkip = () => {
      try {
        sessionStorage.setItem('sk_portfolio_seen_intro', 'true');
      } catch {
        // ignore
      }
      setProgress(100);
      setIsLoaded(true);
      onComplete();
      ScrollTrigger.refresh();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') handleSkip();
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isSkipped, onComplete]);

  if (isSkipped) {
    return null;
  }

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col justify-between p-8 sm:p-14 bg-[#09090B] text-white select-none pointer-events-auto"
        >
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-[480px] h-[480px] rounded-full bg-red-950/25 blur-[130px]" />
            <div className="absolute bottom-12 right-12 w-[380px] h-[380px] rounded-full bg-red-900/15 blur-[120px]" />
          </div>

          {/* Top Row: System Status & Monogram */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-extrabold text-sm text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]">
                SK
              </div>
              <span className="text-xs font-mono tracking-widest text-red-400 uppercase">
                PORTFOLIO · 2026
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>INITIALIZING SYSTEM</span>
            </div>
          </div>

          {/* Center: Animated Name Reveal Letter by Letter */}
          <div className="relative z-10 max-w-4xl mx-auto text-center my-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs sm:text-sm font-mono tracking-widest text-red-400 uppercase mb-4"
            >
              FOUNDER OF SLRJ DIGITAL · B.TECH AI/ML
            </motion.div>

            <motion.h1
              variants={containerVariants}
              initial="initial"
              animate="animate"
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-none flex flex-wrap justify-center gap-x-4 sm:gap-x-6"
            >
              <span className="inline-flex overflow-hidden py-1">
                {FIRST_NAME.map((char, index) => (
                  <motion.span
                    key={`first-${index}`}
                    variants={letterVariants}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
              <span className="inline-flex overflow-hidden py-1 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-red-600">
                {LAST_NAME.map((char, index) => (
                  <motion.span
                    key={`last-${index}`}
                    variants={letterVariants}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="text-xs sm:text-sm text-zinc-300 font-light tracking-wide max-w-md mx-auto pt-4"
            >
              Building Technology. Creating Possibilities.
            </motion.p>
          </div>

          {/* Bottom Row: Counter & Progress Line */}
          <div className="relative z-10 max-w-4xl mx-auto w-full">
            <div className="flex items-end justify-between mb-3 text-xs font-mono">
              <span className="text-zinc-400 uppercase tracking-wider">
                LEARN · BUILD · GROW
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-white">
                {progress}
                <span className="text-red-400 text-sm font-normal">%</span>
              </span>
            </div>

            {/* Glowing Red Progress Track */}
            <div className="h-[2px] w-full bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-red-600 shadow-[0_0_12px_#EF4444]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
