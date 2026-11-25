import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CAPABILITIES_DATA,
} from '../../data/universeData';
import { CapabilityVisual } from './CapabilityVisuals';
import {
  Layout,
  Server,
  Cpu,
  Database,
  Palette,
  Layers,
  Brain,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface CapabilitiesExplorerProps {
  onSelectProject?: (projectId: string) => void;
}

const renderCapabilityIcon = (id: string, className = 'w-5 h-5') => {
  switch (id) {
    case 'frontend':
      return <Layout className={className} />;
    case 'backend':
      return <Server className={className} />;
    case 'aiml':
      return <Cpu className={className} />;
    case 'database':
      return <Database className={className} />;
    case 'uiux':
      return <Palette className={className} />;
    case 'fullstack':
      return <Layers className={className} />;
    case 'problem-solving':
      return <Brain className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};

export const CapabilitiesExplorer: React.FC<CapabilitiesExplorerProps> = ({
  onSelectProject,
}) => {
  const [selectedId, setSelectedId] = useState<string>(CAPABILITIES_DATA[0].id);

  const activeCapability =
    CAPABILITIES_DATA.find((c) => c.id === selectedId) || CAPABILITIES_DATA[0];

  return (
    <div className="w-full max-w-6xl mx-auto my-16 sm:my-24 px-4 sm:px-6 select-none relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 font-mono text-xs uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Interactive Competency Matrix</span>
        </div>
        <h3
          style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}
          className="font-kanit font-black uppercase text-white tracking-tight leading-none mb-4"
        >
          Explore My Capabilities
        </h3>
        <p className="font-kanit font-light text-sm sm:text-base text-[#D7E2EA]/75 max-w-2xl mx-auto leading-relaxed">
          Select or hover through my technical disciplines to inspect architectural competencies, toolkits, live animations, and associated projects.
        </p>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Column: Interactive Capability Selector List (7 areas) */}
        <div className="lg:col-span-5 flex flex-col gap-2.5 sm:gap-3">
          {CAPABILITIES_DATA.map((cap) => {
            const isSelected = cap.id === selectedId;

            return (
              <button
                key={cap.id}
                type="button"
                onClick={() => setSelectedId(cap.id)}
                onMouseEnter={() => setSelectedId(cap.id)}
                className={`group relative text-left w-full p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#101422] border-cyan-400/60 shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(0,240,255,0.15)] scale-[1.01]'
                    : 'bg-[#0B0D15]/80 hover:bg-[#101424]/60 border-white/10 hover:border-white/20'
                }`}
                aria-pressed={isSelected}
              >
                {/* Active Indicator Glow Bar */}
                {isSelected && (
                  <motion.div
                    layoutId="activeCapabilityPill"
                    className="absolute left-0 top-3 bottom-3 w-1.5 rounded-r-full bg-gradient-to-b from-cyan-400 to-violet-500 shadow-[0_0_12px_#00F0FF]"
                  />
                )}

                <div className="flex items-center gap-3.5 pl-2">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200 ${
                      isSelected
                        ? 'bg-gradient-to-br from-cyan-500/30 to-violet-500/30 text-cyan-300 border border-cyan-400/40'
                        : 'bg-white/[0.04] text-white/60 group-hover:text-white border border-white/10'
                    }`}
                  >
                    {renderCapabilityIcon(cap.id, 'w-5 h-5')}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-cyan-400/80">
                        {cap.number}
                      </span>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/[0.04] text-white/50 border border-white/10">
                        {cap.shortTag}
                      </span>
                    </div>
                    <h4
                      className={`font-kanit font-bold text-sm sm:text-base uppercase tracking-wide transition-colors ${
                        isSelected ? 'text-white' : 'text-[#D7E2EA]/80 group-hover:text-white'
                      }`}
                    >
                      {cap.name}
                    </h4>
                  </div>
                </div>

                <div className="text-right flex items-center gap-2">
                  <span
                    className={`text-xs font-mono transition-transform duration-200 ${
                      isSelected ? 'text-cyan-400 translate-x-0 font-bold' : 'text-white/30 group-hover:text-white/70'
                    }`}
                  >
                    ➔
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Dynamic Deep Dive Card & Live Animation */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCapability.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="rounded-[30px] sm:rounded-[36px] bg-[#0A0D18]/90 border-2 border-white/10 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col gap-6"
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
                <div className="flex items-center gap-3.5">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{
                      background: `radial-gradient(circle, ${activeCapability.accent}33 0%, rgba(10,13,24,0.8) 100%)`,
                      border: `1.5px solid ${activeCapability.accent}88`,
                      color: activeCapability.accent,
                    }}
                  >
                    {renderCapabilityIcon(activeCapability.id, 'w-6 h-6')}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-semibold" style={{ color: activeCapability.accent }}>
                        {activeCapability.number} · {activeCapability.badge}
                      </span>
                    </div>
                    <h4 className="font-kanit font-black text-xl sm:text-2xl uppercase text-white tracking-tight leading-tight">
                      {activeCapability.name}
                    </h4>
                  </div>
                </div>

                {/* Metrics Chips */}
                <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-1.5">
                  {activeCapability.metrics.map((m) => (
                    <span
                      key={m}
                      className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-cyan-300"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Narrative Description */}
              <p className="font-kanit font-light text-sm sm:text-base leading-relaxed text-[#D7E2EA]/90">
                {activeCapability.description}
              </p>

              {/* Live Visual Animation for this domain */}
              <div className="w-full">
                <div className="text-[11px] font-mono text-white/50 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>Interactive Domain Telemetry</span>
                </div>
                <CapabilityVisual id={activeCapability.id} />
              </div>

              {/* Detailed Competency Points */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono text-white/50 uppercase tracking-wider mb-1">
                  Core Engineering Capabilities
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeCapability.detailedPoints.map((point) => (
                    <div
                      key={point}
                      className="flex items-start gap-2 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-[#D7E2EA]/85 font-kanit font-light leading-snug"
                    >
                      <CheckCircle2
                        className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                        style={{ color: activeCapability.accent }}
                      />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Used Badges */}
              <div>
                <div className="text-[11px] font-mono text-white/50 uppercase tracking-wider mb-2">
                  Technologies &amp; Frameworks
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeCapability.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[#D7E2EA] hover:border-cyan-400/50 hover:text-white transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Related Project Direct Action */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-cyan-950/20 via-transparent to-transparent -mx-6 -mb-6 p-6 rounded-b-[30px] sm:rounded-b-[36px]">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">
                    Related Project Implementation
                  </span>
                  <span className="font-kanit font-bold text-white text-sm sm:text-base">
                    {activeCapability.relatedProjectName}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectProject?.(activeCapability.relatedProjectId)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 hover:text-white font-kanit font-semibold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer self-start sm:self-auto"
                >
                  <span>Inspect Related Project</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
