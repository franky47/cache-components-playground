import { useQueryStates } from "nuqs";
import {
  createLoader,
  type inferParserType,
  type Options,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";
import { createSearchParamsCache } from "./cache/cache";

const searchParams = {
  query: parseAsString.withDefault(""),
  pageSize: parseAsInteger.withDefault(20),
};

export const loadFilters = createLoader(searchParams);

export type FiltersType = inferParserType<typeof searchParams>;
export const filtersCache = createSearchParamsCache(searchParams);

export const useFilters = (options: Options = {}) =>
  useQueryStates(searchParams, {
    shallow: false,
    ...options,
  });
