// src/components/media/SmartImage.jsx
import React, { useEffect, useRef, useState } from "react";
import { urlFor } from "@/lib/sanity/image";

export function SmartImage({
  image,
  alt,
  sizes = "(max-width: 800px) 100vw, 1200px",
  widths = [400, 800, 1200, 1600],
  aspect,
  radius = "0.75rem",
  className = "",
  priority = false,
}) {
  const meta = image?.asset?.metadata || {};
  const lqip = meta?.lqip;
  const ratio = aspect || meta.dimensions?.aspectRatio || 1.5;

  const base = urlFor(image).auto("format").fit("max");
  const src = base.width(1200).url();
  const srcSet = widths.map((w) => `${base.width(w).url()} ${w}w`).join(", ");

  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) setLoaded(true);
  }, [src]);

  if (!image?.asset) return null;

  return (
    <div
      className={`relative overflow-hidden bg-contain bg-center bg-no-repeat ${className}`}
      style={{
        aspectRatio: ratio,
        borderRadius: radius,
        backgroundImage: lqip ? `url(${lqip})` : undefined,
      }}
    >
      <img
        ref={imgRef}
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt || image?.alt || ""}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={[
          "w-full h-full object-contain block",
          "transition-[filter] duration-[250ms] ease-out",
          loaded ? "blur-none" : "blur-md",
        ].join(" ")}
        style={{ borderRadius: radius }}
      />
      <style>{`
@media (prefers-reduced-motion: reduce) { img { transition: none !important; } }
`}</style>
    </div>
  );
}
