import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

interface CharProps {
  char: string;
  progress: MotionValue<number>;
  index: number;
  total: number;
}

const Char: React.FC<CharProps> = ({ char, progress, index, total }) => {
  // Distribute the opacity transitions smoothly across the scroll path
  // Using a range buffer of 0.08 ensures characters transition sequentially with a soft overlap
  const start = (index / total) * 0.92;
  const end = start + 0.08;
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  const displayChar = char === ' ' ? '\u00A0' : char;

  return (
    <span className="relative inline-block">
      {/* Invisible placeholder keeps the layout size */}
      <span className="opacity-0 select-none pointer-events-none">{displayChar}</span>
      {/* Absolute positioned animated text character */}
      <motion.span
        style={{ opacity }}
        className="absolute top-0 left-0 select-none"
      >
        {displayChar}
      </motion.span>
    </span>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '', style }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const chars = text.split('');
  const total = chars.length;

  return (
    <p
      ref={containerRef}
      className={`inline-wrap ${className}`}
      style={style}
    >
      {chars.map((char, index) => (
        <Char
          key={index}
          char={char}
          progress={scrollYProgress}
          index={index}
          total={total}
        />
      ))}
    </p>
  );
};

export default AnimatedText;
