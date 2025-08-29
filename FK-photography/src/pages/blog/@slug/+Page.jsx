import React from "react";
import { useData } from "vike-react/useData";
import { PortableText } from "@portabletext/react";
import { SmartImage } from "../../../components/SmartImage.jsx";

const components = {
  types: {
    imageWithMeta: ({ value }) => (
      <figure style={{ margin: "1.25rem 0" }}>
        <SmartImage image={value} sizes="(max-width: 900px) 100vw, 900px" />
        {value?.caption && (
          <figcaption
            style={{ fontSize: ".9rem", opacity: 0.8, marginTop: ".5rem" }}
          >
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
};

export default function PostPage() {
  const { post } = useData();
  if (!post) return <p>Not found</p>;

  return (
    <article style={{ maxWidth: 900, margin: "0 auto", padding: "1.25rem" }}>
      <header style={{ display: "grid", gap: "1rem" }}>
        <h1>{post.title}</h1>
        {post.heroImage && (
          <SmartImage
            image={post.heroImage}
            sizes="(max-width: 900px) 100vw, 900px"
          />
        )}
      </header>
      <section style={{ marginTop: "1.5rem" }}>
        {post.body?.length ? (
          <PortableText value={post.body} components={components} />
        ) : (
          <p>No content.</p>
        )}
      </section>
    </article>
  );
}
