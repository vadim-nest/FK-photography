import React from "react";
import { useData } from "vike-react/useData";
import { BlogCard } from "@/components/blog/BlogCard";

export default function BlogIndex() {
  const { posts = [] } = useData();
  if (!posts.length)
    return <p className="text-sm text-zinc-500">No posts yet.</p>;

  return (
    <div className="grid gap-5 grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))]">
      {posts.map((p) => (
        <BlogCard post={p} key={p._id || p.slug} />
      ))}
    </div>
  );
}
