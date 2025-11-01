import { Suspense } from "react";
import InteractiveTimeline from "./components/timeline";
import { ArrowOfTime } from "./components/timeline/arrow-of-time";

export default function Home() {
  return (
    <Suspense>
      <InteractiveTimeline />
      <ArrowOfTime />
      {/* <Event x={100} shape="circle" color="bg-blue-500" draggable />
      <Event x={100} shape="diamond" color="bg-green-500" draggable />
       */}
    </Suspense>
  );
}
