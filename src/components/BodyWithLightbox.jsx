// src/components/BodyWithLightbox.jsx
import React, { useMemo, useCallback } from "react";
import { PortableBody } from "@/components/portable/PortableBody.jsx";
import { useLightbox } from "@/hooks/useLightbox.js";
import { toLightboxSlide } from "@/lib/sanity/toLightboxSlide.js";
import { BentoGrid } from "./journal/BentoGrid";

export function BodyWithLightbox({ blocks }) {
  const lightbox = useLightbox();

  // Create a flat array of all images in the post for the lightbox
  const allImages = useMemo(() => {
    if (!blocks) return [];
    return blocks.flatMap((block) => {
      if (block._type === "image" || block._type === "imageWithMeta")
        return [block];
      if (block._type === "bentoGallery") return block.images || [];
      return [];
    });
  }, [blocks]);

  const slides = useMemo(
    () => allImages.map(toLightboxSlide).filter(Boolean),
    [allImages],
  );

  const handleClick = useCallback(
    (clickedValue) => {
      // Find index by comparing the Sanity _key or the URL
      const idx = allImages.findIndex(
        (img) =>
          (img._key && img._key === clickedValue._key) ||
          img.url === clickedValue.url,
      );
      if (idx > -1) {
        lightbox.show(slides, idx);
      }
    },
    [allImages, slides, lightbox],
  );

  const bentoComponent = {
    types: {
      bentoGallery: ({ value }) => (
        <BentoGrid value={value} onImageClick={handleClick} />
      ),
    },
  };

  return (
    <PortableBody
      value={blocks}
      onImageClick={handleClick}
      components={bentoComponent}
    />
  );
}
