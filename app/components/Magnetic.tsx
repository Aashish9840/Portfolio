"use client";
import { motion, useMotionValue, useSpring } from "motion/react";
import React, { useRef } from "react";

// Pulls its child a little toward the pointer while hovered.
const Magnetic = ({
  children,
  strength = 0.3,
}: {
  children: React.ReactNode;
  strength?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 250, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 250, damping: 18 });

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;
