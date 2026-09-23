"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { Project, projects } from "../data/projects";
import Reveal from "./Reveal";

const ProjectRow = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Gentle parallax: the screenshot drifts slower than the page
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const flip = index % 2 === 1;

  return (
    <article
      ref={ref}
      className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14"
    >
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor-label="Visit"
        aria-label={`Open ${project.title} live site`}
        className={`group relative block aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-surface lg:col-span-7 ${
          flip ? "lg:order-2" : ""
        }`}
      >
        <motion.div style={{ y: imageY }} className="absolute -inset-y-[8%] inset-x-0">
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="(min-width: 1024px) 700px, 100vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </motion.div>
      </a>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="lg:col-span-5"
      >
        <h3
          className="text-4xl font-bold tracking-tight sm:text-5xl"
          style={{ fontVariationSettings: '"wdth" 85' }}
        >
          {project.title}
        </h3>
        <p className="mt-3 text-xl text-ink">{project.summary}</p>
        <p className="mt-4 max-w-[52ch] leading-relaxed text-muted">{project.description}</p>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Built with">
          {project.stack.map((tech) => (
            <li key={tech} className="rounded-full bg-surface px-3 py-1 text-sm text-muted">
              {tech}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Live site <ArrowUpRight size={18} />
          </a>
          <a
            href={project.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            Source code
          </a>
        </div>
      </motion.div>
    </article>
  );
};

const Work = () => {
  return (
    <section id="work" className="container py-24 md:py-36">
      <Reveal className="section-title">Selected work</Reveal>
      <p className="mt-6 max-w-[55ch] text-lg text-muted">
        Things I have built and shipped.
      </p>
      <div className="mt-16 space-y-24 md:space-y-36">
        {projects.map((project, i) => (
          <ProjectRow key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Work;
