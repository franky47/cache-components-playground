import { Suspense } from "react";
import { QuineDynamic } from "./quine-dynamic";
import { QuineStatic } from "./quine-static";

export default async function Home() {
  console.log("Rendered Quine page");
  return (
    <>
      <h1>Quines</h1>
      <section>
        <h2>Static Quine (with "use cache")</h2>
        <QuineStatic />
      </section>
      <section>
        <h2>Dynamic Quine (with Suspense)</h2>
        <Suspense
          fallback={
            <div className="h-64 rounded-md bg-foreground/10 animate-pulse flex items-center justify-center">
              Loading...
            </div>
          }
        >
          <QuineDynamic />
        </Suspense>
      </section>
    </>
  );
}
