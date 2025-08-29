// src/components/SmartImage.jsx
import React, { useEffect, useRef, useState } from "react";
import { urlFor } from "../lib/sanity/sanityImage.js";

export function SmartImage({
  image,
  alt,
  sizes = "(max-width: 800px) 100vw, 1200px",
  widths = [400, 800, 1200, 1600],
  aspect,
  className,
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

  // ✅ If the image is already cached, `onLoad` may not fire.
  // Check `complete` on mount and after src changes.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [src]);

  if (!image?.asset) return null;

  return (
    <div
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "8px",
        backgroundImage: lqip ? `url(${lqip})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        aspectRatio: ratio,
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
        fetchpriority={priority ? "high" : "auto"}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)} // don't keep it blurry forever on error
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          filter: loaded ? "blur(0px)" : "blur(12px)",
          transform: loaded ? "scale(1)" : "scale(1.03)",
          transition: "filter 250ms ease, transform 250ms ease",
          willChange: "filter, transform",
        }}
      />
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          img { transition: none !important; }
        }
      `}</style>
    </div>
  );
}
