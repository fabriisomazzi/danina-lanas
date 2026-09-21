"use client";

import { motion } from "motion/react";

export function OvilloDecorativo() {
  return (
    <motion.svg
      viewBox="0 0 140 140"
      className="absolute top-1/4 right-6 sm:right-14 lg:right-20 w-28 h-28 sm:w-36 sm:h-36 opacity-[0.06] text-terracota"
      fill="none"
      initial={{ opacity: 0, rotate: -15, scale: 0.9 }}
      animate={{ opacity: 0.06, rotate: 0, scale: 1 }}
      transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden="true"
    >
      <ellipse cx="70" cy="70" rx="50" ry="45" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="70" cy="70" rx="38" ry="33" stroke="currentColor" strokeWidth="1" strokeDasharray="8 5" />
      <ellipse cx="70" cy="70" rx="25" ry="20" stroke="currentColor" strokeWidth="0.8" />
      <ellipse cx="70" cy="70" rx="12" ry="9" stroke="currentColor" strokeWidth="0.6" />
      <path d="M30,65 Q42,25 70,22 Q98,25 110,65" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M35,78 Q48,110 70,113 Q92,110 105,78" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" />
      <circle cx="70" cy="68" r="3.5" fill="currentColor" opacity="0.25" />
      <path d="M70,22 Q72,10 65,5" stroke="currentColor" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.5" />
      <path d="M65,5 Q60,2 55,4" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" opacity="0.4" />
    </motion.svg>
  );
}
