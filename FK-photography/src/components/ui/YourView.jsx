import React, { useEffect, useRef } from "react";

export function YourView() {
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
      className="reveal-block mt-10 lg:mt-20 pt-10 border-t border-[#cec8c0]"
    >
      <h2 className="font-display font-light text-[1.5rem] tracking-[-0.01em] text-[#1c1a17] mb-1">
        Your View
      </h2>
      <p className="text-[0.9rem] text-[#9e9890] mb-6">
        Add your perspective to the narrative.
      </p>
      <div className="space-y-4 max-w-md">
        <div>
          <label className="block font-mono text-[0.58rem] tracking-[0.14em] uppercase text-[#9e9890] mb-1">
            Name
          </label>
          <input
            type="text"
            placeholder="Your name"
            className="w-full bg-transparent border-b border-[#cec8c0] py-2 font-[family-name:var(--font-body)] text-[0.95rem] text-[#1c1a17] placeholder:text-[#cec8c0] outline-none focus:border-[#8b6f4e] transition-colors"
          />
        </div>
        <div>
          <label className="block font-mono text-[0.58rem] tracking-[0.14em] uppercase text-[#9e9890] mb-1">
            Questions, comments, or feedback?
          </label>
          <textarea
            rows={3}
            placeholder="Your thoughts..."
            className="w-full bg-transparent border-b border-[#cec8c0] py-2 font-[family-name:var(--font-body)] text-[0.95rem] text-[#1c1a17] placeholder:text-[#cec8c0] outline-none focus:border-[#8b6f4e] transition-colors resize-none"
          />
        </div>
        <button
          onClick={(e) => e.preventDefault()}
          className="font-mono text-[0.62rem] tracking-[0.13em] uppercase px-5 py-2.5 border border-[#8b6f4e] rounded-[3px] text-[#8b6f4e] hover:bg-[#8b6f4e] hover:text-[#eae6e0] transition-colors duration-200 cursor-pointer bg-transparent"
        >
          Submit →
        </button>
      </div>
    </section>
  );
}
