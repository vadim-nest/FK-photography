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
              ? "block overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
              : "w-full"
          }
          aria-label={onImageClick ? "Open image in lightbox" : undefined}
        >
          <SmartImage
            image={value}
            alt={value?.alt || ""}
            sizes="(max-width: 1122px) 100vw, 1122px"
          />
        </button>
        {value?.caption && (
          <figcaption className="text-center mt-2 text-sm text-zinc-800 ">
            {value.caption}
          </figcaption>
        )}
      </figure>
    );
  };

  return { types: { image: Figure, imageWithMeta: Figure } };
}
