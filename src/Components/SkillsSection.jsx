import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "../lib/utils";

import {
  SiReact,
  SiNextdotjs,
  SiPython,
  SiFastapi,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiMysql,
  SiPostgresql,
  SiSupabase,
  SiFirebase,
  SiGit,
  SiGithub,
  SiDocker,
  SiOpenai,
  SiLangchain,
  SiVercel,
} from "react-icons/si";

const technologies = [
  { name: "React", icon: SiReact, category: "Frontend", color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, category: "Frontend", color: "#fff" },
  { name: "JavaScript", icon: SiJavascript, category: "Frontend", color: "#F7DF1E" },
  { name: "TypeScript", icon: SiTypescript, category: "Frontend", color: "#3178C6" },
  { name: "HTML5", icon: SiHtml5, category: "Frontend", color: "#E34F26" },
  { name: "CSS3", icon: SiCss3, category: "Frontend", color: "#1572B6" },
  { name: "Tailwind CSS", icon: SiTailwindcss, category: "Frontend", color: "#06B6D4" },
  { name: "Python", icon: SiPython, category: "Backend", color: "#3776AB" },
  { name: "FastAPI", icon: SiFastapi, category: "Backend", color: "#009688" },
  { name: "MySQL", icon: SiMysql, category: "Backend", color: "#4479A1" },
  { name: "PostgreSQL", icon: SiPostgresql, category: "Backend", color: "#4169E1" },
  { name: "Supabase", icon: SiSupabase, category: "Backend", color: "#3FCF8E" },
  { name: "Firebase", icon: SiFirebase, category: "Backend", color: "#FFCA28" },
  { name: "OpenAI", icon: SiOpenai, category: "AI/ML", color: "#412991" },
  { name: "LangChain", icon: SiLangchain, category: "AI/ML", color: "#1C3C3C" },
  { name: "LangGraph", icon: SiLangchain, category: "AI/ML", color: "#1C3C3C" },
  { name: "Git", icon: SiGit, category: "Tools", color: "#F05032" },
  { name: "GitHub", icon: SiGithub, category: "Tools", color: "#fff" },
  { name: "Docker", icon: SiDocker, category: "Tools", color: "#2496ED" },
  { name: "Vercel", icon: SiVercel, category: "Tools", color: "#fff" },
];

const categories = ["All", "Frontend", "Backend", "AI/ML", "Tools"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const SkillsSection = () => {
  const [category, setCategory] = useState("All");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  const filtered =
    category === "All"
      ? technologies
      : technologies.filter((t) => t.category === category);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-16 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent"
    >
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(120,120,120,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(120,120,120,0.12)_1px,transparent_1px)] bg-[size:60px_60px] opacity-40 pointer-events-none" />

      {/* Glow Background */}
      <div className="absolute left-[-10%] top-[20%] w-[600px] h-[600px] bg-emerald-400/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            Tech <span className="text-primary">Stack</span>
          </h2>
          <div className="w-20 h-1 bg-emerald-400 mx-auto mt-4 rounded-full" />
          <p className="text-muted-foreground mt-5 max-w-xl mx-auto text-sm">
            Technologies I use to build modern AI-powered applications and
            intelligent web experiences.
          </p>
        </div>

        {/* FILTERS */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-2 p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "px-5 py-2 text-sm rounded-full transition-all duration-300",
                  category === cat
                    ? "bg-emerald-500 text-black font-medium shadow-lg"
                    : "text-muted-foreground hover:text-white"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* TECH GRID — keyed on category so stagger replays on filter change */}
        <motion.div
          key={category}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {filtered.map((tech) => (
            <motion.div
              key={tech.name}
              variants={cardVariants}
              className={cn(
                "group relative",
                "bg-white/[0.04] backdrop-blur-sm",
                "border border-white/[0.08]",
                "rounded-xl p-5",
                "flex flex-col items-center justify-center gap-3",
                "cursor-default",
                "transition-all duration-300 ease-out",
                "hover:-translate-y-2 hover:scale-[1.03]",
                "hover:shadow-lg",
                "focus-visible:outline-2 focus-visible:outline-emerald-400 focus-visible:outline-offset-2"
              )}
              onMouseEnter={(e) => {
                if (tech.color !== "#000" && tech.color !== "#fff") {
                  e.currentTarget.style.borderColor = tech.color;
                  e.currentTarget.style.boxShadow = `0 10px 40px -8px ${tech.color}33`;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "";
                e.currentTarget.style.boxShadow = "";
              }}
              role="article"
              aria-label={`${tech.name} — ${tech.category}`}
              tabIndex={0}
            >
              <tech.icon
                size={30}
                className="transition-all duration-300 ease-out group-hover:scale-110"
                style={{
                  color:
                    tech.color === "#000" || tech.color === "#fff"
                      ? "currentColor"
                      : tech.color,
                }}
              />

              <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300 text-center leading-tight">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
