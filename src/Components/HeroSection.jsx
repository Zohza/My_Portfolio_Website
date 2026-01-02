import React, { useEffect } from "react";
import { ArrowDown } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";
const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className=" flex align-center justify-center">
      <div
        id="home"
        className={cn(
          " flex max-sm:flex-col max-sm:justify-center gap-6 p-3 md:flex justify-around items-center transition duration-500  min-h-screen w-full   md:container lg:w-[65%]",
          isVisible ? "opacity-100 translate-x-0" : "translate-x-10 opacity-0"
        )}
      >
        <img
          src="/portfolio_img2.png"
          alt="image of Boluwatife"
          className="rounded-full md:block md:w-120 lg:250"
        />
        <div className="relative flex flex-col justify-center align-center px-4 gap-4">
          <div className=" max-w-4xl z-10 flex flex-col gap-9">
            <div className="text-4xl  md:text-6xl  font-bold leading-tight">
              <span className="animate-fade-in opacity-0">Hi, I'm </span>
              <span className="animate-fade-in-delay-1 opacity-0 text-primary">
                Boluwatife{" "}
              </span>
              <span className="animate-fade-in-delay-2 opacity-0 text-primary">
                Gbadamosi
              </span>
            </div>
            <p className="animate-fade-in-delay-4">
              I build simple AI tools and experiments that solve everyday
              problems. Learning, building, and sharing my progress as I grow in
              the AI space.
            </p>
          </div>
          <div className="pt-4">
            <a
              href="#projects"
              className="space-y-2 cosmic-button animate-fade-in-delay-4 opacity-0"
            >
              {" "}
              my projects
            </a>
          </div>
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col animate-bounce bottom-8">
          <span className="text-sm mb-2">Scroll</span>
          <span className="h-5 w-5 text-primary">
            <ArrowDown />
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
