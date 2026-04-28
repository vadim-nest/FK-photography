// src/pages/journal/+Page.jsx
import React, { useState } from "react";
import { useData } from "vike-react/useData";
import { JournalCard } from "@/components/journal/JournalCard";
import { Newsletter } from "@/components/ui/Newsletter.jsx";

export default function JournalIndex() {
  const { entries = [] } = useData();
  const [filter, setFilter] = useState("all");

  // Map Sanity _type to our internal filter keys
  const getCatKey = (type) => {
    if (type === "post") return "journal";
    if (type === "documentaryProject") return "essay";
    if (type === "news") return "news";
    return "all";
  };

  // 1. Filter entries based on active tab
  const filteredEntries = entries.filter(
    (e) => filter === "all" || getCatKey(e._type) === filter,
  );

  // 2. Split into columns after filtering to maintain the staggered layout
  const colLeft = filteredEntries.filter((_, i) => i % 2 === 0);
  const colRight = filteredEntries.filter((_, i) => i % 2 === 1);

  const baseBtn =
    "font-mono text-[0.62rem] tracking-[0.1em] uppercase px-4 py-1.5 border rounded-[3px] transition-all cursor-pointer";
  const inactiveBtn =
    "border-[#cec8c0] text-[#57524d] hover:border-[#1c1a17] hover:text-[#1c1a17] bg-transparent";

  return (
    <main className="bg-[#eae6e0] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-20">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <span className="block font-mono text-[0.65rem] tracking-[0.2em] uppercase text-[#8b6f4e] mb-4">
              Journal
            </span>
            <h1 className="font-display font-light text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.02em] text-[#1c1a17]">
              Recording Cambridge <br />
              <span
                className="italic text-[#57524d] font-extralight"
                style={{ fontVariationSettings: "'wdth' 75" }}
              >
                in town & gown
              </span>
            </h1>
          </div>
          <div className="md:text-right">
            <span className="block font-mono text-[0.62rem] tracking-[0.14em] text-[#9e9890] mb-2 uppercase">
              {filteredEntries.length} entries
            </span>
            <p className="italic text-[0.95rem] text-[#57524d] max-w-[220px] leading-relaxed">
              Journal notes, news and photo essays - all in one place.
            </p>
          </div>
        </header>

        {/* Filter Bar */}
        <nav className="flex flex-wrap items-center gap-3 mb-16">
          <span className="font-mono text-[0.6rem] tracking-[0.18em] uppercase text-[#9e9890] mr-2">
            Show
          </span>
          {[
            {
              id: "all",
              label: "All",
              active: "bg-[#1c1a17] text-white border-[#1c1a17]",
            },
            {
              id: "journal",
              label: "Journal",
              active: "bg-[#7a5838] text-white border-[#7a5838]",
            },
            {
              id: "news",
              label: "News",
              active: "bg-[#2a6a50] text-white border-[#2a6a50]",
            },
            {
              id: "essay",
              label: "Essay",
              active: "bg-[#5848a0] text-white border-[#5848a0]",
            },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id)}
              className={`${baseBtn} ${filter === btn.id ? btn.active : inactiveBtn}`}
            >
              {btn.label}
            </button>
          ))}
        </nav>

        {/* Masonry-style Grid */}
        {filteredEntries.length === 0 ? (
          <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-[#9e9890] py-32 text-center">
            No entries found for this category.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24 items-start">
            <div className="flex flex-col gap-24">
              {colLeft.map((entry) => (
                <JournalCard key={entry._id} post={entry} />
              ))}
            </div>
            <div className="flex flex-col gap-24 md:mt-32">
              {colRight.map((entry) => (
                <JournalCard key={entry._id} post={entry} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Newsletter
        title="Quiet dispatches"
        italicTitle="from the field"
        description="New work and process notes, sent sparingly."
      />
    </main>
  );
}
