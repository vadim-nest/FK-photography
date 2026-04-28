import React, { useCallback, useMemo } from "react";
import { useData } from "vike-react/useData";
import { BentoGrid } from "@/components/blog/BentoGrid.jsx";
import LightboxProvider from "@/providers/LightboxProvider.jsx";
import { useLightbox } from "@/hooks/useLightbox.js";

function normalizeSections(page) {
  return (page?.sections ?? []).filter(
    (section) => section?.images?.length > 0,
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

function PerformanceSection({ section, sectionIndex, onImageClick }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24">
      <SectionHeader section={section} index={sectionIndex} />
      <BentoGrid value={{ images: section.images }} onImageClick={onImageClick} />
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
        sections.map((section, index) => (
          <PerformanceSection
            key={section._key || section.title || index}
            section={section}
            sectionIndex={index}
            onImageClick={handleImageClick}
          />
        ))
      ) : (
        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-[#9e9890]">
            Performance sections coming soon.
          </p>
        </section>
      )}
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
