import React, { useState } from 'react';
import { SmoothScrollProvider } from './animations/SmoothScrollProvider';
import { CinematicOpening } from './cinematic/CinematicOpening';
import { CustomCursor } from './animations/CustomCursor';
import { ScrollProgressBar } from './animations/ScrollProgressBar';
import { Navbar } from './components/Navbar';
import { ScrollKineticBanner } from './components/ScrollKineticBanner';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { SkillsSection } from './sections/SkillsSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { VisionSection } from './sections/VisionSection';
import { LearningJourneySection } from './sections/LearningJourneySection';
import { PhilosophySection } from './sections/PhilosophySection';
import { ContactSection } from './sections/ContactSection';
import { FooterSection } from './sections/FooterSection';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const App: React.FC = () => {
  const [, setCinematicComplete] = useState(false);

  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen bg-[#09090B] text-white font-sans selection:bg-red-600/30 selection:text-white overflow-x-clip">
        {/* 1. Cinematic Opening Sequence (Part 3) */}
        <CinematicOpening
          onComplete={() => {
            setCinematicComplete(true);
            setTimeout(() => {
              ScrollTrigger.refresh();
            }, 100);
          }}
        />

        {/* 2. Custom Magnetic Desktop Cursor */}
        <CustomCursor />

        {/* 4. Global Animated Scroll Progress Indicator */}
        <ScrollProgressBar />

        {/* 5. Sticky HUD Header Navigation */}
        <Navbar />

        {/* 6. The 7 Cinematic Chapters */}
        <main className="relative z-10">
          <HeroSection />
          <ScrollKineticBanner variant="hero-to-about" />
          <AboutSection />
          <ExperienceSection />
          <SkillsSection />
          <ScrollKineticBanner variant="projects-to-skills" />
          <ProjectsSection />
          <VisionSection />
          <LearningJourneySection />
          <PhilosophySection />
          <ContactSection />
        </main>

        {/* 7. Footer */}
        <FooterSection />
      </div>
    </SmoothScrollProvider>
  );
};

export default App;
