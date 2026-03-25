// src/pages/blog/index/+Page.jsx
import React from "react";
import { useData } from "vike-react/useData";
import { BlogCard } from "@/components/blog/BlogCard";

export default function BlogIndex() {
  const { posts = [] } = useData();

  if (!posts.length)
    return (
      <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-[#9e9890] py-20 text-center">
        No posts yet.
      </p>
    );

  return (
    <div className="w-7xl max-w-full mx-auto px-12 pb-32 pt-0">
      {/* Page header */}
      <header className="flex items-end justify-between pt-18 pb-0 mb-10">
        <div>
          <span className="block font-mono text-[0.65rem] tracking-[0.2em] uppercase text-[#8b6f4e] mb-3">
            Journal
          </span>
          <h1 className="font-display font-extralight text-[clamp(2.8rem,5.5vw,4.5rem)] leading-[1.0] tracking-[-0.02em] text-[#1c1a17]">
            Recording Cambridge
            <br />
            <em
              className="italic text-[#57524d]"
              style={{ fontVariationSettings: "'wdth' 75" }}
            >
              in town &amp; gown
            </em>
          </h1>
        </div>
        <div className="text-right pb-1 hidden md:block">
          <span className="block font-mono text-[0.62rem] tracking-[0.14em] text-[#9e9890] mb-1">
            {posts.length} entries
          </span>
          <p className="font-[family-name:var(--font-body)] italic text-[0.95rem] text-[#57524d] max-w-[200px] text-right leading-snug">
            Blog, news and photo essays in one place.
          </p>
        </div>
      </header>

      {/*
        STAGGERED TWO-COLUMN GRID
        ─────────────────────────
        Left column:  items at index 1, 3, 5… (odd, 1-based) — starts flush
        Right column: items at index 2, 4, 6… (even, 1-based) — starts 8rem lower

        Both columns are independent flex columns so each card's natural image
        height is respected — no row alignment forcing fixed heights.

        On mobile: single column, stagger removed.
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 items-start">
        {/* Left column */}
        <div className="flex flex-col gap-16">
          {posts
            .filter((_, i) => i % 2 === 0)
            .map((post) => (
              <BlogCard key={post._id || post.slug} post={post} />
            ))}
        </div>

        {/* Right column — offset downward by margin-top */}
        <div className="flex flex-col gap-16 mt-0 md:mt-32">
          {posts
            .filter((_, i) => i % 2 === 1)
            .map((post) => (
              <BlogCard key={post._id || post.slug} post={post} />
            ))}
        </div>
      </div>

      {/* Newsletter strip — appears after grid */}
      <div className="mt-24 bg-[#1c1a17] rounded-[1rem] px-10 py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <span className="block font-mono text-[0.62rem] tracking-[0.2em] uppercase text-[#c8a96e] mb-2">
            Newsletter
          </span>
          <h3 className="font-display font-extralight text-[1.75rem] leading-[1.15] text-[#eae6e0]">
            Quiet dispatches
            <br />
            <em className="italic text-[rgba(234,230,224,0.38)]">
              from the field
            </em>
          </h3>
          <p className="text-[0.94rem] text-[rgba(234,230,224,0.45)] mt-1">
            New work and process notes, sent sparingly. Never sold.
          </p>
        </div>
        <form
          className="flex flex-col gap-2 min-w-0 w-full md:w-auto md:min-w-[270px]"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex border-b border-[rgba(234,230,224,0.2)] pb-0">
            <input
              type="email"
              placeholder="your@email.com"
              autoComplete="email"
              className="flex-1 bg-transparent border-none outline-none py-[0.7rem] font-[family-name:var(--font-body)] text-[1rem] text-[#eae6e0] placeholder:text-[rgba(234,230,224,0.28)] placeholder:italic min-w-0"
            />
            <button
              type="submit"
              className="font-mono text-[0.62rem] tracking-[0.12em] uppercase text-[rgba(234,230,224,0.38)] pl-3 bg-transparent border-none cursor-pointer transition-colors hover:text-[#c8a96e] whitespace-nowrap"
            >
              Subscribe →
            </button>
          </div>
          <p className="font-mono text-[0.56rem] tracking-[0.06em] text-[rgba(234,230,224,0.2)]">
            No spam. Unsubscribe any time.
          </p>
        </form>
      </div>
    </div>
  );
}
