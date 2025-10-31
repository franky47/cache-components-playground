import { readFile } from "node:fs/promises";
import { resolve } from "node:path/posix";
import { cacheTag } from "next/cache";

export async function QuineStatic() {
  "use cache";
  cacheTag("tag");
  const filePath = resolve(process.cwd(), "src/app/quines/quine-static.tsx");
  const source = await readFile(filePath, "utf-8");
  const updatedAt = new Date().toISOString();
  console.log("Rendered QuineStatic at %s", updatedAt);
  return (
    <pre>
      Updated at: {updatedAt}
      <br />
      {source}
    </pre>
  );
}
