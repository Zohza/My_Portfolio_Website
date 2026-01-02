import { ArrowRight, ExternalLink, Github } from "lucide-react";
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
    <section id="projects" className="mx-auto sm:w-[85%] md:w-[60%]">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured <span className="text-primary">Projects</span>
        </h2>
      </div>
      <p className="text-foreground mb-12 ">
        {" "}
        Here are a list of my recent projects, the project was carefull crafted
        with attention to detail, performance and user experiencd
      </p>
      
      {loading ? (
        <div className="flex justify-center p-12">
           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project)=>(
            <div key={project.id} className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <img src={project.imgUrl} alt={project.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"/>
                <span className={`absolute top-2 right-2 text-[10px] px-2 py-1 rounded-full font-medium ${project.isCompleted !== false ? 'bg-green-500/90 text-white' : 'bg-yellow-500/90 text-black'}`}>
                  {project.isCompleted !== false ? '✓ Completed' : '⏳ In Progress'}
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                  <div>
                     <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                  </div>
                  <div className="text-foreground/80 text-sm mb-4 flex-1">
                    {project.description}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4 font-bold/20 capitalize">
                    {project.tags && project.tags.map((tag, i)=>(
                      <div key={i} className="bg-secondary px-3 py-1 text-xs rounded-full">{tag}</div>
                    ))}
                  </div>
                  <div className="flex gap-4 justify-center mt-auto bg-primary/5 p-2 rounded-lg">
                        {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary"><ExternalLink size={20}/></a>}
                        {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary"><Github size={20}/></a>}
                  </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-12 bg-primary w-50 mx-auto rounded-full flex items-center p-4 text-foreground gap-2 font-semibold"><ArrowRight /> check My github</div>
    </section>
  );
};

export default ProjectsSection;
