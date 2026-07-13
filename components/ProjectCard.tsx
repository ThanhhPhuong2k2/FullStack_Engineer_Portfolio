
import React from 'react';
import { motion } from 'framer-motion';
import { Project, Language } from '../types';
import { SKILLS } from '../constants';

interface ProjectCardProps {
  project: Project;
  index: number;
  lang: Language;
  onOpen: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, lang, onOpen }) => {
  const getTagIcon = (tagName: string) => {
    const skill = SKILLS.find(s => s.name.toLowerCase() === tagName.toLowerCase());
    if (!skill) {
      return (
        <div className="relative z-10 px-2.5 py-1 glass rounded-lg md:rounded-xl border border-white/10 text-[9px] md:text-xs font-bold text-slate-300 shadow-inner">
          {tagName}
        </div>
      );
    }
    
    const iconElement = skill.customSvg ? (
      <div 
        className="w-4 h-4 md:w-6 md:h-6 flex items-center justify-center"
        dangerouslySetInnerHTML={{ __html: skill.customSvg }}
      />
    ) : skill.icon ? (
      <img 
        src={skill.icon} 
        alt={tagName} 
        className="w-4 h-4 md:w-6 md:h-6 object-contain" 
      />
    ) : (
      <img 
        src={`https://cdn.simpleicons.org/${skill.iconSlug}/${skill.color.replace('#', '')}`} 
        alt={tagName} 
        className="w-4 h-4 md:w-6 md:h-6 object-contain" 
      />
    );

    return (
      <div className="relative group/icon">
        <div className="absolute -inset-1 bg-white/5 rounded-full blur-sm opacity-0 group-hover/icon:opacity-100 transition-opacity" />
        <div className="relative z-10 p-1 md:p-2 glass rounded-lg md:rounded-xl border border-white/5 shadow-inner">
           {iconElement}
        </div>
      </div>
    );
  };

  const contentVariants = {
    initial: { opacity: 0, y: 15 },
    hover: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut" as const
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onClick={onOpen}
      className="group relative w-full aspect-video rounded-2xl md:rounded-[2.5rem] overflow-hidden bg-slate-900 border border-white/10 cursor-pointer shadow-xl"
    >
      <motion.img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out group-hover:scale-105 group-hover:brightness-[0.05] group-hover:blur-[8px]"
      />

      <div className="absolute inset-x-0 bottom-0 p-5 md:p-12 z-20 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-6">
        <div className="flex flex-col gap-0.5 mb-4 md:mb-8">
           <h3 className="text-xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none drop-shadow-lg">
             {project.title}
           </h3>
           <p className="text-[9px] md:text-base text-sky-400 font-bold tracking-[0.15em] uppercase opacity-90">
             {project.subtitle[lang]}
           </p>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {project.tags.slice(0, 4).map((tag, i) => (
            <React.Fragment key={tag}>
              <div title={tag} className="transition-all duration-300 hover:scale-110">
                {getTagIcon(tag)}
              </div>
            </React.Fragment>
          ))}
          {project.tags.length > 4 && <span className="text-[8px] text-slate-500">+{project.tags.length - 4}</span>}
        </div>
      </div>

      <motion.div 
        initial="initial"
        whileHover="hover"
        className="absolute inset-0 z-30 flex flex-col justify-center items-center p-6 md:p-12 text-center bg-black/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      >
        <motion.div 
          variants={contentVariants}
          className="max-w-2xl flex flex-col items-center justify-center h-full w-full px-4"
        >
          <p className="text-xs md:text-lg text-slate-200 font-medium leading-relaxed text-center overflow-y-auto max-h-[90%] no-scrollbar whitespace-pre-line">
            {project.description[lang]}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
