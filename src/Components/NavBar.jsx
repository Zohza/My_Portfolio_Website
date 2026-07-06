import React, { useState, useEffect, useRef } from "react";
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

  const [underlineStyle, setUnderlineStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleMouseEnter = (e) => {
    const rect = e.target.getBoundingClientRect();
    const parentRect = navRef.current.getBoundingClientRect();

    setUnderlineStyle({
      left: rect.left - parentRect.left,
      width: rect.width,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setUnderlineStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5",
      )}
    >
      {/* CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
        {/* LOGO */}
        <a
          href="#home"
          className="text-lg sm:text-xl md:text-2xl font-bold text-foreground flex items-center"
        >
          <span className="text-primary">BoluScript</span>
          <span className="ml-2 hidden sm:inline">Portfolio</span>
        </a>

        {/* DESKTOP NAV */}
        <div
          ref={navRef}
          className="hidden md:flex relative items-center gap-6 lg:gap-10"
        >
          {navItems.map((item, key) => (
            <a
              key={key}
              href={item.href}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative text-sm lg:text-base text-foreground/70 hover:text-primary transition-colors duration-300"
            >
              {item.name}
            </a>
          ))}

          {/* UNDERLINE INDICATOR */}
          <span
            className="absolute bottom-[-6px] h-[2px] bg-primary rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              left: underlineStyle.left,
              width: underlineStyle.width,
              opacity: underlineStyle.opacity,
            }}
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-foreground relative z-[1000] self-center"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={cn(
          "fixed inset-0 z-[999] flex flex-col items-center justify-center bg-background/95 backdrop-blur-md transition-all duration-300 md:hidden",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      >
        <div className="flex flex-col items-center gap-8">
          {navItems.map((item, key) => (
            <a
              key={key}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-xl sm:text-2xl font-semibold text-foreground/80 hover:text-primary transition tracking-wider"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
