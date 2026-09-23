"use client";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

type CursorMode = "default" | "link" | "lens" | "label" | "text";

// A dot that tracks the pointer exactly, plus a ring that trails behind it.
// Elements opt into special states with data-cursor="lens" or data-cursor-label="View".
const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");
  const [label, setLabel] = useState("");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.5 });

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!finePointer.matches) return;

    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const target = e.target as Element | null;
      const labelled = target?.closest<HTMLElement>("[data-cursor-label]");
      if (labelled) {
        setMode("label");
        setLabel(labelled.dataset.cursorLabel ?? "");
      } else if (target?.closest("input, textarea")) {
        setMode("text");
      } else if (target?.closest("[data-cursor='lens']")) {
        setMode("lens");
      } else if (target?.closest("a, button, [role='button']")) {
        setMode("link");
      } else {
        setMode("default");
      }
    };
    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [x, y]);

  if (!enabled) return null;

  const ringSize = { default: 36, link: 56, lens: 140, label: 88, text: 0 }[mode];
  const hidden = !visible || mode === "text";

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <motion.div
        style={{ x: ringX, y: ringY }}
        className={`absolute left-0 top-0 ${mode === "lens" ? "mix-blend-difference" : ""}`}
      >
        <motion.div
          animate={{
            width: ringSize,
            height: ringSize,
            opacity: hidden ? 0 : 1,
            scale: pressed ? 0.85 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full ${
            mode === "lens"
              ? "bg-white"
              : mode === "label"
                ? "bg-accent"
                : mode === "link"
                  ? "border-2 border-accent bg-accent/10"
                  : "border border-ink/40"
          }`}
        >
          {mode === "label" && (
            <span className="text-sm font-semibold text-on-accent">{label}</span>
          )}
        </motion.div>
      </motion.div>
      <motion.div
        style={{ x, y }}
        animate={{ opacity: hidden || mode === "label" || mode === "lens" ? 0 : 1 }}
        className="absolute left-0 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
      />
    </div>
  );
};

export default CustomCursor;
