
import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);
  const particleIdRef = useRef(0);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { stiffness: 500, damping: 28 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setCoords({ x: e.clientX, y: e.clientY });
      
      if (!isVisible) setIsVisible(true);

      // Tạo hạt bụi kỹ thuật ngẫu nhiên đi theo chuột
      if (Math.random() > 0.6) {
        const newParticle = { id: particleIdRef.current++, x: e.clientX, y: e.clientY };
        setParticles(prev => [...prev.slice(-12), newParticle]);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName.toLowerCase() === 'button' || 
        target.tagName.toLowerCase() === 'a' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer');
      
      setIsHovering(!!isClickable);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', () => setIsVisible(false));
    document.addEventListener('mouseenter', () => setIsVisible(true));

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible, cursorX, cursorY]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Particle Trail Effect */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0, y: 15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute w-1 h-1 bg-sky-500 rounded-full"
            style={{ left: p.x, top: p.y }}
          />
        ))}
      </AnimatePresence>

      {/* HUD Radar Rings */}
      <motion.div
        className="absolute w-12 h-12 flex items-center justify-center"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isHovering ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border border-sky-400/30 rounded-full"
        />
        <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-1.5 border-t-2 border-sky-500/60 rounded-full"
        />
        
        {/* Core Dot */}
        <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_10px_#fff]" />
        
        {/* HUD Stats */}
        <AnimatePresence>
          {!isHovering && isVisible && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 30 }}
              exit={{ opacity: 0 }}
              className="absolute left-full flex flex-col gap-0 text-[6px] font-mono text-sky-400 tracking-widest bg-black/40 p-1.5 rounded border border-white/10"
            >
              <div className="flex justify-between gap-4"><span>X</span><span>{coords.x}</span></div>
              <div className="flex justify-between gap-4"><span>Y</span><span>{coords.y}</span></div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Scanline follower */}
      <motion.div 
        className="absolute w-screen h-[1px] bg-sky-500/5"
        style={{ 
          top: cursorY,
          left: 0,
          opacity: isVisible && !isHovering ? 1 : 0 
        }}
      />
    </div>
  );
};

export default CustomCursor;
