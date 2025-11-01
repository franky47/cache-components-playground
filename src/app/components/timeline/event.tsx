"use client";

import { motion } from "motion/react";
import type { ComponentProps } from "react";

type EventProps = ComponentProps<"div"> & {
  shape: "circle" | "diamond";
  label?: string;
  x: number;
  onDragXDelta?: (deltaX: number) => void;
};

export function Event({
  shape,
  label,
  className,
  x,
  onDragXDelta,
}: EventProps) {
  const draggable = Boolean(onDragXDelta);
  return (
    <motion.div
      role="img"
      aria-label={label}
      className={`absolute origin-center ${shape === "circle" ? "rounded-full" : "rounded"} ${className} ${draggable ? "cursor-grab" : "cursor-default"} ${shape === "diamond" ? "transform rotate-45" : ""}`}
      style={{ left: x - 8, width: 16, height: 16 }}
      drag={draggable ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0}
      onDrag={(_, info) => {
        onDragXDelta?.(info.delta.x);
      }}
      dragMomentum={false}
      whileTap={{ cursor: draggable ? "grabbing" : undefined }}
    />
  );
}
