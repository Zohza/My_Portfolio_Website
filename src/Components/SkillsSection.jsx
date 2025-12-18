import React from "react";
import {useState} from 'react'
import { cn } from "../lib/utils";
const skills = [
  {
    name: "HTML/CSS",
    level: 100,
    category: "Frontend",
  },
  {
    name: "Javascript",
    level: 100,
    category: "Frontend",
  },
  {
    name: "React",
    level: 100,
    category: "Frontend",
  },
  {
    name: "Tailwind CSS",
    level: 100,
    category: "Frontend",
  },
  {
    name: "MySql",
    level: 100,
    category: "Backend",
  },
  {
    name: "Git/GitHub",
    level: 100,
    category: "Frontend",
  },
  {
    name: "VS code",
    level: 100,
    category: "Frontend",
  },
    {
    name: "python",
    level: 100,
    category: "Backend",
  },
];
const CategoryList = ['All', 'Frontend','Backend']
const SkillsSection = () => {
  const [category, setCategory]= useState('All')
  const filteredSkills =skills.filter((s)=> category ==='All' || s.category===category)

  return (
    <section id="skills" className=" md:skill py-24 px-4 relative bg-secondary/30 w-[75%] mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        My <span className="text-primary">Skills</span>
      </h2>
      <div className="flex align-center justify-center gap-4  mb-6">
        {CategoryList.map((cat,key)=>(
        <button onClick={()=>{
          setCategory(cat)

        }}
          key={key} className={cn(" border-primary text-muted-foreground bg-background-primary rounded-full p-4", category=== cat ? 'bg-primary text-primary-foreground': 'bg-secondary/70')}>{cat}</button>
        ))}
      </div>
      <div className="grid grid-col-1 sm:grid-col-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill, key) => (
          <div
            key={key}
            className="bg-card p-6 rounded-lg shadow-xs card-hover"
          >
            <div className="text-left mb-4">
              <h3 className="font-semibold text-lg">{skill.name}</h3>
            </div>
            <div className="w-full bg-secondary/50 h-2 rounded-full ">
              <div
                className="bg-primary h-2 rounded-full origin-left animate-g[grow_1.5s_ease-out"
                style={{ width: skill.level + "%" }}
              >
        
              </div>
            

            </div>
            <div></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
