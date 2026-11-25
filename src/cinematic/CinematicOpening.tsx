import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Volume2, VolumeX, Sparkles, FastForward, ArrowRight } from 'lucide-react';
import { soundEngine } from './CinematicSoundEngine';

interface CinematicOpeningProps {
  onComplete: () => void;
}

const FIRST_NAME = 'SHAHID'.split('');
const LAST_NAME = 'KOULURI'.split('');
const TAGLINE_WORDS = ['Building', 'Technology.', 'Creating', 'Possibilities.'];

interface WarpStar {
  x: number;
  y: number;
  z: number;
  pz: number;
  isRed: boolean;
  size: number;
}

export const CinematicOpening: React.FC<CinematicOpeningProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const exitingRef = useRef(false);
  const mouseParallaxRef = useRef({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  const [isSkipped] = useState(() => {
    try {
      return typeof window !== 'undefined' && !!sessionStorage.getItem('sk_cinematic_intro_seen');
    } catch {
      return false;
    }
  });

  const handleFinish = useCallback(() => {
    if (exitingRef.current) return;
    exitingRef.current = true;
    try {
      sessionStorage.setItem('sk_cinematic_intro_seen', 'true');
    } catch {
      // ignore storage errors
    }
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 800);
  }, [onComplete]);

  // Smooth 60fps RAF Progress & Phase Sequencer (Zero dead stall)
  useEffect(() => {
    if (isSkipped) {
      onComplete();
      return;
    }

    const t1 = setTimeout(() => setPhase(2), 180);
    const t2 = setTimeout(() => setPhase(3), 420);

    const startTime = performance.now();
    const duration = 2200;
    let progressRaf: number;

    const tickProgress = (now: number) => {
      const ratio = Math.min(1, (now - startTime) / duration);
      // Smooth easeOutCubic curve
      const eased = 1 - Math.pow(1 - ratio, 3);
      setProgress(Math.min(100, Math.round(eased * 100)));

      if (ratio < 1) {
        progressRaf = requestAnimationFrame(tickProgress);
      }
    };

    progressRaf = requestAnimationFrame(tickProgress);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      cancelAnimationFrame(progressRaf);
    };
  }, [isSkipped, onComplete]);

  // Fullscreen 3D Starfield Warp + Perimeter Orbital Rings Canvas
  useEffect(() => {
    if (isSkipped || shouldReduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const starCount = width < 768 ? 85 : 150;
    const maxDepth = 1100;
    const stars: WarpStar[] = Array.from({ length: starCount }, (_, i) => {
      const z = Math.random() * maxDepth + 40;
      return {
        x: (Math.random() - 0.5) * width * 1.9,
        y: (Math.random() - 0.5) * height * 1.9,
        z,
        pz: z,
        isRed: i % 3 === 0,
        size: i % 5 === 0 ? 2.1 : 1.3,
      };
    });

    const startTime = performance.now();

    const render = (now: number) => {
      const elapsed = now - startTime;
      const cx = width / 2 + mouseParallaxRef.current.x * 28;
      const cy = height / 2 + mouseParallaxRef.current.y * 22;

      // Clear cleanly with rich deep black trail
      ctx.fillStyle = exitingRef.current ? 'rgba(9, 9, 11, 0.25)' : 'rgba(9, 9, 11, 0.42)';
      ctx.fillRect(0, 0, width, height);

      const warpSpeed = exitingRef.current ? 36 : 4.2;

      // 1. Wide Recessed Orbital Telemetry Rings (Framing outer viewport, away from text center)
      const baseRadius = Math.min(width, height) * 0.38;
      if (baseRadius > 140) {
        const ringAlpha = Math.min(1, elapsed / 1200) * 0.22;

        ctx.save();
        ctx.translate(cx, cy);

        // Outer Dashed Red Optical Ring
        ctx.save();
        ctx.rotate(elapsed * 0.00018);
        ctx.strokeStyle = `rgba(239, 68, 68, ${ringAlpha})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([6, 14]);
        ctx.beginPath();
        ctx.arc(0, 0, baseRadius * 1.15, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // Inner Thin White Arc Segments
        ctx.save();
        ctx.rotate(-elapsed * 0.00025);
        ctx.strokeStyle = `rgba(255, 255, 255, ${ringAlpha * 0.55})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, 0, baseRadius * 0.92, 0.15, Math.PI * 0.48);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, baseRadius * 0.92, Math.PI + 0.15, Math.PI * 1.48);
        ctx.stroke();
        ctx.restore();

        ctx.restore();
      }

      // 2. 3D Starfield Warp Streaks (kept clearest in periphery, softer directly behind headline)
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.pz = s.z;
        s.z -= warpSpeed;

        if (s.z <= 1) {
          s.x = (Math.random() - 0.5) * width * 1.9;
          s.y = (Math.random() - 0.5) * height * 1.9;
          s.z = maxDepth;
          s.pz = maxDepth;
        }

        const k = 380 / s.z;
        const pk = 380 / s.pz;

        const sx = cx + s.x * k;
        const sy = cy + s.y * k;
        const px = cx + s.x * pk;
        const py = cy + s.y * pk;

        if (sx < -40 || sx > width + 40 || sy < -40 || sy > height + 40) continue;

        // Soften alpha inside the immediate center headline rectangle so text always pops sharply
        const distFromCenter = Math.hypot((sx - width / 2) / (width * 0.28), (sy - height / 2) / (height * 0.18));
        const centerFade = Math.min(1, Math.max(0.18, distFromCenter * 0.75));
        const depthAlpha = (1 - s.z / maxDepth) * 0.85 * centerFade;

        ctx.beginPath();
        ctx.strokeStyle = s.isRed
          ? `rgba(239, 68, 68, ${depthAlpha})`
          : `rgba(255, 255, 255, ${depthAlpha * 0.75})`;
        ctx.lineWidth = s.size * (1 - s.z / maxDepth) + 0.4;
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isSkipped, shouldReduceMotion]);

  // Keyboard shortcuts for quick navigation
  useEffect(() => {
    if (isSkipped) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        handleFinish();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isSkipped, handleFinish]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const xPct = (e.clientX / window.innerWidth) * 100;
    const yPct = (e.clientY / window.innerHeight) * 100;
    setMousePos({ x: xPct, y: yPct });
    mouseParallaxRef.current = {
      x: (xPct - 50) / 50,
      y: (yPct - 50) / 50,
    };
  };

  const toggleSound = () => {
    const isNowPlaying = soundEngine.toggle();
    setIsAudioActive(isNowPlaying);
  };

  if (isSkipped) return null;

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.08,
            filter: 'blur(12px)',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          onMouseMove={handleMouseMove}
          className="fixed inset-0 z-50 flex flex-col justify-between p-6 sm:p-10 md:p-12 bg-[#09090B] text-white select-none overflow-hidden"
        >
          {/* 1. Ambient Volumetric Crimson Auroras & Mouse Spotlight */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Deep Top-Right & Bottom-Left Crimson Nebulas */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.35, 0.55, 0.35],
              }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-32 right-[12%] w-[520px] h-[520px] rounded-full bg-red-600/20 blur-[145px]"
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.25, 0.45, 0.25],
              }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              className="absolute -bottom-32 left-[8%] w-[520px] h-[520px] rounded-full bg-red-800/25 blur-[145px]"
            />

            {/* Interactive Cursor Radial Spotlight */}
            <div
              className="absolute inset-0 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle 540px at ${mousePos.x}% ${mousePos.y}%, rgba(239, 68, 68, 0.14) 0%, rgba(220, 38, 38, 0.04) 45%, transparent 75%)`,
              }}
            />

            {/* Subtle Perspective Architectural Floor & Ceiling Grid */}
            <div
              className="absolute inset-0 opacity-[0.14]"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(255, 255, 255, 0.14) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(220, 38, 38, 0.2) 1px, transparent 1px)
                `,
                backgroundSize: '64px 64px',
                maskImage: 'radial-gradient(ellipse 75% 65% at 50% 50%, black 20%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 50%, black 20%, transparent 100%)',
              }}
            />

            {/* Vertical Sweeping Laser Scan Line */}
            {!shouldReduceMotion && (
              <motion.div
                initial={{ top: '-10%' }}
                animate={{ top: '110%' }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent shadow-[0_0_20px_rgba(239,68,68,0.45)]"
              />
            )}
          </div>

          {/* 2. Starfield Warp & Perimeter Ring Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
          />

          {/* 3. Architectural Corner HUD Brackets */}
          <div className="pointer-events-none absolute inset-4 sm:inset-8 z-10 hidden sm:block opacity-50">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-500/60" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-500/60" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/30" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/30" />
          </div>

          {/* 4. Top Bar: Brand Status, Audio Toggle, Skip Intro */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="relative z-20 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-extrabold text-xs text-white shadow-[0_0_18px_rgba(220,38,38,0.7)]">
                SK
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-xs font-mono tracking-widest text-red-400 uppercase font-semibold">
                  CINEMATIC UNIVERSE
                </span>
                <span className="text-[10px] font-mono text-zinc-400">
                  SYSTEM INITIALIZED · 2026
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={toggleSound}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#18181B]/85 hover:bg-[#27272A] border border-white/10 text-xs text-zinc-300 hover:text-white transition-all backdrop-blur-md cursor-pointer"
                title={isAudioActive ? 'Mute ambient sound' : 'Enable ambient sound'}
              >
                {isAudioActive ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                    <span className="hidden sm:inline text-[11px] font-mono">SOUND ACTIVE</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="hidden sm:inline text-[11px] font-mono">ENABLE SOUND</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleFinish}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-600/25 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/40 text-xs font-semibold transition-all backdrop-blur-md cursor-pointer"
              >
                <span>Skip Intro</span>
                <FastForward className="w-3 h-3" />
              </button>
            </div>
          </motion.div>

          {/* 5. Center Stage: 3D Masked Kinetic Typography Choreography */}
          <div className="relative z-20 max-w-5xl mx-auto text-center my-auto px-2">
            {/* Ambient dark radial backing behind text for razor-sharp readability */}
            <div
              className="absolute inset-0 -m-16 blur-xl pointer-events-none -z-10"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(9, 9, 11, 0.78) 0%, transparent 72%)',
              }}
            />

            {/* Top Badge Slide-Down */}
            {phase >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: -16, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/70 border border-red-500/40 text-red-300 text-[11px] sm:text-xs font-mono uppercase tracking-[0.18em] mb-7 backdrop-blur-md shadow-[0_0_25px_rgba(220,38,38,0.2)]"
              >
                <Sparkles className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                <span>FOUNDER OF SLRJ DIGITAL · B.TECH AI/ML</span>
              </motion.div>
            )}

            {/* Main 3D Curtain Mask Name Reveal + Shimmer Sweep */}
            {phase >= 3 && (
              <div className="relative">
                <h1
                  style={{ perspective: '900px' }}
                  className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight leading-none flex flex-wrap justify-center gap-x-4 sm:gap-x-7"
                >
                  {/* SHAHID — Pure Crisp White with Masked 3D Emergence */}
                  <span className="inline-flex overflow-hidden py-1.5">
                    {FIRST_NAME.map((char, index) => (
                      <motion.span
                        key={`first-${index}`}
                        initial={{ opacity: 0, y: '115%', rotateX: -75 }}
                        animate={{ opacity: 1, y: '0%', rotateX: 0 }}
                        transition={{
                          duration: 0.62,
                          delay: index * 0.045,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="inline-block text-white drop-shadow-[0_4px_24px_rgba(255,255,255,0.18)] will-change-transform"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>

                  {/* KOULURI — Radiant Scarlet Red with Masked 3D Emergence */}
                  <span className="inline-flex overflow-hidden py-1.5">
                    {LAST_NAME.map((char, index) => (
                      <motion.span
                        key={`last-${index}`}
                        initial={{ opacity: 0, y: '115%', rotateX: -75 }}
                        animate={{ opacity: 1, y: '0%', rotateX: 0 }}
                        transition={{
                          duration: 0.62,
                          delay: 0.22 + index * 0.045,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="inline-block text-red-500 drop-shadow-[0_0_28px_rgba(239,68,68,0.55)] will-change-transform"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                </h1>

                {/* Subtle Horizontal Light Shimmer Sweep Across Title */}
                {!shouldReduceMotion && (
                  <motion.div
                    initial={{ x: '-120%', opacity: 0 }}
                    animate={{ x: '220%', opacity: [0, 0.5, 0] }}
                    transition={{
                      duration: 1.4,
                      delay: 0.75,
                      ease: 'easeInOut',
                    }}
                    className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 blur-sm"
                  />
                )}

                {/* Expanding Center Crimson Laser Divider */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.75, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
                  className="mx-auto mt-6 mb-5 h-[1px] w-full max-w-md bg-gradient-to-r from-transparent via-red-500/80 to-transparent origin-center shadow-[0_0_12px_#EF4444]"
                />

                {/* Animated Role Bar Compressing Tracking into Place */}
                <motion.div
                  initial={{ opacity: 0, letterSpacing: '0.42em', y: 12 }}
                  animate={{ opacity: 1, letterSpacing: '0.2em', y: 0 }}
                  transition={{ duration: 0.75, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[11px] sm:text-sm font-mono uppercase"
                >
                  <span className="text-red-400 font-bold">FOUNDER</span>
                  <span className="w-1.5 h-1.5 rotate-45 bg-white/60" />
                  <span className="text-white font-bold">DEVELOPER</span>
                  <span className="w-1.5 h-1.5 rotate-45 bg-red-500" />
                  <span className="text-red-400 font-bold">TECHNOLOGY ENTHUSIAST</span>
                </motion.div>

                {/* Word-by-Word Kinetic Tagline with Terminal Cursor */}
                <div className="pt-5 flex flex-wrap items-center justify-center gap-x-2 text-xs sm:text-base text-zinc-300 font-light tracking-wide">
                  {TAGLINE_WORDS.map((word, idx) => (
                    <span key={word} className="inline-block overflow-hidden">
                      <motion.span
                        initial={{ opacity: 0, y: '100%' }}
                        animate={{ opacity: 1, y: '0%' }}
                        transition={{
                          duration: 0.45,
                          delay: 0.85 + idx * 0.1,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="inline-block"
                      >
                        {word}
                      </motion.span>
                    </span>
                  ))}
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                      duration: 0.9,
                      repeat: Infinity,
                      delay: 1.25,
                    }}
                    className="inline-block w-1.5 h-4 bg-red-500 ml-0.5 align-middle"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 6. Bottom Bar: Telemetry Counter & Animated Enter Universe CTA */}
          <div className="relative z-20 max-w-4xl mx-auto w-full">
            <div className="flex items-end justify-between mb-3 text-xs font-mono">
              <span className="text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                <span>LEARN · BUILD · GROW</span>
              </span>

              {progress >= 100 ? (
                <motion.button
                  type="button"
                  onClick={handleFinish}
                  initial={{ opacity: 0, y: 8, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.35 }}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-xs tracking-wider shadow-[0_0_24px_rgba(239,68,68,0.55)] hover:shadow-[0_0_32px_rgba(239,68,68,0.8)] transition-shadow cursor-pointer group"
                >
                  <span>ENTER DIGITAL UNIVERSE</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              ) : (
                <span className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums">
                  {progress.toString().padStart(2, '0')}
                  <span className="text-red-500 text-sm font-normal ml-0.5">%</span>
                </span>
              )}
            </div>

            {/* Glowing Red Progress Track with White Leading Spark */}
            <div className="relative h-[2px] w-full bg-zinc-800/80 rounded-full overflow-hidden">
              <div
                className="relative h-full bg-gradient-to-r from-red-700 via-red-500 to-rose-400 shadow-[0_0_16px_#EF4444] transition-[width] duration-75 ease-out"
                style={{ width: `${progress}%` }}
              >
                <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#FFFFFF]" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
