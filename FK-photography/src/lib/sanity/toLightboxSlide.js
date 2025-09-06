// src/lib/sanity/toLightboxSlide.js
import imageUrlBuilder from "@sanity/image-url";
import { getImageDimensions } from "@sanity/asset-utils";
import { sanity } from "@/lib/sanity/client";

const urlFor = (src) => imageUrlBuilder(sanity).image(src);
const asArray = (x) => (Array.isArray(x) ? x : []);

export function toLightboxSlide(block) {
  // accept PT `image` blocks or your `imageWithMeta`
  const img = block?.asset ? block : (block?.image ?? block);
  if (!img?.asset?._ref) return null; // skip non-images

  const { width, height } = getImageDimensions(img);
  const src = urlFor(img).width(2000).fit("max").url();

  // 🔒 never spread unless it's truly an array
  const sources = asArray(block?.sources);

  return {
    src,
    width,
    height,
    alt: img.alt || "",
    caption: img.caption || "",
    sources, // always an array
  };
}
