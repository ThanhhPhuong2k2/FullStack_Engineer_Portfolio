import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project, Language } from '../types';
import { PROJECTS } from '../constants';
import ProjectCard from './ProjectCard';
import { ArrowLeft, Grid } from 'lucide-react';

interface AllProjectsViewProps {
  lang: Language;
  onClose: () => void;
  onOpenProject: (project: Project) => void;
}

const AllProjectsView: React.FC<AllProjectsViewProps> = ({ lang, onClose, onOpenProject }) => {
  return (
    <div className="min-h-screen relative z-10 pt-28 pb-24 px-6 bg-slate-950/20">
      <div className="container mx-auto max-w-7xl">
        
        {/* Back Navigation Bar with premium redesigned glass button */}
        <div className="mb-12 flex justify-start">
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.05, x: -4, borderColor: 'rgba(56,189,248,0.4)', boxShadow: '0 0 20px rgba(56,189,248,0.1)' }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-6 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-xs font-bold uppercase tracking-[0.15em] text-slate-300 hover:text-white transition-all cursor-pointer shadow-lg backdrop-blur-md"
          >
            <ArrowLeft className="w-4 h-4 text-sky-400" />
            <span>{lang === 'en' ? 'Back to Homepage' : 'Quay Lại Trang Chủ'}</span>
          </motion.button>
        </div>

        {/* Dynamic Page Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-purple-500/20 bg-purple-500/5 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.3em] font-bold text-purple-400 uppercase">
              {lang === 'en' ? 'ARCHIVE_COLLECTION' : 'BỘ SƯU TẬP TÀI LIỆU'}
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-7xl font-black tracking-tighter text-white uppercase leading-none mb-6"
          >
            {lang === 'en' ? 'ALL' : 'TẤT CẢ'}{' '}
            <span className="text-gradient">{lang === 'en' ? 'PROJECTS' : 'DỰ ÁN'}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-sm md:text-lg max-w-2xl mx-auto font-light leading-relaxed mb-8"
          >
            {lang === 'en' 
              ? 'Browse the complete record of engineering, blockchain integrations, digital platforms, and fullstack architectures.'
              : 'Duyệt xem toàn bộ hồ sơ kỹ thuật, tích hợp blockchain, nền tảng số và kiến trúc fullstack đã phát triển.'}
          </motion.p>

          <div className="flex items-center justify-center gap-2 font-mono text-xs text-slate-400 bg-white/5 border border-white/5 px-4 py-2 rounded-full w-fit mx-auto shadow-inner">
            <Grid className="w-4 h-4 text-purple-400" />
            <span>
              {lang === 'en' ? 'TOTAL:' : 'TỔNG CỘNG:'} <strong className="text-white">{PROJECTS.length}</strong> {lang === 'en' ? 'PROJECTS' : 'DỰ ÁN'}
            </span>
          </div>
        </div>

        {/* Dynamic Project Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12"
        >
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <ProjectCard
                project={project}
                index={idx}
                lang={lang}
                onOpen={() => onOpenProject(project)}
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default AllProjectsView;
