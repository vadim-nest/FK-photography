import React from "react";

export function Newsletter({
  tag = "Newsletter",
  title = "Enjoyed this",
  italicTitle = "story?",
  description = "Get new work, field notes, and behind-the-lens writing — sent a few times a year.",
}) {
  return (
    <div className="bg-[#0f0e0d] py-14 px-6 lg:px-12 w-[100vw] mt-10">
      <div className="w-7xl max-w-full mx-auto">
        <div className="max-w-2xl">
          <span className="font-mono text-[0.58rem] tracking-[0.22em] uppercase text-[#c8a96e] block mb-3">
            {tag}
          </span>
          <h3 className="font-display font-light text-[1.8rem] leading-[1.15] text-[#f2ede6] mb-2">
            {title}
            <br />
            <em
              className="italic text-[rgba(242,237,230,0.4)]"
              style={{ fontVariationSettings: "'wdth' 85" }}
            >
              {italicTitle}
            </em>
          </h3>
          <p className="text-[0.9rem] text-[rgba(242,237,230,0.45)] mb-8">
            {description}
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex border-b border-[rgba(242,237,230,0.2)] mb-3 pb-2 max-w-md"
          >
            <input
              type="email"
              placeholder="your@email.com"
              autoComplete="email"
              className="flex-1 bg-transparent border-none outline-none font-[family-name:var(--font-body)] text-[0.95rem] text-[#f2ede6] placeholder:text-[rgba(242,237,230,0.3)] placeholder:italic"
            />
            <button
              type="submit"
              className="bg-transparent border-none cursor-pointer font-mono text-[0.6rem] tracking-[0.14em] uppercase text-[rgba(242,237,230,0.4)] pl-4 transition-colors hover:text-[#c8a96e] whitespace-nowrap"
            >
              Subscribe →
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
