import Image from "next/image";
import React from "react";

const AboutUs = () => {
  return (
    <div
      id="about"
      className="md:h-screen pt-[10vh] bg-secondary-background text-white"
    >
      <main className="container flex flex-col md:flex-row items-start justify-center gap-6 md:gap-12">
        <section className="w-full md:w-[50%]">
          <Image
            src="/portfolio/desktop.jpg"
            height={500}
            width={500}
            alt="desktop image"
            className="w-full h-full object-cover rounded-md"
          />
        </section>
        <section className="w-full md:w-[50%] flex flex-col mt-6 gap-1">
          <h1 className="text-3xl font-dmSans">About Me</h1>
          <p className="text-base font-dmSans">
            I’m Aashish Shah, a passionate Frontend Engineer skilled in React.js
            and Next.js. I specialize in building responsive, high-performance
            web apps. Experienced with Git and GitHub for version control, I
            deliver clean, maintainable code and collaborative development
            solutions.
          </p>
        </section>
      </main>
    </div>
  );
};

export default AboutUs;
