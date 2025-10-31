import { readFile } from "node:fs/promises";
import { resolve } from "node:path/posix";

export async function QuineDynamic() {
  const filePath = resolve(process.cwd(), "src/app/quines/quine-dynamic.tsx");
  const source = await readFile(filePath, "utf-8");
  const updatedAt = new Date().toISOString();
  console.log("Rendered QuineDynamic at %s", updatedAt);
  return (
    <pre>
      Updated at: {updatedAt}
      <br />
      {source}
    </pre>
  );
}
