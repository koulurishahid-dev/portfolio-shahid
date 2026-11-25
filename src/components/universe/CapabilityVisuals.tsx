import React from 'react';
import { motion } from 'framer-motion';

interface CapabilityVisualProps {
  id: string;
}

export const CapabilityVisual: React.FC<CapabilityVisualProps> = ({ id }) => {
  switch (id) {
    case 'frontend':
      return (
        <div className="w-full h-full min-h-[220px] rounded-2xl bg-[#06080D] border border-cyan-500/20 p-4 relative overflow-hidden flex flex-col justify-between">
          {/* Mock Browser Header */}
          <div className="flex items-center justify-between border-b border-cyan-500/10 pb-2 mb-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <div className="text-[10px] font-mono text-cyan-400/80 px-2.5 py-0.5 rounded-full bg-cyan-950/40 border border-cyan-500/20">
              viewport: responsive · 60fps
            </div>
          </div>

          {/* Animated UI layout blocks */}
          <div className="grid grid-cols-12 gap-2 flex-grow items-center">
            {/* Sidebar block */}
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="col-span-3 h-24 rounded-lg bg-gradient-to-b from-cyan-500/20 to-blue-500/10 border border-cyan-400/30 flex flex-col p-2 gap-1.5"
            >
              <div className="w-8 h-2 rounded bg-cyan-400/60" />
              <div className="w-full h-1.5 rounded bg-white/20" />
              <div className="w-4/5 h-1.5 rounded bg-white/20" />
              <div className="w-3/5 h-1.5 rounded bg-white/20" />
            </motion.div>

            {/* Main view blocks */}
            <div className="col-span-9 flex flex-col gap-2">
              {/* Hero Banner block */}
              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="h-11 rounded-lg bg-gradient-to-r from-cyan-500/30 via-violet-500/20 to-transparent border border-cyan-400/40 p-2 flex items-center justify-between"
              >
                <div className="space-y-1">
                  <div className="w-16 h-2 rounded bg-cyan-300 font-mono" />
                  <div className="w-28 h-1.5 rounded bg-white/30" />
                </div>
                <div className="w-6 h-6 rounded-full bg-cyan-400/30 border border-cyan-300 animate-pulse" />
              </motion.div>

              {/* Grid cards */}
              <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.4 }}
                    className="h-10 rounded-md bg-white/[0.04] border border-white/10 p-1.5 flex flex-col justify-between"
                  >
                    <div className="w-4 h-1.5 rounded bg-cyan-400/50" />
                    <div className="w-full h-1 rounded bg-white/20" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom readout */}
          <div className="mt-2 pt-2 border-t border-cyan-500/10 flex items-center justify-between text-[10px] font-mono text-white/50">
            <span>&lt;Component tree /&gt;</span>
            <span className="text-cyan-400">Zero CLS · Strict Mode</span>
          </div>
        </div>
      );

    case 'backend':
      return (
        <div className="w-full h-full min-h-[220px] rounded-2xl bg-[#06080D] border border-violet-500/20 p-4 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-violet-500/10 pb-2 mb-3">
            <span className="text-[10px] font-mono text-violet-400 uppercase tracking-wider">
              API Pipeline Telemetry
            </span>
            <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-950/40 border border-emerald-500/30">
              HTTP 200 OK · 24ms
            </span>
          </div>

          {/* Node Flow Animation */}
          <div className="flex items-center justify-between relative py-4">
            {/* Flow line */}
            <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-violet-600 via-sky-500 to-emerald-500" />

            {/* Traveling packet */}
            <motion.div
              animate={{ left: ['8%', '92%'], opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'linear' }}
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_10px_#00F0FF] z-10"
            />

            {/* Node 1: Client */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-[#0E121E] border border-violet-500/40 flex items-center justify-center text-[10px] font-mono text-violet-300 shadow-md">
                REQ
              </div>
              <span className="text-[9px] font-mono text-white/60 mt-1">Client</span>
            </div>

            {/* Node 2: Router */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-[#0E121E] border border-cyan-500/40 flex items-center justify-center text-[10px] font-mono text-cyan-300 shadow-md">
                JWT
              </div>
              <span className="text-[9px] font-mono text-white/60 mt-1">Auth Guard</span>
            </div>

            {/* Node 3: Controller */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-[#0E121E] border border-emerald-500/40 flex items-center justify-center text-[10px] font-mono text-emerald-300 shadow-md">
                API
              </div>
              <span className="text-[9px] font-mono text-white/60 mt-1">Controller</span>
            </div>
          </div>

          <div className="bg-[#0A0D16] p-2 rounded-lg font-mono text-[10px] text-violet-300 border border-violet-500/20">
            <code>GET /api/v1/telemetry ➔ status: authenticated</code>
          </div>
        </div>
      );

    case 'aiml':
      return (
        <div className="w-full h-full min-h-[220px] rounded-2xl bg-[#06080D] border border-sky-500/20 p-4 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-sky-500/10 pb-2 mb-2">
            <span className="text-[10px] font-mono text-sky-400 uppercase tracking-wider">
              Neural Synapse Network
            </span>
            <span className="text-[10px] font-mono text-cyan-300 px-2 py-0.5 rounded-full bg-sky-950/40 border border-sky-500/30">
              Loss: 0.014 · Epoch 100
            </span>
          </div>

          {/* Neural layers visualization */}
          <div className="relative flex-grow flex items-center justify-around py-3">
            {/* Input layer (3 nodes) */}
            <div className="flex flex-col gap-3">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                  className="w-4 h-4 rounded-full bg-sky-500/30 border-2 border-sky-400 flex items-center justify-center shadow-[0_0_8px_rgba(56,189,248,0.5)]"
                />
              ))}
            </div>

            {/* Hidden layer (4 nodes) */}
            <div className="flex flex-col gap-2">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ repeat: Infinity, duration: 2, delay: 0.4 + i * 0.25 }}
                  className="w-3.5 h-3.5 rounded-full bg-violet-500/40 border-2 border-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.5)]"
                />
              ))}
            </div>

            {/* Output layer (2 nodes) */}
            <div className="flex flex-col gap-4">
              {[0, 1].map((i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2, delay: 0.8 + i * 0.4 }}
                  className="w-5 h-5 rounded-full bg-cyan-400/40 border-2 border-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.7)] flex items-center justify-center"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-white/60 border-t border-sky-500/10 pt-2">
            <span>Inputs (Tensor X)</span>
            <span>Dense (ReLU)</span>
            <span className="text-cyan-400">Class ŷ (Softmax)</span>
          </div>
        </div>
      );

    case 'database':
      return (
        <div className="w-full h-full min-h-[220px] rounded-2xl bg-[#06080D] border border-emerald-500/20 p-4 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-emerald-500/10 pb-2 mb-2">
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
              Relational Schema &amp; ACID
            </span>
            <span className="text-[10px] font-mono text-emerald-300">Indexed · B-Tree</span>
          </div>

          <div className="space-y-2 flex-grow flex flex-col justify-center">
            {/* Schema row 1 */}
            <motion.div
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="p-2 rounded-lg bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between font-mono text-[11px]"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-emerald-300 font-semibold">users.id</span>
              </div>
              <span className="text-white/50 text-[10px]">UUID PRIMARY KEY</span>
            </motion.div>

            {/* Schema row 2 */}
            <motion.div
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
              className="p-2 rounded-lg bg-emerald-950/15 border border-emerald-500/20 flex items-center justify-between font-mono text-[11px]"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-cyan-300">records.user_id</span>
              </div>
              <span className="text-cyan-400/80 text-[10px]">FK ➔ users.id</span>
            </motion.div>

            {/* Schema row 3 */}
            <div className="p-2 rounded-lg bg-white/[0.02] border border-white/10 flex items-center justify-between font-mono text-[10px] text-white/60">
              <span>transaction.commit()</span>
              <span className="text-emerald-400">Strict Serialization</span>
            </div>
          </div>

          <div className="text-[10px] font-mono text-white/50 border-t border-emerald-500/10 pt-2 flex justify-between">
            <span>Engine: PostgreSQL 16</span>
            <span className="text-emerald-400">Query Time: 1.2ms</span>
          </div>
        </div>
      );

    case 'uiux':
      return (
        <div className="w-full h-full min-h-[220px] rounded-2xl bg-[#06080D] border border-pink-500/20 p-4 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-pink-500/10 pb-2 mb-2">
            <span className="text-[10px] font-mono text-pink-400 uppercase tracking-wider">
              Ergonomic Design Canvas
            </span>
            <span className="text-[10px] font-mono text-pink-300">WCAG AAA Contrast</span>
          </div>

          {/* Color & Typography System */}
          <div className="flex-grow flex flex-col justify-center gap-3">
            {/* Color swatches */}
            <div className="flex items-center justify-between gap-2">
              {[
                { hex: '#00F0FF', label: 'Cyan' },
                { hex: '#8B5CF6', label: 'Violet' },
                { hex: '#EC4899', label: 'Pink' },
                { hex: '#08090D', label: 'Dark 900' },
              ].map((swatch) => (
                <div key={swatch.hex} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full h-8 rounded-lg border border-white/20 shadow-sm"
                    style={{ backgroundColor: swatch.hex }}
                  />
                  <span className="text-[9px] font-mono text-white/60">{swatch.label}</span>
                </div>
              ))}
            </div>

            {/* Typography hierarchy demo */}
            <div className="p-2.5 rounded-lg bg-white/[0.03] border border-pink-500/20 space-y-1">
              <div className="text-xs font-kanit font-black text-white uppercase tracking-tight">
                Kanit Black 800 · Header
              </div>
              <div className="text-[11px] font-kanit font-light text-[#D7E2EA]/70">
                Body copy tailored for high readability and zero cognitive fatigue.
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-white/50 border-t border-pink-500/10 pt-2">
            <span>Figma Tokens System</span>
            <span className="text-pink-400">8pt Grid Alignment</span>
          </div>
        </div>
      );

    case 'fullstack':
      return (
        <div className="w-full h-full min-h-[220px] rounded-2xl bg-[#06080D] border border-cyan-500/20 p-4 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-cyan-500/10 pb-2 mb-2">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
              Unified Full Stack Synergy
            </span>
            <span className="text-[10px] font-mono text-emerald-400">Vercel Edge Ready</span>
          </div>

          {/* Stack Tier Layers */}
          <div className="flex-grow flex flex-col justify-center gap-2">
            {[
              { tier: 'Client View', desc: 'React 19 + Tailwind + Next App Router', color: 'border-cyan-400/40 text-cyan-300' },
              { tier: 'Edge Proxy', desc: 'Vercel Serverless & Middleware', color: 'border-violet-400/40 text-violet-300' },
              { tier: 'API & Business Logic', desc: 'Node.js + REST Endpoints', color: 'border-blue-400/40 text-blue-300' },
              { tier: 'Database Store', desc: 'PostgreSQL Relational Storage', color: 'border-emerald-400/40 text-emerald-300' },
            ].map((layer, idx) => (
              <motion.div
                key={layer.tier}
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 3, delay: idx * 0.4 }}
                className={`px-3 py-1.5 rounded-lg bg-white/[0.03] border flex items-center justify-between text-[10px] font-mono ${layer.color}`}
              >
                <span className="font-bold">{layer.tier}</span>
                <span className="text-white/60 text-[9px]">{layer.desc}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-white/50 border-t border-cyan-500/10 pt-2">
            <span>End-to-End TypeScript</span>
            <span className="text-cyan-400">Synchronized Models</span>
          </div>
        </div>
      );

    case 'problem-solving':
      return (
        <div className="w-full h-full min-h-[220px] rounded-2xl bg-[#06080D] border border-amber-500/20 p-4 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-amber-500/10 pb-2 mb-2">
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
              Algorithm Graph Traversal
            </span>
            <span className="text-[10px] font-mono text-amber-300 font-bold">O(log n) · Optimized</span>
          </div>

          {/* Binary Search Tree / Graph Traversal Animation */}
          <div className="flex-grow flex flex-col items-center justify-center relative py-2">
            {/* Root node */}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-7 h-7 rounded-full bg-amber-500/30 border-2 border-amber-400 flex items-center justify-center text-[10px] font-mono text-amber-200 shadow-[0_0_10px_rgba(245,158,11,0.5)] z-10"
            >
              50
            </motion.div>

            {/* Connecting lines */}
            <div className="w-24 h-4 border-t-2 border-amber-400/40 border-l-2 border-r-2 rounded-t-sm my-1" />

            {/* Level 2 children */}
            <div className="flex items-center justify-between w-32">
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.4 }}
                className="w-6 h-6 rounded-full bg-white/[0.05] border border-amber-300/40 flex items-center justify-center text-[9px] font-mono text-white"
              >
                25
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.25, 1], borderColor: ['#F59E0B', '#10B981', '#F59E0B'] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.8 }}
                className="w-6 h-6 rounded-full bg-emerald-500/30 border-2 border-emerald-400 flex items-center justify-center text-[9px] font-mono text-emerald-200 shadow-[0_0_8px_rgba(16,185,129,0.6)]"
              >
                75
              </motion.div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-white/50 border-t border-amber-500/10 pt-2">
            <span>Search Path: Target Found</span>
            <span className="text-emerald-400">Steps: 2</span>
          </div>
        </div>
      );

    default:
      return null;
  }
};
