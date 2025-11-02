import { Suspense } from "react";
import { Filters } from "../client";
import { type FiltersType, loadFilters } from "../search-params";

export default async function Page({ searchParams }: PageProps<"/ssr-nuqs">) {
  const filters = loadFilters(searchParams);
  return (
    <div>
      <h1>SSR with prop drilling parsed search params</h1>
      <p>
        This throws the "Uncached data accessed outside of Suspense" for the
        UseCachePrivate component, but only in the console, no overlay, and
        fails the prod build.
      </p>
      <Suspense>
        <Dynamic filters={filters} />
      </Suspense>
      <UseCachePrivate filters={filters} />
      <Suspense>
        <Filters />
      </Suspense>
    </div>
  );
}

async function Dynamic({ filters }: { filters: Promise<FiltersType> }) {
  return <pre>{JSON.stringify(await filters, null, 2)}</pre>;
}

async function UseCachePrivate({ filters }: { filters: Promise<FiltersType> }) {
  "use cache: private";
  return <pre>{JSON.stringify(await filters, null, 2)}</pre>;
}
