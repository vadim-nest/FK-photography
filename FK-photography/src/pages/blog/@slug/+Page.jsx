// src/pages/blog/@slug/+Page.jsx
import React, { useMemo } from "react";
import { useData } from "vike-react/useData";
import LightboxProvider from "@/providers/LightboxProvider.jsx";
import { BodyWithLightbox } from "@/components/BodyWithLightbox.jsx";

// --- Helper Functions ---

function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getReadingTime(blocks) {
  if (!blocks || !Array.isArray(blocks)) return "1 min read";

  let wordCount = 0;
  for (const block of blocks) {
    // Only count text in text blocks
    if (block._type === "block" && block.children) {
      block.children.forEach((child) => {
        if (child.text) {
          // Split by whitespace to count words
          wordCount += child.text.trim().split(/\s+/).length;
        }
      });
    }
  }

  const minutes = Math.ceil(wordCount / 200); // 200 wpm average
  return `${minutes} min read`;
}

// --- Main Component ---

export default function PostPage() {
  const { post } = useData();

  const readTime = useMemo(() => getReadingTime(post.body), [post.body]);

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

  // Calculate metadata
  const dateStr = formatDate(post.publishedAt || post._createdAt);

  return (
    <LightboxProvider>
      <div className="relative isolate">
        {/* --- Background Blur Layer --- */}
        <div
          className={[
            "absolute top-0 inset-x-0 -z-10 h-[125vh] w-full overflow-hidden rounded-2xl bg-[#E0E1E0]",
            "[mask-image:linear-gradient(to_bottom,black_30%,transparent_100%)]",
          ].join(" ")}
        ></div>

        {/* 1. ALLOW ARTICLE TO BE WIDE */}
        <article className="mx-auto max-w-5xl p-5">
          {/* 2. HEADER (Narrow & Centered) */}
          <header className="mx-auto max-w-2xl grid gap-8 mb-8 pt-16">
            {/* --- METADATA ROW --- */}
            <div className="flex flex-wrap items-center gap-2 text-md">
              {/* Author */}
              <div className="w-16 h-16 rounded-full bg-indigo-700" />

              <span className="font-medium">Faruk Kara</span>
              <span className="select-none opacity-50">•</span>

              {/* Date */}
              <time dateTime={post.publishedAt || post._createdAt}>
                {dateStr}
              </time>

              <span className="select-none opacity-50">•</span>

              {/* Reading Time */}
              <span>{readTime}</span>
            </div>

            <h1 className="text-4xl font-medium">{post.title}</h1>
          </header>

          {/* 3. CONTENT (Split Layout) */}
          <section
            className="
            mt-6 prose prose-zinc dark:prose-invert 
            max-w-none 
            
            /* Text Centered & Narrow */
            [&>p]:max-w-2xl [&>p]:mx-auto text-lg
            [&>h2]:max-w-2xl [&>h2]:mx-auto text-lg
            [&>h3]:max-w-2xl [&>h3]:mx-auto text-lg
            [&>h4]:max-w-2xl [&>h4]:mx-auto text-lg
            [&>ul]:max-w-2xl [&>ul]:mx-auto text-lg
            [&>ol]:max-w-2xl [&>ol]:mx-auto text-lg
            [&>blockquote]:max-w-2xl [&>blockquote]:mx-auto text-lg

            /* Images Wide */
            [&>figure]:w-full [&>figure]:max-w-full [&>figure]:mx-auto
            [&>div]:w-full [&>div]:max-w-full [&>div]:mx-auto
            [&>figure]:my-12
          "
          >
            {post.body?.length ? (
              <BodyWithLightbox blocks={post.body} />
            ) : (
              <p>No content.</p>
            )}
          </section>
        </article>
      </div>
    </LightboxProvider>
  );
}
