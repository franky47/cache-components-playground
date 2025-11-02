import { Suspense } from "react";
import { Timeline } from "./components/timeline/timeline";

export default function Home() {
  return (
    <Suspense>
      <Timeline />
      {/* <InteractiveTimeline /> */}
    </Suspense>
  );
}
