"use client";
import { MotionConfig } from "motion/react";
import React from "react";

// reducedMotion="user" makes every motion component respect prefers-reduced-motion
const Providers = ({ children }: { children: React.ReactNode }) => {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
};

export default Providers;
