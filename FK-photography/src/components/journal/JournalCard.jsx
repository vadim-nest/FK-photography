// src/components/journal/JournalCard.jsx
import React from "react";
import { SmartImage } from "@/components/media/SmartImage.jsx";
import { navigate } from "vike/client/router";
import { PortableText } from "@portabletext/react";

const CAT_COLOURS = {
  journal: {
    text: "text-[#7a5838]",
    border: "border-[rgba(122,88,56,0.35)]",
    bg: "bg-[rgba(122,88,56,0.06)]",
  },
  news: {
    text: "text-[#2a6a50]",
    border: "border-[rgba(42,106,80,0.35)]",
    bg: "bg-[rgba(42,106,80,0.06)]",
  },
  essay: {
    text: "text-[#5848a0]",
    border: "border-[rgba(88,72,160,0.35)]",
    bg: "bg-[rgba(88,72,160,0.06)]",
  },
};

const excerptComponents = {
  marks: {
    link: ({ children, value }) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-[#cec8c0] underline-offset-4 hover:text-[#8b6f4e] hover:decoration-[#8b6f4e] transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </a>
    ),
  },
  block: {
    normal: ({ children }) => <>{children}</>,
  },
};

function CategoryPill({ category }) {
  if (!category) return null;
  // Map internal labels to the exact dictionary keys above
  const key =
    category.toLowerCase() === "documentaryproject"
      ? "essay"
      : category.toLowerCase();

  const colours = CAT_COLOURS[key] ?? {
    text: "text-[#57524d]",
    border: "border-[rgba(87,82,77,0.3)]",
    bg: "bg-[rgba(87,82,77,0.05)]",
  };

  const displayLabel = key === "essay" ? "Essay" : category;

  return (
    <span
      className={[
        "inline-block font-mono text-[0.6rem] tracking-[0.16em] uppercase",
        "px-[0.55rem] py-[0.22rem] border rounded-[2px]",
        colours.text,
        colours.border,
        colours.bg,
      ].join(" ")}
    >
      {displayLabel}
    </span>
  );
}

export function JournalCard({ post }) {
  const type = post?._type;
  const slug = post?.slug || "";

  // 1. Determine destination and behavior
  let href = `/journal/${slug}`;
  let isExternal = false;
  let categoryLabel = "Journal";

  if (type === "news") {
    href = post.externalLink || "";
    isExternal = !!post.externalLink;
    categoryLabel = "News";
  } else if (type === "documentaryProject") {
    href = `/documentary-photography/${slug}`;
    categoryLabel = "Essay";
  }

  const go = React.useCallback(
    (e, to) => {
      if (isExternal || !to) return;
      if (e.defaultPrevented) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
        return;
      e.preventDefault();
      navigate(to);
    },
    [isExternal],
  );

  const rawImage = post?.image || post?.heroImage || post?.coverImage;
  const displayImage = rawImage?.asset ? rawImage : null;

  const dateStr = post?.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  const readTime = post?.readTime ? `${post.readTime} min` : null;

  return (
    <article className="group flex flex-col cursor-pointer w-full">
      <a
        href={href || undefined}
        onClick={(e) => go(e, href)}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={`flex flex-col gap-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b6f4e] rounded-[1rem] ${!href ? "cursor-default" : ""}`}
      >
        <div className="flex items-center justify-between mb-[0.6rem]">
          <CategoryPill category={categoryLabel} />
          <span className="font-mono text-[0.6rem] tracking-[0.08em] text-[#9e9890]">
            {[dateStr, readTime].filter(Boolean).join(" · ")}
          </span>
        </div>

        {displayImage ? (
          <div className="w-full overflow-hidden rounded-[1rem] bg-[rgba(0,0,0,0.03)]">
            <SmartImage
              image={displayImage}
              alt={displayImage?.alt || post?.title || ""}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
              className="w-full h-auto block transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.03]"
            />
          </div>
        ) : (
          <div className="w-full aspect-[4/3] bg-[#cec8c0] rounded-[1rem] flex items-center justify-center p-6">
            <span className="font-mono text-[0.6rem] tracking-[0.1em] uppercase text-white/50 text-center">
              {post?.title || "No Image"}
            </span>
          </div>
        )}

        <div className="pt-[0.95rem] flex flex-col gap-0">
          <h2 className="font-display font-light text-[1.2rem] leading-[1.22] tracking-[-0.01em] text-[#1c1a17] mb-[0.55rem] group-hover:text-[#8b6f4e] transition-colors">
            {post?.title || "Untitled"}
          </h2>

          {post?.excerpt && (
            <div className="text-[0.94rem] leading-[1.65] text-[#57524d] mb-[0.8rem]">
              {Array.isArray(post.excerpt) ? (
                <PortableText
                  value={post.excerpt}
                  components={excerptComponents}
                />
              ) : (
                <p>{post.excerpt}</p>
              )}
            </div>
          )}

          <div className="flex items-center justify-between pt-[0.7rem] border-t border-[#cec8c0]">
            <span className="font-mono text-[0.58rem] tracking-[0.08em] text-[#9e9890]">
              {type === "news"
                ? "News Update"
                : post.commentCount
                  ? `${post.commentCount} comments`
                  : "Journal Entry"}
            </span>
            {href && (
              <span className="font-mono text-[0.62rem] tracking-[0.12em] uppercase text-[#57524d] group-hover:text-[#8b6f4e] transition-colors">
                {isExternal ? "Visit Site →" : "Read →"}
              </span>
            )}
          </div>
        </div>
      </a>
    </article>
  );
}
