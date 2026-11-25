import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { JOURNEY_MILESTONES } from '../../data/universeData';
import {
  CheckCircle2,
  Award,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export const JourneyTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState<string>(JOURNEY_MILESTONES[2].step); // Default to Step 03 (Venture Founder)

  const activeMilestone =
    JOURNEY_MILESTONES.find((m) => m.step === activeStep) || JOURNEY_MILESTONES[0];

  return (
    <div className="w-full max-w-6xl mx-auto my-16 sm:my-24 px-4 sm:px-6 select-none relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-mono text-xs uppercase tracking-widest mb-4">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          <span>Evolutionary Roadmap</span>
        </div>
        <h3
          style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}
          className="font-kanit font-black uppercase text-white tracking-tight leading-none mb-4"
        >
          My Development Journey
        </h3>
        <p className="font-kanit font-light text-sm sm:text-base text-[#D7E2EA]/75 max-w-2xl mx-auto leading-relaxed">
          From foundational computer science concepts to founding SLRJ Digital and prototyping intelligent healthcare architectures.
        </p>
      </div>

      {/* Interactive Horizontal Track (Desktop & Tablet) */}
      <div className="hidden md:block relative mb-12">
        {/* Glowing Progress Line */}
        <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-[3px] bg-gradient-to-r from-cyan-500 via-violet-500 to-emerald-400 opacity-30" />

        {/* Milestone Node Buttons */}
        <div className="relative z-10 flex items-center justify-between">
          {JOURNEY_MILESTONES.map((m) => {
            const isSelected = m.step === activeStep;

            return (
              <button
                key={m.step}
                type="button"
                onClick={() => setActiveStep(m.step)}
                className="group flex flex-col items-center cursor-pointer focus:outline-none"
              >
                {/* Node Orb */}
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center font-mono font-black text-sm transition-all duration-300 ${
                    isSelected
                      ? 'bg-gradient-to-br from-cyan-400 to-violet-600 text-white shadow-[0_0_25px_#00F0FF] scale-110 border-2 border-white'
                      : 'bg-[#0E121E] border-2 border-white/15 text-white/50 group-hover:border-cyan-400/50 group-hover:text-white'
                  }`}
                >
                  {m.step}
                </div>

                {/* Period & Title underneath */}
                <div className="mt-3 text-center">
                  <div
                    className={`text-xs font-mono transition-colors ${
                      isSelected ? 'text-cyan-300 font-bold' : 'text-white/40'
                    }`}
                  >
                    {m.period}
                  </div>
                  <div
                    className={`font-kanit text-xs uppercase tracking-wider font-semibold max-w-[130px] truncate transition-colors ${
                      isSelected ? 'text-white' : 'text-white/60 group-hover:text-white'
                    }`}
                  >
                    {m.phase}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Milestone Stepper */}
      <div className="md:hidden flex items-center justify-between gap-2 mb-8 overflow-x-auto pb-2">
        {JOURNEY_MILESTONES.map((m) => {
          const isSelected = m.step === activeStep;
          return (
            <button
              key={m.step}
              type="button"
              onClick={() => setActiveStep(m.step)}
              className={`flex-1 p-3 rounded-xl border text-center transition-all cursor-pointer ${
                isSelected
                  ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-lg'
                  : 'bg-white/[0.03] border-white/10 text-white/60'
              }`}
            >
              <div className="font-mono text-xs font-bold text-cyan-300">{m.step}</div>
              <div className="text-[10px] font-mono text-white/50 truncate">{m.period}</div>
            </button>
          );
        })}
      </div>

      {/* Detailed Milestone Stage */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeMilestone.step}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="rounded-[32px] sm:rounded-[38px] bg-[#0A0D18]/90 border-2 border-white/15 p-6 sm:p-8 md:p-10 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_35px_rgba(0,240,255,0.1)]"
        >
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="text-xs font-mono px-3 py-1 rounded-full border shadow-sm font-semibold text-cyan-300 border-cyan-500/30 bg-cyan-950/40">
                  PHASE {activeMilestone.step} · {activeMilestone.period}
                </span>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-white/70">
                  {activeMilestone.status}
                </span>
              </div>
              <h4 className="font-kanit font-black text-2xl sm:text-3xl md:text-4xl uppercase text-white tracking-tight leading-tight">
                {activeMilestone.title}
              </h4>
              <p className="text-xs sm:text-sm font-mono text-cyan-400/90 uppercase tracking-widest mt-1">
                {activeMilestone.phase}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/10">
              <Award className="w-5 h-5 text-cyan-400" />
              <div className="text-right">
                <span className="text-[10px] font-mono uppercase text-white/50 block">
                  Milestone Badge
                </span>
                <span className="font-kanit font-bold text-white text-xs sm:text-sm">
                  {activeMilestone.metrics}
                </span>
              </div>
            </div>
          </div>

          {/* Narrative Summary */}
          <div className="my-6">
            <p className="font-kanit font-light text-sm sm:text-base text-[#D7E2EA]/90 leading-relaxed">
              {activeMilestone.summary}
            </p>
          </div>

          {/* Achievements Checklist */}
          <div className="mb-8">
            <h5 className="font-kanit font-bold text-xs uppercase tracking-widest text-white/60 mb-3">
              Key Achievements &amp; Breakthroughs
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {activeMilestone.highlights.map((h, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between gap-2"
                >
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>Focus 0{idx + 1}</span>
                  </div>
                  <p className="font-kanit font-light text-xs sm:text-sm text-[#D7E2EA]/85 leading-snug">
                    {h}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Row */}
          <div className="pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-white/50 mr-1">Stack:</span>
              {activeMilestone.technologies.map((t) => (
                <span
                  key={t}
                  className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white/80"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="text-xs font-mono text-cyan-400/80 flex items-center gap-1.5">
              <span>Next Phase Ahead</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
