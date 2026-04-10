import { sanity } from "@/lib/sanity/client.js";

const HUB_QUERY = `{
  "settings": *[_type == "documentaryHubSettings"][0]{
    introText,
    featuredVideos
  },
  "projects": *[_type == "documentaryProject"] | order(order asc) {
    _id,
    "title": title,
    "slug": slug.current,
    year,
    location,
    excerpt,
    "coverImage": {
      "url": coverImage.asset->url,
      "alt": coverImage.alt,
      "dimensions": coverImage.asset->metadata.dimensions
    },
    "hubPresentation": {
      "layout": hubPresentation.layout,
      "text": hubPresentation.text,
      "images": hubPresentation.images[]{
        "url": asset->url,
        "alt": alt,
        "dimensions": asset->metadata.dimensions
      }
    },
    "galleryImages": photoRows[].images[]{
      "url": asset->url,
      "alt": alt,
      "dimensions": asset->metadata.dimensions
    }
  }
}`;

export async function data() {
  const result = await sanity.fetch(HUB_QUERY);

  // SAFE HANDLING FOR introText:
  // If it's already an array (from the new schema), keep it.
  // If it's a string (from old data), split it.
  // If it's empty, return an empty array.
  const rawIntro = result.settings?.introText;
  let introChunks = [];

  if (Array.isArray(rawIntro)) {
    introChunks = rawIntro;
  } else if (typeof rawIntro === "string") {
    introChunks = rawIntro.split(/\n{2,}/).filter(Boolean);
  }

  return {
    introText: introChunks,
    featuredVideos: result.settings?.featuredVideos ?? [],
    projects: result.projects ?? [],
  };
}
