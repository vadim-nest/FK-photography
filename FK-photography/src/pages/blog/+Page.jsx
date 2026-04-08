import React from "react";
import { useData } from "vike-react/useData";
import { BlogCard } from "@/components/blog/BlogCard";
import { Newsletter } from "@/components/ui/Newsletter.jsx";

export default function BlogIndex() {
  const { posts = [] } = useData();

  if (!posts.length)
    return (
      <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-[#9e9890] py-20 text-center">
        No posts yet.
      </p>
    );

  return (
    <>
      <div className="w-7xl max-w-full mx-auto px-12 pb-20 pt-0">
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
                in town & gown
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 items-start">
          <div className="flex flex-col gap-16">
            {posts
              .filter((_, i) => i % 2 === 0)
              .map((post) => (
                <BlogCard key={post._id || post.slug} post={post} />
              ))}
          </div>
          <div className="flex flex-col gap-16 mt-0 md:mt-32">
            {posts
              .filter((_, i) => i % 2 === 1)
              .map((post) => (
                <BlogCard key={post._id || post.slug} post={post} />
              ))}
          </div>
        </div>
      </div>

      {/* REUSED NEWSLETTER COMPONENT */}
      <Newsletter
        title="Quiet dispatches"
        italicTitle="from the field"
        description="New work and process notes, sent sparingly. Never sold."
      />
    </>
  );
}
