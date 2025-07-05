"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { MoveRight } from "lucide-react";

interface ProjectProps {
  title: string;
  imagePath: string;
  description: string;
  githubLink: string;
  websiteLink: string;
}
const ChildProject = ({ project }: { project: ProjectProps }) => {
  const projectRef = useRef<HTMLDivElement>(null);
  const projectInView = useInView(projectRef, { once: false });
  return (
    <motion.div
      ref={projectRef}
      initial={{ opacity: 0, y: 100 }}
      animate={projectInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1 }}
      exit={{ opacity: 0, y: 80 }}
      className="mb-10 flex items-start gap-10 h-[90vh]"
    >
      <section className="w-[50%] h-full">
        <Image
          src={project.imagePath}
          height={500}
          width={500}
          alt={project.title}
          className="w-full h-[70%] rounded-lg"
        />
      </section>
      <section className="w-[50%] pt-[12vh]">
        <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
        <p className="mb-4">{project.description}</p>
        <div className="flex gap-4 items-center">
          <Link
            href={project.websiteLink}
            target="blank"
            className="btn-secondary"
          >
            Website
          </Link>
          <Link
            href={project.githubLink}
            target="blank"
            className="flex items-center gap-2 text-xl font-dmSans font-medium"
          >
            Github
            <MoveRight size={20} className="text-white" />
          </Link>
        </div>
      </section>
    </motion.div>
  );
};

const Project = () => {
  const Projects = [
    {
      title: "Chito Khaja",
      imagePath: "/project/chito-khaja.jpg",
      description:
        "A modern online food ordering application built with Next.js, express, mongodb, and tailwindCss. It allows users to browse a variety of food items, add them to their cart, and place orders seamlessly. The e-sewa payment integration ensures secure transactions while the admin panel provides easy management of food items and orders.",
      githubLink: "https://github.com/Aashish9840/frontend-Chito-Khaja",
      websiteLink: "https://movie-site-smoky-five.vercel.app/",
    },
    {
      title: "MovieApp",
      imagePath: "/project/movieapp.png",
      description:
        "A modern movie browsing application using Next js. It fetches movie data from a public API, allows users to search for movies, view ratings, trailers, and detailed information about each title.",
      githubLink: "https://github.com/Aashish9840/movie-site",
      websiteLink: "https://movie-site-smoky-five.vercel.app/",
    },
  ];

  const [variableScreen, setVariableScreen] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setVariableScreen(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div id="project" className="bg-secondary-background text-white  ">
      <div className=" container min-h-screen">
        <h1 className="sticky top-0 pt-[12vh] bg-secondary-background z-10 left-0 text-center font-semibold text-xl sm:text-3xl font-dmSans pb-6">
          My Projects
        </h1>

        {variableScreen && variableScreen > 1024 ? (
          <section className="flex flex-col gap-30 py-4">
            {Projects.map((project, index) => (
              <ChildProject key={index} project={project} />
            ))}
          </section>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-10 py-10 h-fit">
            {Projects.map((project, index) => (
              <div
                key={index}
                className=" border border-black rounded-lg shadow-md p-4 h-fit"
              >
                <Image
                  src={project.imagePath}
                  height={500}
                  width={500}
                  alt={project.title}
                  className="w-full h-[100%] rounded-lg mb-4"
                />
                <h2 className="text-xl font-bold mb-2">{project.title}</h2>
                <p className="mb-4">{project.description}</p>
                <div className="flex gap-4 items-center">
                  <Link
                    href={project.websiteLink}
                    target="blank"
                    className="btn-secondary"
                  >
                    Website
                  </Link>
                  <Link
                    href={project.githubLink}
                    target="blank"
                    className="flex items-center gap-2 text-lg font-dmSans font-medium"
                  >
                    Github
                    <MoveRight size={20} className="text-white" />
                  </Link>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default Project;
