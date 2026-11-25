import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText, ArrowUpRight } from 'lucide-react';
import { NAV_LINKS } from '../data/portfolioData';
import { ResumeModal } from './ResumeModal';
import { useSmoothScroll } from '../animations/useSmoothScroll';
import { AudioController } from './AudioController';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollTo } = useSmoothScroll();
  const rafId = useRef<number | null>(null);

  // Performance-optimized scroll spy with requestAnimationFrame
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.substring(1));

    const onScroll = () => {
      if (rafId.current !== null) return;

      rafId.current = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);

        const scrollPosition = window.scrollY + 140;

        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const sec = document.getElementById(sectionIds[i]);
          if (sec && sec.offsetTop <= scrollPosition) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
        rafId.current = null;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollTo(href, { offset: -70 });
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#09090B]/90 backdrop-blur-md border-b border-white/10 shadow-[0_4px_25px_rgba(0,0,0,0.8)] py-3'
            : 'bg-transparent border-b border-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
          {/* Brand Logo / Text */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer min-w-0"
          >
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-extrabold text-xs sm:text-sm shadow-sm shadow-red-600/40 group-hover:bg-red-700 transition-colors flex-shrink-0">
              SK
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-extrabold text-xs sm:text-base tracking-tight text-white group-hover:text-red-500 transition-colors truncate">
                SHAHID KOULURI
              </span>
              <span className="text-[10px] text-zinc-400 font-medium -mt-1 hidden sm:block">
                Founder · SLRJ Digital
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 bg-[#18181B]/80 border border-white/10 p-1.5 rounded-full shadow-inner">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                      : 'text-zinc-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Ambient Audio, Resume Download Button & Mobile Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
            {/* Cinematic Sound Controller */}
            <AudioController />

            <button
              type="button"
              onClick={() => setResumeModalOpen(true)}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-red-600/30 transition-all duration-200 cursor-pointer active:scale-95"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Resume</span>
              <span className="sm:hidden">CV</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/10 transition-colors border border-white/10"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer + Backdrop Scrim */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setMobileMenuOpen(false)}
                className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              />
              <motion.div
                data-lenis-prevent
                initial={{ opacity: 0, y: -12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.97 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="lg:hidden fixed inset-x-3.5 sm:inset-x-6 top-[68px] bg-[#121216] border border-white/15 rounded-2xl p-4 sm:p-5 shadow-2xl flex flex-col gap-1.5 z-50 max-h-[82vh] overflow-y-auto"
              >
                <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-1 px-3 font-mono">
                  Navigation
                </div>
                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                        isActive
                          ? 'bg-red-600/20 text-red-400 border border-red-500/30'
                          : 'text-zinc-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-50" />
                    </a>
                  );
                })}
                <div className="pt-3 border-t border-white/10 mt-1 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setResumeModalOpen(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs shadow-md shadow-red-600/30 transition-colors cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View &amp; Download Resume</span>
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* Resume Viewer Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </>
  );
};
