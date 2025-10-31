"use client";

import { invalidate } from "../functions/invalidate";

type InvalidateButtonProps = {
  method: "revalidateTag" | "updateTag";
  tag: string;
};

const colors = {
  revalidateTag: "bg-blue-700/20 border-blue-700/50",
  updateTag: "bg-green-700/20 border-green-700/50",
} as const;

export function InvalidateButton({ method, tag }: InvalidateButtonProps) {
  const color = colors[method];
  return (
    <button
      type="submit"
      onClick={() => invalidate(method, tag)}
      className={`cursor-pointer border px-3 py-1 ${color} text-white font-medium`}
    >
      {method}('{tag}')
    </button>
  );
}
