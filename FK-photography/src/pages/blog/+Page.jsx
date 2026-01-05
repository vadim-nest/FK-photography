import React from "react";
import { useData } from "vike-react/useData";
import { BlogCard } from "@/components/blog/BlogCard";
import { cn } from "@/lib/utils"; // Or use standard string concatenation

export default function BlogIndex() {
  const { posts = [] } = useData();

  if (!posts.length)
    return <p className="text-sm text-zinc-500">No posts yet.</p>;

  return (
    <div className="grid gap-10 grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto pb-[19rem]">
      {posts.map((p, i) => {
        const isFirst = i === 0;
        // Logic for staggering the right column.
        // Index 0 is hero. Index 1 is left, Index 2 is right (push down), etc.
        const isRightColumn = !isFirst && i % 2 === 0;

        return (
          <div
            key={p._id || p.slug}
            className={cn(
              // First item spans full width
              isFirst ? "col-span-1 md:col-span-2" : "",
              // Stagger right column items
              isRightColumn ? "md:translate-y-60" : ""
            )}
          >
            <BlogCard post={p} variant={isFirst ? "horizontal" : "vertical"} />
          </div>
        );
      })}
    </div>
  );
}
