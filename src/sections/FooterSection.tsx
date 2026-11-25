import React from 'react';
import { ArrowUp, Globe, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '../components/SocialIcons';
import { useSmoothScroll } from '../animations/useSmoothScroll';

const CURRENT_YEAR = 2026;

export const FooterSection: React.FC = () => {
  const { scrollTo } = useSmoothScroll();

  const scrollToTop = () => {
    scrollTo(0, { duration: 1.4 });
  };

  return (
    <footer className="bg-[#050507] text-white py-14 sm:py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/10">
          {/* Identity & Core Philosophy */}
          <div className="text-center md:text-left space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-extrabold text-sm shadow-md shadow-red-600/30">
                SK
              </div>
              <h3 className="text-xl font-extrabold tracking-tight text-white">
                Shahid Kouluri
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 font-medium">
              Technology Enthusiast | Founder | AI/ML Student
            </p>
            <p className="text-xs font-semibold text-red-400 tracking-wide">
              &ldquo;Building today. Thinking about tomorrow.&rdquo;
            </p>
          </div>

          {/* Learn. Build. Grow. Tagline & Social Links */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="text-sm font-bold tracking-wider text-white">
              <span className="text-red-500">Learn.</span> Build.{' '}
              <span className="text-red-500">Grow.</span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="w-9 h-9 rounded-xl bg-[#18181B] hover:bg-red-600 text-zinc-300 hover:text-white border border-white/10 flex items-center justify-center transition-colors shadow-sm"
                aria-label={`Email ${PERSONAL_INFO.email}`}
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.social.slrjDigital}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#18181B] hover:bg-red-600 text-zinc-300 hover:text-white border border-white/10 flex items-center justify-center transition-colors shadow-sm"
                aria-label="SLRJ Digital Website"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#18181B] hover:bg-red-600 text-zinc-300 hover:text-white border border-white/10 flex items-center justify-center transition-colors shadow-sm"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#18181B] hover:bg-red-600 text-zinc-300 hover:text-white border border-white/10 flex items-center justify-center transition-colors shadow-sm"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#18181B] hover:bg-red-600 text-zinc-300 hover:text-white border border-white/10 flex items-center justify-center transition-colors shadow-sm"
                aria-label="Instagram Profile"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back-to-Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            &copy; {CURRENT_YEAR} {PERSONAL_INFO.name}. All rights reserved. Built with modern React &amp; TypeScript.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#18181B] hover:bg-[#27272A] hover:border-red-500/40 text-zinc-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
