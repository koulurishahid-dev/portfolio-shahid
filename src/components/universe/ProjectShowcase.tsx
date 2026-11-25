import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS_DATA } from '../../data/universeData';
import type { ProjectItem } from '../../data/universeData';
import { ProjectDetailModal } from './ProjectDetailModal';
import {
  ExternalLink,
  Layers,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  CheckCircle2,
  Info,
  Globe,
  Radio,
} from 'lucide-react';

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

interface ProjectShowcaseProps {
  selectedProjectId?: string;
  onSelectProject?: (projectId: string) => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  selectedProjectId,
  onSelectProject,
}) => {
  const [internalActiveId, setInternalActiveId] = useState<string>(
    selectedProjectId || PROJECTS_DATA[0].id
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [modalProject, setModalProject] = useState<ProjectItem | null>(null);
  const [activeHotspot, setActiveHotspot] = useState<{
    title: string;
    description: string;
  } | null>(null);

  // Sync external prop if changed
  const activeId = selectedProjectId || internalActiveId;
  const projectIndex = PROJECTS_DATA.findIndex((p) => p.id === activeId);
  const activeProject = projectIndex !== -1 ? PROJECTS_DATA[projectIndex] : PROJECTS_DATA[0];

  const handleSelect = (id: string) => {
    setInternalActiveId(id);
    setSelectedImageIndex(0);
    setActiveHotspot(null);
    onSelectProject?.(id);
  };

  const handleNext = () => {
    const nextIdx = (projectIndex + 1) % PROJECTS_DATA.length;
    handleSelect(PROJECTS_DATA[nextIdx].id);
  };

  const handlePrev = () => {
    const prevIdx = (projectIndex - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length;
    handleSelect(PROJECTS_DATA[prevIdx].id);
  };

  return (
    <div className="w-full max-w-6xl mx-auto my-16 sm:my-24 px-4 sm:px-6 select-none relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-950/40 border border-violet-500/30 text-violet-300 font-mono text-xs uppercase tracking-widest mb-4">
          <Layers className="w-3.5 h-3.5 text-violet-400" />
          <span>Interactive Venture Discovery</span>
        </div>
        <h3
          style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}
          className="font-kanit font-black uppercase text-white tracking-tight leading-none mb-4"
        >
          Featured Project Discovery
        </h3>
        <p className="font-kanit font-light text-sm sm:text-base text-[#D7E2EA]/75 max-w-2xl mx-auto leading-relaxed">
          Step into interactive workspaces, live production ventures, and healthcare prototypes. Explore architecture decisions, inspect code repositories, or launch live platforms.
        </p>
      </div>

      {/* Top Console Project Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8 p-2 rounded-2xl bg-[#090C16] border border-white/10 backdrop-blur-xl">
        <div className="flex flex-wrap items-center gap-2">
          {PROJECTS_DATA.map((p) => {
            const isActive = p.id === activeProject.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => handleSelect(p.id)}
                className={`flex items-center gap-2.5 px-4 py-2 rounded-xl font-mono text-xs uppercase transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/25 to-violet-500/25 border border-cyan-400/50 text-white shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                    : 'bg-white/[0.03] hover:bg-white/[0.08] text-white/60 hover:text-white border border-white/5'
                }`}
              >
                <span className={isActive ? 'text-cyan-400 font-bold' : 'text-white/40'}>
                  {p.number}
                </span>
                <span className="font-semibold tracking-wider">{p.name}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse ml-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Previous / Next Stepper Controls */}
        <div className="flex items-center gap-1.5 ml-auto">
          <button
            type="button"
            onClick={handlePrev}
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-white/70 hover:text-white border border-white/10 transition-colors cursor-pointer"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-white/50 px-2">
            {projectIndex + 1} / {PROJECTS_DATA.length}
          </span>
          <button
            type="button"
            onClick={handleNext}
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-white/70 hover:text-white border border-white/10 transition-colors cursor-pointer"
            aria-label="Next project"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Showcase Deck: Holographic Split Viewport */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeProject.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="relative rounded-[36px] bg-[#0A0D18]/90 border-2 border-white/15 p-6 sm:p-8 md:p-10 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_40px_rgba(0,240,255,0.1)] overflow-hidden"
        >
          {/* Ambient Corner Glow */}
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[130px] opacity-25 pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${activeProject.accentColor} 0%, transparent 70%)`,
            }}
          />

          {/* Large Watermark Number */}
          <div className="absolute top-3 right-6 text-7xl sm:text-9xl font-black font-kanit text-white/[0.03] select-none pointer-events-none">
            {activeProject.number}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
            {/* Left Column: Project Intelligence & Actions */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                {/* Meta Header */}
                <div className="flex flex-wrap items-center gap-2.5 mb-3">
                  <span
                    className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border shadow-sm"
                    style={{
                      borderColor: `${activeProject.accentColor}66`,
                      backgroundColor: `${activeProject.accentColor}18`,
                      color: activeProject.accentColor,
                    }}
                  >
                    {activeProject.status}
                  </span>
                  <span className="text-xs font-mono uppercase tracking-wider text-white/50">
                    {activeProject.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-kanit font-black text-3xl sm:text-4xl md:text-5xl uppercase text-white tracking-tight leading-none mb-2">
                  {activeProject.name}
                </h3>
                <p className="font-kanit font-medium text-sm sm:text-base text-cyan-300 mb-4">
                  {activeProject.tagline}
                </p>

                {/* Narrative Summary */}
                <p className="font-kanit font-light text-sm sm:text-base text-[#D7E2EA]/85 leading-relaxed mb-6">
                  {activeProject.description}
                </p>

                {/* Key Deliverables Bullet Points */}
                <div className="space-y-2 mb-6">
                  {activeProject.keyFeatures.slice(0, 3).map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm font-kanit font-light text-[#D7E2EA]/90"
                    >
                      <CheckCircle2
                        className="w-4 h-4 flex-shrink-0 mt-0.5"
                        style={{ color: activeProject.accentColor }}
                      />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {activeProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                {activeProject.liveUrl && (
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-kanit font-semibold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>{activeProject.buttonLabel}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                {activeProject.repoUrl && (
                  <a
                    href={activeProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/20 text-[#D7E2EA] hover:text-white font-kanit font-semibold text-xs uppercase tracking-wider hover:border-cyan-400/50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <GithubIcon className="w-4 h-4 text-cyan-400" />
                    <span>GitHub Code</span>
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => setModalProject(activeProject)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/15 text-cyan-300 font-kanit font-semibold text-xs uppercase tracking-wider hover:border-cyan-400/50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Inspect Specs</span>
                </button>
              </div>
            </div>

            {/* Right Column: Interactive Multi-View Visual Stage */}
            <div className="lg:col-span-6 flex flex-col gap-3">
              {/* Image Viewport Selector Tabs */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-1.5">
                  {activeProject.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSelectedImageIndex(idx);
                        setActiveHotspot(null);
                      }}
                      className={`px-3 py-1 rounded-lg text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                        selectedImageIndex === idx
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                          : 'bg-white/[0.03] text-white/50 hover:text-white border border-white/5'
                      }`}
                    >
                      {img.label}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setModalProject(activeProject)}
                  className="text-[11px] font-mono text-white/50 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>Expand View</span>
                  <Maximize2 className="w-3 h-3" />
                </button>
              </div>

              {/* Main Image Showcase with 3D Depth & Hotspots */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/15 bg-black/50 shadow-2xl group min-h-[280px] sm:min-h-[360px] md:min-h-[400px] flex items-center justify-center">
                <img
                  src={activeProject.images[selectedImageIndex]?.url}
                  alt={activeProject.images[selectedImageIndex]?.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Gradient shade overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090D] via-transparent to-transparent opacity-60 pointer-events-none" />

                {/* Hotspot Pins (Interactive feature markers on image) */}
                {activeProject.hotspots?.map((hotspot, idx) => (
                  <div
                    key={idx}
                    className="absolute z-20"
                    style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setActiveHotspot(
                          activeHotspot?.title === hotspot.title ? null : hotspot
                        )
                      }
                      onMouseEnter={() => setActiveHotspot(hotspot)}
                      className="relative p-1.5 rounded-full bg-[#08090D]/80 border-2 border-cyan-400 text-cyan-300 hover:scale-125 transition-transform shadow-[0_0_15px_#00F0FF] cursor-pointer"
                      aria-label={`Hotspot: ${hotspot.title}`}
                    >
                      <Radio className="w-3.5 h-3.5 animate-pulse" />
                      <span className="absolute -inset-1 rounded-full bg-cyan-400 opacity-30 animate-ping -z-10" />
                    </button>
                  </div>
                ))}

                {/* Active Hotspot Tooltip */}
                <AnimatePresence>
                  {activeHotspot && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-4 left-4 right-4 z-30 p-3.5 rounded-xl bg-[#090C16]/95 border border-cyan-400/50 backdrop-blur-2xl shadow-2xl flex items-start gap-2.5"
                    >
                      <Info className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-xs font-mono font-bold text-cyan-300 uppercase">
                          {activeHotspot.title}
                        </div>
                        <p className="text-xs text-[#D7E2EA]/90 font-kanit font-light">
                          {activeHotspot.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Image Caption Footer */}
                <div className="absolute bottom-3 left-4 right-4 pointer-events-none flex items-center justify-between text-[11px] font-mono text-white/70">
                  <span className="truncate max-w-[80%]">
                    {activeProject.images[selectedImageIndex]?.caption}
                  </span>
                  <span className="text-cyan-400 font-semibold">
                    {selectedImageIndex + 1}/{activeProject.images.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Expandable Deep Dive Modal */}
      <ProjectDetailModal
        project={modalProject}
        onClose={() => setModalProject(null)}
      />
    </div>
  );
};
