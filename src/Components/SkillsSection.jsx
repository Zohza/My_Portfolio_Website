import React, { useState, useEffect } from "react";
import { cn } from "../lib/utils";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";

const CategoryList = ["All", "Frontend", "Backend", "Tools"];

const SkillsSection = () => {
  const [category, setCategory] = useState("All");
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "skills"), orderBy("category", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const skillsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSkills(skillsData);
    });

    return () => unsubscribe();
  }, []);

  const filteredSkills = skills.filter(
    (s) => category === "All" || s.category === category,
  );

  return (
    <section
      id="skills"
      className="relative py-16 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent"
    >
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(120,120,120,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(120,120,120,0.12)_1px,transparent_1px)] bg-[size:60px_60px] opacity-40 pointer-events-none" />

      {/* Glow Background — shifted left for section distinction */}
      <div className="absolute left-[-10%] top-[20%] w-[600px] h-[600px] bg-emerald-400/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            My <span className="text-primary">Skills</span>
          </h2>

          <div className="w-20 h-1 bg-emerald-400 mx-auto mt-4 rounded-full" />

          <p className="text-muted-foreground mt-5 max-w-xl mx-auto text-sm">
            A focused set of technologies I use to build clean, scalable, and
            modern applications.
          </p>
        </div>

        {/* FILTERS */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-2 p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            {CategoryList.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "px-5 py-2 text-sm rounded-full transition-all duration-300",
                  category === cat
                    ? "bg-emerald-500 text-black font-medium shadow-lg"
                    : "text-muted-foreground hover:text-white",
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <div key={skill.id} className="skill-card group">
              {/* TOP ROW */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-muted-foreground group-hover:text-emerald-300 transition">
                  {skill.name}
                </h3>

                <span className="text-xs text-muted-foreground">
                  {skill.level}%
                </span>
              </div>

              {/* BAR */}
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="skill-bar"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
