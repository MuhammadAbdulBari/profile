import React, { useState, useRef, useEffect } from 'react';

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = '',
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [transition, setTransition] = useState(inactiveTransition);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      
      const mx = e.clientX;
      const my = e.clientY;

      // Check if mouse is within the bounding box expanded by padding
      const isWithinX = mx >= rect.left - padding && mx <= rect.right + padding;
      const isWithinY = my >= rect.top - padding && my <= rect.bottom + padding;

      if (isWithinX && isWithinY) {
        // Mouse is within magnetic pull range
        const dx = mx - cx;
        const dy = my - cy;
        setPosition({ x: dx / strength, y: dy / strength });
        setTransition(activeTransition);
      } else {
        // Outside range, ease back to center
        setPosition({ x: 0, y: 0 });
        setTransition(inactiveTransition);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [padding, strength, activeTransition, inactiveTransition]);

  return (
    <div
      ref={containerRef}
      className={`inline-block ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0px)`,
        transition,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};
export default Magnet;
