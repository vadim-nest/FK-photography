// src/pages/blog/@slug/+Page.jsx
import React from "react";
import { useData } from "vike-react/useData";
import LightboxProvider from "@/providers/LightboxProvider.jsx";
import { BodyWithLightbox } from "@/components/BodyWithLightbox.jsx";

export default function PostPage() {
  const { post } = useData();

  if (!post) {
    return (
      <main id="main" className="mx-auto max-w-[900px] p-5">
        <h1 className="text-2xl font-semibold">Post not found</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-300">
          This post may have been unpublished.
        </p>
      </main>
    );
  }

  return (
    <LightboxProvider>
      <article className="mx-auto max-w-[900px] p-5">
        <header className="grid gap-4">
          <h1 className="text-3xl font-bold">{post.title}</h1>
          {/* Enable if you want a hero image here
          {post.heroImage && (
          <SmartImage image={post.heroImage} sizes="(max-width: 900px) 100vw, 900px" />
          )}*/}
        </header>
        <section className="mt-6 prose prose-zinc dark:prose-invert">
          {post.body?.length ? (
            <BodyWithLightbox blocks={post.body} />
          ) : (
            <p>No content.</p>
          )}
        </section>
      </article>
    </LightboxProvider>
  );
}
