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

function MasonryImage({ image, index, onClick }) {
  const aspectRatio = getAspectRatio(image);

  return (
    <figure className="performance-masonry-item mb-4 break-inside-avoid overflow-hidden rounded-[0.75rem] bg-[#d8d4ce]">
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

function PerformanceContent() {
  const { page } = useData();
  const images = useMemo(() => page?.images ?? [], [page]);
  const lightbox = useLightbox();

  const slides = useMemo(
    () =>
      images
        .filter((image) => image?.url)
        .map((image, index) => ({
          src: image.url,
          key: image._key || `${image.url}-${index}`,
          alt: image.alt || "",
          description: image.caption || undefined,
        })),
    [images],
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
      <section className="mx-auto max-w-7xl px-6 lg:px-12 pt-24 pb-10">
        <div className="max-w-3xl">
          <span className="block font-mono text-[0.62rem] tracking-[0.2em] uppercase text-[#8b6f4e] mb-4">
            Live Performance Photography
          </span>
          <h1 className="font-display font-light text-[clamp(3rem,7vw,6rem)] leading-[0.95] tracking-[-0.025em] text-[#1c1a17]">
            {page?.title || "Performance"}
          </h1>
          {page?.intro && (
            <p className="mt-8 max-w-2xl text-[1.05rem] leading-[1.85] text-[#57524d]">
              {page.intro}
            </p>
          )}
        </div>
      </section>

      <section
        className="performance-masonry mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-32"
        aria-label="Performance photography gallery"
      >
        {images.length > 0 ? (
          images.map((image, index) => (
            <MasonryImage
              key={image._key || image.url || index}
              image={image}
              index={index}
              onClick={handleImageClick}
            />
          ))
        ) : (
          <p className="px-2 font-mono text-[0.7rem] tracking-[0.1em] uppercase text-[#9e9890]">
            Performance images coming soon.
          </p>
        )}
      </section>

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
          .performance-masonry-item {
            margin-bottom: 1.25rem;
          }
        }

        @media (min-width: 1280px) {
          .performance-masonry {
            column-count: 4;
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
