import React from "react";

export function Newsletter({
  tag = "Newsletter",
  title = "Enjoyed this",
  italicTitle = "story?",
  description = "Get new work, field notes, and behind-the-lens writing - sent a few times a year.",
  className = "",
}) {
  return (
    <div className={`bg-[#0f0e0d] px-6 py-14 lg:px-12 ${className}`}>
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-2xl">
          <span className="mb-3 block font-mono text-[0.58rem] uppercase tracking-[0.22em] text-[#c8a96e]">
            {tag}
          </span>
          <h3 className="mb-2 font-display text-[1.8rem] font-light leading-[1.15] text-[#f2ede6]">
            {title}
            <br />
            <em
              className="italic text-[rgba(242,237,230,0.4)]"
              style={{ fontVariationSettings: "'wdth' 85" }}
            >
              {italicTitle}
            </em>
          </h3>
          <p className="mb-8 text-[0.9rem] text-[rgba(242,237,230,0.45)]">
            {description}
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mb-3 flex max-w-md border-b border-[rgba(242,237,230,0.2)] pb-2"
          >
            <input
              type="email"
              placeholder="your@email.com"
              autoComplete="email"
              className="flex-1 border-none bg-transparent font-[family-name:var(--font-body)] text-[0.95rem] text-[#f2ede6] outline-none placeholder:text-[rgba(242,237,230,0.3)] placeholder:italic"
            />
            <button
              type="submit"
              className="cursor-pointer whitespace-nowrap border-none bg-transparent pl-4 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[rgba(242,237,230,0.4)] transition-colors hover:text-[#c8a96e]"
            >
              Subscribe &rarr;
            </button>
          </form>
          <p className="font-mono text-[0.57rem] tracking-[0.06em] text-[rgba(242,237,230,0.2)]">
            No spam. Unsubscribe any time.
          </p>
        </div>
      </div>
    </div>
  );
}
