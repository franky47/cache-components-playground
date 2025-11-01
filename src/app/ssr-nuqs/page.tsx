import { Suspense } from "react";
import InteractiveTimeline from "../components/timeline";

export default function Page({ searchParams }: PageProps<"/ssr-nuqs">) {
  return (
    <div>
      SSR nuqs Page
      <Suspense>
        <InteractiveTimeline />
      </Suspense>
    </div>
  );
}
