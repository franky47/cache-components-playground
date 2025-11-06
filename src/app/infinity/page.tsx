import { cacheLife, cacheTag } from "next/cache";

export default function Page() {
  return <InfinityCache />;
}

async function InfinityCache() {
  "use cache";
  cacheLife("infinity");
  cacheTag("tag", "infinity");
  const renderedAt = new Date().toISOString();
  return (
    <div>
      Infinity Cache Component - never revalidates or expires. Rendered at{" "}
      {renderedAt}
    </div>
  );
}
