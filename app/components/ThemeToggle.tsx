"use client";
import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-line text-ink transition-colors hover:border-ink"
    >
      <AnimatePresence mode="wait" initial={false}>
        {dark !== null && (
          <motion.span
            key={dark ? "moon" : "sun"}
            initial={{ y: 16, opacity: 0, rotate: -45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -16, opacity: 0, rotate: 45 }}
            transition={{ duration: 0.25 }}
          >
            {dark ? <Moon size={18} /> : <Sun size={18} />}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
