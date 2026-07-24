import React, { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { cn } from "../lib/utils";
import "../index.css";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 120);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
      className="px-4 py-16 md:py-24 lg:p-20"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Radial Glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.12),transparent_70%)] blur-[120px]" />

        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(120,120,120,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(120,120,120,0.12)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(circle_at_center,white,transparent_90%)]" />

        {/* Glass Shapes — hidden on mobile */}
        <div className="hidden md:block absolute w-[180px] h-[280px] rounded-3xl bg-white/[0.05] backdrop-blur-xl border border-white/[0.1] shadow-[0_0_50px_rgba(34,197,94,0.08)] left-[8%] bottom-[10%]" />
        <div className="hidden md:block absolute w-[180px] h-[280px] rounded-3xl bg-white/[0.05] backdrop-blur-xl border border-white/[0.1] shadow-[0_0_50px_rgba(34,197,94,0.08)] right-[10%] top-[15%]" />
      </div>

      {/* MAIN CONTENT */}
      <div
        className={cn(
          "relative z-10 container mx-auto px-6",
          "min-h-screen flex flex-col lg:flex-row",
          "items-center justify-center",
          "gap-12 lg:gap-20",
          "transition-all duration-1000 ease-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        )}
      >
        {/* IMAGE SECTION */}
        <div className="relative flex justify-center lg:w-[35%]">
          <div className="relative scale-[0.95]">
            {/* Glow system */}
            <div className="absolute inset-0 rounded-full bg-emerald-500/15 scale-[1.15] blur-[60px]" />
            <div className="absolute inset-0 rounded-full border border-emerald-300/60 scale-[1.05]" />
            <div className="absolute inset-0 rounded-full border border-emerald-500/25 scale-[1.12]" />

            <img
              src="/portfolio_img2.png"
              alt="Boluwatife"
              className="w-[280px] sm:w-[340px] md:w-[420px] lg:w-[620px] rounded-full border border-white/[0.15] relative z-[2]"
            />
          </div>
        </div>

        {/* TEXT SECTION */}
        <div className="relative lg:w-[45%]">
          {/* Floating particles — hidden on mobile, prevents overlap */}
          <div className="hidden md:block absolute right-0 top-[-30px]">
            <span className="particle" />
            <span className="particle delay-1" />
            <span className="particle delay-2" />
            <span className="particle delay-3" />
          </div>

          {/* Heading */}
          <h1 className="font-black leading-[0.95]">
            <span className="block text-5xl md:text-6xl lg:text-7xl text-muted-foreground">
              Hi, I'm
            </span>

            <span className="bg-gradient-to-r from-teal-800 via-emerald-500 to-lime-400 bg-clip-text text-transparent block text-5xl md:text-6xl lg:text-7xl">
              Boluwatife
            </span>

            <span className="bg-gradient-to-r from-teal-800 via-emerald-500 to-lime-400 bg-clip-text text-transparent block text-5xl md:text-6xl lg:text-7xl">
              Gbadamosi
            </span>
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground">
           I build AI-powered products and intelligent web applications that solve everyday problems. I enjoy building healthcare AI solutions, implementing RAG-powered chatbots, automating workflows, and continuously learning as I build.
          </p>

          <div className="mt-10">
            <a href="#projects" className="inline-flex items-center justify-center px-7 sm:px-[42px] py-4 rounded-full text-white font-semibold bg-gradient-to-br from-lime-400 via-emerald-500 to-teal-700 shadow-[0_0_40px_rgba(16,185,129,0.3)] transition-all duration-700 hover:-translate-y-[5px] hover:scale-[1.03] hover:shadow-[0_20px_60px_rgba(16,185,129,0.4)]">
              My Projects
            </a>
          </div>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center animate-bounce z-20">
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
      
    </section>
  );
};

export default HeroSection;
