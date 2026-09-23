"use client";
import { motion } from "motion/react";
import { skillGroups } from "../data/skills";
import Reveal from "./Reveal";

const Skills = () => {
  return (
    <section id="skills" className="border-y border-line bg-surface py-24 md:py-36">
      <div className="container">
        <Reveal className="section-title">Skills</Reveal>
        <p className="mt-6 max-w-[55ch] text-lg text-muted">
          The tools I reach for, grouped by the kind of problem they solve.
        </p>

        <div className="mt-16 divide-y divide-line border-t border-line">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="grid gap-6 py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12"
            >
              <div>
                <h3 className="text-2xl font-semibold">{group.title}</h3>
                <p className="mt-2 max-w-[36ch] text-muted">{group.summary}</p>
              </div>
              <motion.ul
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-15% 0px" }}
                variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                className="flex flex-wrap content-start gap-3"
              >
                {group.skills.map((skill) => (
                  <motion.li
                    key={skill}
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      visible: { opacity: 1, scale: 1 },
                    }}
                    whileHover={{ y: -3 }}
                    className="rounded-full border border-line bg-bg px-5 py-2.5 text-lg font-medium transition-colors hover:border-accent"
                  >
                    {skill}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
