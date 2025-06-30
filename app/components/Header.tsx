"use client";
import Link from "next/link";
import React, { useState } from "react";

const Header = () => {
  const links = [
    {
      title: "Home",
      links: "#home",
    },
    {
      title: "About",
      links: "#about",
    },
    {
      title: "SKills",
      links: "#skills",
    },
    {
      title: "Project",
      links: "#project",
    },
    {
      title: "Contact",
      links: "#contact",
    },
  ];

  const [matchLink, setMatchLink] = useState<string | null>("Home");
  return (
    <div className=" fixed z-20 bg-primary-background w-screen border-b border-b-white/90 text-white h-[10vh] flex items-center">
      <div className=" container flex justify-between items-center">
        <section className="">
          <h1 className="text-[#e34b43] text-2xl font-dmSans font-semibold">
            PortFolio
          </h1>
        </section>
        <section className="hidden md:flex gap-20 items-center">
          <div className="flex gap-6 lg:gap-10 items-center">
            {links.map((link, index) => (
              <Link
                href={link.links}
                key={index}
                className={`text-white font-semibold font-dmSans ${
                  matchLink === link.title
                    ? "border-b-[#e34b43] border-b-2"
                    : ""
                }`}
                onClick={() => setMatchLink(link.title)}
              >
                {link.title}
              </Link>
            ))}
          </div>

          <a
            href="/CV/Cv-(Aashish Shah).pdf"
            target="_blank"
            className="btn-primary"
          >
            Download CV
          </a>
        </section>
      </div>
    </div>
  );
};

export default Header;
