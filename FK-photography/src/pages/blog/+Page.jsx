import React from "react";
import { useData } from "vike-react/useData";
import { SmartImage } from "../../components/SmartImage.jsx";
import { navigate } from "vike/client/router";

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
      {posts.map((p) => (
        <article key={p._id} style={{ display: "grid", gap: ".75rem" }}>
          {p.heroImage && (
            <SmartImage
              image={p.heroImage}
              sizes="(max-width: 700px) 100vw, 33vw"
            />
          )}
          <h2 style={{ margin: 0 }}>
            <a
              href={`/blog/${p.slug}`}
              onClick={(e) => {
                e.preventDefault();
                navigate(`/blog/${p.slug}`);
              }}
            >
              {p.title}
            </a>
          </h2>
          {p.excerpt && <p style={{ opacity: 0.9 }}>{p.excerpt}</p>}
          <p>
            <a
              href={`/blog/${p.slug}`}
              onClick={(e) => {
                e.preventDefault();
                navigate(`/blog/${p.slug}`);
              }}
            >
              Read more →
            </a>
          </p>
        </article>
      ))}
    </div>
  );
}
