"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { motion, useInView } from "motion/react";

const Skills = () => {
  const [hoverEffect, setHoverEffect] = useState<number | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<number | null>(null);
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
    {
      title: "Tailwind Css",
      path: "/skills/tailwindcss.png",
      description:
        "I use Tailwind CSS to build clean and responsive user interfaces quickly. It helps me avoid writing custom CSS by using utility classes. This speeds up my development process and keeps my code organized and consistent.",
    },
    {
      title: "Javascript",
      path: "/skills/javascript.png",
      description:
        "I rely on JavaScript to make websites interactive and dynamic. It’s the core language of the web, and I use it every day to control how things move, react, and function in my projects.",
    },
    {
      title: "Next Js",
      path: "/skills/nextjs.jpg",
      description:
        "I use Next.js to build fast, scalable React apps with server-side rendering. It helps me improve SEO and performance while also making routing and API integration easier and more powerful in real-world applications.",
    },
    {
      title: "Node",
      path: "/skills/node.webp",
      description:
        "I use Node.js for building backend services like APIs and server logic. It lets me use JavaScript on the server side and handle real-time operations efficiently, which is important for full-stack web apps.",
    },
    {
      title: "Typescript",
      path: "/skills/typescript.png",
      description:
        "I use TypeScript to catch errors early and write safer code. It gives my JavaScript structure and makes my apps more reliable by enforcing types, especially in large codebases with many components.",
    },
    {
      title: "MongoDb",
      path: "/skills/mongodb.png",
      description:
        "I use MongoDB to store and manage data in a flexible way. It’s a NoSQL database that works well with JavaScript and helps me build scalable applications that handle different kinds of structured or unstructured data.",
    },
    {
      title: "React Js",
      path: "/skills/react.png",
      description:
        "I use React to build user interfaces from reusable components. It makes complex apps easier to manage and helps me deliver fast and interactive web experiences by updating the UI efficiently.",
    },
    {
      title: "Github",
      path: "/skills/githublogo.jpg",
      description:
        "I use GitHub to manage my code and collaborate with others. It tracks my changes, lets me work in teams, and keeps my projects organized with version control. It’s essential for working professionally.",
    },
  ];

  return (
    <div
      id="skills"
      className="bg-primary-background text-white h-fit pb-10 lg:h-screen pt-[10vh]"
    >
      <main className="relative container">
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
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 md:px-20"
        >
          {skillslist.map((skills, index) => (
            <motion.div
              variants={singleSkillVariants}
              key={index}
              onMouseEnter={() => setHoverEffect(index)}
              onMouseLeave={() => {
                setHoverEffect(null);
              }}
              className=" relative bg-primary-background h-fit w-fit z-10 shadow-xl shadow-secondary-background p-4 rounded-md "
            >
              <div className="flex items-center flex-col gap-4">
                <Image
                  src={skills.path}
                  height={500}
                  width={500}
                  alt={skills.title}
                  className="h-[120px] w-[140px] rounded-md"
                />
                <h1 className="text-2xl font-dmSans font-medium text-white">
                  {skills.title}
                </h1>
              </div>
              <div
                onClick={() => setSelectedSkill(index)}
                className={`${
                  hoverEffect === index ? "block" : "hidden"
                } absolute flex items-center justify-center cursor-pointer gap-3 inset-0 bg-black/80`}
              >
                <h1 className="text-base font-bold font-dmSans">
                  Learn More...
                </h1>
              </div>
            </motion.div>
          ))}

          {selectedSkill !== null && (
            <div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-20 "
              onClick={() => setSelectedSkill(null)}
            >
              <div className=" p-6 rounded-lg shadow-lg shadow-secondary-background bg-primary-background text-white h-fit w-[25vw] min-w-[350px]">
                <Image
                  src={skillslist[selectedSkill].path}
                  height={500}
                  width={500}
                  alt={skillslist[selectedSkill].title}
                  className="w-full h-[230px] rounded-md mb-4"
                />
                <h2 className="text-2xl font-bold font-dmSans mb-1">
                  {skillslist[selectedSkill].title}
                </h2>
                <p className="text-sm font-medium font-dmSans">
                  {skillslist[selectedSkill].description}
                </p>
              </div>
            </div>
          )}
        </motion.section>
      </main>
    </div>
  );
};

export default Skills;
