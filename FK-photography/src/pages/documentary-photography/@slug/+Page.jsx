import React, { useEffect, useRef, useMemo, useCallback } from "react";
import { useData } from "vike-react/useData";
import { navigate } from "vike/client/router";
import LightboxProvider from "@/providers/LightboxProvider.jsx";
import { useLightbox } from "@/hooks/useLightbox.js";
import { YourView } from "@/components/ui/YourView.jsx";
import { Newsletter } from "@/components/ui/Newsletter.jsx";

function go(e, to) {
  if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
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
// PHOTO — base image component
// ─────────────────────────────────────────────

function Photo({
  image,
  onClick,
  className = "",
  sizes = "100vw",
  priority = false,
}) {
  if (!image?.url) return null;

  return (
    <figure className={["group", className].join(" ")}>
      <div
        className="overflow-hidden rounded-[1rem] cursor-zoom-in"
        onClick={() => onClick?.(image)}
      >
        <img
          src={image.url}
          alt={image.alt || ""}
          className="w-full h-auto block rounded-[inherit]"
          style={{ borderRadius: "1rem" }}
          loading={priority ? "eager" : "lazy"}
          sizes={sizes}
        />
      </div>
      {(image.caption || image.location) && (
        <figcaption className="mt-2 flex items-center justify-between gap-4">
          {image.caption && (
            <span className="font-mono text-[0.6rem] tracking-[0.1em] text-[#9e9890]">
              {image.caption}
            </span>
          )}
          {image.location && (
            <span className="font-mono text-[0.58rem] tracking-[0.08em] text-[#9e9890] shrink-0">
              {image.location}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}

// ─────────────────────────────────────────────
// PULL QUOTE
// ─────────────────────────────────────────────

function PullQuote({ text, attribution }) {
  if (!text) return null;
  return (
    <blockquote className="my-4 lg:my-0">
      <p
        className={[
          "font-display font-light italic",
          "text-[clamp(1rem,2vw,1.3rem)]",
          "leading-[1.5] tracking-[-0.005em]",
          "text-[#1c1a17]",
          "border-l-2 border-[#c8a96e] pl-5 mb-3",
        ].join(" ")}
        style={{ fontVariationSettings: "'wdth' 85" }}
      >
        "{text}"
      </p>
      {attribution && (
        <cite className="not-italic font-mono text-[0.58rem] tracking-[0.12em] uppercase text-[#9e9890] pl-5">
          — {attribution}
        </cite>
      )}
    </blockquote>
  );
}

// ─────────────────────────────────────────────
// ROW LAYOUTS
// ─────────────────────────────────────────────

// ORIGINAL: Restored old width styling
function RowSolo({ images, pullQuote, onImageClick }) {
  return (
    <div className="space-y-3 w-7xl max-w-full">
      <Photo
        image={images[0]}
        onClick={onImageClick}
        sizes="(min-width:1024px) 860px, 100vw"
        priority={false}
      />
      {pullQuote?.text && (
        <div className="max-w-lg mx-auto mt-6 text-center">
          <PullQuote
            text={pullQuote.text}
            attribution={pullQuote.attribution}
          />
        </div>
      )}
    </div>
  );
}

// NEW: 65% / 35% ratio, bottom-aligned like the HTML
function RowDominant({ images, pullQuote, onImageClick }) {
  const [main, ...rest] = images;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[65fr_35fr] gap-4 lg:gap-6 items-end">
      <Photo
        image={main}
        onClick={onImageClick}
        sizes="(min-width:1024px) 65vw, 100vw"
      />
      <div className="flex flex-col gap-4 lg:gap-6">
        {rest.slice(0, 2).map((img, i) => (
          <Photo
            key={i}
            image={img}
            onClick={onImageClick}
            sizes="(min-width:1024px) 35vw, 100vw"
          />
        ))}
        {pullQuote?.text && (
          <div className="pt-2">
            <PullQuote
              text={pullQuote.text}
              attribution={pullQuote.attribution}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// NEW: 2fr / 3fr / 2fr ratio, middle image pushed down
function RowTrio({ images, pullQuote, onImageClick }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr_2fr] gap-4 lg:gap-6 items-start">
        <Photo
          image={images[0]}
          onClick={onImageClick}
          sizes="(min-width:1024px) 28vw, 100vw"
        />
        <div className="lg:mt-12">
          <Photo
            image={images[1]}
            onClick={onImageClick}
            sizes="(min-width:1024px) 42vw, 100vw"
          />
        </div>
        <Photo
          image={images[2]}
          onClick={onImageClick}
          sizes="(min-width:1024px) 28vw, 100vw"
        />
      </div>
      {pullQuote?.text && (
        <div className="max-w-sm">
          <PullQuote
            text={pullQuote.text}
            attribution={pullQuote.attribution}
          />
        </div>
      )}
    </div>
  );
}

// NEW: 3fr / 2fr ratio, right image pushed significantly down
function RowOffset({ images, pullQuote, onImageClick }) {
  const [small, main] = images;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4 lg:gap-6 items-start">
      <div className="flex flex-col gap-4 lg:gap-6">
        <Photo
          image={small}
          onClick={onImageClick}
          sizes="(min-width:1024px) 60vw, 100vw"
        />
        {pullQuote?.text && (
          <PullQuote
            text={pullQuote.text}
            attribution={pullQuote.attribution}
          />
        )}
      </div>
      <div className="lg:mt-20">
        <Photo
          image={main}
          onClick={onImageClick}
          sizes="(min-width:1024px) 40vw, 100vw"
        />
      </div>
    </div>
  );
}

// ORIGINAL: Horizontal scroller on mobile, row on desktop
function RowStrip({ images, pullQuote, onImageClick }) {
  return (
    <div className="space-y-3">
      <div
        className={[
          "flex gap-3 overflow-x-auto pb-1",
          "lg:overflow-visible lg:grid",
          images.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-5",
        ].join(" ")}
        style={{ scrollbarWidth: "none" }}
      >
        {images.slice(0, 5).map((img, i) => (
          <div key={i} className="min-w-[70vw] lg:min-w-0">
            <Photo
              image={img}
              onClick={onImageClick}
              sizes="(min-width:1024px) 20vw, 70vw"
            />
          </div>
        ))}
      </div>
      {pullQuote?.text && (
        <div className="max-w-sm">
          <PullQuote
            text={pullQuote.text}
            attribution={pullQuote.attribution}
          />
        </div>
      )}
    </div>
  );
}

// ORIGINAL: Bleeds to the edges
function RowSpread({ images, pullQuote, onImageClick }) {
  return (
    <div className="space-y-3 -mx-6 lg:-mx-12">
      <Photo
        image={images[0]}
        onClick={onImageClick}
        className="px-0"
        sizes="100vw"
      />
      {pullQuote?.text && (
        <div className="px-6 lg:px-12 max-w-lg">
          <PullQuote
            text={pullQuote.text}
            attribution={pullQuote.attribution}
          />
        </div>
      )}
    </div>
  );
}

// NEW: Rich text block on the left (1fr), portrait gallery on the right (2fr)
function RowFeaturePortrait({ images, pullQuote, onImageClick }) {
  const [portrait, ...rest] = images;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12 items-center">
      <div className="py-4 lg:pr-4">
        {pullQuote?.text && (
          <div>
            {pullQuote.attribution && (
              <h3 className="font-display font-light text-[clamp(1.4rem,2.5vw,2rem)] leading-[1.15] tracking-[-0.015em] text-[#1c1a17] mb-4">
                <em
                  className="italic text-[#57524d]"
                  style={{ fontVariationSettings: "'wdth' 75" }}
                >
                  {pullQuote.attribution}
                </em>
              </h3>
            )}
            <p className="text-[0.95rem] leading-[1.8] text-[#57524d]">
              {pullQuote.text}
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-6 lg:gap-8">
        <Photo
          image={portrait}
          onClick={onImageClick}
          sizes="(min-width:1024px) 66vw, 100vw"
        />
        {rest.map((img, i) => (
          <Photo
            key={i}
            image={img}
            onClick={onImageClick}
            sizes="(min-width:1024px) 66vw, 100vw"
          />
        ))}
      </div>
    </div>
  );
}

function PhotoRow({ row, rowIndex, onImageClick }) {
  const ref = useReveal(0.05);
  const { layout = "solo", images = [], pullQuote } = row;

  const Layout =
    {
      solo: RowSolo,
      dominant: RowDominant,
      trio: RowTrio,
      offset: RowOffset,
      strip: RowStrip,
      spread: RowSpread,
      featurePortrait: RowFeaturePortrait,
    }[layout] ?? RowSolo;

  return (
    <div
      ref={ref}
      className="reveal-block"
      style={{ transitionDelay: `${Math.min(rowIndex * 40, 200)}ms` }}
    >
      <Layout
        images={images}
        pullQuote={pullQuote}
        onImageClick={onImageClick}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// PROJECT HEADER
// ─────────────────────────────────────────────

function ProjectHeader({ project }) {
  return (
    <header className="mb-12 lg:mb-16 w-7xl max-w-full">
      <a
        href="/documentary-photography"
        onClick={(e) => go(e, "/documentary-photography")}
        className="inline-flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.14em] uppercase text-[#9e9890] hover:text-[#1c1a17] transition-colors mb-8 no-underline"
      >
        ← Documentary
      </a>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-[#c8a96e]">
          Social Documentary
        </span>
        {project.year && (
          <>
            <span className="text-[#cec8c0]">·</span>
            <span className="font-mono text-[0.6rem] tracking-[0.1em] text-[#9e9890]">
              {project.year}
            </span>
          </>
        )}
        {project.location && (
          <>
            <span className="text-[#cec8c0]">·</span>
            <span className="font-mono text-[0.6rem] tracking-[0.1em] text-[#9e9890]">
              {project.location}
            </span>
          </>
        )}
      </div>
      <h1 className="font-display font-light text-[clamp(2.4rem,5vw,4rem)] leading-[1.05] tracking-[-0.025em] text-[#1c1a17] mb-4">
        {project.title}
      </h1>
      {project.excerpt && (
        <p className="max-w-2xl text-[1.05rem] leading-[1.8] text-[#57524d]">
          {project.excerpt}
        </p>
      )}

      <div className="flex items-center gap-6 mt-6 pt-6 border-t border-[#cec8c0]">
        {/* AUTHOR REMOVED HERE AS REQUESTED */}
        {project.photoCount && (
          <span className="font-mono text-[0.6rem] tracking-[0.08em] text-[#9e9890]">
            {project.photoCount} photos
          </span>
        )}
        <div className="ml-auto">
          <button
            onClick={() => navigator.clipboard?.writeText(window.location.href)}
            className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-left text-[#9e9890] hover:text-[#8b6f4e] transition-colors duration-200 bg-transparent border-none cursor-pointer p-0 flex items-center gap-1"
          >
            Share ↗
          </button>
        </div>
      </div>
    </header>
  );
}

function ProjectContent({ project }) {
  const lightbox = useLightbox();

  const allImages = useMemo(() => {
    if (!project?.photoRows) return [];
    return project.photoRows.flatMap((row) => row.images || []);
  }, [project]);

  const slides = useMemo(() => {
    return allImages.map((img, index) => ({
      src: img.url,
      key: img.url + index,
      alt: img.alt || "",
      description:
        [img.caption, img.location].filter(Boolean).join(" — ") || undefined,
    }));
  }, [allImages]);

  const handleImageClick = useCallback(
    (clickedImage) => {
      const idx = allImages.findIndex((img) => img.url === clickedImage.url);
      if (idx !== -1) lightbox.show(slides, idx);
    },
    [allImages, slides, lightbox],
  );

  return (
    <main id="main">
      <div className="pt-24 pb-32 max-w-[90vw] mx-auto">
        <ProjectHeader project={project} />
        {project.photoRows?.length > 0 ? (
          <div className="space-y-12 lg:space-y-20">
            {project.photoRows.map((row, i) => (
              <PhotoRow
                key={row._key || i}
                row={row}
                rowIndex={i}
                onImageClick={handleImageClick}
              />
            ))}
          </div>
        ) : (
          <p className="font-mono text-[0.7rem] tracking-[0.1em] uppercase text-[#9e9890]">
            Photos coming soon.
          </p>
        )}
      </div>

      <Newsletter
        title="Quiet dispatches"
        italicTitle="from the field"
        description="New work and process notes, sent sparingly. Never sold."
      />

      <div className="pt-24 pb-32 max-w-[90vw] mx-auto">
        <YourView />
      </div>

      <style>{`
        .reveal-block { opacity: 0; transform: translateY(16px); transition: opacity 0.8s ease, transform 0.8s ease; }
        .reveal-block.revealed { opacity: 1; transform: translateY(0); }
      `}</style>
    </main>
  );
}

export default function DocumentaryProject() {
  const { project } = useData?.() ?? {};
  if (!project)
    return (
      <main className="mx-auto max-w-4xl px-6 py-20">
        <h1>Project not found</h1>
      </main>
    );

  return (
    <LightboxProvider
      key={project.slug || project._id || project.title || "lightbox"}
    >
      <ProjectContent project={project} />
    </LightboxProvider>
  );
}
