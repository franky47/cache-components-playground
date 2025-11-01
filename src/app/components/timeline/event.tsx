"use client";

import { motion } from "motion/react";

type EventProps = {
  shape: "circle" | "diamond";
  color: string;
  label?: string;
  x: number;
  onDragXDelta?: (deltaX: number) => void;
};

export function Event({ shape, label, color, x, onDragXDelta }: EventProps) {
  const draggable = Boolean(onDragXDelta);
  return (
    <motion.div
      role="img"
      aria-label={label}
      className={`absolute ${shape === "circle" ? "rounded-full" : "rounded"} ${color} size-4 ${draggable ? "cursor-grab" : "cursor-default"} ${shape === "diamond" ? "transform rotate-45" : ""}`}
      style={{ left: x }}
      drag={draggable ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0}
      onDrag={(_, info) => {
        onDragXDelta?.(info.delta.x);
      }}
      dragMomentum={false}
      whileTap={{ cursor: "grabbing" }}
    />
  );
}
