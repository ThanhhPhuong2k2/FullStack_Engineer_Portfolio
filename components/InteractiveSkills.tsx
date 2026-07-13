
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILLS, EnhancedSkill } from '../constants';
import { Language } from '../types';

interface InteractiveSkillsProps {
  lang: Language;
}

const getCategories = (lang: Language) => [
  lang === 'en' ? 'All' : 'Tất cả', 
  'Frontend', 
  'Backend', 
  'Database', 
  'DevOps', 
  lang === 'en' ? 'Payments' : 'Thanh toán', 
  'Web3'
] as const;

const SkillCard: React.FC<{ skill: EnhancedSkill }> = ({ skill }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
      className="relative group h-28 md:h-40"
    >
      <motion.div 
        whileHover={{ y: -8, transition: { duration: 0.2 } }}
        className="h-full w-full"
      >
        <div 
          className="absolute -inset-1 opacity-0 group-hover:opacity-30 transition-all duration-700 blur-xl z-0 rounded-2xl md:rounded-[2.5rem]"
          style={{ background: skill.color }}
        />
        
        <div className="relative h-full w-full glass rounded-2xl md:rounded-[2rem] border border-white/10 flex flex-col items-center justify-center p-3 md:p-5 gap-2 md:gap-3 overflow-hidden z-10 shadow-xl transition-all duration-500 group-hover:border-white/30">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent pointer-events-none" />

          <div className="relative w-10 h-10 md:w-14 md:h-14 flex items-center justify-center">
            {skill.customSvg ? (
              <div 
                className="w-8 h-8 md:w-14 md:h-14 relative z-20 flex items-center justify-center"
                dangerouslySetInnerHTML={{ __html: skill.customSvg }}
              />
            ) : skill.icon ? (
              <img 
                src={skill.icon}
                alt={skill.name}
                className="w-8 h-8 md:w-14 md:h-14 object-contain relative z-20"
              />
            ) : (
              <img 
                src={`https://cdn.simpleicons.org/${skill.iconSlug}/${skill.color.replace('#', '')}`}
                alt={skill.name}
                className="w-8 h-8 md:w-14 md:h-14 object-contain relative z-20"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/bottts/svg?seed=${skill.name}`;
                }}
              />
            )}
          </div>

          <div className="text-center relative z-20">
            <h4 className="text-[9px] md:text-[13px] font-black tracking-tight text-white/90">
              {skill.name}
            </h4>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const InteractiveSkills: React.FC<InteractiveSkillsProps> = ({ lang }) => {
  const categories = getCategories(lang);
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);

  const filteredSkills = useMemo(() => {
    const rawCategory = activeCategory === 'All' || activeCategory === 'Tất cả' ? 'All' : 
                        activeCategory === 'Payments' || activeCategory === 'Thanh toán' ? 'Payments' : 
                        activeCategory;
    
    if (rawCategory === 'All') return SKILLS;
    return SKILLS.filter(s => s.category === rawCategory);
  }, [activeCategory]);

  return (
    <div className="space-y-8 md:space-y-12">
      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 p-1.5 md:p-2 glass border border-white/5 rounded-2xl md:rounded-[2.5rem] inline-flex max-w-full">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`relative px-4 md:px-6 py-2 md:py-2.5 rounded-xl md:rounded-2xl text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
              activeCategory === cat 
                ? 'text-white' 
                : 'text-slate-500 hover:text-white'
            }`}
          >
            {activeCategory === cat && (
              <motion.div 
                layoutId="skill-active-pill"
                className="absolute inset-0 bg-white/10 border border-white/10 rounded-xl md:rounded-2xl z-0"
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
              />
            )}
            <span className="relative z-10">{cat}</span>
          </button>
        ))}
      </div>

      <div className="relative min-h-[350px] md:min-h-[450px]">
        <motion.div 
          layout
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-6"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredSkills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <motion.div 
        layout
        className="relative grid grid-cols-1 lg:grid-cols-12 gap-1 p-1 bg-white/5 rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10"
      >
        <div className="lg:col-span-3 p-6 md:p-8 flex flex-col justify-center bg-slate-900/40 rounded-t-[1.8rem] md:rounded-l-[2.8rem] md:rounded-tr-none relative overflow-hidden group">
          <span className="text-[8px] md:text-[9px] font-mono text-slate-500 tracking-[0.4em] uppercase mb-2 md:mb-4 block">
            {lang === 'en' ? 'System Units' : 'Đơn vị hệ thống'}
          </span>
          <div className="flex items-end gap-3">
            <motion.span 
              key={filteredSkills.length}
              className="text-5xl md:text-7xl font-black text-white leading-none tracking-tighter"
            >
              {filteredSkills.length.toString().padStart(2, '0')}
            </motion.span>
            <span className="text-sm md:text-xl font-mono text-slate-600 mb-1 md:mb-2">/ {SKILLS.length}</span>
          </div>
        </div>

        <div className="lg:col-span-6 p-6 md:p-8 flex flex-col justify-center bg-slate-900/20 relative group border-y md:border-y-0 md:border-x border-white/5">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
              <div className="space-y-1">
                <span className="text-[8px] md:text-[9px] font-mono text-sky-500/60 tracking-[0.3em] uppercase flex items-center gap-2">
                   <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                   {lang === 'en' ? 'Active Expertise' : 'Chuyên môn cốt lõi'}
                </span>
                <h3 className="text-xl md:text-3xl font-black text-white tracking-tighter uppercase leading-tight">
                  {lang === 'en' ? 'Fullstack Architecture' : 'Kiến trúc Fullstack'}
                </h3>
              </div>
           </div>
        </div>

        <div className="lg:col-span-3 p-6 md:p-8 flex items-center justify-center bg-slate-900/60 rounded-b-[1.8rem] md:rounded-r-[2.8rem] md:rounded-bl-none relative group overflow-hidden">
           <div className="relative">
              <motion.div 
                animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-15px] border border-dashed border-sky-500/20 rounded-full"
              />
              <div className="w-16 h-16 md:w-20 md:h-20 glass rounded-2xl md:rounded-3xl border border-white/20 flex items-center justify-center relative z-10 shadow-[0_0_40px_rgba(56,189,248,0.2)]">
                <span className="text-3xl md:text-4xl">💎</span>
              </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InteractiveSkills;
