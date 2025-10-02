import React, { useMemo } from "react";
import { PortableBody } from "@/components/portable/PortableBody.jsx";
import { useLightbox } from "@/hooks/useLightbox.js";
import { toLightboxSlide } from "@/lib/sanity/toLightboxSlide.js";

export function BodyWithLightbox({ blocks }) {
  const lightbox = useLightbox();
  const images = useMemo(
    () =>
      (blocks || []).filter(
        (b) => b && (b._type === "image" || b._type === "imageWithMeta")
      ),
    [blocks]
  );
  const slides = useMemo(
    () => images.map(toLightboxSlide).filter(Boolean),
    [images]
  );

  const handleClick = (value) => {
    const idx = images.findIndex((img) => img._key === value._key);
    lightbox.show(slides, Math.max(0, idx));
  };

  return <PortableBody value={blocks} onImageClick={handleClick} />;
}
