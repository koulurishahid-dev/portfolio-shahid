import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

interface HeroAvatarProps {
  className?: string;
}

export const HeroAvatar: React.FC<HeroAvatarProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Normalized mouse coordinates: -1 to 1
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for natural physical damping
  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 2.5D Restrained Tilting & Micro-Translation
  const rotateX = useTransform(smoothY, [-1, 1], [5, -5]); // Vertical cursor tilts X axis
  const rotateY = useTransform(smoothX, [-1, 1], [-6, 6]); // Horizontal cursor tilts Y axis
  const avatarTranslateX = useTransform(smoothX, [-1, 1], [-8, 8]);
  const avatarTranslateY = useTransform(smoothY, [-1, 1], [-6, 6]);

  // Opposite parallax shift for the background glow to create true optical depth
  const glowTranslateX = useTransform(smoothX, [-1, 1], [14, -14]);
  const glowTranslateY = useTransform(smoothY, [-1, 1], [12, -12]);

  // Dynamic specular sheen tracking
  const sheenX = useTransform(smoothX, [-1, 1], ['20%', '80%']);
  const sheenY = useTransform(smoothY, [-1, 1], ['20%', '80%']);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (shouldReduceMotion) return;
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth) * 2 - 1;
      const normY = (e.clientY / innerHeight) * 2 - 1;
      mouseX.set(Math.max(-1, Math.min(1, normX)));
      mouseY.set(Math.max(-1, Math.min(1, normY)));
    };

    window.addEventListener('mousemove', handleGlobalMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, [mouseX, mouseY, shouldReduceMotion]);

  const handlePointerLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handlePointerLeave}
      className={`relative w-full max-w-[500px] sm:max-w-[560px] lg:max-w-[620px] xl:max-w-[660px] aspect-square flex items-center justify-center select-none ${className}`}
      style={{ perspective: 1200 }}
    >
      {/* 1. Deep Ambient Radial Lighting (Tracks opposite to cursor for parallax depth) */}
      <motion.div
        style={{
          x: shouldReduceMotion ? 0 : glowTranslateX,
          y: shouldReduceMotion ? 0 : glowTranslateY,
        }}
        className="absolute inset-4 rounded-full pointer-events-none"
      >
        {/* Soft Core Cyan/Indigo Bloom */}
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_45%,_rgba(56,189,248,0.22)_0%,_rgba(99,102,241,0.12)_45%,_transparent_75%)] blur-3xl scale-95" />
        
        {/* Subtle Outer Violet Aura */}
        <div className="absolute -inset-8 rounded-full bg-[radial-gradient(circle_at_50%_50%,_rgba(129,140,248,0.1)_0%,_transparent_70%)] blur-2xl" />
      </motion.div>

      {/* 2. Restrained Futuristic Tech Halo (Delicate Orbit Ring) */}
      <div
        className={`absolute w-[82%] h-[82%] rounded-full border border-sky-400/20 border-dashed pointer-events-none transition-opacity duration-500 animate-[spin_80s_linear_infinite] ${
          isHovered ? 'opacity-70' : 'opacity-40'
        }`}
      />
      <div
        className={`absolute w-[94%] h-[94%] rounded-full border border-indigo-400/15 pointer-events-none transition-opacity duration-500 ${
          isHovered ? 'opacity-50' : 'opacity-30'
        }`}
      />

      {/* 3. Subtle Cyan Accent Orbit Nodes */}
      <div className="absolute top-[12%] right-[14%] w-2 h-2 rounded-full bg-sky-400/60 shadow-[0_0_10px_#38bdf8] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[16%] left-[12%] w-1.5 h-1.5 rounded-full bg-indigo-400/50 shadow-[0_0_8px_#818cf8] pointer-events-none" />

      {/* 4. Main Character Bust Container with 2.5D Spring Tilt & Floating Bob */}
      <motion.div
        style={{
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
          x: shouldReduceMotion ? 0 : avatarTranslateX,
          y: shouldReduceMotion ? 0 : avatarTranslateY,
          transformStyle: 'preserve-3d',
        }}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative w-full h-full flex items-center justify-center pointer-events-none z-10"
      >
        {/* Subtle Idle Floating Animation (Pauses when offscreen) */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  y: [0, -7, 0],
                  scale: [1, 1.008, 1],
                }
          }
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* Cyan Rim Glow Silhouette Layer */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-80"
            style={{
              filter: 'drop-shadow(0 0 35px rgba(56, 189, 248, 0.28)) drop-shadow(0 0 65px rgba(129, 140, 248, 0.18))',
            }}
          >
            <img
              src="/shahid-avatar-hq.png"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-contain opacity-0"
            />
          </div>

          {/* Primary Crisp Transparent Avatar */}
          <img
            src="/shahid-avatar-hq.png"
            alt="Shahid Kouluri — AI & Machine Learning Student and Founder of SLRJ Digital"
            onLoad={() => setImageLoaded(true)}
            className={`relative z-10 w-full h-full object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.9)] transition-opacity duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              filter: 'drop-shadow(0 15px 30px rgba(0, 0, 0, 0.85)) drop-shadow(0 0 25px rgba(56, 189, 248, 0.2))',
            }}
          />

          {/* Dynamic Specular Sheen (Subtle light reflection moving across chest/hoodie) */}
          {!shouldReduceMotion && (
            <motion.div
              style={{
                background: `radial-gradient(circle at ${sheenX.get()} ${sheenY.get()}, rgba(255,255,255,0.06) 0%, transparent 60%)`,
              }}
              className="absolute inset-0 pointer-events-none mix-blend-overlay rounded-full"
            />
          )}
        </motion.div>
      </motion.div>

      {/* 5. Bottom Horizon Shadow / Fade for Smooth Grounding */}
      <div className="absolute bottom-0 inset-x-8 h-16 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/60 to-transparent pointer-events-none z-20" />
    </div>
  );
};
