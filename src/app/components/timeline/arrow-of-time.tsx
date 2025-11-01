"use client";

import { motion } from "motion/react";

export function ArrowOfTime() {
  return (
    <motion.div
      className="h-0.5 bg-foreground rounded-full relative opacity-25"
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      style={{ top: 9 }}
      transition={{ duration: 1, ease: "linear" }}
    >
      <div className="absolute right-0 rounded-full top-[0.26666px] h-0.5 w-2.5 rotate-45  bg-foreground origin-right" />
      <div className="absolute right-0 rounded-full -top-[0.26666px] h-0.5 w-2.5 -rotate-45 bg-foreground origin-right" />
    </motion.div>
  );
}
