// src/components/blog/BlogCard.jsx
import React from "react";
import { SmartImage } from "@/components/media/SmartImage.jsx";
import { navigate } from "vike/client/router";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function BlogCard({ post, variant = "vertical" }) {
  const slug = post?.slug || "";
  const href = `/blog/${slug}`;

  const go = React.useCallback((e, to) => {
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
      return;
    e.preventDefault();
    navigate(to);
  }, []);

  const excerptId = React.useId();

  // Helper boolean to make class logic cleaner
  const isHorizontal = variant === "horizontal";

  return (
    <div className="group relative h-full w-full isolate">
      {/* 3. THE CARD */}
      <a
        href={href}
        onClick={(e) => go(e, href)}
        aria-describedby={post?.excerpt ? excerptId : undefined}
        className="block h-full decoration-2 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Card
          className={cn(
            "bg-[#E0E1E0] transition duration-300 ease-in-out hover:shadow-lg relative flex h-full w-full overflow-hidden rounded-2xl border-0 cursor-pointer",
            // Layout Logic: Vertical (default) vs Horizontal (Hero)
            // On mobile, even horizontal cards usually stack, so we use md:flex-row
            isHorizontal ? "flex-col md:flex-row" : "flex-col"
          )}
        >
          {/* --- 4. Main Image (High Quality) --- */}
          <div
            className={cn(
              "relative overflow-hidden",
              isHorizontal
                ? "w-full md:w-1/2 lg:w-4/6 h-64 md:h-auto shrink-0" // Horizontal: Side-by-side on desktop, stacked on mobile
                : "w-full aspect-[4/3]" // Vertical: Standard aspect ratio
            )}
          >
            {post?.heroImage && (
              <SmartImage
                image={post.heroImage}
                alt={post?.heroImage?.alt || post?.title || ""}
                sizes={
                  isHorizontal
                    ? "(max-width: 768px) 100vw, 50vw"
                    : "(max-width: 700px) 100vw, 33vw"
                }
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102"
              />
            )}
          </div>

          {/* --- 5. Content --- */}
          <CardContent
            className={cn(
              "flex flex-1 flex-col p-6 bg-transparent",
              // Optional: Center content vertically for the horizontal hero card
              isHorizontal ? "justify-center" : ""
            )}
          >
            <h2
              className={cn(
                "m-0 leading-tight",
                // Make the title slightly larger on the Hero card
                isHorizontal ? "text-3xl md:text-4xl" : "text-[1.75rem]"
              )}
            >
              {post?.title || "Untitled"}
            </h2>

            {post?.excerpt && (
              <p
                id={excerptId}
                className={cn(
                  "mt-5",
                  isHorizontal
                    ? "text-lg md:text-xl line-clamp-4"
                    : "text-lg line-clamp-3"
                )}
              >
                {post.excerpt}
              </p>
            )}
          </CardContent>
        </Card>
      </a>
    </div>
  );
}
