"use client";
import { motion } from "motion/react";
import { education, experience, TimelineEntry } from "../data/experience";
import Reveal from "./Reveal";

const Timeline = ({ title, entries }: { title: string; entries: TimelineEntry[] }) => (
  <div>
    <h3 className="mb-6 text-lg font-semibold text-muted">{title}</h3>
    <ol className="relative border-l border-line">
      {entries.map((entry, i) => (
        <motion.li
          key={entry.title + entry.period}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="relative pb-8 pl-8 last:pb-0"
        >
          <span
            className={`absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-bg ${
              i === 0 ? "bg-accent" : "bg-line"
            }`}
          />
          <p className="text-sm text-muted">{entry.period}</p>
          <p className="mt-1 text-xl font-semibold">{entry.title}</p>
          {entry.place && <p className="text-muted">{entry.place}</p>}
        </motion.li>
      ))}
    </ol>
  </div>
);

const About = () => {
  return (
    <section id="about" className="container py-24 md:py-36">
      <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
        <div>
          <Reveal className="section-title">About</Reveal>
          <div className="mt-8 max-w-[62ch] space-y-5 text-lg leading-relaxed text-muted">
            <p>
              <span className="text-ink">
                I&apos;m a computer engineer who ended up loving the part of software people
                actually touch.
              </span>{" "}
              After working as a research engineer, I moved into frontend work at Bitmoro,
              first as an intern and then as a junior developer. Today I&apos;m a frontend
              developer at Saharamind.
            </p>
            <p>
              Most days I work in React, Next.js and TypeScript. I care about the details
              that make an interface feel solid: responsive layouts, clear states, keyboard
              support and motion that explains what changed.
            </p>
            <p>
              I&apos;ve also built the server side of my own projects with Node.js, Express
              and MongoDB, and I&apos;m steadily growing into full-stack work.
            </p>
          </div>
        </div>

        <div className="space-y-14">
          <Timeline title="Experience" entries={experience} />
          <Timeline title="Education" entries={education} />
        </div>
      </div>
    </section>
  );
};

export default About;
