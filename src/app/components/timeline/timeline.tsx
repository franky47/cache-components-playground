"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowOfTime } from "./arrow-of-time";
import { Event } from "./event";
import { ResizableBar } from "./process";

export function Timeline() {
  const { trackRef, trackWidth } = useTimelineTrack();
  const [requestA, setRequestA] = useState(150);
  const [requestB, setRequestB] = useState(300);
  const [renderLength, setRenderLength] = useState(100);
  const renderLeft = Math.min(requestA, requestB);
  const renderRight = renderLeft + renderLength;

  return (
    <figure className="p-4 h-32">
      <div className="relative" ref={trackRef}>
        <ArrowOfTime />
        <Event
          shape="circle"
          x={0}
          className="bg-sky-950 border border-sky-500"
        />
        <Event
          shape="diamond"
          x={requestA}
          className={
            requestA > renderRight
              ? "bg-green-950 border border-green-500"
              : "bg-purple-950 border border-purple-500"
          }
          onDragXDelta={(delta) => setRequestA((x) => x + delta)}
        />
        <Event
          shape="diamond"
          x={requestB}
          className={
            requestB > renderRight
              ? "bg-green-950 border border-green-500"
              : "bg-purple-950 border border-purple-500"
          }
          onDragXDelta={(delta) => setRequestB((x) => x + delta)}
        />
        <ResizableBar
          left={Math.min(requestA, requestB)}
          className="bg-amber-950 border border-amber-500 text-amber-100"
          width={renderLength}
          top={30}
          onResizeRight={setRenderLength}
          label="Render"
        />
      </div>
      <ul className="mt-16 list-none pl-0 space-y-1">
        <li className="text-cyan-500">revalidateTag</li>
        <li className="text-purple-500">request (stale)</li>
        <li className="text-green-500">request (fresh)</li>
      </ul>
    </figure>
  );
}

function useTimelineTrack() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [trackWidth, setTrackWidth] = useState(900);

  useEffect(() => {
    const ro = new ResizeObserver(() => {
      if (!trackRef.current) return;
      setTrackWidth(trackRef.current.clientWidth);
    });
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, []);

  return { trackRef, trackWidth };
}
