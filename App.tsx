import React, { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Navbar from "./components/Navbar";
import InteractiveSkills from "./components/InteractiveSkills";
import StorytellingSection from "./components/StorytellingSection";
import ProjectCard from "./components/ProjectCard";
import WorkExperience from "./components/WorkExperience";
import ContactSection from "./components/ContactSection";
import TechBackground from "./components/TechBackground";
import CustomCursor from "./components/CustomCursor";
import ProjectDetailView from "./components/ProjectDetailView";
import AllProjectsView from "./components/AllProjectsView";
import { PROJECTS, getSlug } from "./constants";
import { Language, Project } from "./types";

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>("en");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewAllProjects, setViewAllProjects] = useState<boolean>(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const handleOpenProject = (proj: Project) => {
    setSelectedProject(proj);
    window.history.pushState(null, "", `/project/${getSlug(proj.title)}`);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
    if (viewAllProjects) {
      window.history.pushState(null, "", "/projects");
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 100);
    } else {
      window.history.pushState(null, "", "/");
      setTimeout(() => {
        const el = document.getElementById("experience");
        if (el) {
          window.scrollTo({
            top: el.offsetTop - (window.innerWidth < 768 ? 20 : 80),
            behavior: "smooth",
          });
        }
      }, 100);
    }
  };

  const handleOpenAllProjects = () => {
    setViewAllProjects(true);
    window.history.pushState(null, "", "/projects");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCloseAllProjects = () => {
    setViewAllProjects(false);
    window.history.pushState(null, "", "/");
    setTimeout(() => {
      const el = document.getElementById("experience");
      if (el) {
        window.scrollTo({
          top: el.offsetTop - (window.innerWidth < 768 ? 20 : 80),
          behavior: "smooth",
        });
      }
    }, 100);
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.startsWith("/project/")) {
        const slug = path.replace("/project/", "");
        const proj = PROJECTS.find((p) => getSlug(p.title) === slug);
        if (proj) {
          setSelectedProject(proj);
        } else {
          setSelectedProject(null);
        }
      } else if (path === "/projects") {
        setSelectedProject(null);
        setViewAllProjects(true);
      } else {
        setSelectedProject(null);
        setViewAllProjects(false);
      }
    };

    window.addEventListener("popstate", handlePopState);
    handlePopState(); // Handle initial route load

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Hiệu ứng xoay 3D tổng thể cho Hero
  const rotateX = useTransform(mouseY, [0, window.innerHeight], [10, -10]);
  const rotateY = useTransform(mouseX, [0, window.innerWidth], [-10, 10]);

  // Các lớp di chuyển theo tỷ lệ khác nhau để tạo độ sâu (Parallax)
  const layer1X = useTransform(mouseX, [0, window.innerWidth], [-12, 12]);
  const layer1Y = useTransform(mouseY, [0, window.innerHeight], [-12, 12]);

  const layer2X = useTransform(mouseX, [0, window.innerWidth], [25, -25]);
  const layer2Y = useTransform(mouseY, [0, window.innerHeight], [25, -25]);

  const smoothMouseX = useSpring(mouseX, { stiffness: 40, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 40, damping: 30 });

  const glowColor = useTransform(
    mouseX,
    [0, window.innerWidth],
    ["rgba(56, 189, 248, 0.25)", "rgba(168, 85, 247, 0.25)"],
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const containerVars = {
    before: {},
    after: { transition: { staggerChildren: 0.04 } },
  } as const;

  const letterVars = {
    before: { opacity: 0, y: 30, rotateX: 90 },
    after: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 12 },
    },
  } as const;

  const splitName = (name: string) => Array.from(name);

  const toggleLanguage = () => {
    setLang((prev) => (prev === "en" ? "vi" : "en"));
  };

  return (
    <div className="relative bg-[#020617] text-slate-100 selection:bg-sky-500/30 overflow-x-hidden min-h-screen cursor-none font-sans">
      <CustomCursor />

      {/* Dynamic Background Glow */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          background: useTransform(
            [smoothMouseX, smoothMouseY, glowColor],
            ([x, y, color]) =>
              `radial-gradient(1100px circle at ${x}px ${y}px, ${color}, transparent 80%)`,
          ),
        }}
      />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 z-[100] origin-left shadow-[0_0_20px_rgba(56,189,248,0.5)]"
        style={{ scaleX }}
      />

      <Navbar
        lang={lang}
        toggleLanguage={toggleLanguage}
        onCloseDetail={
          selectedProject || viewAllProjects
            ? () => {
                setSelectedProject(null);
                setViewAllProjects(false);
                window.history.pushState(null, "", "/");
              }
            : undefined
        }
      />

      <AnimatePresence mode="wait">
        {!selectedProject ? (
          viewAllProjects ? (
            <motion.div
              key="all-projects-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AllProjectsView
                lang={lang}
                onClose={handleCloseAllProjects}
                onOpenProject={handleOpenProject}
              />
            </motion.div>
          ) : (
            <motion.div
              key="home-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Hero Section */}
              <section
                id="home"
                className="relative z-10 pt-20 md:pt-40 pb-20 px-6 min-h-screen flex items-center justify-center perspective-[2000px]"
              >
                <TechBackground />

                <div className="container mx-auto relative z-10">
                  <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
                    {/* 3D MULTI-LAYER PROFILE IMAGE */}
                    <motion.div
                      style={{
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d",
                      }}
                      className="relative w-full max-w-[320px] md:max-w-[480px] aspect-[4/5.5] group cursor-pointer"
                    >
                      {/* Layer Bottom: Ambient Back Glow */}
                      <motion.div
                        style={{ translateZ: -100 }}
                        animate={{ opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute inset-0 bg-sky-500/20 blur-[100px] rounded-full -z-10"
                      />

                      {/* Layer Mid: Main Photo Card (Always in Color) */}
                      <motion.div
                        style={{
                          x: layer1X,
                          y: layer1Y,
                          translateZ: 50,
                          transformStyle: "preserve-3d",
                        }}
                        className="relative w-full h-full rounded-[3rem] md:rounded-[4rem] overflow-hidden border border-white/20 glass shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
                      >
                        <img
                          src="https://res.cloudinary.com/thanhphuongdev/image/upload/v1769871580/480871455_1804998116709580_5147978810349798493_n_qyxuqm.jpg"
                          alt="Thanh Phương"
                          className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-110 transition-transform duration-[2s] ease-out"
                        />

                        {/* Shine Animation */}
                        <motion.div
                          animate={{ left: ["-100%", "200%"] }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            repeatDelay: 1,
                          }}
                          className="absolute top-0 bottom-0 w-[40%] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-50" />
                      </motion.div>

                      {/* Layer Front: Identity Badge */}
                      <motion.div
                        style={{
                          x: layer2X,
                          y: layer2Y,
                          translateZ: 180,
                          rotateZ: -3,
                        }}
                        className="absolute -right-6 md:-right-10 bottom-20 z-20 glass p-5 md:p-8 rounded-2xl md:rounded-[2.5rem] border-white/30 shadow-2xl backdrop-blur-3xl"
                      >
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse shadow-[0_0_10px_#38bdf8]" />
                            <span className="text-[10px] font-mono font-black text-sky-400/80 tracking-widest uppercase">
                              CORE_IDENTITY
                            </span>
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl md:text-4xl font-black text-white tracking-tighter">
                              02.01
                            </span>
                            <span className="text-sm md:text-xl font-bold text-slate-500 italic">
                              / 2002
                            </span>
                          </div>
                          <div className="h-px w-full bg-white/10 my-1" />
                          <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">
                            DA NANG, VN
                          </span>
                        </div>
                      </motion.div>

                      {/* Decorative Corner Brackets */}
                      <motion.div
                        style={{ translateZ: 200 }}
                        className="absolute -left-6 -top-6 w-12 h-12 border-t-2 border-l-2 border-sky-500/50 rounded-tl-2xl hidden md:block"
                      />
                      <motion.div
                        style={{ translateZ: 200 }}
                        className="absolute -right-6 -bottom-6 w-12 h-12 border-b-2 border-r-2 border-purple-500/50 rounded-br-2xl hidden md:block"
                      />
                    </motion.div>

                    {/* Content Side */}
                    <div className="flex-1 text-center lg:text-left relative z-10">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-3 mb-10 px-6 py-2 rounded-full glass border border-sky-500/20 bg-sky-500/5 shadow-[0_0_20px_rgba(56,189,248,0.1)]"
                      >
                        <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                        <span className="text-sky-400 text-[10px] md:text-[13px] font-black uppercase tracking-[0.4em]">
                          {lang === "en"
                            ? "Fullstack Engineer"
                            : "Kiến trúc sư Fullstack"}
                        </span>
                      </motion.div>

                      <motion.h1
                        variants={containerVars}
                        initial="before"
                        animate="after"
                        className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-10 tracking-tighter leading-[0.85] text-white flex flex-col lg:items-start items-center uppercase"
                      >
                        <div className="text-gradient flex flex-wrap items-center justify-center lg:justify-start gap-x-[0.25em] gap-y-2 drop-shadow-[0_0_30px_rgba(56,189,248,0.2)]">
                          {"HO VAN THANH PHUONG".split(" ").map((word, wIdx) => (
                            <span key={`word-${wIdx}`} className="inline-block whitespace-nowrap">
                              {Array.from(word).map((l, i) => (
                                <motion.span
                                  key={`fullname-${wIdx}-${i}`}
                                  variants={letterVars}
                                  className="inline-block"
                                >
                                  {l}
                                </motion.span>
                              ))}
                            </span>
                          ))}
                        </div>
                      </motion.h1>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="max-w-2xl relative mb-14"
                      >
                        <p className="text-lg md:text-2xl text-slate-400 font-light leading-relaxed italic border-l-4 border-sky-500/30 pl-8">
                          {lang === "en" ? (
                            <>
                              Striving to become an{" "}
                              <span className="text-white font-bold">
                                exceptional Fullstack Developer
                              </span>
                              , aiming to build high-impact products and
                              effectively solve complex systemic challenges.
                            </>
                          ) : (
                            <>
                              Hướng tới trở thành một{" "}
                              <span className="text-white font-bold">
                                Lập trình viên Fullstack xuất sắc
                              </span>
                              , với mục tiêu xây dựng các sản phẩm mang giá trị
                              thực tiễn và giải quyết hiệu quả những bài toán hệ
                              thống phức tạp.
                            </>
                          )}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Projects Section */}
              <section
                id="experience"
                className="relative z-10 py-24 px-6 bg-slate-950/20"
              >
                <div className="container mx-auto">
                  <div className="mb-16 text-center">
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="text-3xl md:text-7xl font-black tracking-tighter text-white uppercase leading-none"
                    >
                      {lang === "en" ? "FEATURED" : "DỰ ÁN"}{" "}
                      <span className="text-gradient">
                        {lang === "en" ? "PROJECTS" : "TIÊU BIỂU"}
                      </span>
                    </motion.h2>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                    {PROJECTS.filter((p) => p.title !== "VIDE")
                      .slice(0, 4)
                      .map((project, idx) => (
                        <ProjectCard
                          key={project.title}
                          project={project}
                          index={idx}
                          lang={lang}
                          onOpen={() => handleOpenProject(project)}
                        />
                      ))}
                  </div>

                  <div className="mt-16 text-center">
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 0 40px rgba(56,189,248,0.5)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleOpenAllProjects}
                      className="
      relative
      px-12 py-5
      rounded-2xl
      bg-gradient-to-r from-sky-500 via-blue-500 to-purple-600
      text-white
      font-bold
      transition-all
      shadow-xl
      shadow-sky-500/20
      inline-flex
      items-center
      gap-4
      group
      uppercase
      tracking-[0.18em]
      text-[10px]
      md:text-xs
      cursor-pointer
      overflow-hidden
    "
                    >
                      {/* shine effect */}
                      <span
                        className="
        absolute inset-0
        bg-gradient-to-r
        from-transparent
        via-white/30
        to-transparent
        translate-x-[-100%]
        group-hover:translate-x-[100%]
        transition-transform
        duration-700
      "
                      />

                      <span className="relative z-10">
                        {lang === "en"
                          ? "View All Projects"
                          : "Xem Tất Cả Dự Án"}
                      </span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="
        h-4 w-4
        relative z-10
        text-white
        transform
        group-hover:translate-x-2
        transition-transform
        duration-300
      "
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </section>

              <section id="skills" className="relative z-10 py-24 px-6">
                <div className="container mx-auto">
                  <InteractiveSkills lang={lang} />
                </div>
              </section>

              {/* Other sections remain the same but benefit from improved spacing */}
              <section
                id="journey"
                className="relative z-10 py-24 bg-slate-950/40"
              >
                <div className="container mx-auto px-6 mb-16 text-center">
                  <motion.h2 className="text-3xl md:text-7xl font-black tracking-tighter text-white uppercase leading-none">
                    {lang === "en" ? "MY" : "HÀNH"}{" "}
                    <span className="text-gradient">
                      {lang === "en" ? "JOURNEY" : "TRÌNH"}
                    </span>
                  </motion.h2>
                </div>
                <StorytellingSection lang={lang} />
              </section>

              {/* Work Experience Section */}
              <section id="work" className="relative z-10 py-24 px-6">
                <div className="container mx-auto">
                  <div className="mb-16 text-center">
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="text-3xl md:text-7xl font-black tracking-tighter text-white uppercase leading-none"
                    >
                      {lang === "en" ? "WORK" : "KINH NGHIỆM"}{" "}
                      <span className="text-gradient">
                        {lang === "en" ? "EXPERIENCE" : "LÀM VIỆC"}
                      </span>
                    </motion.h2>
                  </div>
                  <WorkExperience lang={lang} />
                </div>
              </section>

              <ContactSection lang={lang} />
            </motion.div>
          )
        ) : (
          <motion.div
            key="detail-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProjectDetailView
              project={selectedProject}
              onClose={handleCloseProject}
              lang={lang}
              toggleLanguage={toggleLanguage}
              onSelectProject={handleOpenProject}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* <footer className="relative z-10 pt-16 pb-24 md:pb-12 text-center text-slate-600 text-[10px] font-mono border-t border-white/5 tracking-[0.6em] uppercase px-6">
        &copy; {new Date().getFullYear()} HO VAN THANH PHUONG // V2.5 //
        CORE_ACTIVE
      </footer> */}
    </div>
  );
};

export default App;
