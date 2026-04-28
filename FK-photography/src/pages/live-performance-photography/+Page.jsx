import React, { useCallback, useMemo } from "react";
import { useData } from "vike-react/useData";
import LightboxProvider from "@/providers/LightboxProvider.jsx";
import { useLightbox } from "@/hooks/useLightbox.js";

function getAspectRatio(image) {
  const { width, height, aspectRatio } = image?.dimensions ?? {};
  if (aspectRatio) return aspectRatio;
  if (width && height) return width / height;
  return 1.35;
}

function normalizeSections(page) {
  return (page?.sections ?? []).filter(
    (section) => section?.images?.length > 0,
  );
}

function MasonryImage({ image, index, onClick, featured = false }) {
  const aspectRatio = getAspectRatio(image);

  return (
    <figure
      className={[
        "performance-masonry-item break-inside-avoid overflow-hidden rounded-[0.75rem] bg-[#d8d4ce]",
        featured ? "mb-0" : "mb-4",
      ].join(" ")}
    >
      <button
        type="button"
        onClick={() => onClick(image)}
        className="group block w-full cursor-zoom-in border-0 bg-transparent p-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a96e]"
      >
        {image?.url ? (
          <img
            src={image.url}
            alt={image.alt || ""}
            className="block w-full h-auto transition duration-700 ease-out group-hover:scale-[1.025] group-hover:brightness-105"
            style={{ aspectRatio }}
            loading={index < 6 ? "eager" : "lazy"}
            decoding="async"
          />
        ) : (
          <div style={{ aspectRatio }} />
        )}
      </button>
      {image?.caption && (
        <figcaption className="px-1 pt-2 font-mono text-[0.58rem] tracking-[0.08em] text-[#8b8580]">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}

function SectionHeader({ section, index }) {
  return (
    <header className="mb-8 grid gap-8 md:grid-cols-[0.78fr_1.22fr] md:items-end">
      <div>
        <span className="mb-4 block font-mono text-[0.58rem] uppercase tracking-[0.2em] text-[#8b6f4e]">
          {section.subtitle || `Set ${index + 1}`}
        </span>
        <h2 className="font-display text-[clamp(2.1rem,4.4vw,4.6rem)] font-light leading-[0.95] tracking-normal text-[#1c1a17]">
          {section.title}
        </h2>
      </div>
      {section.text && (
        <p className="max-w-xl text-[0.98rem] leading-[1.75] text-[#57524d] md:justify-self-end">
          {section.text}
        </p>
      )}
    </header>
  );
}

function MasonrySection({ section, sectionIndex, onImageClick }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24">
      <SectionHeader section={section} index={sectionIndex} />
      <div
        className="performance-masonry"
        aria-label={`${section.title} performance images`}
      >
        {section.images.map((image, index) => (
          <MasonryImage
            key={image._key || image.url || index}
            image={image}
            index={index}
            onClick={onImageClick}
          />
        ))}
      </div>
    </section>
  );
}

function FeaturedSection({ section, sectionIndex, onImageClick }) {
  const [featured, ...rest] = section.images;

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24">
      <SectionHeader section={section} index={sectionIndex} />
      <div className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <MasonryImage
          image={featured}
          index={0}
          onClick={onImageClick}
          featured
        />
        <div className="performance-masonry performance-masonry-compact">
          {rest.length > 0 ? (
            rest.map((image, index) => (
              <MasonryImage
                key={image._key || image.url || index}
                image={image}
                index={index + 1}
                onClick={onImageClick}
              />
            ))
          ) : (
            <div className="min-h-44 rounded-[0.75rem] bg-[#d8d4ce]" />
          )}
        </div>
      </div>
    </section>
  );
}

function PerformanceContent() {
  const { page } = useData();
  const sections = useMemo(() => normalizeSections(page), [page]);
  const lightbox = useLightbox();

  const slides = useMemo(
    () =>
      sections
        .flatMap((section) => section.images ?? [])
        .filter((image) => image?.url)
        .map((image, index) => ({
          src: image.url,
          key: image._key || `${image.url}-${index}`,
          alt: image.alt || "",
          description: image.caption || undefined,
        })),
    [sections],
  );

  const handleImageClick = useCallback(
    (image) => {
      const index = slides.findIndex((slide) => slide.src === image?.url);
      if (index >= 0) lightbox.show(slides, index);
    },
    [lightbox, slides],
  );

  return (
    <main id="main">
      <section className="mx-auto max-w-7xl px-6 pb-10 pt-24 lg:px-12">
        <div className="max-w-3xl">
          <span className="mb-4 block font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[#8b6f4e]">
            Live Performance Photography
          </span>
          <h1 className="font-display text-[clamp(3rem,7vw,6rem)] font-light leading-[0.95] tracking-normal text-[#1c1a17]">
            {page?.title || "Performance"}
          </h1>
          {page?.intro && (
            <p className="mt-8 max-w-2xl text-[1.05rem] leading-[1.85] text-[#57524d]">
              {page.intro}
            </p>
          )}
        </div>
      </section>

      {sections.length > 0 ? (
        sections.map((section, index) =>
          section.layout === "featured" ? (
            <FeaturedSection
              key={section._key || section.title || index}
              section={section}
              sectionIndex={index}
              onImageClick={handleImageClick}
            />
          ) : (
            <MasonrySection
              key={section._key || section.title || index}
              section={section}
              sectionIndex={index}
              onImageClick={handleImageClick}
            />
          ),
        )
      ) : (
        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-[#9e9890]">
            Performance sections coming soon.
          </p>
        </section>
      )}

      <style>{`
        .performance-masonry {
          column-count: 1;
          column-gap: 1rem;
        }

        @media (min-width: 640px) {
          .performance-masonry {
            column-count: 2;
          }
        }

        @media (min-width: 1024px) {
          .performance-masonry {
            column-count: 3;
            column-gap: 1.25rem;
          }

          .performance-masonry-compact {
            column-count: 2;
          }

          .performance-masonry-item {
            margin-bottom: 1.25rem;
          }
        }

        @media (min-width: 1280px) {
          .performance-masonry {
            column-count: 4;
          }

          .performance-masonry-compact {
            column-count: 2;
          }
        }
      `}</style>
    </main>
  );
}

export default function PerformancePage() {
  return (
    <LightboxProvider>
      <PerformanceContent />
    </LightboxProvider>
  );
}
