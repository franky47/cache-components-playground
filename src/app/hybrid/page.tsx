import { setTimeout } from "node:timers/promises";
import { cacheLife } from "next/cache";
import { Suspense } from "react";

export default function Hybrid() {
  return (
    <Suspense fallback={<Cached />}>
      <Dynamic />
    </Suspense>
  );
}

async function Dynamic() {
  await setTimeout(1000);
  return new Date().toISOString();
}

async function Cached() {
  "use cache";
  cacheLife("minutes");
  return <Dynamic />;
}
