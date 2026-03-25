// src/components/blog/BlogCard.jsx
import React from "react";
import { SmartImage } from "@/components/media/SmartImage.jsx";
import { navigate } from "vike/client/router";

// Category colour map — extend as needed
const CAT_COLOURS = {
  blog:  { text: "text-[#7a5838]", border: "border-[rgba(122,88,56,0.35)]",  bg: "bg-[rgba(122,88,56,0.06)]"  },
  news:  { text: "text-[#2a6a50]", border: "border-[rgba(42,106,80,0.35)]",  bg: "bg-[rgba(42,106,80,0.06)]"  },
  essay: { text: "text-[#5848a0]", border: "border-[rgba(88,72,160,0.35)]",  bg: "bg-[rgba(88,72,160,0.06)]"  },
};

function CategoryPill({ category }) {
  if (!category) return null;
  const key = category.toLowerCase();
  const colours = CAT_COLOURS[key] ?? {
    text: "text-[#57524d]",
    border: "border-[rgba(87,82,77,0.3)]",
    bg: "bg-[rgba(87,82,77,0.05)]",
  };
  return (
    <span
      className={[
        "inline-block font-mono text-[0.6rem] tracking-[0.16em] uppercase",
        "px-[0.55rem] py-[0.22rem] border rounded-[2px]",
        colours.text, colours.border, colours.bg,
      ].join(" ")}
    >
      {category}
    </span>
  );
}

export function BlogCard({ post }) {
  const slug = post?.slug || "";
  const href = `/blog/${slug}`;

  const go = React.useCallback((e, to) => {
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    navigate(to);
  }, []);

  const excerptId = React.useId();
  const category = post?.category ?? post?.categories?.[0]?.title ?? null;

  // Format date
  const dateStr = post?.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-GB", {
        day: "numeric", month: "short", year: "numeric",
      })
    : null;

  const readTime = post?.readTime ? `${post.readTime} min` : null;
  const commentCount = post?.commentCount ?? null;

  return (
    <article className="group flex flex-col cursor-pointer">
      <a
        href={href}
        onClick={(e) => go(e, href)}
        aria-describedby={post?.excerpt ? excerptId : undefined}
        className="flex flex-col gap-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b6f4e] focus-visible:ring-offset-2 rounded-[1rem]"
      >
        {/* ── Label row: category + date — sits ABOVE the image ── */}
        <div className="flex items-center justify-between mb-[0.6rem]">
          <CategoryPill category={category} />
          {(dateStr || readTime) && (
            <span className="font-mono text-[0.6rem] tracking-[0.08em] text-[#9e9890]">
              {[dateStr, readTime].filter(Boolean).join(" · ")}
            </span>
          )}
        </div>

        {/* ── Image — rounded corners, never cropped by object-fit cover ──
            SmartImage renders at its natural aspect ratio.
            The overflow-hidden + rounded-[1rem] clips the corners only.       */}
        {post?.heroImage && (
          <div className="w-full overflow-hidden rounded-[1rem]">
            <SmartImage
              image={post.heroImage}
              alt={post?.heroImage?.alt || post?.title || ""}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
              // No fixed height, no object-cover — image shows at natural ratio
              className="w-full h-auto transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.03]"
            />
          </div>
        )}

        {/* ── Body ── */}
        <div className="pt-[0.95rem] flex flex-col gap-0">
          <h2 className="font-display font-light text-[1.15rem] leading-[1.22] tracking-[-0.01em] text-[#1c1a17] mb-[0.55rem]">
            {post?.title || "Untitled"}
          </h2>

          {post?.excerpt && (
            <p
              id={excerptId}
              className="text-[0.94rem] leading-[1.65] text-[#57524d] mb-[0.8rem] line-clamp-3"
            >
              {post.excerpt}
            </p>
          )}

          {/* Footer row */}
          <div className="flex items-center justify-between pt-[0.7rem] border-t border-[#cec8c0]">
            {commentCount !== null ? (
              <span className="font-mono text-[0.58rem] tracking-[0.08em] text-[#9e9890]">
                {commentCount} {commentCount === 1 ? "comment" : "comments"}
              </span>
            ) : (
              <span />
            )}
            <span className="font-mono text-[0.62rem] tracking-[0.12em] uppercase text-[#57524d] transition-colors duration-200 group-hover:text-[#8b6f4e]">
              Read →
            </span>
          </div>
        </div>
      </a>
    </article>
  );
}