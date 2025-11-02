import { Suspense } from "react";
import { Filters } from "../client";
import { filtersCache } from "../search-params";

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
              {/* <UseCachePrivate /> */}
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

// async function UseCachePrivate() {
//   "use cache: private";
//   const filters = await filtersCache.all();
//   return <pre>{JSON.stringify(filters, null, 2)}</pre>;
// }

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
