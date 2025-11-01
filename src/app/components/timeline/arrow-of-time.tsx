"use client";
import { motion } from "motion/react";

export function ArrowOfTime() {
  return (
    <motion.div
      className="h-1 bg-foreground rounded-full relative"
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      transition={{ duration: 2, ease: "linear" }}
    >
      <div className="absolute right-[0.5px] rounded-full top-[1.66px] h-1 w-3 rotate-45  bg-foreground origin-right" />
      <div className="absolute right-[0.5px] rounded-full -top-[1.66px] h-1 w-3 -rotate-45 bg-foreground origin-right" />
    </motion.div>
  );
}
