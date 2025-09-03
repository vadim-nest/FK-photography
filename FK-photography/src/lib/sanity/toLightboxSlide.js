import { urlFor } from "./sanityImage.js";

/**
 * Build a lightbox slide with responsive srcSet.
 * Requires width/height for srcSet items (lightbox uses them to generate srcset/sizes).
 */
export function toLightboxSlide(image, widths = [320, 640, 1200, 2048, 3840]) {
  const meta = image?.asset?.metadata || {};
  const { width, height } = meta?.dimensions || {};
  // fallbacks if missing
  const baseW = width || 1200;
  const baseH =
    height || Math.round(baseW / (meta.dimensions?.aspectRatio || 1.5));

  return {
    // highest-res src first
    src: urlFor(image)
      .auto("format")
      .width(Math.max(...widths))
      .url(),
    alt: image?.alt || "",
    width: baseW,
    height: baseH,
    srcSet: widths.map((w) => ({
      src: urlFor(image).auto("format").width(w).url(),
      width: w,
      height: Math.round((w / baseW) * baseH),
    })),
  };
}
