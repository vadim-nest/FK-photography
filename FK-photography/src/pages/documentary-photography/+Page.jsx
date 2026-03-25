// src/pages/documentary-photography/+Page.jsx
//
// Documentary Hub — /documentary-photography
// Parent page. Lists all documentary projects from Sanity.
// Features: scrollytelling intro, featured video/embed, project cards.
//
// Data expected from +data.js loader:
//   { projects, featuredVideo, introText }
//   See SANITY SETUP NOTES at bottom of this file.

import React, { useEffect, useRef, useState } from "react";
import { useData } from "vike-react/useData";
import { navigate } from "vike/client/router";

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

function go(e, to) {
  if (e.defaultPrevented) return;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
  e.preventDefault();
  navigate(to);
}

// Scroll-reveal hook — adds 'revealed' class when element enters viewport
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("revealed"); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

// ─────────────────────────────────────────────
// SCROLLYTELLING INTRO
// Big display heading that sticks while a paragraph block scrolls.
// On smaller screens collapses to a straight read.
// ─────────────────────────────────────────────

function ScrollyIntro({ text }) {
  const paragraphs = text
    ? text.split(/\n{2,}/).filter(Boolean)
    : FALLBACK_INTRO;

  const stickyRef = useRef(null);
  const scrollRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const items = scrollRef.current?.querySelectorAll("[data-para]");
    if (!items?.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveIdx(Number(e.target.dataset.para));
        });
      },
      { threshold: 0.55 }
    );
    items.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Visual progress indicator
  const progressPct = paragraphs.length > 1 ? (activeIdx / (paragraphs.length - 1)) * 100 : 100;

  return (
    <section className="relative mb-24 lg:mb-32">
      {/* ── desktop: sticky left / scroll right ── */}
      <div className="hidden lg:flex gap-20 items-start">
        {/* Sticky label column */}
        <div
          ref={stickyRef}
          className="sticky top-28 self-start w-64 shrink-0 pt-2"
        >
          <span className="block font-mono text-[0.6rem] tracking-[0.2em] uppercase text-[#c8a96e] mb-4">
            Documentary
          </span>
          <h1
            className={[
              "font-display font-light",
              "text-[clamp(2.4rem,4vw,3.4rem)]",
              "leading-[1.05] tracking-[-0.025em]",
              "text-[#1c1a17]",
              "mb-6",
            ].join(" ")}
          >
            Telling
            <br />
            <em className="not-italic font-[350] italic" style={{ fontVariationSettings: "'wdth' 75" }}>
              real
            </em>
            <br />
            stories.
          </h1>

          {/* Progress bar */}
          <div className="w-px h-24 bg-[#cec8c0] relative overflow-hidden">
            <div
              className="absolute top-0 left-0 w-full bg-[#8b6f4e] transition-all duration-500 ease-out"
              style={{ height: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Scrolling paragraphs */}
        <div ref={scrollRef} className="flex-1 pt-2 space-y-20">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              data-para={i}
              className={[
                "text-[1.15rem] leading-[1.85] transition-all duration-500",
                i === activeIdx
                  ? "text-[#1c1a17] opacity-100"
                  : "text-[#9e9890] opacity-60",
              ].join(" ")}
            >
              {p}
            </p>
          ))}
        </div>
      </div>

      {/* ── mobile: straight read ── */}
      <div className="lg:hidden">
        <span className="block font-mono text-[0.6rem] tracking-[0.2em] uppercase text-[#c8a96e] mb-3">
          Documentary
        </span>
        <h1
          className={[
            "font-display font-light",
            "text-[clamp(2rem,8vw,3rem)]",
            "leading-[1.05] tracking-[-0.025em]",
            "text-[#1c1a17] mb-8",
          ].join(" ")}
        >
          Telling{" "}
          <em className="not-italic font-[350] italic" style={{ fontVariationSettings: "'wdth' 75" }}>
            real
          </em>{" "}
          stories.
        </h1>
        <div className="space-y-5">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-[1.05rem] leading-[1.8] text-[#57524d]">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

const FALLBACK_INTRO = [
  "I am a Cambridge-based photographer driven by the raw, unscripted narratives of documentary and photojournalism. To me, photography is an act of observation — a study of how people connect with their environment, whether in the historic streets of a university city or the quiet corners of a local festival.",
  "My documentary work is about community. I believe that a photograph should do more than show a subject; it should document a relationship. By focusing on the environmental context of every individual, I aim to create a visual record that feels both personal and universal.",
  "I enjoy straight photojournalism, recording the unique duality of Cambridge in both 'town and gown.' This involves a commitment to capturing the authentic, fleeting moments that define our shared spaces — documenting the interplay between tradition and the everyday.",
];

// ─────────────────────────────────────────────
// FEATURED VIDEO EMBED
// If the Sanity 'featuredVideo' field is set, this renders at top of page.
// Supports YouTube and Vimeo embed URLs.
// ─────────────────────────────────────────────

function FeaturedVideo({ video }) {
  const ref = useReveal();
  if (!video?.embedUrl) return null;

  return (
    <section ref={ref} className="reveal-block mb-20 lg:mb-28">
      <div className="flex items-baseline justify-between mb-4">
        <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-[#c8a96e]">
          Featured story
        </span>
        {video.label && (
          <span className="font-mono text-[0.6rem] tracking-[0.08em] uppercase text-[#9e9890]">
            {video.label}
          </span>
        )}
      </div>
      <div className="relative rounded-[1rem] overflow-hidden bg-[#1c1a17]" style={{ paddingBottom: "56.25%" }}>
        <iframe
          src={video.embedUrl}
          title={video.label || "Featured documentary"}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
      {video.caption && (
        <p className="mt-3 font-mono text-[0.6rem] tracking-[0.1em] text-[#9e9890]">
          {video.caption}
        </p>
      )}
    </section>
  );
}

// ─────────────────────────────────────────────
// PROJECT CARD
// Each card links to /documentary-photography/[slug]
// Image at top (natural ratio), title + excerpt below, thin rule + CTA.
// Matches BlogCard design language — no borders, no shadows.
// ─────────────────────────────────────────────

function ProjectCard({ project, index }) {
  const ref = useReveal(0.08);
  const href = `/documentary-photography/${project.slug}`;

  return (
    <article
      ref={ref}
      className="reveal-block"
      style={{ transitionDelay: `${(index % 2) * 80}ms` }}
    >
      <a
        href={href}
        onClick={(e) => go(e, href)}
        className="group block no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b6f4e] rounded-[1rem]"
        aria-label={`View project: ${project.title}`}
      >
        {/* Image */}
        {project.coverImage && (
          <div className="rounded-[1rem] overflow-hidden mb-4">
            <img
              src={project.coverImage.url}
              alt={project.coverImage.alt || project.title}
              className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.025]"
              loading="lazy"
            />
          </div>
        )}
        {/* Fallback placeholder when no image */}
        {!project.coverImage && (
          <div className="rounded-[1rem] overflow-hidden mb-4 bg-[#d8d4ce] aspect-[3/2]" />
        )}

        {/* Meta row */}
        <div className="flex items-center gap-3 mb-2">
          <span className="font-mono text-[0.58rem] tracking-[0.18em] uppercase text-[#c8a96e]">
            Documentary
          </span>
          {project.year && (
            <>
              <span className="text-[#cec8c0]">·</span>
              <span className="font-mono text-[0.58rem] tracking-[0.08em] text-[#9e9890]">
                {project.year}
              </span>
            </>
          )}
          {project.photoCount && (
            <>
              <span className="text-[#cec8c0]">·</span>
              <span className="font-mono text-[0.58rem] tracking-[0.08em] text-[#9e9890]">
                {project.photoCount} photos
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <h2
          className={[
            "font-display font-light",
            "text-[clamp(1.4rem,2.5vw,1.9rem)]",
            "leading-[1.1] tracking-[-0.02em]",
            "text-[#1c1a17] mb-2",
            "group-hover:text-[#8b6f4e] transition-colors duration-300",
          ].join(" ")}
        >
          {project.title}
        </h2>

        {/* Excerpt */}
        {project.excerpt && (
          <p className="text-[0.95rem] leading-[1.65] text-[#57524d] mb-4 line-clamp-3">
            {project.excerpt}
          </p>
        )}

        {/* Footer rule + CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-[#cec8c0]">
          <span className="font-mono text-[0.62rem] tracking-[0.13em] uppercase text-[#9e9890] group-hover:text-[#8b6f4e] transition-colors">
            View project →
          </span>
          {project.location && (
            <span className="font-mono text-[0.58rem] tracking-[0.06em] text-[#9e9890]">
              {project.location}
            </span>
          )}
        </div>
      </a>
    </article>
  );
}

// ─────────────────────────────────────────────
// PROJECTS GRID
// Two-column staggered layout matching BlogIndex.jsx
// ─────────────────────────────────────────────

function ProjectsGrid({ projects = [] }) {
  if (!projects.length) {
    return (
      <p className="font-mono text-[0.7rem] tracking-[0.1em] uppercase text-[#9e9890]">
        No projects yet.
      </p>
    );
  }

  const left  = projects.filter((_, i) => i % 2 === 0);
  const right = projects.filter((_, i) => i % 2 !== 0);

  return (
    <section>
      <div className="flex items-baseline justify-between mb-12">
        <h2 className="font-display font-light text-[1.15rem] tracking-[-0.01em] text-[#1c1a17]">
          Projects
        </h2>
        <span className="font-mono text-[0.6rem] tracking-[0.1em] uppercase text-[#9e9890]">
          {projects.length} {projects.length === 1 ? "series" : "series"}
        </span>
      </div>

      <div className="flex gap-8 lg:gap-12 items-start">
        {/* Left column */}
        <div className="flex-1 flex flex-col gap-16">
          {left.map((p, i) => (
            <ProjectCard key={p._id || p.slug} project={p} index={i * 2} />
          ))}
        </div>
        {/* Right column — staggered with mt-32 */}
        <div className="flex-1 flex flex-col gap-16 mt-32">
          {right.map((p, i) => (
            <ProjectCard key={p._id || p.slug} project={p} index={i * 2 + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// DIVIDER QUOTE
// Editorial pull-quote between intro and projects.
// ─────────────────────────────────────────────

function DividerQuote() {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal-block my-20 lg:my-28 text-center max-w-2xl mx-auto px-4">
      <p
        className={[
          "font-display font-light italic",
          "text-[clamp(1.1rem,2.5vw,1.5rem)]",
          "leading-[1.55] tracking-[-0.01em]",
          "text-[#57524d]",
        ].join(" ")}
        style={{ fontVariationSettings: "'wdth' 90" }}
      >
        "A photograph should do more than show a subject; it should document a relationship."
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────

export default function DocumentaryHub() {
  const { projects = [], featuredVideo, introText } = useData?.() ?? {};

  return (
    <main id="main">
      <div
        className={[
          "mx-auto w-7xl max-w-full mx-auto",
          "px-[1.4rem] lg:px-12",
          "pt-24 pb-32",
        ].join(" ")}
      >
        {/* Scrollytelling intro */}
        <ScrollyIntro text={introText} />

        {/* Featured video — renders only if Sanity field set */}
        <FeaturedVideo video={featuredVideo} />

        {/* Pull quote */}
        <DividerQuote />

        {/* Projects grid */}
        <ProjectsGrid projects={projects} />
      </div>

      {/* Reveal animation styles */}
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

/*
──────────────────────────────────────────────────────────────────
SANITY SCHEMA — documentaryProject
──────────────────────────────────────────────────────────────────

Create this schema at: /sanity/schemas/documentaryProject.js

export default {
  name: 'documentaryProject',
  title: 'Documentary Project',
  type: 'document',
  fields: [
    { name: 'title',     type: 'string',   title: 'Title' },
    { name: 'slug',      type: 'slug',     title: 'Slug', options: { source: 'title' } },
    { name: 'year',      type: 'string',   title: 'Year (e.g. 2023)' },
    { name: 'location',  type: 'string',   title: 'Location (e.g. Cambridge, UK)' },
    { name: 'excerpt',   type: 'text',     title: 'Short excerpt (2–3 sentences)' },
    { name: 'introText', type: 'array',    title: 'Hub intro text (overrides page default)',
      of: [{ type: 'block' }] },
    {
      name: 'coverImage', type: 'image', title: 'Cover image',
      fields: [{ name: 'alt', type: 'string', title: 'Alt text' }]
    },
    {
      name: 'photoRows', type: 'array', title: 'Photo rows',
      of: [
        {
          type: 'object', name: 'photoRow', title: 'Row',
          fields: [
            {
              name: 'layout', type: 'string', title: 'Layout',
              options: {
                list: [
                  { value: 'solo',           title: 'Solo — one full-width' },
                  { value: 'dominant',       title: 'Dominant — large left + small right stack' },
                  { value: 'trio',           title: 'Trio — three equal' },
                  { value: 'offset',         title: 'Offset — small left + large right' },
                  { value: 'strip',          title: 'Strip — 4–5 landscape crops in a row' },
                  { value: 'spread',         title: 'Spread — wide panoramic' },
                  { value: 'featurePortrait','title': 'Feature portrait — big portrait + text' },
                ]
              }
            },
            {
              name: 'images', type: 'array', title: 'Images',
              of: [{
                type: 'image',
                fields: [
                  { name: 'alt',      type: 'string', title: 'Alt text' },
                  { name: 'caption',  type: 'string', title: 'Caption' },
                  { name: 'location', type: 'string', title: 'Location label' },
                ]
              }]
            },
            {
              name: 'pullQuote', type: 'object', title: 'Pull quote (optional)',
              fields: [
                { name: 'text',       type: 'string', title: 'Quote text' },
                { name: 'attribution',type: 'string', title: 'Attribution' },
              ]
            }
          ],
          preview: {
            select: { layout: 'layout' },
            prepare({ layout }) { return { title: `Row: ${layout ?? 'unset'}` } }
          }
        }
      ]
    },
    { name: 'photoCount', type: 'number', title: 'Photo count (for display)' },
    { name: 'order',      type: 'number', title: 'Sort order (lower = first)' },
  ],
  orderings: [{ title: 'Sort order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
}

──────────────────────────────────────────────────────────────────
SANITY SCHEMA — documentaryHubSettings (singleton)
Use this to store the hub intro text and featured video centrally.
──────────────────────────────────────────────────────────────────

export default {
  name: 'documentaryHubSettings',
  title: 'Documentary Hub Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],  // singleton — no create/delete
  fields: [
    { name: 'introText',    type: 'text',   title: 'Intro text (plain, 2–4 paragraphs, line-break = new paragraph)' },
    {
      name: 'featuredVideo', type: 'object', title: 'Featured video',
      fields: [
        { name: 'embedUrl', type: 'url',    title: 'Embed URL (YouTube /embed/ or Vimeo player URL)' },
        { name: 'label',    type: 'string', title: 'Label (e.g. "Strawberry Fair 2023")' },
        { name: 'caption',  type: 'string', title: 'Caption below embed' },
      ]
    },
  ]
}

──────────────────────────────────────────────────────────────────
DATA LOADER — src/pages/documentary-photography/+data.js
──────────────────────────────────────────────────────────────────

import { sanityClient } from '@/lib/sanityClient.js'

const HUB_QUERY = `{
  "settings": *[_type == "documentaryHubSettings"][0]{
    introText,
    featuredVideo
  },
  "projects": *[_type == "documentaryProject"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    year,
    location,
    excerpt,
    photoCount,
    "coverImage": coverImage{ "url": asset->url, alt }
  }
}`

export async function data() {
  const result = await sanityClient.fetch(HUB_QUERY)
  return {
    introText:    result.settings?.introText  ?? null,
    featuredVideo: result.settings?.featuredVideo ?? null,
    projects:     result.projects ?? [],
  }
}
──────────────────────────────────────────────────────────────────
*/