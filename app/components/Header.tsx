"use client";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import React, { useEffect, useState } from "react";
import { navLinks, profile } from "../data/profile";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 24));

  // Highlight whichever section is crossing the middle of the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ["home", ...navLinks.map((l) => l.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-bg/75 py-3 backdrop-blur-md"
          : "border-b border-transparent py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        <a href="#home" className="text-lg font-bold tracking-tight">
          Aashish<span className="text-accent">.</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              aria-current={active === link.id ? "true" : undefined}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active === link.id ? "text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {active === link.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-surface"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href={profile.cvPath}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden !py-2 text-sm md:inline-flex"
          >
            Download CV
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="grid h-10 w-10 place-items-center rounded-full border border-line md:hidden"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-50 flex flex-col bg-accent px-6 py-5 text-on-accent md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                autoFocus
                className="grid h-10 w-10 place-items-center rounded-full border border-on-accent/30"
              >
                <X size={18} />
              </button>
            </div>
            <nav aria-label="Mobile" className="mt-10 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.06 }}
                  className="text-5xl font-bold tracking-tight"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <a
              href={profile.cvPath}
              target="_blank"
              rel="noopener noreferrer"
              className="btn mt-auto bg-on-accent text-accent"
            >
              Download CV
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
