import React from "react";
import { useData } from "vike-react/useData";
import { BlogCard } from "@/components/blog/BlogCard";

export default function BlogIndex() {
  const { posts = [] } = useData();
  if (!posts.length)
    return <p className="text-sm text-zinc-500">No posts yet.</p>;

  return (
    <div className="grid gap-10 grid-cols-2 max-w-5xl mx-auto">
      {posts.map((p, i) => (
        <div
          key={p._id || p.slug}
          // If it's the right column (odd index), push it down visually
          className={i % 2 !== 0 ? "translate-y-60" : ""}
        >
          <BlogCard post={p} />
        </div>
      ))}
    </div>
  );
}


