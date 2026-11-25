import React, { useEffect, useRef, useState } from 'react';
import { motion, useTransform, MotionValue, useReducedMotion } from 'framer-motion';

interface HeroBackgroundProps {
  mousePos: { x: number; y: number };
  scrollYProgress: MotionValue<number>;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isRed: boolean;
  alpha: number;
}

export const HeroBackground: React.FC<HeroBackgroundProps> = ({
  mousePos,
  scrollYProgress,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  // Keep latest mouse position for 60fps canvas loop without re-binding effect
  const mouseRef = useRef(mousePos);
  useEffect(() => {
    mouseRef.current = mousePos;
  }, [mousePos]);

  // Scroll-scrubbed background layers
  const topTextX = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const bottomTextX = useTransform(scrollYProgress, [0, 1], [-120, 140]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const beamY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);

  // Pause particle canvas animation when scrolled past Hero
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.02 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Interactive Red & White Particle Constellation Canvas
  useEffect(() => {
    if (shouldReduceMotion || !isVisible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Subtle studio micro-embers drifting upward cleanly
    const particleCount = width < 768 ? 22 : 42;
    const particles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.18,
      vy: -(0.14 + Math.random() * 0.24),
      radius: i % 4 === 0 ? 1.5 : 0.9,
      isRed: i % 2 === 0,
      alpha: Math.random() * 0.35 + 0.15,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mx = (mouseRef.current.x / 100) * width;
      const my = (mouseRef.current.y / 100) * height;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Delicate hairlines only near cursor
        const dxM = mx - p.x;
        const dyM = my - p.y;
        const distM = Math.hypot(dxM, dyM);
        if (distM < 150 && distM > 1) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(239, 68, 68, ${(1 - distM / 150) * 0.16})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mx, my);
          ctx.stroke();
        }

        // Draw crisp micro-particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.isRed
          ? `rgba(239, 68, 68, ${p.alpha})`
          : `rgba(255, 255, 255, ${p.alpha * 0.7})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isVisible, shouldReduceMotion]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none select-none overflow-hidden"
    >
      {/* 1. Architectural Editorial Vertical Lanes */}
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 relative opacity-[0.045]">
        <div className="grid grid-cols-4 h-full w-full border-x border-white">
          <div className="border-r border-white" />
          <div className="border-r border-white" />
          <div className="border-r border-red-500/80" />
          <div />
        </div>
      </div>

      {/* 2. Deep Sculpted Studio Aurora Spotlights */}
      <motion.div
        style={{ scale: shouldReduceMotion ? 1 : orbScale }}
        className="absolute -top-32 right-[4%] w-[640px] h-[640px] rounded-full bg-gradient-to-br from-red-600/20 via-rose-900/15 to-transparent blur-[145px]"
      />
      <div className="absolute -bottom-36 -left-24 w-[520px] h-[520px] rounded-full bg-gradient-to-tr from-red-950/35 via-red-700/10 to-transparent blur-[135px]" />

      {/* 3. Interactive Cursor Radial Spotlight */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle 620px at ${mousePos.x}% ${mousePos.y}%, rgba(239, 68, 68, 0.11) 0%, rgba(220, 38, 38, 0.03) 45%, transparent 75%)`,
        }}
      />

      {/* 4. Volumetric Diagonal Red Light Beams */}
      <motion.div
        style={{ y: shouldReduceMotion ? 0 : beamY }}
        className="absolute inset-0 overflow-hidden opacity-40"
      >
        <div
          className="absolute -top-1/2 right-[8%] w-[320px] h-[160%] bg-gradient-to-b from-red-600/15 via-red-500/5 to-transparent blur-3xl rotate-[24deg]"
        />
        <div
          className="absolute -top-1/2 left-[20%] w-[160px] h-[150%] bg-gradient-to-b from-white/[0.04] via-red-600/[0.03] to-transparent blur-2xl rotate-[24deg]"
        />
      </motion.div>

      {/* 5. Softly Masked Scroll-Scrubbed Watermark Typography */}
      <div
        className="absolute inset-0 flex flex-col justify-between py-10 sm:py-14 opacity-[0.03] overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
        }}
      >
        <motion.div
          style={{ x: shouldReduceMotion ? 0 : topTextX }}
          className="whitespace-nowrap font-black text-[13vw] sm:text-[10vw] leading-none tracking-tighter text-transparent uppercase will-change-transform"
        >
          <span style={{ WebkitTextStroke: '1px rgba(255, 255, 255, 0.85)' }}>
            SHAHID KOULURI · FOUNDER · AI &amp; ML ·
          </span>
        </motion.div>

        <motion.div
          style={{ x: shouldReduceMotion ? 0 : bottomTextX }}
          className="whitespace-nowrap font-black text-[13vw] sm:text-[10vw] leading-none tracking-tighter text-transparent uppercase will-change-transform"
        >
          <span style={{ WebkitTextStroke: '1px rgba(239, 68, 68, 0.9)' }}>
            SLRJ DIGITAL · BUILD THE FUTURE ·
          </span>
        </motion.div>
      </div>

      {/* 6. Perspective Architectural Floor Grid & Crimson Horizon */}
      <motion.div
        style={{ y: shouldReduceMotion ? 0 : gridY }}
        className="absolute inset-x-0 bottom-0 h-[50%] overflow-hidden will-change-transform"
      >
        <div
          className="w-[200%] -ml-[50%] h-full origin-bottom opacity-25"
          style={{
            transform: 'perspective(680px) rotateX(64deg)',
            backgroundImage: `
              linear-gradient(to right, rgba(220, 38, 38, 0.35) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.14) 1px, transparent 1px)
            `,
            backgroundSize: '56px 56px',
            maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#09090B] via-[#09090B]/70 to-transparent" />
      </motion.div>

      {/* 7. Micro-Embers Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-75"
      />
    </div>
  );
};
