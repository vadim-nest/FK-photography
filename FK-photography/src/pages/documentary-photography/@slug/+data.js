import { sanity } from "@/lib/sanity/client.js";

const PROJECT_QUERY = `*[_type == "documentaryProject" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  year,
  location,
  excerpt,
  photoCount,
  "coverImage": {
    "url": coverImage.asset->url,
    "alt": coverImage.alt
  },
  "photoRows": photoRows[] {
    _key,
    layout,
    pullQuote,
    "images": images[] {
      "url": asset->url,
      "alt": alt,
      "caption": caption,
      "location": location
    }
  }
}`;

export async function data(pageContext) {
  const { slug } = pageContext.routeParams;
  // Use the 'sanity' variable to match the shared Sanity client.
  const project = await sanity.fetch(PROJECT_QUERY, { slug });

  return { project: project || null };
}
