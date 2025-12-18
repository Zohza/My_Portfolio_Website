import { ArrowRight, ExternalLink, Github } from "lucide-react";
import React from "react";

const projects = [
  {
    id: 1,
    title: "Ecommerce store",
    description: "this project is an ecommerce store",
    tags: ["html", "css", "javascript"],
    imgUrl: "..src/",
    github: "#",
    demoUrl: "#",
  },
  {
    id: 2,
    title: "Ecommerce store",
    description: "",
    tags: ["html", "css", "javascript"],
    imgUrl: "..src/",
    github: "#",
    demoUrl: "#",
  },
  {
    id: 3,
    title: "Ecommerce store",
    description: "",
    tags: ["html", "css", "javascript"],
    imgUrl: "..src/",
    github: "#",
    demoUrl: "#",
  },
];
const ProjectsSection = () => {
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
   {projects.map((project)=>(
    <div key={project.id} className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover">
      <div>
        <img src={project.imgUrl} alt={project.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"/>
        <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
      </div>
      <div className="flex text-foreground  h-20 items-center justify-center">
        {project.description}
      </div>
      <div className="flex gap-4 justify-around p-2 font-bold/20 capitalize bg-secoundary">{project.tags.map((tag)=>(
        <div className=" px-3 py-2 rounded-full">{tag}</div>
      ))}</div>
  <div className="flex gap-9 justify-center mt-5 bg-primary/5 px-5 py-2 rounded-tr-xl rounded-tl-xl w-30 mx-auto">
        <a href={project.demoUrl}><ExternalLink size={20}/></a>
      <a href={project.imgUrl}><Github size={20}/></a>
  </div>
     
    </div>
   ))}
      </div>
      <div className="mt-12 bg-primary w-50 mx-auto rounded-full flex items-center p-4 text-foreground gap-2 font-semibold"><ArrowRight /> check My github</div>
    </section>
  );
};

export default ProjectsSection;
