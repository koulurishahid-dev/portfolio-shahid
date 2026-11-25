import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ExternalLink,
  Globe,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';
import type { ProjectItem } from '../data/portfolioData';
import { GithubIcon } from './SocialIcons';

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
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          data-lenis-prevent
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#121216] rounded-2xl sm:rounded-3xl shadow-2xl border border-white/15 p-6 sm:p-8 md:p-10 z-10 text-white"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badge & Category */}
          <div className="flex items-center gap-2 mb-2 pr-10">
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                project.isConcept
                  ? 'bg-zinc-800 text-zinc-300 border-zinc-700'
                  : 'bg-red-950/60 text-red-300 border-red-500/30'
              }`}
            >
              {project.badge || project.category}
            </span>
            <span className="text-xs text-zinc-400 font-medium">
              {project.category}
            </span>
          </div>

          {/* Project Title */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
            {project.title}
          </h2>

          {/* Hero Preview Image */}
          <div className="w-full h-52 sm:h-72 rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-black/50 mb-6">
            <img
              src={project.imageUrl}
              alt={`${project.title} preview`}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 450'><rect width='800' height='450' fill='%2309090B'/><circle cx='400' cy='225' r='75' fill='%23DC2626' opacity='0.35'/><text x='50%' y='53%' font-size='22' font-family='sans-serif' font-weight='700' fill='%23FFFFFF' text-anchor='middle'>${encodeURIComponent(project.title)}</text></svg>`;
              }}
            />
          </div>

          {/* Narrative Overview */}
          <div className="space-y-4 mb-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              Project Overview &amp; Purpose
            </h3>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
              {project.fullDescription}
            </p>
          </div>

          {/* Key Deliverables & Features */}
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">
              Key Capabilities &amp; Deliverables
            </h3>
            <div className="space-y-2">
              {project.keyFeatures.map((feat, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-[#18181B] border border-white/10 text-xs sm:text-sm text-zinc-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Business Impact if available */}
          {project.businessImpact && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/30">
              <div className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-wider mb-1">
                <TrendingUp className="w-4 h-4 text-red-500" />
                <span>Real-World Impact &amp; Role</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                {project.businessImpact}
              </p>
            </div>
          )}

          {/* Technology Stack Pills */}
          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">
              Technologies &amp; Architecture
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-medium px-3 py-1 rounded-full bg-[#18181B] text-zinc-300 border border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5">
              {project.website && (
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm shadow-sm shadow-red-600/30 transition-colors cursor-pointer"
                >
                  <Globe className="w-4 h-4" />
                  <span>
                    {project.githubUrl && project.githubUrl === project.website
                      ? 'View Repository'
                      : 'Visit Project Live'}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              )}

              {project.githubUrl && project.githubUrl !== project.website && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#18181B] hover:bg-white text-zinc-200 hover:text-black border border-white/15 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>View Source Code</span>
                </a>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              Close Details
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
