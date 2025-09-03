import React from "react";
import { useData } from "vike-react/useData";
import { BlogCard } from "@/components/BlogCard";

export default function BlogIndex() {
  const { posts = [] } = useData();
  if (!posts.length) return <p>No posts yet.</p>;

  return (
    <div
      style={{
        display: "grid",
        gap: "1.25rem",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      }}
    >
      {posts.map((p, index) => (
        <BlogCard post={p} key={index} />
      ))}
    </div>
  );
}
