// src/components/blog/BlogCard.jsx
import React from "react";
import { SmartImage } from "@/components/media/SmartImage.jsx";
import { navigate } from "vike/client/router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function BlogCard({ post }) {
  const slug = post?.slug || "";
  const href = `/blog/${slug}`;

  const go = React.useCallback((e, to) => {
    // Respect new tab / middle click / modifiers
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
      return;
    e.preventDefault();
    navigate(to);
  }, []);

  const excerptId = React.useId();

  return (
    <Card className="grid gap-3 rounded-2xl">
      {post?.heroImage && (
        <SmartImage
          image={post.heroImage}
          alt={post?.heroImage?.alt || post?.title || ""}
          sizes="(max-width: 700px) 100vw, 33vw"
          className="overflow-hidden rounded-xl"
        />
      )}

      <CardContent className="p-3">
        <h2 className="m-0 text-lg font-semibold leading-tight">
          <a
            href={href}
            onClick={(e) => go(e, href)}
            aria-describedby={post?.excerpt ? excerptId : undefined}
            className="decoration-2 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          >
            {post?.title || "Untitled"}
          </a>
        </h2>

        {post?.excerpt && (
          <p
            id={excerptId}
            className="mt-2 text-sm text-zinc-600 dark:text-zinc-300"
          >
            {post.excerpt}
          </p>
        )}

        <Button variant="link" className="px-0" asChild>
          <a
            href={href}
            onClick={(e) => go(e, href)}
            aria-label={`Read more: ${post?.title ?? "post"}`}
          >
            Read more →
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
