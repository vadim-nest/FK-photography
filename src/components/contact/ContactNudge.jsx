import React from "react";
import { usePageContext } from "vike-react/usePageContext";
import { DEFAULT_CONTACT_EMAIL, mailtoHref } from "@/lib/contact";

export function ContactNudge({
  title = "Available for commissions",
  description = "For performance coverage, documentary projects, editorial work, or collaborations, send a note and start with the essentials.",
  className = "",
}) {
  const { contact = {} } = usePageContext();
  const email = contact.email || DEFAULT_CONTACT_EMAIL;

  return (
    <section
      className={[
        "border-y border-[#d8d4ce] bg-[#f2ede6] px-6 py-12 lg:px-12",
        className,
      ].join(" ")}
    >
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-end">
        <div>
          <span className="mb-3 block font-mono text-[0.58rem] uppercase tracking-[0.22em] text-[#8b6f4e]">
            Get in touch
          </span>
          <h2 className="font-display text-[clamp(2rem,4vw,3.4rem)] font-light leading-[0.98] tracking-normal text-[#1c1a17]">
            {title}
          </h2>
        </div>
        <div className="max-w-xl md:justify-self-end">
          <p className="mb-5 text-[0.98rem] leading-[1.7] text-[#57524d]">
            {description}
          </p>
          <a
            href={mailtoHref(email)}
            className="inline-flex border-b border-[#8b6f4e] pb-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#1c1a17] no-underline transition-colors hover:text-[#8b6f4e]"
          >
            {email}
          </a>
        </div>
      </div>
    </section>
  );
}
