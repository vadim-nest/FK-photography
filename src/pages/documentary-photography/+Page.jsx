// src/pages/documentary-photography/+Page.jsx

import React, { useEffect, useRef } from "react";
import { useData } from "vike-react/useData";
import { navigate } from "vike/client/router";

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

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

const ROTATION = ["cinematic", "editorial", "sequence"];
function defaultLayout(index) {
  return ROTATION[index % ROTATION.length];
}

function getHubImages(project, max = 3) {
  const overrides = project.hubPresentation?.overrideImages ?? [];
  if (overrides.length > 0) return overrides.slice(0, max);

  const images = [];
  if (project.coverImage?.url) images.push(project.coverImage);
  (project.galleryImages ?? []).forEach((img) => {
    if (images.length < max) images.push(img);
  });
  return images;
}

// ─────────────────────────────────────────────
// LAYOUT 1: CINEMATIC
// 100% Native height. Wrapper shrink-wraps the image perfectly.
// ─────────────────────────────────────────────

function LayoutCinematic({ project }) {
  const ref = useReveal();
  const href = `/documentary-photography/${project.slug}`;
  const images = getHubImages(project, 1);
  const img = images[0];
  const text = project.hubPresentation?.overrideText || project.excerpt;

  return (
    <article ref={ref} className="reveal-block w-full mb-2">
      <a
        href={href}
        onClick={(e) => go(e, href)}
        className="block relative w-full no-underline group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b6f4e]"
      >
        <div className="relative w-full overflow-hidden rounded-[1rem]">
          {img?.url ? (
            <img
              src={img.url}
              alt={img.alt || project.title || ""}
              className="w-full h-auto block rounded-[inherit]"
              style={{ borderRadius: "1rem" }}
              loading="lazy"
            />
          ) : (
            <div className="w-full aspect-[16/9] bg-[#2a2520]" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
            <div className="flex items-end justify-between gap-8">
              <div className="max-w-2xl">
                {project.year && (
                  <span className="block font-mono text-[0.58rem] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.6)] mb-2">
                    {project.year}
                    {project.location ? ` · ${project.location}` : ""}
                  </span>
                )}
                <h2 className="font-display font-light text-[clamp(1.8rem,4vw,3.2rem)] leading-[1.0] tracking-[-0.02em] text-white mb-3">
                  {project.title}
                </h2>
                {text && (
                  <p className="text-[0.9rem] leading-[1.5] text-[rgba(255,255,255,0.7)] max-w-lg line-clamp-2">
                    {text}
                  </p>
                )}
              </div>
              <span className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-[rgba(255,255,255,0.5)] group-hover:text-white transition-colors whitespace-nowrap hidden md:block">
                View project →
              </span>
            </div>
          </div>
        </div>
      </a>
    </article>
  );
}

// ─────────────────────────────────────────────
// LAYOUT 2: EDITORIAL SPLIT
// Uses native height (h-auto). Wrapper shrink-wraps perfectly.
// ─────────────────────────────────────────────

function LayoutEditorial({ project }) {
  const ref = useReveal();
  const href = `/documentary-photography/${project.slug}`;
  const images = getHubImages(project, 1);
  const img = images[0];
  const text = project.hubPresentation?.overrideText || project.excerpt;

  return (
    <article
      ref={ref}
      className="reveal-block w-full mb-2 grid grid-cols-1 lg:grid-cols-[58fr_42fr] gap-0 items-start"
    >
      <a
        href={href}
        onClick={(e) => go(e, href)}
        className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b6f4e]"
      >
        <div className="overflow-hidden rounded-[1rem] w-full relative">
          {img?.url ? (
            <img
              src={img.url}
              alt={img.alt || project.title || ""}
              className="w-full h-auto block rounded-[inherit]"
              style={{ borderRadius: "1rem" }}
              loading="lazy"
            />
          ) : (
            <div className="w-full aspect-[4/3] bg-[#d8d4ce]" />
          )}
        </div>
      </a>

      <a
        href={href}
        onClick={(e) => go(e, href)}
        className="group flex flex-col no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b6f4e] pl-0 lg:pl-12 pt-8 lg:pt-4"
      >
        {project.year && (
          <span className="block font-mono text-[0.58rem] tracking-[0.2em] uppercase text-[#9e9890] mb-6">
            {project.year}
            {project.location ? ` · ${project.location}` : ""}
          </span>
        )}
        <h2 className="font-display font-light text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.025em] text-[#1c1a17] group-hover:text-[#8b6f4e] transition-colors duration-300 mb-8">
          {project.title}
        </h2>
        {text && (
          <p className="text-[0.95rem] leading-[1.7] text-[#57524d] max-w-sm mb-8">
            {text}
          </p>
        )}
        <span className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-[#9e9890] group-hover:text-[#8b6f4e] transition-colors">
          View project →
        </span>
      </a>
    </article>
  );
}

// ─────────────────────────────────────────────
// LAYOUT 3: SEQUENCE
// Flex logic removed fixed heights completely.
// Uses flex ratio + native height (h-auto) to scale without ANY clipping.
// ─────────────────────────────────────────────

function LayoutSequence({ project }) {
  const ref = useReveal();
  const href = `/documentary-photography/${project.slug}`;
  const images = getHubImages(project, 3);
  const text = project.hubPresentation?.overrideText || project.excerpt;

  return (
    <article ref={ref} className="reveal-block w-full mb-2">
      <a
        href={href}
        onClick={(e) => go(e, href)}
        className="group flex items-start justify-between gap-8 no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b6f4e] mb-8"
      >
        <div className="max-w-2xl">
          {project.year && (
            <span className="block font-mono text-[0.58rem] tracking-[0.2em] uppercase text-[#9e9890] mb-4">
              {project.year}
              {project.location ? ` · ${project.location}` : ""}
            </span>
          )}
          <h2 className="font-display font-light text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.05] tracking-[-0.02em] text-[#1c1a17] group-hover:text-[#8b6f4e] transition-colors duration-300 mb-4">
            {project.title}
          </h2>
          {text && (
            <p className="text-[0.95rem] leading-[1.7] text-[#57524d]">
              {text}
            </p>
          )}
        </div>
        <span className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-[#9e9890] group-hover:text-[#8b6f4e] transition-colors whitespace-nowrap pt-2 hidden md:block">
          View project →
        </span>
      </a>

      {images.length > 0 && (
        <a
          href={href}
          onClick={(e) => go(e, href)}
          className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b6f4e]"
        >
          {/* 
            NO FIXED HEIGHT HERE! By just using aspect ratio for flex-grow, 
            the math inherently guarantees every item will match identical height automatically 
            while avoiding ANY object-cover/cropping inside the boxes.
          */}
          <div className="flex gap-3 w-full items-start">
            {images.map((img, i) => {
              const ratio =
                img?.dimensions?.width && img?.dimensions?.height
                  ? img.dimensions.width / img.dimensions.height
                  : 1;

              return (
                <div
                  key={img?._key || i}
                  className="overflow-hidden rounded-[1rem] relative"
                  style={{ flex: `${ratio} 1 0%` }}
                >
                  {img?.url ? (
                    <img
                      src={img.url}
                      alt={img?.alt || ""}
                      className="w-full h-auto block rounded-[inherit]"
                      style={{ borderRadius: "1rem" }}
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full aspect-[4/3] bg-[#d8d4ce]" />
                  )}
                </div>
              );
            })}
          </div>
        </a>
      )}
    </article>
  );
}

// ─────────────────────────────────────────────
// SPACER between projects
// ─────────────────────────────────────────────

function ProjectDivider() {
  return (
    <div className="py-16 lg:py-24">
      <div className="w-12 h-px bg-[#cec8c0]" />
    </div>
  );
}

// ─────────────────────────────────────────────
// FEATURED VIDEOS
// ─────────────────────────────────────────────

function FeaturedVideosGrid({ videos }) {
  const ref = useReveal();
  if (!videos?.length) return null;
  return (
    <section
      ref={ref}
      className="reveal-block mt-24 lg:mt-32 pt-16 border-t border-[#cec8c0]"
    >
      <h2 className="font-display font-light text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.1] tracking-[-0.02em] text-[#1c1a17] mb-12">
        Featured Stories
      </h2>
      <div
        className={`grid grid-cols-1 ${videos.length > 1 ? "lg:grid-cols-2" : ""} gap-12`}
      >
        {videos.map((video, idx) => (
          <div key={idx} className="flex flex-col w-full">
            <div className="flex items-baseline justify-between mb-4">
              <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-[#c8a96e]">
                Video
              </span>
              {video.label && (
                <span className="font-mono text-[0.6rem] tracking-[0.08em] uppercase text-[#9e9890]">
                  {video.label}
                </span>
              )}
            </div>
            <div
              className="relative rounded-[1rem] overflow-hidden bg-[#1c1a17]"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                src={video.embedUrl}
                title={video.label || "Featured documentary"}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
            {video.caption && (
              <p className="mt-4 text-[0.9rem] leading-[1.65] text-[#57524d]">
                {video.caption}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// FALLBACK INTRO
// ─────────────────────────────────────────────

const FALLBACK_INTRO = [
  "I am a Cambridge-based photographer driven by the raw, unscripted narratives of documentary and photojournalism. To me, photography is an act of observation: a study of how people connect with their environment, whether in the historic streets of a university city or the quiet corners of a local festival.",
  "My documentary work is about community. I believe that a photograph should do more than show a subject; it should document a relationship. By focusing on the environmental context of every individual, I aim to create a visual record that feels both personal and universal.",
];

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────

export default function DocumentaryHub() {
  const {
    projects = [],
    featuredVideos = [],
    introText = [],
  } = useData?.() ?? {};
  const textChunks = introText.length > 0 ? introText : FALLBACK_INTRO;

  return (
    <main id="main">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-24 pb-32">
        <header className="mb-16">
          <span className="block font-mono text-[0.62rem] tracking-[0.2em] uppercase text-[#8b6f4e] mb-4">
            Work
          </span>
          <h1 className="font-display font-light text-[clamp(3rem,7vw,6rem)] leading-[0.95] tracking-[-0.025em] text-[#1c1a17]">
            Documentary
          </h1>
        </header>

        {textChunks[0] && (
          <div className="mb-20 max-w-2xl">
            <p className="text-[1.05rem] leading-[1.85] text-[#57524d]">
              {textChunks[0]}
            </p>
          </div>
        )}

        <div>
          {projects.map((proj, i) => {
            const layoutType = proj.hubPresentation?.layout || defaultLayout(i);

            return (
              <React.Fragment key={proj._id}>
                {layoutType === "cinematic" && (
                  <LayoutCinematic project={proj} />
                )}
                {layoutType === "editorial" && (
                  <LayoutEditorial project={proj} />
                )}
                {layoutType === "sequence" && <LayoutSequence project={proj} />}

                {i < projects.length - 1 && <ProjectDivider />}

                {textChunks[i + 1] && (
                  <div className="max-w-2xl py-16 lg:py-24">
                    <p className="text-[1.05rem] leading-[1.85] text-[#57524d]">
                      {textChunks[i + 1]}
                    </p>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        <FeaturedVideosGrid videos={featuredVideos} />
      </div>

      <style>{`
        .reveal-block {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.75s ease, transform 0.75s ease;
        }
        .reveal-block.revealed {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </main>
  );
}
