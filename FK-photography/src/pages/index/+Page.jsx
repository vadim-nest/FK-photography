// src/pages/index/+Page.jsx
import React from "react";
import { useData } from "vike-react/useData";
import { SmartImage } from "@/components/media/SmartImage.jsx";
import { Newsletter } from "@/components/ui/Newsletter.jsx";
import { urlFor } from "@/lib/sanity/image";
import { normalizeAspectRatio, sameHeightGridColumns } from "@/lib/utils";

const FALLBACK_INTRO =
  "Cambridge-based photography shaped by atmosphere, movement, and the quiet tension of unscripted moments.";

const DEFAULT_SECTIONS = [
  {
    title: "Documentary",
    smallText:
      "Interested in the people and how they connect with their environment.",
    href: "/documentary-photography",
    layout: "documentary",
  },
  {
    title: "Performance",
    smallText: "Inject humour and playfulness... where narrative demands.",
    href: "/live-performance-photography",
    layout: "performance",
  },
  {
    title: "Journal",
    smallText: "Recording Cambridge in both town and gown.",
    href: "/journal",
    layout: "journal",
  },
];

function blockToPlainText(block) {
  if (!block?.children) return "";
  return block.children.map((child) => child.text ?? "").join("");
}

function sectionHref(section) {
  return section?.href || "#";
}

function SectionHeading({ section }) {
  const smallText = section.smallText || section.eyebrow;

  return (
    <a
      href={sectionHref(section)}
      className="group block max-w-2xl no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b6f4e]"
    >
      {smallText && (
        <p className="mb-3 text-[0.95rem] leading-[1.35] text-[#1c1a17]">
          {smallText}
        </p>
      )}
      <h2 className="font-display text-[clamp(2rem,4vw,3.3rem)] font-light leading-[0.95] tracking-normal text-[#1c1a17] transition-colors group-hover:text-[#8b6f4e]">
        {section.title} <span aria-hidden="true">&rarr;</span>
      </h2>
    </a>
  );
}

function plainExcerpt(excerpt) {
  if (!Array.isArray(excerpt)) return excerpt || "";
  return excerpt
    .map((block) => blockToPlainText(block))
    .filter(Boolean)
    .join(" ");
}

function journalHref(entry) {
  if (entry?._type === "news") return entry.externalLink || "/journal";
  if (entry?._type === "documentaryProject") {
    return entry.slug ? `/documentary-photography/${entry.slug}` : "/journal";
  }
  return entry?.slug ? `/journal/${entry.slug}` : "/journal";
}

function journalLabel(entry) {
  if (entry?._type === "news") return "News";
  if (entry?._type === "documentaryProject") return "Essay";
  return "Journal";
}

function formatJournalDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function ImageTile({ image, title, className = "", priority = false }) {
  if (!image?.asset) {
    return (
      <div
        className={`flex min-h-44 items-center justify-center rounded-[0.75rem] bg-[#d8d4ce] ${className}`}
      >
        <span className="px-6 text-center font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[#9e9890]">
          {title || "Image"}
        </span>
      </div>
    );
  }

  return (
    <SmartImage
      image={image}
      alt={image.alt || image.caption || title || ""}
      sizes="(max-width: 767px) 100vw, 50vw"
      className={`rounded-[0.75rem] ${className}`}
      priority={priority}
    />
  );
}

function JournalImageTile({ image, title }) {
  const meta = image?.asset?.metadata || {};
  const ratio = normalizeAspectRatio(meta.dimensions?.aspectRatio);
  const lqip = meta?.lqip;

  if (!image?.asset) {
    return (
      <div className="home-journal-image flex items-center justify-center rounded-[0.75rem] bg-[#d8d4ce]">
        <span className="px-6 text-center font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[#9e9890]">
          {title || "Image"}
        </span>
      </div>
    );
  }

  const base = urlFor(image).auto("format").fit("max");
  const src = base.height(620).url();
  const srcSet = [320, 480, 620, 820]
    .map((h) => `${base.height(h).url()} ${Math.round(h * ratio)}w`)
    .join(", ");

  return (
    <div
      className="home-journal-image relative overflow-hidden rounded-[0.75rem] bg-contain bg-center bg-no-repeat"
      style={{
        "--journal-image-ratio": ratio,
        aspectRatio: ratio,
        backgroundImage: lqip ? `url(${lqip})` : undefined,
      }}
    >
      <img
        src={src}
        srcSet={srcSet}
        sizes="(max-width: 767px) calc(100vw - 3rem), 30vw"
        alt={image.alt || image.caption || title || ""}
        loading="lazy"
        decoding="async"
        className="block h-full w-full rounded-[inherit] object-contain"
        style={{ borderRadius: "0.75rem" }}
      />
    </div>
  );
}

function DocumentarySection({ section }) {
  const images = section.images ?? [];

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24">
      <SectionHeading section={section} />
      <a
        href={sectionHref(section)}
        className="mt-6 grid min-w-0 gap-5 overflow-hidden no-underline md:grid-cols-[minmax(0,1.55fr)_minmax(0,0.95fr)]"
      >
        <ImageTile
          image={images[0]}
          title={section.title}
          className="w-full min-w-0 aspect-[1.48]"
        />
        <div className="grid min-w-0 gap-5">
          <ImageTile
            image={images[1]}
            title={section.title}
            className="w-full min-w-0 aspect-[1.48]"
          />
          <ImageTile
            image={images[2]}
            title={section.title}
            className="w-full min-w-0 aspect-[1.48]"
          />
        </div>
      </a>
    </section>
  );
}

function PerformanceSection({ section }) {
  const images = section.images ?? [];
  const displayImages = [images[0], images[1]];
  const columns = sameHeightGridColumns(
    displayImages,
    (image) => image?.asset?.metadata?.dimensions?.aspectRatio,
  );

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24">
      <SectionHeading section={section} />
      <a
        href={sectionHref(section)}
        className="home-performance-grid mt-6 grid min-w-0 grid-cols-1 gap-5 no-underline"
        style={{ "--performance-columns": columns }}
      >
        <ImageTile
          image={images[0]}
          title={section.title}
          className="w-full"
        />
        <ImageTile
          image={images[1]}
          title={section.title}
          className="w-full"
        />
      </a>
    </section>
  );
}

function JournalSection({ section, entries = [] }) {
  const items = entries.length > 0 ? entries : [];
  const displayItems = items.length ? items : [null, null, null];
  const columns = sameHeightGridColumns(
    displayItems,
    (entry) => entry?.image?.asset?.metadata?.dimensions?.aspectRatio,
  );

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24">
      <SectionHeading section={section} />
      <div
        className="home-journal-grid mt-8 grid grid-cols-1 items-start gap-6"
        style={{ "--journal-columns": columns }}
      >
        {displayItems.map((entry, index) => {
          const image = entry?.image;
          const imageRatio = normalizeAspectRatio(
            image?.asset?.metadata?.dimensions?.aspectRatio,
          );
          const href = entry ? journalHref(entry) : sectionHref(section);
          const date = formatJournalDate(entry?.publishedAt);
          const isExternal = entry?._type === "news" && entry.externalLink;

          return (
            <a
              key={entry?._id || index}
              href={href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="group block min-w-0 no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b6f4e]"
              style={{ "--journal-image-ratio": imageRatio }}
            >
              <div className="mb-3 flex items-center justify-between font-mono text-[0.55rem] tracking-[0.08em] text-[#1c1a17]">
                <span>{entry ? journalLabel(entry) : "Journal"}</span>
                <span>{date}</span>
              </div>
              <JournalImageTile image={image} title={entry?.title || section.title} />
              <h3 className="mt-4 text-[1.08rem] leading-[1.25] text-[#1c1a17] transition-colors group-hover:text-[#8b6f4e]">
                {entry?.title || section.title}
              </h3>
              {entry?.excerpt && (
                <p className="mt-3 text-[0.85rem] leading-[1.55] text-[#57524d]">
                  {plainExcerpt(entry.excerpt)}
                </p>
              )}
            </a>
          );
        })}
      </div>
    </section>
  );
}

function FeatureSection({ section, index, latestJournal }) {
  const layout = section.layout || DEFAULT_SECTIONS[index]?.layout;
  if (layout === "performance") return <PerformanceSection section={section} />;
  if (layout === "journal") {
    return <JournalSection section={section} entries={latestJournal} />;
  }
  return <DocumentarySection section={section} />;
}

function ContactWidget({ contact }) {
  const details = contact ?? {};
  const title = details.title || "Have a story in mind?";
  const description =
    details.description ||
    "For commissions, collaborations, prints, or performance coverage, send a note and we can start there.";
  const email = details.email;
  const linkText = details.linkText || "Start a conversation";

  return (
    <section className="bg-[#1c1a17] px-6 py-16 text-[#f2ede6] lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_1.15fr] md:items-end">
        <div>
          <span className="mb-4 block font-mono text-[0.58rem] uppercase tracking-[0.22em] text-[#c8a96e]">
            Contact
          </span>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-light leading-[1] tracking-normal">
            {title}
          </h2>
        </div>
        <div className="max-w-xl md:justify-self-end">
          <p className="mb-7 text-[1rem] leading-[1.75] text-[rgba(242,237,230,0.62)]">
            {description}
          </p>
          {email && (
            <a
              href={`mailto:${email}`}
              className="inline-flex border-b border-[#c8a96e] pb-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#f2ede6] transition-colors hover:text-[#c8a96e]"
            >
              {linkText} &rarr;
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  const { homepage, latestJournal = [] } = useData();
  const mainImage = homepage?.headerImage?.asset ? homepage.headerImage : null;
  const quoteText = homepage?.quoteText;
  const quoteAuthor = homepage?.quoteAuthor;
  const heading = homepage?.heading || "Faruk Kara photography";
  const intro = homepage?.intro || FALLBACK_INTRO;
  const sections =
    homepage?.featureSections?.length > 0
      ? homepage.featureSections
      : DEFAULT_SECTIONS;
  const newsletter = homepage?.newsletterWidget ?? {};

  return (
    <main id="main" className="overflow-x-hidden">
      <section className="home-hero relative mx-auto flex h-[calc(100svh-3.5rem+2.75rem)] max-w-[94rem] flex-col overflow-hidden px-6 pb-[2.75rem] pt-6 lg:px-12 lg:pt-8">
        <header className="home-hero-header shrink-0">
          <h1 className="font-display text-[clamp(2rem,5vw,5.2rem)] font-light leading-[0.95] tracking-normal text-[#1c1a17]">
            {heading}
          </h1>
        </header>

        <div className="home-hero-content grid min-h-0 flex-1 grid-cols-1 content-start gap-6 py-5 md:grid-cols-[0.56fr_1.44fr] md:items-start lg:gap-12">
          <div className="home-hero-intro max-w-md md:pt-3">
            <p className="text-[clamp(0.92rem,1.4vw,1.08rem)] leading-[1.65] text-[#57524d]">
              {intro}
            </p>
          </div>

          <div className="home-hero-media min-h-0 md:justify-self-end">
            {mainImage ? (
              <SmartImage
                image={mainImage}
                alt={mainImage.alt || mainImage.caption || ""}
                sizes="(max-width: 767px) 100vw, 66vw"
                className="home-hero-image mx-auto w-full max-w-[900px] rounded-[0.75rem] md:mx-0"
                radius="0.75rem"
                priority
              />
            ) : (
              <div className="home-hero-image w-full max-w-[900px] rounded-[0.75rem] bg-[#d8d4ce]" />
            )}
          </div>
        </div>

        {quoteText && (
          <blockquote className="home-hero-quote mx-auto mt-auto max-w-[26ch] shrink-0 text-center font-display text-[clamp(1.2rem,2vw,2.5rem)] font-light leading-[1.08] tracking-normal text-[#1c1a17] md:max-w-[30ch]">
            <p>{quoteText}</p>
            {quoteAuthor && (
              <footer className="mt-3 font-sans text-[clamp(0.68rem,0.85vw,0.82rem)] leading-none tracking-[0.14em] text-[#57524d]">
                {quoteAuthor}
              </footer>
            )}
          </blockquote>
        )}
      </section>

      <div className="border-t border-[#d8d4ce]">
        {sections.map((section, index) => (
          <FeatureSection
            key={section._key || section.title || index}
            section={{ ...DEFAULT_SECTIONS[index], ...section }}
            index={index}
            latestJournal={latestJournal}
          />
        ))}
      </div>

      <ContactWidget contact={homepage?.contactWidget} />
      <Newsletter
        tag={newsletter.tag}
        title={newsletter.title || "Quiet dispatches"}
        italicTitle={newsletter.italicTitle || "from the field"}
        description={newsletter.description || "New work and process notes, sent sparingly."}
        className="m-0"
      />

      <style>{`
        .home-hero-image {
          aspect-ratio: 1.5;
          --hero-image-max-height: clamp(16rem, calc(100svh - 17rem), 37.5rem);
          width: min(100%, 900px, calc(var(--hero-image-max-height) * 1.5));
        }

        .home-hero-quote {
          transform: translateY(1.3rem);
        }

        .home-journal-image {
          width: 100%;
        }

        @media (min-width: 768px) {
          .home-performance-grid {
            grid-template-columns: var(--performance-columns);
          }

          .home-journal-grid {
            grid-template-columns: var(--journal-columns);
          }
        }

        @media (max-height: 760px) {
          .home-hero {
            padding-top: 1rem;
            padding-bottom: 2.75rem;
          }

          .home-hero-image {
            --hero-image-max-height: clamp(13rem, calc(100svh - 18rem), 31rem);
          }

          .home-hero-quote {
            transform: translateY(1rem);
          }
        }

        @media (max-height: 620px) {
          .home-hero-image {
            --hero-image-max-height: clamp(11rem, calc(100svh - 17rem), 22rem);
          }
        }

        @media (min-width: 768px) and (max-height: 680px) {
          .home-hero {
            display: grid;
            grid-template-columns: minmax(18rem, 0.58fr) minmax(0, 1.42fr);
            grid-template-rows: minmax(0, 1fr) auto;
            column-gap: 2rem;
            padding-top: 1rem;
            padding-bottom: 2.75rem;
          }

          .home-hero-header {
            grid-column: 1;
            grid-row: 1;
            align-self: start;
          }

          .home-hero-header h1 {
            font-size: clamp(2rem, 5.4vh, 3.1rem);
          }

          .home-hero-content {
            display: contents;
          }

          .home-hero-intro {
            grid-column: 1;
            grid-row: 1;
            align-self: end;
            padding-top: 0;
            padding-bottom: 1.25rem;
          }

          .home-hero-media {
            grid-column: 2;
            grid-row: 1;
            align-self: start;
            justify-self: end;
            min-height: 0;
          }

          .home-hero-image {
            --hero-image-max-height: clamp(13rem, calc(100svh - 10rem), 31rem);
          }

          .home-hero-quote {
            grid-column: 1 / -1;
            grid-row: 2;
          }
        }

        @media (max-width: 767px) {
          .home-hero {
            height: auto;
            min-height: calc(100svh - 3.5rem);
            overflow: visible;
            padding-bottom: 1rem;
          }

          .home-hero-quote {
            transform: none;
          }

          .home-hero-image {
            width: 100%;
          }

          .home-journal-image {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}
