import type { inferParserType, ParserMap } from "nuqs/server";
import { createLoader } from "nuqs/server";
import * as React from "react";

type CacheInterface<Parsers extends ParserMap> = {
  /**
   * Parse the incoming `searchParams` page prop using the parsers provided,
   * and make it available to the RSC tree.
   *
   * @argument searchParams - The `searchParams` prop from the page component (Promise).
   * @argument loaderOptions.strict - When `true`, the Promise returned from the loader
   * will reject if a search params value is invalid for the given parser,
   * rather than falling back to the parser's default value (or `null` if no default is set).
   *
   * @returns The parsed search params for direct use in the page component.
   *
   * Note: this async version requires Next.js 15 or later.
   */
  parse(searchParams: Promise<any>): Promise<inferParserType<Parsers>>;
  all: () => Promise<inferParserType<Parsers>>;
  get: <Key extends keyof Parsers>(
    key: Key,
  ) => Promise<inferParserType<Parsers[Key]>>;
};

export function createSearchParamsCache<Parsers extends ParserMap>(
  parsers: Parsers,
): CacheInterface<Parsers> {
  const load = createLoader(parsers);
  type Keys = keyof Parsers;
  type ParsedSearchParams = inferParserType<Parsers>;

  type Cache = {
    searchParams: Promise<ParsedSearchParams>;
    resolve: (value: ParsedSearchParams) => void;
  };

  // Why not use a good old object here ?
  // React's `cache` is bound to the render lifecycle of a page,
  // whereas a simple object would be bound to the lifecycle of the process,
  // which may be reused between requests in a serverless environment
  // (warm lambdas on Vercel or AWS).
  const getCache = React.cache<() => Cache>(() => {
    const { promise, resolve } = Promise.withResolvers<ParsedSearchParams>();
    return {
      searchParams: promise,
      resolve,
    };
  });

  function parse(searchParams: Promise<any>): Promise<ParsedSearchParams> {
    return searchParams.then((sp) => {
      const { resolve } = getCache();
      const parsed = load(sp);
      resolve(parsed);
      return parsed;
    });
  }
  async function all() {
    const { searchParams } = getCache();
    return searchParams;
  }
  function get<Key extends Keys>(key: Key): Promise<ParsedSearchParams[Key]> {
    const { searchParams } = getCache();
    return searchParams.then((sp) => sp[key]);
  }
  return { parse, get, all };
}
