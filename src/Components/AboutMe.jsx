import React, { useState, useEffect } from "react";
import { Briefcase, Code, User } from "lucide-react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";

const AboutMe = () => {
  const [aboutData, setAboutData] = useState({
    headline: "Passionate of building AI Products for problem solving",
    bio1: "I’m a passionate AI developer focused on building useful projects. I’m also learning project management and UI design to better plan, structure, and design the tools I create.",
    bio2: "python, reactjs, fastapi",
    skillsSummary: "",
    cvUrl: "src/assets/CV.pdf"
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "content", "about"), (doc) => {
      if (doc.exists()) {
        setAboutData(doc.data());
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <section
      id="about"
      className=" md:container mx-auto py-24 px-4 relative flex align-center justify-around"
    >
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary">Me</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="font-bold text-2xl">{aboutData.headline}</h3>
            <p className="text-muted-foreground">
              {aboutData.bio1}
            </p>
            {aboutData.bio2 && (
              <p className="text-muted-foreground">
                {aboutData.bio2}
              </p>
            )}
            {aboutData.skillsSummary && (
              <p className="text-muted-foreground">{aboutData.skillsSummary}</p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact" className="cosmic-button">
                Get in Touch
              </a>
              <a
                href={aboutData.cvUrl || "src/assets/CV.pdf"}
                download="Boluwatife_Gbadamosi_CV.pdf"
                target="_blank"
                className="border-primary bg-primary/30 text-center border-2 rounded-full  w-full md:w-40  flex items-center justify-center"
              >
                Download Cv
              </a>
            </div>
          </div>
          <div className="grid grid-col-1 gap-6">
            <div className="graident-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Code />
                </div>
                <h4 className="text font-semibold text-xl mt-3">AI development</h4>

              </div>
              <div className="text-left">
                <p>
                  I
                  build responsive user interfaces with HTML, CSS, JavaScript,
                  and React, and create powerful backend APIs using Python,
                  FastAPI, and MySQL.
                </p>
              </div>
            </div>
                <div className="graident-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <User />
                </div>
                <h4 className="text font-semibold text-xl mt-3">UI designs</h4>

              </div>
              <div className="text-left">
                <p>
                I’m growing in AI development while learning project management and UI design. I enjoy planning projects, designing user-friendly screens, and building tools that solve real problems.
                </p>
              </div>
            </div>
            <div className="graident-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Briefcase />
                </div>
                <h4 className="text font-semibold text-xl mt-3">Project Management</h4>

              </div>
              <div className="text-left">
                <p>
                 I focus on managing projects from start to finish, coordinating tasks, and ensuring teams work efficiently toward their goals.
                </p>
              </div>
            </div>
          
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
