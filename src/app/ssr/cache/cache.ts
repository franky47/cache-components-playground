import type { inferParserType, ParserMap } from "nuqs/server";
import { createLoader } from "nuqs/server";
import * as React from "react";

type CacheInterface<Parsers extends ParserMap> = {
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
