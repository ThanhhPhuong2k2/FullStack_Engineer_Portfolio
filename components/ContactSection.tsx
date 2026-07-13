
import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '../types';

interface ContactSectionProps {
  lang: Language;
}

const CONTACT_DATA = {
  email: "thanhphuong212002@gmail.com",
  linkedin: "https://www.linkedin.com/in/ph%C6%B0%C6%A1ng-thanh-65240b2b8/",
  github: "https://github.com/ThanhhPhuong2k2",
  cv: "https://www.topcv.vn/xem-cv/XARQBVxcVwcFBgkABFBXAgNUBVUFCAYBDVJaDQe272"
};

const ContactCard: React.FC<{ 
  title: string; 
  value: string; 
  href: string; 
  icon: React.ReactNode; 
  color: string;
  isLarge?: boolean;
  lang: Language;
}> = ({ title, value, href, icon, color, isLarge, lang }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -10, scale: 1.02 }}
    className={`group relative p-8 glass rounded-[2.5rem] border-white/5 overflow-hidden flex flex-col justify-between transition-all duration-500 ${isLarge ? 'md:col-span-2' : ''}`}
  >
    <div 
      className="absolute -inset-1 opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-700 pointer-events-none"
      style={{ background: color }}
    />
    
    <div className="flex justify-between items-start mb-12">
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500">
        {icon}
      </div>
      <span className="text-[10px] font-mono font-bold text-slate-500 tracking-[0.4em] uppercase">{title}</span>
    </div>

    <div>
      <h4 className="text-xl md:text-2xl font-black text-white truncate group-hover:text-gradient transition-all">
        {value}
      </h4>
      <div className="mt-4 flex items-center gap-2">
        <div className="h-px w-8 bg-white/10 group-hover:w-16 group-hover:bg-sky-500 transition-all duration-500" />
        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest group-hover:text-sky-400">
          {lang === 'en' ? 'Establish Link' : 'Kết nối ngay'}
        </span>
      </div>
    </div>
  </motion.a>
);

const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  return (
    <section id="contact" className="relative z-10 py-32 px-6">
      <div className="container mx-auto">
        <div className="relative mb-20 text-center lg:text-left">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none uppercase select-none"
          >
            {lang === 'en' ? "LET'S" : "HÃY"}{' '}
            <span className="text-gradient">{lang === 'en' ? "TALK." : "KẾT NỐI."}</span>
          </motion.h2>
          <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -z-10 hidden lg:block" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          <ContactCard 
            lang={lang}
            title={lang === 'en' ? "Communication" : "Giao tiếp"}
            value={CONTACT_DATA.email}
            href={`mailto:${CONTACT_DATA.email}`}
            color="#0ea5e9"
            isLarge
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
          />

          <ContactCard 
            lang={lang}
            title={lang === 'en' ? "Network" : "Mạng lưới"}
            value="LinkedIn Profile"
            href={CONTACT_DATA.linkedin}
            color="#0077b5"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            }
          />

          <ContactCard 
            lang={lang}
            title={lang === 'en' ? "Repository" : "Kho lưu trữ"}
            value="GitHub Source"
            href={CONTACT_DATA.github}
            color="#ffffff"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            }
          />

          <motion.a
            href={CONTACT_DATA.cv}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="md:col-span-4 group relative p-10 glass rounded-[3rem] border-sky-500/20 bg-sky-500/[0.03] overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 mt-12"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="flex items-center gap-8 relative z-10">
              <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-sky-400 group-hover:text-white group-hover:bg-sky-500 transition-all duration-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-mono font-bold text-sky-500 tracking-[0.6em] uppercase">
                  {lang === 'en' ? 'Document Preview' : 'Xem trước tài liệu'}
                </p>
                <h4 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">Curriculum Vitae</h4>
              </div>
            </div>

            <div className="relative z-10">
              <div className="px-12 py-5 bg-white text-black font-black rounded-2xl hover:bg-sky-400 hover:text-white transition-all shadow-2xl flex items-center gap-4 group/btn">
                {lang === 'en' ? 'DOWNLOAD CV' : 'TẢI XUỐNG CV'}
                <motion.span 
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </motion.span>
              </div>
            </div>
            <motion.div 
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 bottom-0 w-[200px] bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none skew-x-12"
            />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
