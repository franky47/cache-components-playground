"use server";

import { revalidateTag, updateTag } from "next/cache";

export async function invalidate(
  method: "revalidateTag" | "updateTag",
  tag: string,
) {
  console.log("Invalidating cache with %s('%s')", method, tag);
  switch (method) {
    case "revalidateTag":
      return revalidateTag(tag, "default");
    case "updateTag":
      return updateTag(tag);
  }
}
