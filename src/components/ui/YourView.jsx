import React, { useEffect, useRef } from "react";

export function YourView({ className = "" }) {
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
      { threshold: 0.06 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={[
        "reveal-block bg-[#1c1a17] px-6 py-14 text-[#f2ede6] lg:px-12 lg:py-20",
        className,
      ].join(" ")}
    >
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.82fr_1.18fr] md:items-start">
        <div>
          <span className="mb-4 block font-mono text-[0.58rem] uppercase tracking-[0.22em] text-[#c8a96e]">
            Join the conversation
          </span>
          <h2 className="font-display text-[clamp(2.2rem,5vw,4.8rem)] font-light leading-[0.95] tracking-normal text-[#f2ede6]">
            Your view matters here.
          </h2>
          <p className="mt-6 max-w-md text-[1rem] leading-[1.75] text-[rgba(242,237,230,0.62)]">
            Add a memory, question, correction, or response to the work.
          </p>
        </div>

        <form className="grid gap-5 md:pt-2" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="mb-2 block font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[rgba(242,237,230,0.48)]">
              Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full border-0 border-b border-[rgba(242,237,230,0.24)] bg-transparent py-3 font-[family-name:var(--font-body)] text-[1rem] text-[#f2ede6] outline-none transition-colors placeholder:text-[rgba(242,237,230,0.28)] focus:border-[#c8a96e]"
            />
          </div>
          <div>
            <label className="mb-2 block font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[rgba(242,237,230,0.48)]">
              Comment
            </label>
            <textarea
              rows={5}
              placeholder="What did this bring up for you?"
              className="w-full resize-none border-0 border-b border-[rgba(242,237,230,0.24)] bg-transparent py-3 font-[family-name:var(--font-body)] text-[1rem] leading-[1.6] text-[#f2ede6] outline-none transition-colors placeholder:text-[rgba(242,237,230,0.28)] focus:border-[#c8a96e]"
            />
          </div>
          <div className="flex flex-col gap-5 border-t border-[rgba(242,237,230,0.12)] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xs text-[0.78rem] leading-[1.5] text-[rgba(242,237,230,0.38)]">
              Responses help shape the archive around the photographs.
            </p>
            <button
              type="submit"
              className="shrink-0 cursor-pointer rounded-[3px] border border-[#c8a96e] bg-transparent px-5 py-3 font-mono text-[0.62rem] uppercase tracking-[0.13em] text-[#f2ede6] transition-colors duration-200 hover:bg-[#c8a96e] hover:text-[#1c1a17]"
            >
              Submit comment
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
