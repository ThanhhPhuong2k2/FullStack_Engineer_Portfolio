
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language } from '../types';

interface StorytellingSectionProps {
  lang: Language;
}

const getStories = (lang: Language) => [
  {
    id: 0,
    title: lang === 'en' ? "The Foundation" : "Nền móng",
    subtitle: "Duy Tan University",
    desc: lang === 'en' 
      ? "Began my tech journey in Big Data & Machine Learning, building a rock-solid foundation in algorithms, data structures, and logical thinking."
      : "Bắt đầu hành trình công nghệ tại Đại học Duy Tân, chuyên ngành Big Data & Machine Learning, xây dựng nền tảng vững chắc về thuật toán, cấu trúc dữ liệu và tư duy logic.",
    icon: "🎓",
    period: "2020 - 2022",
    accent: "#3b82f6",
    key: "ACADEMIC"
  },
  {
    id: 1,
    title: lang === 'en' ? "The Pivot" : "Bước ngoặt",
    subtitle: "Web Evolution",
    desc: lang === 'en'
      ? "Discovered a deep passion for Web Development in my 2nd year. Decided to pivot entirely to mastering modern Frontend & Backend ecosystems to build tangible products."
      : "Phát hiện niềm đam mê sâu sắc với Lập trình Web vào năm thứ 2. Quyết định chuyển hướng hoàn toàn sang làm chủ hệ sinh thái Frontend & Backend hiện đại để xây dựng các sản phẩm thực tế.",
    icon: "🚀",
    period: "2022 - 2024",
    accent: "#a855f7",
    key: "PASSION"
  },
  {
    id: 2,
    title: lang === 'en' ? "The Professional" : "Sự chuyên nghiệp",
    subtitle: "METADAP Solutions",
    desc: lang === 'en'
      ? "Currently a Fullstack Developer at METADAP. Directly designing solutions, databases, and developing core source code for large-scale e-commerce systems with high concurrency."
      : "Hiện là Lập trình viên Fullstack tại METADAP. Trực tiếp thiết kế giải pháp, cơ sở dữ liệu và phát triển mã nguồn cốt lõi cho các hệ thống thương mại điện tử quy mô lớn với độ ổn định cao.",
    icon: "🏗️",
    period: "PRESENT",
    accent: "#10b981",
    key: "SOLUTIONS"
  }
];

const StorytellingSection: React.FC<StorytellingSectionProps> = ({ lang }) => {
  const [activeIndex, setActiveIndex] = useState(2);
  const stories = getStories(lang);

  const TRANSITION_DURATION = 0.8;
  const TRANSITION_EASE = [0.16, 1, 0.3, 1] as const;

  const containerVariants = {
    initial: { opacity: 0, scale: 0.98, y: 5 },
    animate: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        duration: TRANSITION_DURATION,
        ease: TRANSITION_EASE,
        staggerChildren: 0.05,
        delayChildren: 0.05
      }
    },
    exit: { 
      opacity: 0, 
      scale: 1.02, 
      y: -5,
      transition: { duration: 0.3, ease: "easeInOut" } 
    }
  } as const;

  const itemVariants = {
    initial: { opacity: 0, y: 5 },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring' as const, stiffness: 120, damping: 18 } 
    }
  } as const;

  return (
    <div className="relative w-full min-h-[240px] md:min-h-[400px] flex flex-col items-center justify-center py-1 md:py-6">
      
      {/* Ghost Text */}
      <div className="absolute inset-0 w-screen left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none overflow-hidden select-none z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ 
              opacity: 0.012, 
              scale: 1, 
              filter: 'blur(0px)',
              transition: { 
                duration: TRANSITION_DURATION, 
                ease: TRANSITION_EASE 
              } 
            }}
            exit={{ 
              opacity: 0, 
              scale: 1.05, 
              filter: 'blur(12px)',
              transition: { duration: 0.3 } 
            }}
            className="text-[30vw] md:text-[20vw] font-black text-white tracking-tighter whitespace-nowrap leading-none"
          >
            {stories[activeIndex].key}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl px-4 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col items-center"
          >
            <motion.div variants={itemVariants} className="mb-0.5 md:mb-4">
              <span className="px-2 md:px-4 py-0.5 rounded-full border border-white/10 glass bg-white/5 text-[5px] md:text-[9px] font-mono tracking-[0.2em] text-sky-400 uppercase">
                {stories[activeIndex].period === 'PRESENT' ? (lang === 'en' ? 'PRESENT' : 'HIỆN TẠI') : stories[activeIndex].period}
              </span>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="w-9 h-9 md:w-20 md:h-20 glass rounded-lg md:rounded-[2rem] border-white/10 flex items-center justify-center text-lg md:text-4xl mb-1 md:mb-6 shadow-[0_4px_10px_rgba(0,0,0,0.6)] relative group"
            >
              <div 
                className="absolute inset-0 opacity-20 blur-2xl"
                style={{ background: `radial-gradient(circle at center, ${stories[activeIndex].accent}, transparent)` }}
              />
              <div className="relative z-10">
                {stories[activeIndex].icon}
              </div>
            </motion.div>

            <div className="space-y-0 mb-1 md:mb-4">
              <motion.h3 
                variants={itemVariants}
                className="text-base md:text-5xl font-black text-white tracking-tighter leading-tight uppercase"
              >
                {stories[activeIndex].title}
              </motion.h3>
              
              <motion.p 
                variants={itemVariants}
                className="text-[8px] md:text-xl font-bold italic tracking-tight"
                style={{ color: stories[activeIndex].accent }}
              >
                {stories[activeIndex].subtitle}
              </motion.p>
            </div>
            
            <motion.p 
              variants={itemVariants}
              className="text-[7px] md:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed font-light px-6 line-clamp-2 md:line-clamp-none"
            >
              {stories[activeIndex].desc}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation - Ultra Compact */}
      <div className="mt-2 md:mt-8 relative z-20">
        <div className="flex items-center p-0.5 md:p-1.5 rounded-lg md:rounded-[1.5rem] glass border border-white/5 bg-[#0a0f1e]/80">
          {stories.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActiveIndex(i)}
              className="relative px-2 md:px-10 py-1 md:py-3 transition-all duration-500 outline-none"
            >
              {activeIndex === i && (
                <motion.div
                  layoutId="journey-active-bg-ultra-compact"
                  className="absolute inset-0 bg-white/10 rounded-md md:rounded-[1rem] z-0"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              
              <div className="relative z-10 flex flex-col items-center">
                <span className={`text-[8px] md:text-xl font-black transition-all duration-700 ${activeIndex === i ? 'text-white scale-110' : 'text-slate-600'}`}>
                  0{i + 1}
                </span>
                {activeIndex === i && (
                  <motion.span 
                    initial={{ opacity: 0, y: 1 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-1 md:-bottom-4 text-[3px] md:text-[6px] font-mono font-bold tracking-[0.05em] text-sky-500 uppercase whitespace-nowrap"
                  >
                    {s.key}
                  </motion.span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StorytellingSection;
