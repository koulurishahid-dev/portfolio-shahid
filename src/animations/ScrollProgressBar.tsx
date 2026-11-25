import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none select-none bg-neutral-900/80">
      <motion.div
        style={{ scaleX }}
        className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-red-600 origin-left shadow-[0_0_10px_#EF4444]"
      />
    </div>
  );
};
