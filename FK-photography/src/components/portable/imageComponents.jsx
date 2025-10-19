// src/components/portable/imageComponents.jsx
import React from "react";
import { SmartImage } from "@/components/media/SmartImage.jsx";

export function makeImageComponents({ onImageClick } = {}) {
  const Figure = ({ value }) => {
    const handleClick = onImageClick ? () => onImageClick(value) : undefined;
    return (
      <figure className="my-5">
        <button
          type="button"
          onClick={handleClick}
          className={
            onImageClick
              ? "block overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              : undefined
          }
          aria-label={onImageClick ? "Open image in lightbox" : undefined}
        >
          <SmartImage
            image={value}
            alt={value?.alt || ""}
            sizes="(max-width: 900px) 100vw, 900px"
          />
        </button>
        {value?.caption && (
          <figcaption className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            {value.caption}
          </figcaption>
        )}
      </figure>
    );
  };

  return { types: { image: Figure, imageWithMeta: Figure } };
}
