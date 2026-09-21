"use client";

import { motion } from "motion/react";

export function HiloDecorativo() {
  return (
    <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none overflow-hidden" aria-hidden="true">
      <svg
        viewBox="0 0 1400 120"
        preserveAspectRatio="none"
        className="absolute top-0 w-full h-full"
      >
        <motion.path
          d="M0,60 C200,20 400,100 600,60 C800,20 1000,100 1200,60 C1300,40 1350,50 1400,45"
          fill="none"
          stroke="#c2775e"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.12"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
        />
        <motion.path
          d="M0,75 C150,45 350,105 550,75 C750,45 950,105 1150,75 C1275,55 1350,65 1400,60"
          fill="none"
          stroke="#d4a0a0"
          strokeWidth="0.8"
          strokeLinecap="round"
          opacity="0.1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, delay: 0.7, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
