import React, { useState, useEffect } from "react";
import { Briefcase, Code, User } from "lucide-react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";

const AboutMe = () => {
  const [aboutData, setAboutData] = useState({
    headline: "Passionate of building AI Products for problem solving",
    bio1: "I’m a passionate AI developer focused on building useful projects. I also explore UI design and project structuring to build better systems.",
    bio2: "python, reactjs, fastapi",
    skillsSummary: "",
    cvUrl: "/CV.pdf",
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "content", "about"), (doc) => {
      if (doc.exists()) setAboutData(doc.data());
    });

    return () => unsubscribe();
  }, []);

  return (
    <section id="about" className="relative py-16 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-6xl mx-auto">
        {/* SECTION TITLE */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            About <span className="text-primary">Me</span>
          </h2>

          <div className="w-20 h-[3px] bg-emerald-400/80 mx-auto mt-4 rounded-full" />
        </div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* LEFT CONTENT */}
          <div className="space-y-8">
            {/* HEADLINE */}
            <h3 className="text-2xl md:text-3xl font-semibold leading-snug text-muted-foreground">
              {aboutData.headline}
            </h3>

            {/* BIO */}
            <p className="text-muted-foreground leading-relaxed">
              {aboutData.bio1}
            </p>

            {aboutData.bio2 && (
              <p className="text-muted-foreground leading-relaxed">
                {aboutData.bio2}
              </p>
            )}

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="#contact" className="inline-flex items-center justify-center px-[42px] py-4 rounded-full text-white font-semibold bg-gradient-to-br from-lime-400 via-emerald-500 to-teal-700 shadow-[0_0_40px_rgba(16,185,129,0.3)] transition-all duration-700 hover:-translate-y-[5px] hover:scale-[1.03] hover:shadow-[0_20px_60px_rgba(16,185,129,0.4)]">
                Get in Touch
              </a>

              <a
                href={aboutData.cvUrl || "/CV.pdf"}
                target="_blank"
                download
                className="px-6 py-3 rounded-full border border-green/90 bg-green/5 ring-green-500 ring-2 text-muted-foreground text-center backdrop-blur-md hover:bg-white/10 transition"
              >
                Download CV
              </a>
            </div>
          </div>

          {/* RIGHT CARDS */}
          <div className="grid gap-6">
            {/* CARD 1 */}
            <div className="bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-emerald-500/40 hover:shadow-[0_20px_60px_rgba(16,185,129,0.1)]">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Code size={20} />
                </div>
                <h4 className="text-xl font-semibold text-muted-foreground">
                  AI Development
                </h4>
              </div>

              <p className="mt-4 text-muted-foreground leading-relaxed">
                I build responsive interfaces using React and Tailwind, and
                develop backend systems with Python, FastAPI, and databases.
              </p>
            </div>

            {/* CARD 2 */}
            <div className="bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-emerald-500/40 hover:shadow-[0_20px_60px_rgba(16,185,129,0.1)]">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <User size={20} />
                </div>
                <h4 className="text-xl font-semibold text-muted-foreground">
                  UI Design
                </h4>
              </div>

              <p className="mt-4 text-muted-foreground leading-relaxed">
                I design clean user interfaces and improve user experience
                through structured layouts and simple interactions.
              </p>
            </div>

            {/* CARD 3 */}
            <div className="bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-emerald-500/40 hover:shadow-[0_20px_60px_rgba(16,185,129,0.1)]">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Briefcase size={20} />
                </div>
                <h4 className="text-xl font-semibold text-muted-foreground">
                  Project Management
                </h4>
              </div>

              <p className="mt-4 text-muted-foreground leading-relaxed">
                I organize tasks, structure workflows, and ensure projects move
                from idea to execution efficiently.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
