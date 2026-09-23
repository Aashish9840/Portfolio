"use client";
import { ArrowUp } from "lucide-react";
import { profile, socials } from "../data/profile";
import Magnetic from "./Magnetic";

const Footer = () => {
  return (
    <footer className="container py-10">
      <div className="flex flex-col gap-8 border-t border-line pt-10 md:flex-row md:items-center md:justify-between">
        <p className="text-muted">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js and Tailwind CSS.
        </p>
        <div className="flex items-center gap-6">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted transition-colors hover:text-ink"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <Magnetic strength={0.4}>
            <a
              href="#home"
              aria-label="Back to top"
              className="grid h-11 w-11 place-items-center rounded-full bg-accent text-on-accent"
            >
              <ArrowUp size={18} />
            </a>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
