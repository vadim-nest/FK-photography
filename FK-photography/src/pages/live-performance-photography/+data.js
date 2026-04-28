import { sanity } from "@/lib/sanity/client.js";

const PERFORMANCE_PAGE_QUERY = `*[_type == "performancePage"][0] {
  title,
  intro,
  seo,
  "images": images[] {
    _key,
    "url": asset->url,
    "alt": coalesce(asset->altText, caption, ^.title),
    caption,
    "dimensions": asset->metadata.dimensions,
    "lqip": asset->metadata.lqip
  }
}`;

export async function data() {
  const page = await sanity.fetch(PERFORMANCE_PAGE_QUERY);

  return {
    page: page ?? {
      title: "Performance",
      intro:
        "Capturing movement and light as they collide on stage: fleeting gestures, charged atmosphere, and the split seconds that make live performance feel alive.",
      images: [],
    },
  };
}
