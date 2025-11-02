"use client";

import { useFilters } from "./search-params";

export function Filters() {
  const [{ pageSize, query }, setSearchParams] = useFilters();
  return (
    <div>
      <div>
        <label>
          Query:{" "}
          <input
            type="text"
            value={query}
            onChange={(e) => setSearchParams({ query: e.target.value })}
          />
        </label>
      </div>
      <div>
        <label>
          Page Size:{" "}
          <input
            type="number"
            value={pageSize}
            onChange={(e) =>
              setSearchParams({
                pageSize: e.target.value ? e.target.valueAsNumber : null,
              })
            }
          />
        </label>
      </div>
    </div>
  );
}
