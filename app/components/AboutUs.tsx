"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";

const AboutUs = () => {
  const [detail, setDetails] = useState<string | null>("education");
  const imageRef = useRef<HTMLElement | null>(null);
  const aboutRef = useRef<HTMLElement | null>(null);

  const imageInView = useInView(imageRef, { once: false });
  const aboutInView = useInView(aboutRef, { once: false });

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };
  return (
    <div
      id="about"
      className="md:h-screen pt-[10vh] bg-secondary-background text-white pb-4"
    >
      <main className="container flex flex-col md:flex-row items-start justify-center gap-6 md:gap-12">
        <motion.section
          initial={{ opacity: 0, y: 80 }}
          animate={imageInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          ref={imageRef}
          className="w-full md:w-[50%]"
        >
          <Image
            src="/portfolio/desktop.jpg"
            height={500}
            width={500}
            alt="desktop image"
            className="w-full h-full object-cover rounded-md"
          />
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 80 }}
          animate={aboutInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          ref={aboutRef}
          className="w-full md:w-[50%] flex flex-col mt-4 md:mt-10 gap-6"
        >
          <div>
            <h1 className="text-3xl font-dmSans font-semibold">About Me</h1>
            <p className="text-base font-dmSans font-medium">
              I’m Aashish Shah, a passionate Frontend Engineer skilled in
              React.js and Next.js. I specialize in building responsive,
              high-performance web apps. Experienced with Git and GitHub for
              version control, I deliver clean, maintainable code and
              collaborative development solutions.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-3 items-center mb-2">
              <h1
                className={`font-lg font-medium font-dmSans ${
                  detail === "education"
                    ? "border-b-3 border-b-[#B13BFF] text-white"
                    : "text-white/60"
                }`}
                onClick={() => setDetails("education")}
              >
                Education
              </h1>
              <h1
                className={`font-lg font-medium font-dmSans ${
                  detail === "experience"
                    ? "border-b-3 border-b-[#B13BFF] text-white"
                    : "text-white/60"
                }`}
                onClick={() => setDetails("experience")}
              >
                Experience
              </h1>
            </div>

            <div>
              <AnimatePresence mode="wait">
                {detail === "education" ? (
                  <motion.div
                    key="education"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    exit={{ opacity: 0, x: -10 }}
                  >
                    <ul className="list-disc pl-4">
                      <li className="text-sm">
                        Bachelor of Computer Engineering (Oct 2018 - Apr 2023)
                      </li>
                    </ul>
                  </motion.div>
                ) : (
                  detail === "experience" && (
                    <div>
                      <motion.ul
                        key="experience"
                        className="list-disc pl-4"
                        variants={listVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                      >
                        <motion.li className="text-sm" variants={itemVariants}>
                          Junior frontend Developer at Bitmoro.com (May 2025-Jun
                          2025)
                        </motion.li>
                        <motion.li className="text-sm" variants={itemVariants}>
                          {" "}
                          Intern at Bitmoro.com (Jan 2025-Apr 2025)
                        </motion.li>
                        <motion.li className="text-sm" variants={itemVariants}>
                          Research Engineer at Entegra Resources Nepal (Apr
                          2023- Jul 2024)
                        </motion.li>
                      </motion.ul>
                    </div>
                  )
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default AboutUs;
