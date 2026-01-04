import React, { useState, useEffect } from "react";
import { cn } from "../lib/utils";
import { X, Menu } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { name: "HOME", href: "#home" },
  { name: "ABOUT", href: "#about" },
  { name: "SKILLS", href: "#skills" },
  { name: "PROJECTS", href: "#projects" },
  { name: "CONTACT", href: "#contact" },
];

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10); // FIXED
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "flex w-screen z-40 transition-all duration-300 items-center justify-center",
        isScrolled
          ? "fixed py-3 bg-background/80 backdrop-blur-md shadow-sm"
          : "py-5"
      )}
    >
      <div className="flex w-3/4 justify-around flex-1">
        {/* Logo */}
        <a className="text-2xl font-bold text-primary flex items-center" href="#hero">
          <span className="relative z-10">
            <span className="text-glow text-foreground">BoluCodes</span> Portfolio
          </span>
        </a>

    <div className="hidden md:block">
          {/* Desktop menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {navItems.map((item, key) => (
            <a
              key={key}
              href={item.href}
              className="text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              {item.name}
            </a>
          ))}
       
        </div>
           <ThemeToggle />
    </div>

        {/* Mobile: Theme toggle + hamburger aligned */}
        <div className="flex md:hidden items-center">
            <div>
          <ThemeToggle />
            </div>
          <button
            className="z-50 text-foreground p-1 mr-4"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "fixed flex flex-col inset-0 bg-background/95 backdrop-blur-md z-40 items-center justify-center",
            "transition-all duration-300 md:hidden",
            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col space-y-8 items-center">
            {navItems.map((item, key) => (
              <a
                key={key}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}

            {/* Theme toggle inside mobile menu */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
