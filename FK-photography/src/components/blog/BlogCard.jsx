// src/components/blog/BlogCard.jsx
import React from "react";
import { SmartImage } from "@/components/media/SmartImage.jsx";
import { navigate } from "vike/client/router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function BlogCard({ post }) {
  const slug = post?.slug || "";
  const href = `/blog/${slug}`;

  // Extract the LQUIP (Base64 string) if available
  const lqip = post?.heroImage?.asset?.metadata?.lqip;

  const go = React.useCallback((e, to) => {
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
      return;
    e.preventDefault();
    navigate(to);
  }, []);

  const excerptId = React.useId();

  return (
    <div className="group relative h-full w-full isolate">
      {/* 2. EXTERNAL GLOW (On Hover) */}
      {/* OPTIMIZATION: Use LQUIP (no fetch) or Tiny Image (w=50) */}
      {post?.heroImage && (
        <div className="absolute -inset-1 -z-20 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-60">
          {lqip ? (
            <img
              src={lqip}
              alt=""
              className="h-full w-full object-cover blur-2xl saturate-150 rounded-3xl"
              aria-hidden="true"
            />
          ) : (
            <SmartImage
              image={post.heroImage}
              width={50} // Request tiny image if no LQUIP
              className="h-full w-full object-cover blur-2xl saturate-150"
              aria-hidden="true"
            />
          )}
        </div>
      )}

      {/* 3. THE CARD */}
      <a
        href={href}
        onClick={(e) => go(e, href)}
        aria-describedby={post?.excerpt ? excerptId : undefined}
        className="decoration-2 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Card className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border-0 shadow-sm cursor-pointer">
          {/* --- INTERNAL BACKGROUND LAYER --- */}
          {post?.heroImage && (
            <div className="absolute inset-0 -z-10 h-full w-full select-none bg-white">
              {/* OPTIMIZATION: Use LQUIP or Tiny Image */}
              {lqip ? (
                <img
                  src={lqip}
                  alt=""
                  className="h-full w-full object-cover blur-xl opacity-50 dark:opacity-35 scale-110"
                  aria-hidden="true"
                />
              ) : (
                <SmartImage
                  image={post.heroImage}
                  width={50} // Request tiny image
                  className="h-full w-full object-cover blur-xl opacity-50 dark:opacity-35 scale-110"
                  aria-hidden="true"
                />
              )}
            </div>
          )}

          {/* --- 4. Main Image (High Quality) --- */}
          <div className="relative w-full aspect-[4/3] overflow-hidden">
            {post?.heroImage && (
              <SmartImage
                image={post.heroImage}
                alt={post?.heroImage?.alt || post?.title || ""}
                sizes="(max-width: 700px) 100vw, 33vw"
                // Keep high quality here
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102"
              />
            )}
          </div>

          {/* --- 5. Content --- */}
          <CardContent className="flex flex-1 flex-col p-6 bg-transparent">
            <h2 className="m-0 text-[1.75rem] leading-tight">
              {post?.title || "Untitled"}
            </h2>

            {post?.excerpt && (
              <p id={excerptId} className="line-clamp-3 text-xl mt-5">
                {post.excerpt}
              </p>
            )}
          </CardContent>
        </Card>
      </a>
    </div>
  );
}
