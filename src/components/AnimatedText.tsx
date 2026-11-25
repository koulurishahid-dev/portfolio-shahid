import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue, useReducedMotion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

interface CharProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const CharSpan: React.FC<CharProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="opacity-0 select-none pointer-events-none">
        {char === ' ' ? '\u00A0' : char}
      </span>
      <motion.span style={{ opacity }} className="absolute inset-0">
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    </span>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  style,
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  if (shouldReduceMotion) {
    return (
      <p ref={containerRef} className={className} style={{ ...style, opacity: 1 }}>
        {text}
      </p>
    );
  }

  const words = text.split(' ');
  const totalChars = text.length;
  let charCounter = 0;

  return (
    <p ref={containerRef} className={className} style={style}>
      {words.map((word, wordIndex) => {
        const wordChars = word.split('');
        const wordElements = wordChars.map((char) => {
          const charIndex = charCounter++;
          const start = charIndex / totalChars;
          const end = Math.min(1, (charIndex + 1) / totalChars);
          return (
            <CharSpan
              key={`char-${charIndex}`}
              char={char}
              progress={scrollYProgress}
              range={[start, end]}
            />
          );
        });

        // Account for the space following the word
        if (wordIndex < words.length - 1) {
          const spaceIndex = charCounter++;
          const start = spaceIndex / totalChars;
          const end = Math.min(1, (spaceIndex + 1) / totalChars);

          return (
            <span key={`word-${wordIndex}`} className="inline-block whitespace-nowrap">
              {wordElements}
              <CharSpan
                key={`space-${spaceIndex}`}
                char=" "
                progress={scrollYProgress}
                range={[start, end]}
              />
            </span>
          );
        }

        return (
          <span key={`word-${wordIndex}`} className="inline-block whitespace-nowrap">
            {wordElements}
          </span>
        );
      })}
    </p>
  );
};
