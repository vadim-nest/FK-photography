// src/lib/sanity/toLightboxSlide.js
import imageUrlBuilder from "@sanity/image-url";
import { getImageDimensions } from "@sanity/asset-utils";
import { sanity } from "@/lib/sanity/client";

const urlFor = (src) => imageUrlBuilder(sanity).image(src);
const asArray = (x) => (Array.isArray(x) ? x : []);

export function toLightboxSlide(block) {
  const img = block?.asset ? block : (block?.image ?? block);
  if (!img?.asset?._ref) return null;

  const { width, height } = getImageDimensions(img);
  const src = urlFor(img).width(2000).fit("max").url();
  const sources = asArray(block?.sources);

  return {
    src,
    width,
    height,
    alt: img.alt || "",
    caption: img.caption || "",
    sources,
  };
}
