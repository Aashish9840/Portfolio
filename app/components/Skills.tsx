"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { motion, useInView } from "motion/react";

const Skills = () => {
  const [hoverEffect, setHoverEffect] = useState<number | null>(null);
  console.log(hoverEffect);
  const skillRef = useRef<HTMLElement | null>(null);
  const skillInView = useInView(skillRef, { once: false });
  const skillsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const singleSkillVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };
  const skillslist = [
    { title: "Tailwind Css", path: "/skills/tailwindcss.png" },
    { title: "Javascript", path: "/skills/javascript.png" },
    { title: "Next Js", path: "/skills/nextjs.jpg" },
    { title: "Node", path: "/skills/node.webp" },
    { title: "Typescript", path: "/skills/typescript.png" },
    { title: "MongoDb", path: "/skills/mongodb.png" },
    { title: "React Js", path: "/skills/react.png" },
    { title: "Github", path: "/skills/githublogo.jpg" },
  ];
  return (
    <div
      id="skills"
      className="bg-primary-background text-white md:h-screen pt-[10vh]"
    >
      <main className="container">
        <div className="flex flex-col items-center py-2 mb-10">
          <h1 className="text-4xl font-dmSans font-semibold">Skills</h1>
          <p className="sm:text-center text-lg font-dmSans font-medium sm:px-10">
            Skilled in JavaScript, TypeScript, and Git with strong expertise in
            React, Node.js, and MongoDB. Proficient in building responsive,
            modern UIs using Tailwind CSS for seamless frontend development.
          </p>
        </div>

        <motion.section
          ref={skillRef}
          variants={skillsVariants}
          initial="hidden"
          animate={skillInView ? "visible" : ""}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:px-20"
        >
          {skillslist.map((skills, index) => (
            <motion.div
              variants={singleSkillVariants}
              key={index}
              onMouseEnter={() => setHoverEffect(index)}
              onMouseLeave={() => {
                console.log("hello world 123");
                setHoverEffect(null);
              }}
              className=" relative bg-primary-background h-fit w-fit z-10 shadow-2xl shadow-secondary-background p-4 rounded-md flex items-center flex-col gap-4"
            >
              <div>
                <Image
                  src={skills.path}
                  height={500}
                  width={500}
                  alt={skills.title}
                  className="h-[100px] w-[140px] rounded-md"
                />
                <h1 className="text-xl font-dmSans font-medium text-white">
                  {skills.title}
                </h1>
              </div>
            </motion.div>
          ))}
        </motion.section>
      </main>
    </div>
  );
};

export default Skills;
