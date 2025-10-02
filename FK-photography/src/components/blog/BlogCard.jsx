import React from "react";
import { SmartImage } from "@/components/media/SmartImage.jsx";
import { navigate } from "vike/client/router";
// shadcn
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function BlogCard({ post }) {
  const go = (e) => {
    e.preventDefault();
    navigate(`/blog/${post.slug}`);
  };

  return (
    <Card className="grid gap-3 rounded-2xl">
      {post.heroImage && (
        <SmartImage
          image={post.heroImage}
          sizes="(max-width: 700px) 100vw, 33vw"
          className="overflow-hidden rounded-xl"
        />
      )}

      <CardContent className="p-3">
        <h2 className="m-0 text-lg font-semibold leading-tight">
          <a
            href={`/blog/${post.slug}`}
            onClick={go}
            className="decoration-2 underline-offset-4 hover:underline"
          >
            {post.title}
          </a>
        </h2>

        {post.excerpt && (
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            {post.excerpt}
          </p>
        )}

        <Button variant="link" className="px-0" asChild>
          <a href={`/blog/${post.slug}`} onClick={go}>
            Read more →
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
