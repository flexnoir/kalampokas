"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    },
    [cursorX, cursorY, visible]
  );

  useEffect(() => {
    // Only show custom cursor on desktop with fine pointer
    const hasFineCursor = window.matchMedia("(pointer: fine)").matches;
    if (!hasFineCursor) return;

    window.addEventListener("mousemove", handleMouseMove);

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[data-cursor-hover]")
      ) {
        setHovered(true);
      }
    };

    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[data-cursor-hover]")
      ) {
        setHovered(false);
      }
    };

    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [handleMouseMove]);

  if (!visible) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 z-[90] pointer-events-none mix-blend-difference hidden md:block"
        style={{ x, y }}
      >
        <motion.div
          animate={{
            width: hovered ? 64 : 32,
            height: hovered ? 64 : 32,
            opacity: hovered ? 0.6 : 0.4,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="rounded-full border border-soft-white -translate-x-1/2 -translate-y-1/2"
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 z-[90] pointer-events-none mix-blend-difference hidden md:block"
        style={{ x: cursorX, y: cursorY }}
      >
        <motion.div
          animate={{
            width: hovered ? 6 : 4,
            height: hovered ? 6 : 4,
            opacity: hovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.2 }}
          className="rounded-full bg-soft-white -translate-x-1/2 -translate-y-1/2"
        />
      </motion.div>
    </>
  );
}
