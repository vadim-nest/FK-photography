// src/pages/blog/@slug/+Page.jsx
import React, { useMemo, useEffect, useRef } from "react";
import { useData } from "vike-react/useData";
import { navigate } from "vike/client/router";
import LightboxProvider from "@/providers/LightboxProvider.jsx";
import { BodyWithLightbox } from "@/components/BodyWithLightbox.jsx";

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getReadingTime(blocks) {
  if (!blocks || !Array.isArray(blocks)) return "1 min";
  let wordCount = 0;
  for (const block of blocks) {
    if (block._type === "block" && block.children) {
      block.children.forEach((child) => {
        if (child.text) wordCount += child.text.trim().split(/\s+/).length;
      });
    }
  }
  return `${Math.ceil(wordCount / 200)} min`;
}

function go(e, to) {
  if (e.defaultPrevented) return;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
    return;
  e.preventDefault();
  navigate(to);
}

function useReveal(threshold = 0.06) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

// ─────────────────────────────────────────────
// CATEGORY PILL
// ─────────────────────────────────────────────

const CAT_COLOURS = {
  blog: {
    text: "text-[#7a5838]",
    border: "border-[rgba(122,88,56,0.3)]",
    bg: "bg-[rgba(122,88,56,0.06)]",
  },
  news: {
    text: "text-[#2a6a50]",
    border: "border-[rgba(42,106,80,0.3)]",
    bg: "bg-[rgba(42,106,80,0.06)]",
  },
  essay: {
    text: "text-[#5848a0]",
    border: "border-[rgba(88,72,160,0.3)]",
    bg: "bg-[rgba(88,72,160,0.06)]",
  },
};

function CategoryPill({ post, className = "" }) {
  const label = post?.category ?? post?.categories?.[0]?.title ?? null;

  if (!label) return null;

  const colours = CAT_COLOURS[label.toLowerCase()] ?? {
    text: "text-[#9e9890]",
    border: "border-[#cec8c0]",
    bg: "bg-transparent",
  };

  return (
    <span
      className={[
        "inline-block font-mono text-[0.54rem] tracking-[0.16em] uppercase",
        "px-[0.55rem] py-[0.22rem] border",
        colours.text,
        colours.border,
        colours.bg,
        className,
      ].join(" ")}
    >
      {label}
    </span>
  );
}

// ─────────────────────────────────────────────
// NEWSLETTER — end of post
// ─────────────────────────────────────────────

function NewsletterEnd() {
  return (
    <div className="bg-[#0f0e0d] py-14 px-6 lg:px-12 w-[100vw] mt-10">
      <div className="w-7xl max-w-full mx-auto">
        <div className="max-w-2xl">
          <span className="font-mono text-[0.58rem] tracking-[0.22em] uppercase text-[#c8a96e] block mb-3">
            Newsletter
          </span>
          <h3 className="font-display font-light text-[1.8rem] leading-[1.15] text-[#f2ede6] mb-2">
            Enjoyed this
            <br />
            <em
              className="italic text-[rgba(242,237,230,0.4)]"
              style={{ fontVariationSettings: "'wdth' 85" }}
            >
              story?
            </em>
          </h3>
          <p className="text-[0.9rem] text-[rgba(242,237,230,0.45)] mb-8">
            Get new work, field notes, and behind-the-lens writing — sent a few
            times a year.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex border-b border-[rgba(242,237,230,0.2)] mb-3 pb-2 max-w-md"
          >
            <input
              type="email"
              placeholder="your@email.com"
              autoComplete="email"
              className="flex-1 bg-transparent border-none outline-none font-[family-name:var(--font-body)] text-[0.95rem] text-[#f2ede6] placeholder:text-[rgba(242,237,230,0.3)] placeholder:italic"
            />
            <button
              type="submit"
              className="bg-transparent border-none cursor-pointer font-mono text-[0.6rem] tracking-[0.14em] uppercase text-[rgba(242,237,230,0.4)] pl-4 transition-colors hover:text-[#c8a96e] whitespace-nowrap"
            >
              Subscribe →
            </button>
          </form>
          <p className="font-mono text-[0.57rem] tracking-[0.06em] text-[rgba(242,237,230,0.2)]">
            No spam. Unsubscribe any time.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// RECENT POSTS
// ─────────────────────────────────────────────

function RecentPosts({ posts = [] }) {
  const navGo = React.useCallback((e, to) => go(e, to), []);

  if (!posts.length) return null;

  return (
    <div className="w-7xl max-w-full mx-auto px-6 lg:px-12 py-16">
      <div className="flex justify-between items-baseline mb-8 pb-4 border-b border-[#cec8c0]">
        <h3 className="font-display font-light text-[1.3rem] text-[#1c1a17]">
          Recent posts
        </h3>
        <a
          href="/blog"
          onClick={(e) => navGo(e, "/blog")}
          className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-[#9e9890] hover:text-[#8b6f4e] transition-colors no-underline"
        >
          View all →
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.slice(0, 3).map((p) => {
          const href = `/blog/${p.slug}`;
          return (
            <a
              key={p._id || p.slug}
              href={href}
              onClick={(e) => navGo(e, href)}
              className="group block bg-[#eae6e0] hover:bg-[#cec8c0] rounded-[1rem] overflow-hidden transition-colors no-underline"
            >
              <div className="w-full aspect-[16/9] overflow-hidden">
                <div className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.04]">
                  {p.heroImage ? (
                    <img
                      src={p.heroImage?.url}
                      alt={p.heroImage?.alt || p.title || ""}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#8090b0] to-[#607090]" />
                  )}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <CategoryPill
                    post={p}
                    className="!text-[0.5rem] !px-[0.4rem] !py-[0.15rem]"
                  />
                  <span className="font-mono text-[0.57rem] tracking-[0.08em] text-[#9e9890]">
                    {formatDate(p.publishedAt || p._createdAt)}
                  </span>
                </div>
                <p className="font-display font-light text-[1.15rem] leading-[1.3] text-[#1c1a17]">
                  {p.title}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// "YOUR VIEW"
// ─────────────────────────────────────────────

function YourView() {
  const ref = useReveal();
  return (
    <section
      ref={ref}
      className="reveal-block mt-10 pt-10 border-t border-[#cec8c0]"
    >
      <h2 className="font-display font-light text-[1.5rem] tracking-[-0.01em] text-[#1c1a17] mb-1">
        Your View
      </h2>
      <p className="text-[0.9rem] text-[#9e9890] mb-6">
        Add your perspective to the narrative.
      </p>
      <div className="space-y-4 max-w-md">
        <div>
          <label className="block font-mono text-[0.58rem] tracking-[0.14em] uppercase text-[#9e9890] mb-1">
            Name
          </label>
          <input
            type="text"
            placeholder="Your name"
            className="w-full bg-transparent border-b border-[#cec8c0] py-2 font-[family-name:var(--font-body)] text-[0.95rem] text-[#1c1a17] placeholder:text-[#cec8c0] outline-none focus:border-[#8b6f4e] transition-colors"
          />
        </div>
        <div>
          <label className="block font-mono text-[0.58rem] tracking-[0.14em] uppercase text-[#9e9890] mb-1">
            Questions, comments, or feedback?
          </label>
          <textarea
            rows={3}
            placeholder="Your thoughts..."
            className="w-full bg-transparent border-b border-[#cec8c0] py-2 font-[family-name:var(--font-body)] text-[0.95rem] text-[#1c1a17] placeholder:text-[#cec8c0] outline-none focus:border-[#8b6f4e] transition-colors resize-none"
          />
        </div>
        <button
          onClick={(e) => e.preventDefault()}
          className="font-mono text-[0.62rem] tracking-[0.13em] uppercase px-5 py-2.5 border border-[#8b6f4e] rounded-[3px] text-[#8b6f4e] hover:bg-[#8b6f4e] hover:text-[#eae6e0] transition-colors duration-200 cursor-pointer bg-transparent"
        >
          Submit →
        </button>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────

export default function PostPage() {
  const { post, recentPosts = [] } = useData();

  const readTime = useMemo(() => getReadingTime(post?.body), [post?.body]);
  const dateStr = formatDate(post?.publishedAt || post?._createdAt);

  const navGo = React.useCallback((e, to) => go(e, to), []);

  if (!post) {
    return (
      <main id="main" className="max-w-4xl mx-auto px-6 lg:px-12 py-20">
        <h1 className="font-display font-light text-[2rem] text-[#1c1a17]">
          Post not found
        </h1>
        <p className="mt-2 text-[#57524d]">
          This post may have been unpublished.
        </p>
      </main>
    );
  }

  return (
    <LightboxProvider>
      <main id="main" className="overflow-x-hidden pb-32">
        {/* ── HEADER ── */}
        <header className="w-3xl max-w-full mx-auto px-6 lg:px-12 pt-24 pb-8">
          <a
            href="/blog"
            onClick={(e) => navGo(e, "/blog")}
            className="inline-flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.14em] uppercase text-[#9e9890] hover:text-[#1c1a17] transition-colors mb-10 no-underline"
          >
            ← Journal
          </a>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <CategoryPill post={post} />
            {dateStr && (
              <span className="font-mono text-[0.6rem] tracking-[0.12em] text-[#9e9890]">
                {dateStr}
              </span>
            )}
            {readTime && (
              <>
                <span className="text-[#cec8c0]">·</span>
                <span className="font-mono text-[0.6rem] tracking-[0.12em] text-[#9e9890]">
                  {readTime}
                </span>
              </>
            )}
            {post.views && (
              <>
                <span className="text-[#cec8c0]">·</span>
                <span className="font-mono text-[0.6rem] tracking-[0.12em] text-[#9e9890]">
                  {post.views} views
                </span>
              </>
            )}
          </div>

          <h1 className="font-display font-light text-[#1c1a17] mb-6 tracking-[-0.01em] leading-[1.05] text-[clamp(2.4rem,5vw,4rem)]">
            {post.title}
          </h1>
        </header>

        {/* ── BODY ── */}
        <article className="w-7xl max-w-full mx-auto px-6 lg:px-12 mb-16">
          <div className="article-body prose prose-zinc max-w-none">
            <BodyWithLightbox blocks={post.body} />
          </div>
        </article>

        {/* ── TAGS ── */}
        {post.tags?.length > 0 && (
          <div className="w-7xl max-w-full mx-auto px-6 lg:px-12 pt-6 pb-8 border-t border-[#cec8c0] flex gap-2 flex-wrap">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[0.57rem] tracking-[0.12em] uppercase px-[0.7rem] py-[0.3rem] border border-[#cec8c0] text-[#9e9890] transition-colors cursor-pointer hover:border-[#1c1a17] hover:text-[#1c1a17]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* ── NEWSLETTER ── */}
        <NewsletterEnd />

        {/* ── RECENT POSTS ── */}
        <RecentPosts posts={recentPosts} />

        {/* ── COMMENTS (YOUR VIEW) ── */}
        <div className="w-7xl max-w-full mx-auto px-6 lg:px-12">
          <YourView />
        </div>
      </main>

      <style>{`
        .article-body > p, 
        .article-body > h2, 
        .article-body > h3, 
        .article-body > ul, 
        .article-body > ol,
        .article-body > blockquote {
          max-width: 42rem;
          margin-left: auto;
          margin-right: auto;
        }

        /* Make single images and the Bento Gallery wider than the text */
        .article-body figure, 
        .article-body img,
        .article-body .bento-gallery {
          max-width: 64rem; /* Spans slightly wider than the prose */
          margin-left: auto;
          margin-right: auto;
          display: block;
        }

        .reveal-block { opacity: 0; transform: translateY(16px); transition: opacity 0.8s ease, transform 0.8s ease; }
        .reveal-block.revealed { opacity: 1; transform: translateY(0); }
      `}</style>
    </LightboxProvider>
  );
}
