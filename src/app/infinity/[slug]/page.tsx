import { cacheLife } from "next/cache";

export default async function Page({ params }: PageProps<"/infinity/[slug]">) {
  "use cache";
  cacheLife("infinity");
  const { slug } = await params;
  return <div>Infinity Slug: {slug}</div>;
}

export async function generateStaticParams() {
  "use cache";
  cacheLife("infinity");
  return [{ slug: "one" }, { slug: "two" }, { slug: "three" }];
}
