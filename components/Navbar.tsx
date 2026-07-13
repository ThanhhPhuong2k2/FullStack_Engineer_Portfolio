
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getNavItems } from '../constants';
import { Language } from '../types';

interface NavbarProps {
  lang: Language;
  toggleLanguage: () => void;
  onCloseDetail?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ lang, toggleLanguage, onCloseDetail }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navItems = getNavItems(lang);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map(item => item.href.substring(1));
      const scrollPos = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    if (onCloseDetail) {
      onCloseDetail();
    }

    const targetId = href.replace('#', '');
    
    // We add a short delay if returning from detail view to allow the layout to switch back
    setTimeout(() => {
      const elem = document.getElementById(targetId);
      window.scrollTo({
        top: elem?.offsetTop ? elem.offsetTop - (window.innerWidth < 768 ? 20 : 80) : 0,
        behavior: 'smooth'
      });
    }, onCloseDetail ? 100 : 0);
  };

  const getIcon = (label: string) => {
    const key = label.toLowerCase();
    if (key.includes('home') || key.includes('chủ')) return <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />;
    if (key.includes('journey') || key.includes('trình')) return <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />;
    if (key.includes('skills') || key.includes('năng')) return <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />;
    if (key.includes('projects') || key.includes('án')) return <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />;
    if (key.includes('work') || key.includes('việc')) return <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />;
    if (key.includes('contact') || key.includes('hệ')) return <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />;
    return null;
  };

  const LanguageSwitcher = ({ isMobile = false }) => (
    <button 
      onClick={toggleLanguage}
      className={`relative ${isMobile ? 'w-12 h-6' : 'w-16 h-8'} rounded-full border border-white/20 bg-slate-900 cursor-pointer shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 group overflow-hidden`}
    >
      <div className="absolute inset-0 w-full h-full rounded-full overflow-hidden">
        <div 
          className={`absolute inset-0 w-full h-full transition-all duration-500 ease-in-out`}
          style={{
            backgroundImage: lang === 'vi' 
              ? 'url("https://res.cloudinary.com/thanhphuongdev/image/upload/v1769970961/vie_rwbgqs.svg")' 
              : 'url("https://res.cloudinary.com/thanhphuongdev/image/upload/v1769970894/eng_hr4i3q.svg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-black/10 z-10" />
      </div>
      <motion.div 
        initial={false}
        animate={{ x: lang === 'en' ? 0 : (isMobile ? 24 : 32) }}
        transition={{ type: "spring", stiffness: 450, damping: 32 }}
        className={`absolute ${isMobile ? 'top-[3px] left-[3px] w-4 h-4' : 'top-[4px] left-[4px] w-6 h-6'} bg-white rounded-full shadow-lg z-20`}
      />
    </button>
  );

  return (
    <>
      {/* Desktop Top Navbar */}
      <div className="fixed top-0 left-0 right-0 z-[100] hidden md:flex justify-center p-6 pointer-events-none">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto flex items-center px-2 py-2 rounded-full transition-all duration-500 ${
            isScrolled 
              ? 'glass border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]' 
              : 'bg-slate-900/50 backdrop-blur-md border border-white/5'
          }`}
        >
          <div className={`px-6 transition-all duration-500 ${isScrolled ? 'max-w-0 opacity-0 overflow-hidden px-0' : 'max-w-xs opacity-100'}`}>
            <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="text-sm font-black text-white tracking-[0.3em] uppercase whitespace-nowrap">
              THANH PHUONG<span className="text-sky-500"> DEV</span>
            </a>
          </div>

          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`relative px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 rounded-full ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/10 border border-white/5 rounded-full z-0"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </div>

          <div className="mx-4 h-6 w-px bg-white/10" />
          
          <div className="pr-2">
            <LanguageSwitcher />
          </div>
        </motion.nav>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] md:hidden px-4 pb-6 pointer-events-none">
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="pointer-events-auto flex items-center justify-between glass border border-white/10 rounded-2xl px-2 py-3 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] overflow-x-auto no-scrollbar gap-2"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`flex flex-col items-center gap-1 min-w-[56px] py-1 transition-all duration-300 rounded-xl ${
                  isActive ? 'text-sky-400' : 'text-slate-500'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isActive ? 2.5 : 2}>
                  {getIcon(item.label)}
                </svg>
                <span className="text-[8px] font-black uppercase tracking-tighter">
                  {item.label}
                </span>
                {isActive && (
                  <motion.div 
                    layoutId="mobile-dot"
                    className="w-1 h-1 bg-sky-400 rounded-full shadow-[0_0_8px_#38bdf8]"
                  />
                )}
              </a>
            );
          })}
          
          <div className="flex items-center justify-center min-w-[56px] px-2">
            <LanguageSwitcher isMobile={true} />
          </div>
        </motion.nav>
      </div>
    </>
  );
};

export default Navbar;
