import React from "react";
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full overflow-hidden py-16 md:py-20 px-4 sm:px-6 lg:px-8">

      {/* SUBTLE BACKGROUND GLOWS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 left-10 w-[400px] h-[400px] bg-emerald-400/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-10 w-[450px] h-[450px] bg-purple-400/10 blur-[140px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(120,120,120,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(120,120,120,0.06)_1px,transparent_1px)] bg-[size:60px_60px] opacity-40" />
      </div>

      {/* MAIN CARD */}
      <div className="relative max-w-6xl mx-auto rounded-2xl border border-border/70 bg-gradient-to-br from-lime-400 via-emerald-500 to-teal-700 text-white  backdrop-blur-sm p-8 sm:p-10 md:p-14 shadow-sm">
        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row justify-between gap-10 lg:gap-16">

          {/* BRAND */}
          <div className="space-y-4 max-w-md">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              BoluScript
            </h2>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Building modern AI tools, experiments, and digital products that solve real-world problems.
              Focused on design, systems, and meaningful engineering.
            </p>

            {/* SOCIALS */}
            <div className="flex gap-3 pt-2">
              <a className="p-2.5 rounded-xl bg-background border border-border/60 text-foreground hover:text-foreground hover:border-foreground/30 transition-all" href="#" aria-label="GitHub">
                <Github size={18} />
              </a>
              <a className="p-2.5 rounded-xl bg-background border border-border/60 text-foreground hover:text-foreground hover:border-foreground/30 transition-all" href="#" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a className="p-2.5 rounded-xl bg-background border border-border/60 text-foreground hover:text-foreground hover:border-foreground/30 transition-all" href="mailto:boluscript.dev@gmail.com" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* NAV LINKS */}
          <div className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm">
            {[
              ["Home", "#home"],
              ["About", "#about"],
              ["Skills", "#skills"],
              ["Projects", "#projects"],
              ["Certifications", "#certifications"],
              ["Contact", "#contact"],
            ].map(([label, link]) => (
              <a
                key={label}
                href={link}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 w-fit"
              >
                {label}
              </a>
            ))}
          </div>

          {/* BACK TO TOP */}
          <div className="flex flex-col items-start md:items-end gap-3">
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-background border border-border/60 text-foreground hover:text-foreground hover:border-foreground/30 transition-all text-sm"
            >
              <ArrowUp
                size={16}
                className="group-hover:-translate-y-1 transition-transform"
              />
              Back to top
            </button>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-8 h-px bg-border/60" />

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground gap-3">
          <p>
            &copy; {new Date().getFullYear()} BoluCodes. All rights reserved.
          </p>

       
        </div>
      </div>
    </footer>
  );
};

export default Footer;
