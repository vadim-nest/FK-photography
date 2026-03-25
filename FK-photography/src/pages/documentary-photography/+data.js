import { sanity } from "@/lib/sanity/client.js";

// Keep the query here or move to a central queries file like your blog
const HUB_QUERY = `{
  "settings": *[_type == "documentaryHubSettings"][0]{
    introText,
    featuredVideo
  },
  "projects": *[_type == "documentaryProject"] | order(order asc) {
    _id,
    "title": title,
    "slug": slug.current,
    year,
    location,
    excerpt,
    photoCount,
    "coverImage": {
      "url": coverImage.asset->url,
      "alt": coverImage.alt
    }
  }
}`;

export async function data() {
  const result = await sanity.fetch(HUB_QUERY);

  return {
    introText: result.settings?.introText ?? null,
    featuredVideo: result.settings?.featuredVideo ?? null,
    projects: result.projects ?? [],
  };
}
