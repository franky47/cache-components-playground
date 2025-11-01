"use client";

import { motion } from "motion/react";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Event } from "./timeline/event";

// Interactive timeline diagram (TypeScript + React + TailwindCSS + framer-motion)
// - Composable components: <Diamond/>, <Circle/>, <Bar/>
// - Diamonds & right-resize handle use motion for dragging on X axis
// - Parent enforces constraints (bar.left follows diamondB)

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

export const Diamond: React.FC<{
  x: number;
  top?: number;
  draggable?: boolean;
  onDrag?: (newX: number) => void;
}> = ({ x, top = -12, draggable = true, onDrag }) => {
  return (
    <motion.div
      role="img"
      aria-label="diamond"
      className={`absolute w-6 h-6 transform rotate-45 rounded-md ${draggable ? "cursor-grab" : "cursor-default"}`}
      style={{
        left: x - 12,
        top,
        background: "linear-gradient(#0b74d1,#0062b1)",
        boxShadow: "0 0 0 4px rgba(0,0,0,0.6), 0 0 0 6px rgba(0,150,255,0.9)",
      }}
      drag={draggable ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0}
      onDrag={(e, info) => {
        if (!onDrag) return;
        onDrag(x + info.delta.x);
      }}
      whileTap={{ cursor: "grabbing" }}
      transition={{ type: "spring", stiffness: 500, damping: 40 }}
    />
  );
};

export const Circle: React.FC<{ x: number; top?: number }> = ({
  x,
  top = -8,
}) => {
  return (
    <div
      role="img"
      aria-label="circle"
      className="absolute rounded-full"
      style={{
        left: x - 10,
        top,
        width: 20,
        height: 20,
        background: "radial-gradient(circle at 30% 30%, #4ad36a, #18843a)",
        boxShadow: "0 0 0 4px rgba(0,0,0,0.6)",
        pointerEvents: "none",
      }}
    />
  );
};

export const Bar: React.FC<{
  left: number;
  width: number;
  top?: number;
  onResizeRight?: (newWidth: number) => void;
}> = ({ left, width, top = -4, onResizeRight }) => {
  const minWidth = 16;

  return (
    <>
      <div
        className="absolute rounded-md"
        style={{
          left,
          top,
          height: 16,
          width,
          background: "linear-gradient(90deg,#d98b00,#ffb24a)",
          boxShadow: "0 2px 0 rgba(0,0,0,0.6)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        drag={onResizeRight ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0}
        onDrag={(e, info) => {
          if (!onResizeRight) return;
          onResizeRight(Math.max(minWidth, width + info.delta.x));
        }}
        className={`${onResizeRight ? "" : "pointer-events-none"} absolute rounded-sm`}
        style={{
          left: left + width - 6,
          top: top - 6,
          width: 12,
          height: 28,
          cursor: onResizeRight ? "ew-resize" : "default",
        }}
      />
    </>
  );
};

export default function InteractiveTimeline() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [trackWidth, setTrackWidth] = useState(900);

  const [diamondA, setDiamondA] = useState(40);
  const [diamondB, setDiamondB] = useState(360);
  const [diamondC, setDiamondC] = useState(560);
  const [circle, setCircle] = useState(100);
  const [barLeft, setBarLeft] = useState(diamondB);
  const [barWidth, setBarWidth] = useState(300);

  useEffect(() => {
    const ro = new ResizeObserver(() => {
      if (!containerRef.current) return;
      setTrackWidth(containerRef.current.clientWidth - 40);
    });
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => setBarLeft(diamondB), [diamondB]);

  const clampToTrack = useCallback(
    (x: number) => clamp(x, 12, trackWidth - 12),
    [trackWidth],
  );

  const onDragDiamondA = (newX: number) => setDiamondA(clampToTrack(newX));
  const onDragDiamondB = (newX: number) => setDiamondB(clampToTrack(newX));
  const onDragDiamondC = (newX: number) => setDiamondC(clampToTrack(newX));

  const onResizeBarRight = (newWidth: number) => {
    const maxWidth = trackWidth - barLeft - 12;
    setBarWidth(Math.max(12, Math.min(newWidth, maxWidth)));
  };

  return (
    <div
      ref={containerRef}
      className="w-full max-w-[1100px] h-44 bg-gray-900 text-gray-100 p-5 rounded-md relative font-sans"
    >
      <div className="mb-2 text-lg">
        Stale-while-revalidate diagram (interactive)
      </div>

      <div className="absolute left-5 right-5 top-20 h-1.5 bg-gradient-to-r from-gray-200 to-gray-400 rounded" />

      <div
        className="absolute"
        style={{ left: 20, top: 80, height: 0, width: trackWidth }}
      >
        <Diamond x={diamondA} onDrag={(x) => onDragDiamondA(x)} draggable />
        <Event
          shape="diamond"
          x={diamondA}
          color="bg-purple-500"
          onDragXDelta={(delta) => setDiamondA((old) => old + delta)}
        />

        <div style={{ position: "absolute", left: circle - 10, top: -10 }}>
          <Circle x={circle} />
        </div>

        <Diamond x={diamondB} onDrag={(x) => onDragDiamondB(x)} draggable />
        <Diamond x={diamondC} onDrag={(x) => onDragDiamondC(x)} draggable />

        <Bar left={barLeft} width={barWidth} onResizeRight={onResizeBarRight} />

        <div
          className="absolute text-sm text-gray-400"
          style={{ left: diamondB - 40, top: 30 }}
        >
          revalidateTag
        </div>

        <div
          className="absolute text-sm text-amber-400"
          style={{ left: 12, top: 120 }}
        >
          Staleness window
        </div>

        <div
          className="absolute text-sm text-gray-400"
          style={{ left: diamondC - 50, top: 120 }}
        >
          fresh content on second subsequent request
        </div>
      </div>

      <div className="absolute right-5 top-5 text-xs text-gray-400">
        <div>diamondB x: {Math.round(diamondB)}</div>
        <div>
          bar left: {Math.round(barLeft)} width: {Math.round(barWidth)}
        </div>
      </div>
    </div>
  );
}
