"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Deterministic beam configs to avoid Math.random() hydration mismatch
const BEAM_CONFIGS = [
  { x: "-15%", rotate: -4.5 },
  { x: "31%", rotate: -1.8 },
  { x: "-2%", rotate: -3 },
  { x: "7%", rotate: -2.8 },
  { x: "39%", rotate: 1.6 },
  { x: "4%", rotate: 0.05 },
];

export const BackgroundBeams = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={cn(
        "relative h-full w-full bg-white flex items-center justify-center overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 z-0">
        <svg
          className="absolute inset-0 h-full w-full pointer-events-none opacity-20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient
              id="bg-gradient"
              cx="50%"
              cy="50%"
              r="50%"
              fx="50%"
              fy="50%"
            >
              <stop offset="0%" stopColor="var(--color-rose)" stopOpacity="0.1" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect fill="url(#bg-gradient)" width="100%" height="100%" />
        </svg>

        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-white via-white/80 to-transparent z-10" />
        <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-white via-white/80 to-transparent z-10" />

        {/* Cinematic Beams — only rendered client-side to avoid hydration mismatch */}
        {mounted &&
          BEAM_CONFIGS.map((beam, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                x: beam.x,
                y: "-10%",
                scale: 0.5,
                rotate: beam.rotate,
              }}
              animate={{
                opacity: [0, 0.4, 0],
                y: "110%",
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 12 + i * 2,
                repeat: Infinity,
                ease: "linear",
                delay: i * 2,
              }}
              className="absolute w-[1px] h-[50vh] bg-gradient-to-b from-transparent via-rose to-transparent blur-[2px]"
            />
          ))}

        {/* Glowing Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose/10 blur-[100px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-rose/5 blur-[120px] rounded-full"
        />
      </div>

      <div className="relative z-20 w-full">{children}</div>
    </div>
  );
};
