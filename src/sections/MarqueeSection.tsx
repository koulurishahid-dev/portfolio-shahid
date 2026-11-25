import React, { useRef, useState, useEffect } from 'react';

interface ShowcaseItem {
  title: string;
  category: string;
  imageUrl: string;
}

const ROW1_ITEMS: ShowcaseItem[] = [
  {
    title: 'Code Architecture',
    category: 'Software Engineering',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
  },
  {
    title: 'Analytics Dashboard',
    category: 'Web Application UI',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
  },
  {
    title: 'Developer Workspace',
    category: 'Building SLRJ Digital',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
  },
  {
    title: 'Neural Network Concept',
    category: 'Artificial Intelligence',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
  },
  {
    title: 'Responsive Web Experience',
    category: 'Frontend Design',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
  },
  {
    title: 'Venture Roadmap',
    category: 'SLRJ Digital Growth',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
  },
  {
    title: 'Data & Security Core',
    category: 'Computer Science',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
  },
  {
    title: 'Smart Medicine Concept',
    category: 'Healthcare Technology',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
  },
  {
    title: 'SLRJ Learn Platform',
    category: 'Education Technology',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
  },
  {
    title: 'UI/UX Prototyping',
    category: 'Digital Product Design',
    imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80',
  },
];

const ROW2_ITEMS: ShowcaseItem[] = [
  {
    title: 'Product Ideation',
    category: 'Problem-Solving Labs',
    imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=80',
  },
  {
    title: 'Cloud & API Integration',
    category: 'Backend Development',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
  },
  {
    title: 'Full-Stack Workflow',
    category: 'Modern Web Stack',
    imageUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&auto=format&fit=crop&q=80',
  },
  {
    title: 'Patient Healthcare Portal',
    category: 'Smart Medicine Architecture',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=80',
  },
  {
    title: 'Algorithms & Problem Solving',
    category: 'Data Structures Practice',
    imageUrl: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&auto=format&fit=crop&q=80',
  },
  {
    title: 'Collaborative Building',
    category: 'Open Source & Git',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
  },
  {
    title: 'Client Web Solutions',
    category: 'SLRJ Digital Agency',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=80',
  },
  {
    title: 'Next.js & React Ecosystem',
    category: 'Component Architecture',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80',
  },
  {
    title: 'AI Technology Exploration',
    category: 'Machine Learning Curriculum',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
  },
  {
    title: 'Continuous Growth',
    category: 'Learn. Build. Grow.',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80',
  },
];

// Tripled lists for seamless scrolling
const ROW1_TRIPLED = [...ROW1_ITEMS, ...ROW1_ITEMS, ...ROW1_ITEMS];
const ROW2_TRIPLED = [...ROW2_ITEMS, ...ROW2_ITEMS, ...ROW2_ITEMS];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!sectionRef.current) return;
          const rect = sectionRef.current.getBoundingClientRect();
          const sectionTop = rect.top + window.scrollY;
          const calcOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
          setOffset(calcOffset);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden select-none"
    >
      <div className="flex flex-col gap-3">
        {/* Row 1: Moves RIGHT on scroll (translateX(offset - 200)) */}
        <div className="overflow-visible w-full">
          <div
            className="flex gap-3 will-change-transform -ml-[1200px]"
            style={{
              transform: `translateX(${offset - 200}px)`,
              willChange: 'transform',
            }}
          >
            {ROW1_TRIPLED.map((item, index) => (
              <div
                key={`row1-${index}`}
                className="w-[420px] h-[270px] min-w-[420px] flex-shrink-0 rounded-2xl overflow-hidden bg-[#181818] relative group border border-[#D7E2EA]/10 hover:border-[#D7E2EA]/30 transition-colors"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-2xl filter brightness-90 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
                  <span className="text-[10px] font-mono text-[#38BDF8] uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h4 className="text-white font-medium text-base tracking-wide">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Moves LEFT on scroll (translateX(-(offset - 200))) */}
        <div className="overflow-visible w-full">
          <div
            className="flex gap-3 will-change-transform"
            style={{
              transform: `translateX(${-(offset - 200)}px)`,
              willChange: 'transform',
            }}
          >
            {ROW2_TRIPLED.map((item, index) => (
              <div
                key={`row2-${index}`}
                className="w-[420px] h-[270px] min-w-[420px] flex-shrink-0 rounded-2xl overflow-hidden bg-[#181818] relative group border border-[#D7E2EA]/10 hover:border-[#D7E2EA]/30 transition-colors"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-2xl filter brightness-90 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
                  <span className="text-[10px] font-mono text-[#38BDF8] uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h4 className="text-white font-medium text-base tracking-wide">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
