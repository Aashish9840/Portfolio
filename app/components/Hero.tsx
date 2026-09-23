"use client";
import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { profile } from "../data/profile";
import Magnetic from "./Magnetic";

const ease = [0.22, 1, 0.36, 1] as const;
const nameLines = ["Aashish", "Shah"];

const Hero = () => {
  return (
    <section
      id="home"
      className="container relative flex min-h-svh flex-col justify-end pb-12 pt-32"
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-6 flex items-center gap-3 text-base text-muted"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
        </span>
        Open to frontend roles, in Nepal or remote
      </motion.p>

      {/* The one loud moment on the page: the name, revealed letter by letter */}
      <h1
        data-cursor="lens"
        aria-label={profile.name}
        className="text-[clamp(4.5rem,21vw,19rem)] font-extrabold leading-[0.82] tracking-[-0.025em]"
        style={{ fontVariationSettings: '"wdth" 75, "opsz" 96' }}
      >
        {nameLines.map((line, lineIndex) => (
          <span key={line} aria-hidden className="block overflow-hidden pb-[0.06em]">
            {line.split("").map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.9,
                  ease,
                  delay: 0.2 + lineIndex * 0.25 + i * 0.04,
                }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </h1>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.1, ease, delay: 0.9 }}
        className="mt-8 h-[3px] origin-left bg-accent"
      />

      <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 1.1 }}
          className="max-w-[34ch] text-xl leading-snug text-muted sm:text-2xl"
        >
          <span className="text-ink">Frontend developer in {profile.location}.</span>{" "}
          I build fast, accessible interfaces with React and Next.js, and I&apos;m
          working my way toward full-stack.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 1.25 }}
          className="flex flex-wrap items-center gap-3"
        >
          <Magnetic>
            <a href="#work" className="btn-primary">
              See my work
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#contact" className="btn-ghost">
              Get in touch
            </a>
          </Magnetic>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{
          opacity: { delay: 1.6 },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.6 },
        }}
        className="mt-12 hidden h-11 w-11 place-items-center self-start rounded-full border border-line text-muted md:grid"
      >
        <ArrowDown size={18} />
      </motion.a>
    </section>
  );
};

export default Hero;
