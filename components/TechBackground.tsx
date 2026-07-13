
import React from 'react';
import { motion } from 'framer-motion';

const VerticalStreak: React.FC<{ left: string; delay: number; duration: number; height: string }> = ({ left, delay, duration, height }) => (
  <motion.div
    initial={{ y: '-100%', opacity: 0 }}
    animate={{ 
      y: '400%', 
      opacity: [0, 0.25, 0.25, 0] 
    }}
    transition={{
      duration: duration,
      delay: delay,
      repeat: Infinity,
      ease: "linear"
    }}
    style={{ left, height }}
    className="absolute w-[1px] bg-gradient-to-b from-transparent via-sky-500/50 to-transparent pointer-events-none z-0"
  />
);

const FloatingIcon: React.FC<{ 
  slug: string; 
  top: string; 
  left: string; 
  delay: number;
  size?: number;
  blur?: string;
  opacity?: number;
}> = ({ slug, top, left, delay, size = 45, blur = "blur(1px)", opacity = 0.2 }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ 
      opacity: [0, opacity, opacity, 0],
      y: [0, -30, 0],
      rotate: [0, 8, -8, 0]
    }}
    transition={{
      duration: 12 + Math.random() * 10,
      delay: delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    style={{ top, left, width: size, height: size, filter: blur }}
    className="absolute pointer-events-none select-none z-0 grayscale invert brightness-150"
  >
    <img 
      src={`https://cdn.simpleicons.org/${slug}/ffffff`} 
      alt={slug} 
      className="w-full h-full object-contain" 
    />
  </motion.div>
);

const TechBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-[#020617]">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.85)_100%)] z-10" />

      {/* Vertical Streaks */}
      <VerticalStreak left="8%" delay={0} duration={9} height="250px" />
      <VerticalStreak left="22%" delay={4} duration={14} height="180px" />
      <VerticalStreak left="48%" delay={2} duration={11} height="350px" />
      <VerticalStreak left="72%" delay={7} duration={16} height="220px" />
      <VerticalStreak left="88%" delay={1} duration={10} height="280px" />
      <VerticalStreak left="96%" delay={5} duration={13} height="140px" />

      {/* Scatter Field of Icons - Pure Web Dev Libraries & Tools */}
      {/* Top Layer */}
      <FloatingIcon slug="typescript" top="12%" left="7%" delay={0} size={55} blur="blur(0.5px)" opacity={0.25} />
      <FloatingIcon slug="javascript" top="22%" left="82%" delay={3} size={50} blur="blur(0.5px)" opacity={0.22} />
      <FloatingIcon slug="nextdotjs" top="18%" left="38%" delay={6} size={65} blur="blur(1.5px)" opacity={0.15} />
      <FloatingIcon slug="vite" top="8%" left="65%" delay={2} size={45} blur="blur(0.5px)" opacity={0.2} />
      
      {/* Mid Layer */}
      <FloatingIcon slug="mongodb" top="42%" left="12%" delay={2} size={60} blur="blur(1px)" opacity={0.18} />
      <FloatingIcon slug="docker" top="58%" left="78%" delay={8} size={45} blur="blur(0.5px)" opacity={0.25} />
      <FloatingIcon slug="tailwindcss" top="38%" left="94%" delay={4} size={40} blur="blur(0px)" opacity={0.3} />
      <FloatingIcon slug="redux" top="55%" left="30%" delay={11} size={45} blur="blur(1px)" opacity={0.18} />
      <FloatingIcon slug="figma" top="62%" left="8%" delay={5} size={50} blur="blur(2px)" opacity={0.12} />
      <FloatingIcon slug="react" top="50%" left="45%" delay={10} size={70} blur="blur(3px)" opacity={0.1} />
      
      {/* Bottom Layer */}
      <FloatingIcon slug="nodedotjs" top="82%" left="15%" delay={1} size={55} blur="blur(1px)" opacity={0.2} />
      <FloatingIcon slug="sass" top="75%" left="40%" delay={7} size={45} blur="blur(0.5px)" opacity={0.25} />
      <FloatingIcon slug="graphql" top="85%" left="70%" delay={13} size={50} blur="blur(1px)" opacity={0.15} />
      <FloatingIcon slug="visualstudiocode" top="70%" left="88%" delay={15} size={40} blur="blur(0.5px)" opacity={0.22} />
      <FloatingIcon slug="axios" top="30%" left="20%" delay={9} size={35} blur="blur(1px)" opacity={0.2} />
      <FloatingIcon slug="reactquery" top="65%" left="55%" delay={12} size={40} blur="blur(0.5px)" opacity={0.22} />

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:100px_100px]" />
    </div>
  );
};

export default TechBackground;
