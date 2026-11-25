import React, { useEffect, useRef } from 'react';

export const UniverseBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Subtle star nodes
    const count = Math.min(65, Math.floor((width * height) / 18000));
    const stars: {
      x: number;
      y: number;
      size: number;
      baseAlpha: number;
      alpha: number;
      speed: number;
      color: string;
    }[] = [];

    const colors = ['#00F0FF', '#38BDF8', '#8B5CF6', '#C084FC', '#FFFFFF'];

    for (let i = 0; i < count; i++) {
      const baseAlpha = Math.random() * 0.45 + 0.15;
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.6 + 0.5,
        baseAlpha,
        alpha: baseAlpha,
        speed: (Math.random() - 0.5) * 0.15,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Render subtle stars with gentle twinkle
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.y += s.speed;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        const pulse = Math.sin(time + i) * 0.25;
        const currentAlpha = Math.max(0.08, Math.min(0.9, s.baseAlpha + pulse));

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = currentAlpha;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = s.size > 1.2 ? 6 : 2;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* 1. Deep Space Base Background #08090D */}
      <div className="absolute inset-0 bg-[#08090D]" />

      {/* 2. Layered Ambient Gradient Blobs (Electric Blue, Violet, Cyan) */}
      <div
        className="absolute top-10 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px] opacity-25 mix-blend-screen pointer-events-none animate-pulse"
        style={{
          background: 'radial-gradient(circle, #00F0FF 0%, rgba(6,182,212,0.3) 50%, transparent 80%)',
          animationDuration: '8s',
        }}
      />
      <div
        className="absolute top-1/3 right-10 w-[600px] h-[600px] rounded-full blur-[160px] opacity-20 mix-blend-screen pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #8B5CF6 0%, rgba(139,92,246,0.2) 50%, transparent 80%)',
        }}
      />
      <div
        className="absolute bottom-20 left-10 w-[650px] h-[650px] rounded-full blur-[170px] opacity-15 mix-blend-screen pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #06B6D4 0%, rgba(56,189,248,0.15) 50%, transparent 80%)',
        }}
      />

      {/* 3. Subtle Digital Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* 4. Canvas Stars & Constellations */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* 5. Vignette mask to blend cleanly with surrounding sections */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#08090D] via-transparent to-[#08090D] opacity-80" />
    </div>
  );
};
