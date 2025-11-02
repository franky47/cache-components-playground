import { Suspense } from "react";
import { Filters } from "../client";
import { type FiltersType, filtersCache } from "../search-params";

export default async function Page({ searchParams }: PageProps<"/ssr/cache">) {
  filtersCache.parse(searchParams); // Preload cache
  return (
    <div>
      <h1>SSR nuqs Page</h1>
      <Deeply>
        <Nested>
          <Server>
            <Components>
              <Suspense>
                <Dynamic />
              </Suspense>
              <UseCachePrivateLoader />
            </Components>
          </Server>
        </Nested>
      </Deeply>
      <Suspense>
        <Filters />
      </Suspense>
    </div>
  );
}

async function Dynamic() {
  const filters = await filtersCache.all();
  return <pre>{JSON.stringify(filters, null, 2)}</pre>;
}

async function UseCachePrivateLoader() {
  const filters = filtersCache.all();
  return (
    <Suspense>
      <UseCachePrivate filters={filters} />
    </Suspense>
  );
}

async function UseCachePrivate({ filters }: { filters: Promise<FiltersType> }) {
  "use cache: private";
  return <pre>{JSON.stringify(await filters, null, 2)}</pre>;
}

function Deeply({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
async function Nested({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
function Server({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
async function Components({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
