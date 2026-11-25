import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import {
  Info,
  ArrowUpRight,
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';
import type { ProjectItem } from '../data/portfolioData';
import { ProjectDetailModal } from '../components/ProjectDetailModal';
import { GithubIcon } from '../components/SocialIcons';
import { TiltCard } from '../animations/TiltCard';
import { Magnetic } from '../animations/Magnetic';
import { useMediaQuery } from '../hooks/useMediaQuery';

interface ProjectCardItemProps {
  project: ProjectItem;
  idx: number;
  isMultiCol: boolean;
  onSelect: (p: ProjectItem) => void;
  shouldReduceMotion: boolean | null;
}

const ProjectCardItem: React.FC<ProjectCardItemProps> = ({
  project,
  idx,
  isMultiCol,
  onSelect,
  shouldReduceMotion,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isRightCol = idx % 2 === 1;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 95%', 'end 12%'],
  });

  const { scrollYProgress: mobileEnterProgress } = useScroll({
    target: cardRef,
    offset: ['start 96%', 'start 65%'],
  });

  // Opposing asymmetric left vs right column trajectories on md+ screens
  const cardY = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    isRightCol ? [95, 20, 40] : [55, -10, -40]
  );
  const cardX = useTransform(
    scrollYProgress,
    [0, 0.4, 1],
    isRightCol ? [42, 0, 14] : [-42, 0, -14]
  );
  const cardScale = useTransform(scrollYProgress, [0, 0.4, 0.95], [0.93, 1, 0.97]);
  const cardRotate = useTransform(
    scrollYProgress,
    [0, 0.4, 1],
    isRightCol ? [2, 0, 0.7] : [-2, 0, -0.7]
  );

  // Uniform mobile entrance without colliding cards vertically
  const mobileY = useTransform(mobileEnterProgress, [0, 1], [26, 0]);
  const mobileScale = useTransform(mobileEnterProgress, [0, 1], [0.96, 1]);

  // Inner image parallax zoom & slide inside frame while scrolling
  const imgY = useTransform(scrollYProgress, [0, 1], isMultiCol ? [-20, 20] : [-12, 12]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.16, 1.05, 1.12]);

  return (
    <motion.div
      ref={cardRef}
      style={
        shouldReduceMotion
          ? undefined
          : isMultiCol
            ? { y: cardY, x: cardX, scale: cardScale, rotate: cardRotate }
            : { y: mobileY, scale: mobileScale }
      }
      className="h-full will-change-transform"
    >
      <TiltCard
        maxRotation={isMultiCol ? 5 : 0}
        scaleOnHover={isMultiCol ? 1.015 : 1}
        className="rounded-3xl bg-[#141418] border border-white/10 shadow-xl overflow-hidden flex flex-col justify-between h-full group hover:border-red-500/40 transition-colors"
      >
        <div>
          {/* Project Image Reveal Container with Internal Parallax */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/50">
            <motion.img
              style={{
                y: shouldReduceMotion ? 0 : imgY,
                scale: shouldReduceMotion ? 1 : imgScale,
              }}
              src={project.imageUrl}
              alt={`${project.title} preview`}
              className="w-full h-full object-cover will-change-transform"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 450'><rect width='800' height='450' fill='%2309090B'/><circle cx='400' cy='225' r='75' fill='%23DC2626' opacity='0.35'/><text x='50%' y='53%' font-size='22' font-family='sans-serif' font-weight='700' fill='%23FFFFFF' text-anchor='middle'>${encodeURIComponent(project.title)}</text></svg>`;
              }}
            />

            {/* Gradient bottom overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300" />

            {/* Category Badge on Image */}
            <div className="absolute top-4 left-4">
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full shadow-sm backdrop-blur-md border ${
                  project.isConcept
                    ? 'bg-zinc-900/90 text-red-300 border-red-500/40'
                    : 'bg-red-600/90 text-white border-red-500/40 shadow-red-600/20'
                }`}
              >
                {project.badge || project.category}
              </span>
            </div>
          </div>

          {/* Card Content Body */}
          <div className="p-6 sm:p-8">
            <div className="text-xs font-bold uppercase tracking-wider text-red-400 mb-1">
              {project.category}
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2 leading-tight">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal mb-5">
              {project.description}
            </p>

            {/* Animated Technology Tags */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              {project.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-[#1C1C22] text-zinc-300 border border-white/10 hover:border-red-500/40 hover:text-white transition-colors"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#18181B] text-zinc-500">
                  +{project.technologies.length - 4} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="px-6 py-4 sm:px-8 sm:py-5 flex items-center justify-between gap-3 border-t border-white/10 mt-2">
          <Magnetic strength={0.2}>
            <button
              type="button"
              onClick={() => onSelect(project)}
              data-cursor="pointer"
              data-cursor-text="INFO"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-zinc-300 hover:text-red-400 transition-colors cursor-pointer"
            >
              <Info className="w-4 h-4 text-red-500" />
              <span>View Details</span>
            </button>
          </Magnetic>

          <div className="flex items-center gap-2">
            {project.githubUrl && project.githubUrl !== project.website && (
              <Magnetic strength={0.2}>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="pointer"
                  data-cursor-text="REPO"
                  aria-label={`${project.title} GitHub repository`}
                  className="w-8 h-8 rounded-xl bg-[#1C1C22] hover:bg-white text-zinc-300 hover:text-black border border-white/15 flex items-center justify-center transition-all duration-200"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              </Magnetic>
            )}

            {project.website && (
              <Magnetic strength={0.2}>
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="pointer"
                  data-cursor-text="OPEN"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs transition-all duration-200 cursor-pointer shadow-sm shadow-red-600/30 group/btn"
                >
                  <span>
                    {project.githubUrl && project.githubUrl === project.website
                      ? 'View Repository'
                      : 'View Project'}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>
              </Magnetic>
            )}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
};

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isMultiCol = useMediaQuery('(min-width: 768px)', true);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const watermarkX = useTransform(scrollYProgress, [0, 1], [120, -140]);
  const headerY = useTransform(scrollYProgress, [0, 1], isMultiCol ? [35, -35] : [16, -16]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-16 sm:py-24 lg:py-32 bg-[#0B0B0E] border-t border-white/10 relative overflow-hidden text-white"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-0 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-red-950/20 blur-[140px] pointer-events-none" />

      {/* Horizontal Scrubbing Watermark */}
      <motion.div
        style={{ x: shouldReduceMotion ? 0 : watermarkX }}
        className="absolute top-12 sm:top-16 left-0 whitespace-nowrap font-black text-[15vw] sm:text-[11vw] leading-none uppercase tracking-tighter text-transparent opacity-[0.03] pointer-events-none select-none will-change-transform"
      >
        <span style={{ WebkitTextStroke: '1.5px rgba(239,68,68,0.85)' }}>
          PROJECTS · VENTURES · PRODUCTS
        </span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          style={{ y: shouldReduceMotion ? 0 : headerY }}
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-20 lg:mb-24 will-change-transform"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-red-950/60 border border-red-500/30 text-red-400 text-[11px] sm:text-xs font-mono font-semibold tracking-wider uppercase mb-4 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>CHAPTER 04 · PROJECT UNIVERSE</span>
              <span className="text-zinc-600 hidden sm:inline">|</span>
              <span className="text-zinc-300 font-sans hidden sm:inline">Ventures &amp; Applications</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              Ideas Into Reality.
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-zinc-300 leading-relaxed max-w-2xl mx-auto">
              Practical web ventures, active client solutions, and healthcare technology initiatives engineered with modern web standards.
            </p>
          </motion.div>
        </motion.div>

        {/* Project Cards Grid with Responsive Asymmetric Scroll Parallax */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 pb-4 sm:pb-8">
          {PROJECTS_DATA.map((project, idx) => (
            <ProjectCardItem
              key={project.id}
              project={project}
              idx={idx}
              isMultiCol={isMultiCol}
              onSelect={setSelectedProject}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
