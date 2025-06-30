"use client";
import { Menu } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const Header = () => {
  const [matchLink, setMatchLink] = useState<string | null>("Home");
  const [showMobileLinks, setShowMobileLinks] = useState<boolean | null>(false);
  const mobileMenu = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const closemenu = (e: MouseEvent) => {
      if (!mobileMenu?.current?.contains(e.target as Node)) {
        setShowMobileLinks(false);
      }
    };
    document.addEventListener("mousedown", closemenu);
    return () => document.removeEventListener("mousedown", closemenu);
  }, []);

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
  return (
    <div className=" fixed z-20 bg-primary-background w-screen border-b border-b-white/90 text-white h-[10vh] flex items-center">
      <div className=" px-6 md:px-0 container flex justify-between items-center">
        <section className="">
          <a
            href="#home"
            className="text-[#e34b43] cursor-pointer text-2xl font-dmSans font-semibold"
          >
            PortFolio
          </a>
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

        {/* menu icons for mobile view */}
        <section className="block md:hidden">
          <div
            className=" cursor-pointer "
            onClick={() => setShowMobileLinks(true)}
          >
            <Menu size={30} />
          </div>
          <AnimatePresence>
            {showMobileLinks && (
              <motion.div
                ref={mobileMenu}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5 }}
                className=" fixed top-0 right-0 bg-black/90 z-30 bottom-0 w-[50vw] flex flex-col gap-2"
              >
                <div className="flex flex-col gap-2 pt-4">
                  {links.map((link, index) => (
                    <Link
                      href={link.links}
                      key={index}
                      className={` font-semibold font-dmSans px-10 py-4 ${
                        matchLink === link.title
                          ? "text-[#e34b43] "
                          : "text-white"
                      }`}
                      onClick={() => {
                        setMatchLink(link.title);
                        setTimeout(() => {
                          setShowMobileLinks(false);
                        }, 100);
                      }}
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
                <div className="pl-10">
                  <a
                    href="/CV/Cv-(Aashish Shah).pdf"
                    target="_blank"
                    className="btn-primary"
                  >
                    Download CV
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
};

export default Header;
