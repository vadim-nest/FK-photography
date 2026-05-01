import React from "react";
import { useData } from "vike-react/useData";
import { SmartImage } from "@/components/media/SmartImage.jsx";
import { PortableBody } from "@/components/portable/PortableBody.jsx";
import { Newsletter } from "@/components/ui/Newsletter.jsx";
import { ContactNudge } from "@/components/contact/ContactNudge.jsx";
import { sameHeightGridColumns } from "@/lib/utils";

function Portrait({ image, title }) {
  if (!image?.asset) {
    return (
      <div className="flex aspect-[0.82] min-h-[28rem] items-center justify-center rounded-[0.75rem] bg-[#d8d4ce] px-8 text-center">
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[#9e9890]">
          Portrait
        </span>
      </div>
    );
  }

  return (
    <SmartImage
      image={image}
      alt={image.alt || image.caption || title || "Portrait of Faruk Kara"}
      sizes="(max-width: 767px) 100vw, 42vw"
      className="aspect-[0.82] min-h-[28rem] w-full rounded-[0.75rem]"
      priority
    />
  );
}

function ContextCard({ context, index }) {
  const image = context?.image;

  return (
    <article className="grid gap-4 border-t border-[#cec8c0] pt-5 md:grid-rows-[auto_1fr]">
      <div className="flex items-center justify-between gap-4 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-[#9e9890]">
        <span>{context?.label || "Invitation"}</span>
        <span>{String(index + 1).padStart(2, "0")}</span>
      </div>

      {image?.asset ? (
        <SmartImage
          image={image}
          alt={image.alt || image.caption || context?.title || ""}
          sizes="(max-width: 767px) 100vw, 33vw"
          className="w-full rounded-[0.5rem]"
        />
      ) : (
        <div className="aspect-[1.28] w-full rounded-[0.5rem] bg-[#d8d4ce]" />
      )}

      <div>
        <h3 className="font-display text-[1.45rem] font-light leading-[1.05] text-[#1c1a17]">
          {context?.title}
        </h3>
        {context?.description && (
          <p className="mt-4 text-[0.94rem] leading-[1.65] text-[#57524d]">
            {context.description}
          </p>
        )}
      </div>
    </article>
  );
}

export default function AboutPage() {
  const { page } = useData();
  const contexts = page?.contexts ?? [];
  const contextColumns = sameHeightGridColumns(
    contexts,
    (context) => context?.image?.asset?.metadata?.dimensions?.aspectRatio,
  );

  return (
    <main id="main" className="overflow-x-hidden">
      <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-16 pt-24 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:pb-24">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Portrait image={page?.portrait} title={page?.title} />
        </div>

        <div className="max-w-3xl lg:pt-8">
          <span className="mb-5 block font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[#8b6f4e]">
            About
          </span>
          <h1 className="font-display text-[clamp(3rem,7vw,6.6rem)] font-light leading-[0.92] tracking-normal text-[#1c1a17]">
            {page?.title || "About Faruk"}
          </h1>
          {page?.intro && (
            <p className="mt-8 max-w-2xl text-[1.12rem] leading-[1.85] text-[#57524d]">
              {page.intro}
            </p>
          )}
          {page?.locationLine && (
            <p className="mt-8 border-l border-[#8b6f4e] pl-5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[#1c1a17]">
              {page.locationLine}
            </p>
          )}

          {page?.bio?.length > 0 && (
            <div className="article-body mt-12 max-w-2xl text-[1rem] leading-[1.8] text-[#57524d]">
              <PortableBody value={page.bio} />
            </div>
          )}
        </div>
      </section>

      <section className="border-y border-[#d8d4ce] bg-[#f2ede6] px-6 py-16 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-end">
            <div>
              <span className="mb-4 block font-mono text-[0.58rem] uppercase tracking-[0.22em] text-[#8b6f4e]">
                Invited to capture
              </span>
              <h2 className="font-display text-[clamp(2.2rem,4.8vw,4.8rem)] font-light leading-[0.95] text-[#1c1a17]">
                Access, atmosphere, and trust.
              </h2>
            </div>
            {page?.invitationIntro && (
              <p className="max-w-xl text-[1rem] leading-[1.75] text-[#57524d] md:justify-self-end">
                {page.invitationIntro}
              </p>
            )}
          </div>

          <div
            className="about-context-grid grid grid-cols-1 gap-8"
            style={{ "--about-context-columns": contextColumns }}
          >
            {contexts.map((context, index) => (
              <ContextCard
                key={context?._key || context?.title || index}
                context={context}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <ContactNudge
        title="Commissions, performances, and documentary stories."
        description="Faruk is available for live performance coverage, theatre and rehearsal rooms, editorial assignments, and documentary work built on access and trust."
      />

      <Newsletter
        title="Quiet dispatches"
        italicTitle="from the field"
        description="New work and process notes, sent sparingly."
      />
      <style>{`
        @media (min-width: 768px) {
          .about-context-grid {
            grid-template-columns: var(--about-context-columns);
          }
        }
      `}</style>
    </main>
  );
}
