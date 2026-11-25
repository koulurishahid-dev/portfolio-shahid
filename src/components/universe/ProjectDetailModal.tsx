import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ProjectItem } from '../../data/universeData';
import {
  X,
  ExternalLink,
  CheckCircle2,
  Cpu,
  Globe,
  Gauge,
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

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#040508]/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[32px] bg-[#0A0D18] border-2 border-white/15 p-6 sm:p-8 md:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_50px_rgba(0,240,255,0.15)] z-10"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="mb-6 pr-10">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-mono font-bold text-cyan-400">
                PROJ #{project.number}
              </span>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-white/75">
                {project.status}
              </span>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-300">
                {project.category}
              </span>
            </div>
            <h2 className="font-kanit font-black text-2xl sm:text-3xl md:text-4xl uppercase text-white tracking-tight">
              {project.name}
            </h2>
            <p className="font-kanit font-normal text-sm sm:text-base text-cyan-300/90 mt-1">
              {project.tagline}
            </p>
          </div>

          {/* Full Narrative */}
          <div className="space-y-4 mb-8">
            <p className="font-kanit font-light text-sm sm:text-base text-[#D7E2EA]/90 leading-relaxed">
              {project.fullNarrative}
            </p>
          </div>

          {/* Architecture & Performance Box */}
          <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-5 sm:p-6 mb-8 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs uppercase tracking-wider font-semibold">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Architecture Blueprint &amp; Specs</span>
              </div>
              {project.architecture.performanceScore && (
                <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-950/40 border border-emerald-500/30">
                  <Gauge className="w-3.5 h-3.5" />
                  <span>{project.architecture.performanceScore}</span>
                </div>
              )}
            </div>

            <div className="text-xs sm:text-sm font-mono text-white/80">
              <span className="text-white/50">Stack: </span>
              <span className="text-cyan-300">{project.architecture.stack}</span>
            </div>

            <div className="space-y-2">
              {project.architecture.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-light text-[#D7E2EA]/85">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Deliverables */}
          <div className="mb-8">
            <h4 className="font-kanit font-bold text-sm uppercase text-white tracking-wider mb-3">
              Key Capabilities &amp; Deliverables
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.keyFeatures.map((f, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-[#D7E2EA]/85"
                >
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Multi-angle Preview Images */}
          <div className="mb-8">
            <h4 className="font-kanit font-bold text-sm uppercase text-white tracking-wider mb-3">
              Project Preview &amp; Interfaces
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.images.map((img, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden border border-white/10 bg-black/40 group"
                >
                  <div className="h-36 overflow-hidden">
                    <img
                      src={img.url}
                      alt={img.caption}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-2.5 bg-[#08090D] border-t border-white/10">
                    <span className="text-[10px] font-mono uppercase text-cyan-300 block mb-0.5">
                      {img.label}
                    </span>
                    <p className="text-[11px] text-white/60 font-light truncate">
                      {img.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Badges */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[#D7E2EA]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Footer CTAs */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-kanit font-semibold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Globe className="w-4 h-4" />
                  <span>Launch Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/20 text-[#D7E2EA] hover:text-white font-kanit font-semibold text-xs uppercase tracking-wider hover:border-cyan-400/50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <GithubIcon className="w-4 h-4 text-cyan-400" />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-white/20 text-white/70 hover:text-white hover:bg-white/[0.04] text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
            >
              Close Inspector
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
