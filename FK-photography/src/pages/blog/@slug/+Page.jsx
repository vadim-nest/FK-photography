import React, { useMemo } from "react";
import { useData } from "vike-react/useData";
import { navigate } from "vike/client/router";
import LightboxProvider from "@/providers/LightboxProvider.jsx";
import { BodyWithLightbox } from "@/components/BodyWithLightbox.jsx";
import { Newsletter } from "@/components/ui/Newsletter.jsx";
import { YourView } from "@/components/ui/YourView.jsx";
import { CategoryPill } from "@/components/blog/CategoryPill.jsx";

// HELPERS
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
      block.children.forEach((c) => {
        if (c.text) wordCount += c.text.trim().split(/\s+/).length;
      });
    }
  }
  return `${Math.ceil(wordCount / 200)} min`;
}

function go(e, to) {
  if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
    return;
  e.preventDefault();
  navigate(to);
}

// RECENT POSTS (Kept internal for now since it maps specific layout)
function RecentPosts({ posts = [] }) {
  if (!posts.length) return null;
  return (
    <div className="w-7xl max-w-full mx-auto px-6 lg:px-12 py-16">
      <div className="flex justify-between items-baseline mb-8 pb-4 border-b border-[#cec8c0]">
        <h3 className="font-display font-light text-[1.3rem] text-[#1c1a17]">
          Recent posts
        </h3>
        <a
          href="/blog"
          onClick={(e) => go(e, "/blog")}
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
              onClick={(e) => go(e, href)}
              className="group block bg-[#eae6e0] hover:bg-[#cec8c0] rounded-[1rem] overflow-hidden transition-colors no-underline"
            >
              <div className="w-full aspect-[16/9] overflow-hidden">
                <div className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.04]">
                  {p.heroImage ? (
                    <img
                      src={p.heroImage?.url}
                      alt=""
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

// MAIN PAGE
export default function PostPage() {
  const { post, recentPosts = [] } = useData();
  const readTime = useMemo(() => getReadingTime(post?.body), [post?.body]);
  const dateStr = formatDate(post?.publishedAt || post?._createdAt);

  if (!post) {
    return (
      <main id="main" className="max-w-4xl mx-auto px-6 lg:px-12 py-20">
        <h1 className="font-display font-light text-[2rem]">Post not found</h1>
      </main>
    );
  }

  return (
    <LightboxProvider>
      <main id="main" className="overflow-x-hidden pb-32">
        <header className="w-3xl max-w-full mx-auto px-6 lg:px-12 pt-24 pb-8">
          <a
            href="/blog"
            onClick={(e) => go(e, "/blog")}
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
          </div>
          <h1 className="font-display font-light text-[#1c1a17] mb-6 tracking-[-0.01em] leading-[1.05] text-[clamp(2.4rem,5vw,4rem)]">
            {post.title}
          </h1>
        </header>

        <article className="w-[100rem] max-w-full mx-auto px-6 lg:px-12 mb-16">
          <div className="article-body prose prose-zinc max-w-none">
            <BodyWithLightbox blocks={post.body} />
          </div>
        </article>

        {post.tags?.length > 0 && (
          <div className="w-7xl max-w-full mx-auto px-6 lg:px-12 pt-6 pb-8 border-t border-[#cec8c0] flex gap-2 flex-wrap">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[0.57rem] tracking-[0.12em] uppercase px-[0.7rem] py-[0.3rem] border border-[#cec8c0] text-[#9e9890] hover:border-[#1c1a17] hover:text-[#1c1a17] cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <Newsletter />
        <RecentPosts posts={recentPosts} />

        <div className="w-7xl max-w-full mx-auto px-6 lg:px-12">
          <YourView />
        </div>
      </main>

      <style>{`
        .article-body > p, .article-body > h2, .article-body > h3, 
        .article-body > ul, .article-body > ol, .article-body > blockquote,
        .article-body figure, .article-body img {
          max-width: 42rem;
          margin-left: auto;
          margin-right: auto;
          display: block; /* Required for single images to align correctly */
        }

        /* Make ONLY the Bento Gallery wider than the text */
        .article-body figure, 
        .article-body img,
        .article-body .bento-gallery {
          max-width: 64rem;
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
