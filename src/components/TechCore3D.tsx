import React from 'react';

export const TechCore3D: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}>
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 via-blue-600/10 to-purple-600/20 blur-3xl rounded-full scale-75 animate-pulse" />

      {/* SVG 3D Isometric Digital Planet / Core */}
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
      >
        <defs>
          <radialGradient id="sphereGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#8297A8" />
            <stop offset="45%" stopColor="#252D3A" />
            <stop offset="85%" stopColor="#0E121A" />
            <stop offset="100%" stopColor="#05070B" />
          </radialGradient>

          <linearGradient id="ringGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#818CF8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#C084FC" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="ringGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#3B82F6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1E293B" stopOpacity="0.1" />
          </linearGradient>

          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Ring 1 */}
        <ellipse
          cx="250"
          cy="250"
          rx="210"
          ry="75"
          transform="rotate(-25 250 250)"
          stroke="url(#ringGrad1)"
          strokeWidth="2.5"
          strokeDasharray="16 8 4 8"
          fill="none"
          filter="url(#glowFilter)"
        />

        {/* Outer Ring 2 (Cross angle) */}
        <ellipse
          cx="250"
          cy="250"
          rx="190"
          ry="65"
          transform="rotate(35 250 250)"
          stroke="url(#ringGrad2)"
          strokeWidth="2"
          strokeDasharray="12 12"
          fill="none"
        />

        {/* Main 3D Sphere */}
        <circle cx="250" cy="250" r="130" fill="url(#sphereGrad)" />

        {/* Tech Latitudinal & Longitudinal Wireframe Rings on Sphere */}
        <ellipse cx="250" cy="250" rx="130" ry="45" stroke="#64748B" strokeWidth="1" strokeOpacity="0.4" fill="none" />
        <ellipse cx="250" cy="210" rx="122" ry="35" stroke="#64748B" strokeWidth="0.8" strokeOpacity="0.3" fill="none" />
        <ellipse cx="250" cy="290" rx="122" ry="35" stroke="#64748B" strokeWidth="0.8" strokeOpacity="0.3" fill="none" />

        <ellipse cx="250" cy="250" rx="45" ry="130" stroke="#64748B" strokeWidth="1" strokeOpacity="0.4" fill="none" />
        <ellipse cx="210" cy="250" rx="35" ry="122" stroke="#64748B" strokeWidth="0.8" strokeOpacity="0.3" fill="none" />
        <ellipse cx="290" cy="250" rx="35" ry="122" stroke="#64748B" strokeWidth="0.8" strokeOpacity="0.3" fill="none" />

        {/* Core Glowing Node & Monogram */}
        <circle cx="250" cy="250" r="38" fill="#0C0C0C" stroke="#38BDF8" strokeWidth="2" />
        <text
          x="250"
          y="256"
          fill="#D7E2EA"
          fontSize="22"
          fontFamily="Kanit, sans-serif"
          fontWeight="900"
          textAnchor="middle"
          dominantBaseline="middle"
          letterSpacing="2"
        >
          SK
        </text>

        {/* Floating Code Nodes */}
        <circle cx="160" cy="180" r="4" fill="#38BDF8" filter="url(#glowFilter)" />
        <line x1="160" y1="180" x2="220" y2="230" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.5" />

        <circle cx="340" cy="200" r="4" fill="#818CF8" filter="url(#glowFilter)" />
        <line x1="340" y1="200" x2="280" y2="235" stroke="#818CF8" strokeWidth="1" strokeOpacity="0.5" />

        <circle cx="320" cy="320" r="4" fill="#34D399" filter="url(#glowFilter)" />
        <line x1="320" y1="320" x2="275" y2="275" stroke="#34D399" strokeWidth="1" strokeOpacity="0.5" />

        {/* Front Ring Segment overlay for 3D depth */}
        <path
          d="M 60 250 A 210 75 0 0 0 440 250"
          transform="rotate(-25 250 250)"
          stroke="#BAE6FD"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.9"
        />

        {/* Orbiting Satellite Node */}
        <circle cx="390" cy="190" r="6" fill="#38BDF8" filter="url(#glowFilter)" />
      </svg>
    </div>
  );
};
