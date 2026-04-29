import React, { useMemo } from "react";
import { useData } from "vike-react/useData";
import { navigate } from "vike/client/router";
import LightboxProvider from "@/providers/LightboxProvider.jsx";
import { BodyWithLightbox } from "@/components/BodyWithLightbox.jsx";
import { Newsletter } from "@/components/ui/Newsletter.jsx";
import { YourView } from "@/components/ui/YourView.jsx";
import { CategoryPill } from "@/components/journal/CategoryPill.jsx";
import { JournalCard } from "@/components/journal/JournalCard";
import { ContactNudge } from "@/components/contact/ContactNudge.jsx";
import { sameHeightGridColumns } from "@/lib/utils";

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
  if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
    return;
  e.preventDefault();
  navigate(to);
}

function RecentJournalEntries({ posts = [] }) {
  if (!posts.length) return null;

  const displayPosts = posts.slice(0, 3);
  const columns = sameHeightGridColumns(displayPosts, (post) => {
    const image = post?.image || post?.heroImage || post?.coverImage;
    return image?.asset?.metadata?.dimensions?.aspectRatio;
  });

  return (
    <section className="w-7xl max-w-full mx-auto px-6 lg:px-12 py-16">
      <div className="flex justify-between items-baseline mb-8 pb-4 border-b border-[#cec8c0]">
        <h3 className="font-display font-light text-[1.3rem] text-[#1c1a17]">
          Recent journal entries
        </h3>
        <a
          href="/journal"
          onClick={(e) => go(e, "/journal")}
          className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-[#9e9890] hover:text-[#8b6f4e] transition-colors no-underline"
        >
          View all -&gt;
        </a>
      </div>
      <div
        className="recent-journal-grid grid grid-cols-1 gap-8 items-start"
        style={{ "--recent-journal-columns": columns }}
      >
        {displayPosts.map((post) => (
          <JournalCard key={post._id || post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}

export default function JournalEntryPage() {
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
            href="/journal"
            onClick={(e) => go(e, "/journal")}
            className="inline-flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.14em] uppercase text-[#9e9890] hover:text-[#1c1a17] transition-colors mb-10 no-underline"
          >
            &lt;- Journal
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
                <span className="text-[#cec8c0]">/</span>
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

        <ContactNudge
          title="Want Faruk to photograph something unfolding?"
          description="For commissions, performance coverage, or documentary access, send a direct note with the story, date, and setting."
          className="mt-8"
        />

        <Newsletter />
        <RecentJournalEntries posts={recentPosts} />

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
          display: block;
        }

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

        @media (min-width: 768px) {
          .recent-journal-grid {
            grid-template-columns: var(--recent-journal-columns);
          }
        }
      `}</style>
    </LightboxProvider>
  );
}
