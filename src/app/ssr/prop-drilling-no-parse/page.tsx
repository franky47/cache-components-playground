import { Suspense } from "react";
import { Filters } from "../client";

type Props = Pick<PageProps<"/ssr/prop-drilling-no-parse">, "searchParams">;

export default async function Page({ searchParams }: Props) {
  return (
    <div>
      <h1>SSR with prop drilling unparsed search params</h1>
      <Suspense>
        <Dynamic searchParams={searchParams} />
      </Suspense>
      <Suspense>
        {/* This still needs to be wrapped in Suspense */}
        <UseCachePrivate searchParams={searchParams} />
      </Suspense>
      <Suspense>
        <Filters />
      </Suspense>
    </div>
  );
}

async function Dynamic({ searchParams }: Props) {
  return <pre>{JSON.stringify(await searchParams, null, 2)}</pre>;
}

async function UseCachePrivate({ searchParams }: Props) {
  "use cache: private";
  return <pre>{JSON.stringify(await searchParams, null, 2)}</pre>;
}
