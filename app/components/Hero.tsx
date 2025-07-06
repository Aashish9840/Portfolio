'use client'
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {motion} from "motion/react"
const Hero = () => {
  const text="Frontend Developer"
    const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setKey((prev) => prev + 1);
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  const parentVarients = {
  hidden: { opacity: 1},
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      repeat: Infinity,
      duration:4
    },
  },
};

const letter = {
  hidden: { opacity: 0, y:20, x:20 },
  visible: {
    opacity: 1,
    y:0,
    x:0,
  },
};
  
  return (
    <div
      id="#home"
      className="container flex flex-col md:flex-row items-center justify-between gap-4 md:gap-10 text-white md:h-screen pt-[10vh] "
    >
      <section className=" w-full md:w-[50vw] flex flex-col gap-10 pt-4">
        <div>
          <h1 className="font-semibold font-inter text-2xl sm:text-4xl leading-10 md:leading-14">
            <span className="text-text">Hello!</span> I am Aashish Shah working
            as <motion.span
            key={key}
            initial="hidden"
            animate="visible"
            variants={parentVarients}
            >

{text.split("").map((char, index) => (
          <motion.span key={index} variants={letter} className="inline-block">
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
            </motion.span>
          </h1>

          <p className="font-dmSans font-medium text-base sm:text-lg">
            Being a frontend Developer, I have interest in creating a
            responsive, optimized and attractive websites. I priortize in
            implementing UI with simple web functionality.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <Link href="#about" className="btn-secondary">
            About
          </Link>
          <Link href="#contact" className="flex items-center gap-1">
            <h1 className="text-lg font-dmSans font-medium">Contact</h1>
            <MoveRight size={20} className="text-white cursor-pointer" />
          </Link>
        </div>
      </section>

      <section className="w-full md:w-[50vw] h-full py-10">
        <Image
          src="/portfolio/portfolio.jpg"
          height={500}
          width={500}
          alt="portfolio"
          priority
          className=" h-[400px] md:h-full w-full object-cover aspect-square rounded-md"
        />
      </section>
    </div>
  );
};

export default Hero;
