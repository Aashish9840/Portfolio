"use client";
import { motion } from "motion/react";
import React from "react";

// Heading reveal: text rises out of a mask the first time it scrolls into view.
// The in-view trigger sits on the mask itself; the translated child is clipped
// by it, so observing the child would never report an intersection.
const Reveal = ({
  children,
  as = "h2",
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
}) => {
  const Tag = motion[as];
  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      className="block overflow-hidden pb-[0.1em]"
    >
      <Tag
        variants={{ hidden: { y: "110%" }, visible: { y: 0 } }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
        className={className}
      >
        {children}
      </Tag>
    </motion.span>
  );
};

export default Reveal;
