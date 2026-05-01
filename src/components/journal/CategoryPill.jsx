import React from "react";

const CAT_COLOURS = {
  journal: {
    text: "text-[#7a5838]",
    border: "border-[rgba(122,88,56,0.3)]",
    bg: "bg-[rgba(122,88,56,0.06)]",
  },
  news: {
    text: "text-[#2a6a50]",
    border: "border-[rgba(42,106,80,0.3)]",
    bg: "bg-[rgba(42,106,80,0.06)]",
  },
  essay: {
    text: "text-[#5848a0]",
    border: "border-[rgba(88,72,160,0.3)]",
    bg: "bg-[rgba(88,72,160,0.06)]",
  },
};

export function CategoryPill({ post, className = "" }) {
  const label = post?.category ?? post?.categories?.[0]?.title ?? null;
  if (!label) return null;

  const colours = CAT_COLOURS[label.toLowerCase()] ?? {
    text: "text-[#9e9890]",
    border: "border-[#cec8c0]",
    bg: "bg-transparent",
  };

  return (
    <span
      className={`inline-block font-mono text-[0.54rem] tracking-[0.16em] uppercase px-[0.55rem] py-[0.22rem] border ${colours.text} ${colours.border} ${colours.bg} ${className}`}
    >
      {label}
    </span>
  );
}
