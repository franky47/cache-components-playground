import { motion } from "motion/react";
import type { ComponentProps } from "react";

type ResizableBarProps = ComponentProps<"div"> & {
  label?: string;
  left: number;
  top: number;
  width: number;
  minWidth?: number;
  onResizeRight: (newWidth: number) => void;
};

export function ResizableBar({
  label,
  left,
  top,
  width,
  className,
  minWidth = 16,
  onResizeRight,
}: ResizableBarProps) {
  return (
    <>
      <div
        // track
        className={`absolute rounded-md ${className} text-xs flex items-center pl-2 overflow-clip`}
        style={{ left, top, width, height: 16 }}
      >
        <span className="whitespace-nowrap text-ellipsis overflow-hidden">
          {label}
        </span>
      </div>
      <motion.div
        // transparent thumb
        role="img"
        aria-label={label}
        className={`absolute rounded-full cursor-ew-resize`}
        style={{ left: left + width - 8, top: top - 6, width: 16, height: 28 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragControls={0}
        dragElastic={false}
        onDrag={(_, info) => {
          onResizeRight(Math.max(minWidth, width + info.delta.x));
        }}
      />
    </>
  );
}
