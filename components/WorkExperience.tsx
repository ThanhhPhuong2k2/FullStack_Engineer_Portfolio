
import React from 'react';
import { motion } from 'framer-motion';
import { getExperiences } from '../constants';
import { Language } from '../types';

interface WorkExperienceProps {
  lang: Language;
}

const ExperienceCard: React.FC<{ exp: any, index: number, lang: Language }> = ({ exp, index, lang }) => {
  return (
    <div className="relative group perspective-1000">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none z-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-1000">
        <span className="text-[15vw] font-black tracking-tighter uppercase">{exp.company}</span>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="lg:col-span-4 flex flex-col justify-between p-10 glass rounded-[3rem] border-white/10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-green-500 uppercase">
                {lang === 'en' ? 'Status: Active' : 'Trạng thái: Hoạt động'}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-1">
              <p className="text-sky-400 font-mono text-xs tracking-[0.4em] uppercase">
                {exp.period.replace('PRESENT', lang === 'en' ? 'PRESENT' : 'HIỆN TẠI')}
              </p>
              <h3 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
                {exp.company}
              </h3>
            </div>
            
            <div className="h-px w-20 bg-white/10" />
            
            <p className="text-2xl font-bold text-slate-300 italic tracking-tight">
              {exp.role}
            </p>
          </div>

          <div className="mt-12 space-y-4">
             <div className="flex items-center gap-4 text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm font-medium tracking-wide uppercase">{exp.location}</span>
             </div>
          </div>
        </motion.div>

        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {exp.achievements.map((item: string, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + (i * 0.1) }}
              whileHover={{ y: -5, borderColor: 'rgba(255,255,255,0.2)' }}
              className="p-8 glass rounded-[2.5rem] border-white/5 flex flex-col justify-between group/item transition-all"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-sky-400 group-hover/item:scale-110 group-hover/item:bg-sky-500 group-hover/item:text-white transition-all duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-[10px] font-mono text-slate-600 group-hover/item:text-slate-400 transition-colors">0{i+1}</span>
              </div>
              <p className="text-lg text-slate-300 font-medium leading-relaxed tracking-tight">
                {item}
              </p>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="md:col-span-2 p-8 glass rounded-[2.5rem] border-sky-500/10 bg-sky-500/[0.02] flex flex-wrap items-center gap-4"
          >
             <span className="text-[10px] font-mono text-sky-400/60 uppercase tracking-[0.4em] mr-4">Stack:</span>
             {exp.tech.map((t: string) => (
               <span key={t} className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white/80 hover:text-white hover:bg-white/10 transition-all cursor-default">
                 {t}
               </span>
             ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const WorkExperience: React.FC<WorkExperienceProps> = ({ lang }) => {
  const experiences = getExperiences(lang);
  return (
    <div className="space-y-32">
      {experiences.map((exp, idx) => (
        <ExperienceCard key={exp.company} exp={exp} index={idx} lang={lang} />
      ))}
    </div>
  );
};

export default WorkExperience;
