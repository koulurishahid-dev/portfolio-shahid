import React from 'react';
import { FadeIn } from '../components/FadeIn';

export const FounderJourneySection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'FOUNDATIONS',
      text: 'Learning programming and web development fundamentals.',
    },
    {
      num: '02',
      title: 'APPLICATION',
      text: 'Building practical projects and improving development skills.',
    },
    {
      num: '03',
      title: 'ENTREPRENEURSHIP',
      text: 'Growing SLRJ Digital and working toward business-focused digital solutions.',
    },
    {
      num: '04',
      title: 'INNOVATION',
      text: 'Exploring healthcare technology and future AI-powered products.',
    },
  ];

  return (
    <section className="bg-[#0C0C0C] py-24 sm:py-32 px-5 sm:px-8 md:px-10 relative overflow-hidden select-none border-t border-[#D7E2EA]/10">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16 sm:mb-20">
          <FadeIn delay={0} y={40}>
            <h2
              style={{ fontSize: 'clamp(2.5rem, 8vw, 110px)' }}
              className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-8"
            >
              BUILDING BEYOND CODE
            </h2>
          </FadeIn>

          <FadeIn delay={0.15} y={30}>
            <div className="max-w-3xl mx-auto text-[#D7E2EA] font-light text-base sm:text-lg leading-relaxed flex flex-col gap-4">
              <p>
                I&apos;m not only interested in writing code. I&apos;m also interested in understanding problems, exploring opportunities, and building products that can make a difference.
              </p>
              <p>
                Through <span className="text-white font-medium">SLRJ Digital</span>, I&apos;m learning how technology can help businesses grow their digital presence. Through my software projects, I&apos;m exploring how applications can improve everyday experiences.
              </p>
              <p className="text-white font-medium">
                My journey is still in progress. Every project is an opportunity to learn, build, and grow.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Minimal Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          {steps.map((item, index) => (
            <FadeIn key={item.num} delay={0.1 * index} y={30}>
              <div className="rounded-3xl border border-[#D7E2EA]/15 bg-white/[0.02] p-6 sm:p-7 flex flex-col justify-between h-full hover:border-[#D7E2EA]/40 transition-colors duration-300">
                <div>
                  <div className="font-black text-3xl sm:text-4xl text-[#D7E2EA]/30 mb-4 font-mono">
                    {item.num}
                  </div>
                  <div className="text-xs uppercase tracking-widest text-[#38BDF8] font-mono mb-2">
                    {item.title}
                  </div>
                  <p className="text-sm text-[#D7E2EA]/80 font-light leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
