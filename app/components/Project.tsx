"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

const Project = () => {
  const Projects = [
    {
      title: "MovieApp",
      imagePath: "/project/movieapp.png",
      description:
        "A modern movie browsing application using Next js. It fetches movie data from a public API, allows users to search for movies, view ratings, trailers, and detailed information about each title.",
      githubLink: "https://github.com/Aashish9840/movie-site",
      websiteLink: "https://movie-site-smoky-five.vercel.app/",
    },
    {
      title: "Chito Khaja",
      imagePath: "/project/chito-khaja.png",
      description:
        "A frontend food ordering interface built with React. It displays a list of Nepali snacks (Khaja) with images, descriptions, and prices. Users can browse items, view item details, and simulate placing an order.",
      githubLink: "https://github.com/yourusername/chito-khaja",
      websiteLink: "https://chito-khaja.yourdomain.com",
    },
  ];
  const projectRef = useRef<HTMLDivElement>(null);
  const projectInView
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
    <div
      id="project"
      className="bg-secondary-background lg:h-screen text-white pt-[10vh]"
    >
      <div className="container">
        {variableScreen && variableScreen > 1024 ? (
          <div className="flex flex-col gap-6 min-h-screen">
            <h1 className="sticky text-center font-semibold text-xl sm:text-3xl font-dmSans">
              Projects
            </h1>
            <section className="flex flex-col gap-6">
              {Projects.map((project, index) => (
                <motion.div
                  ref={projectRef}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={index}
                  className="mb-10 flex items-center gap-10 h-[80vh] bg-red-300"
                >
                  <section>
                    <Image
                      src={project.imagePath}
                      height={500}
                      width={500}
                      alt={project.title}
                      className="w-full h-full rounded-lg"
                    />
                  </section>
                  <section>
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
                    </div>
                  </section>
                </motion.div>
              ))}
            </section>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Project;
