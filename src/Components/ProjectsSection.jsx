import { ExternalLink, Github } from "lucide-react";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(projectsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching projects: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section id="projects" className="relative py-16 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* HEADING */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <div className="w-20 h-[3px] bg-emerald-400/80 mx-auto mt-4 rounded-full" />
          <p className="text-muted-foreground mt-5 max-w-xl mx-auto text-sm sm:text-base">
            A selection of recent work — each project was crafted with attention to detail, performance, and user experience.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center p-16">
             <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-foreground/10 border-t-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((project)=>(
              <div key={project.id} className="group bg-card rounded-xl border border-border/70 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden">
                {/* IMAGE */}
                <div className="h-48 overflow-hidden relative">
                  <img src={project.imgUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className={`absolute top-3 right-3 text-[10px] px-2.5 py-1 rounded-full font-medium tracking-wide ${project.isCompleted !== false ? 'bg-emerald-500/90 text-white' : 'bg-amber-500/90 text-white'}`}>
                    {project.isCompleted !== false ? 'Completed' : 'In Progress'}
                  </span>
                </div>

                {/* CONTENT */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{project.title}</h3>

                  <p className="text-sm text-muted-foreground/80 leading-relaxed mb-4 flex-1 line-clamp-3">
                    {project.description}
                  </p>

                  {/* TAGS */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="text-[11px] px-2.5 py-1 rounded-md bg-emerald-500/8 text-emerald-600 dark:text-emerald-400 font-medium">{tag}</span>
                      ))}
                    </div>
                  )}

                  {/* LINKS */}
                  <div className="flex gap-3 pt-3 border-t border-border/40 mt-auto">
                    {project.demoUrl && (
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors">
                        <ExternalLink size={14} /> Live Demo
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors">
                        <Github size={14} /> Source
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-14 text-center">
          <a
            href="https://github.com/boluscript"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border/70 text-sm font-medium text-foreground hover:bg-card hover:shadow-sm transition-all"
          >
            <Github size={18} /> View all on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
