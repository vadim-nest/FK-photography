// src/pages/journal/+data.js
import { sanity } from "@/lib/sanity/client";

const JOURNAL_QUERY = `
  *[_type in["post", "news", "documentaryProject"]] | order(coalesce(publishedAt, _createdAt) desc)[0...30] {
    _id,
    _type,
    title,
    "publishedAt": coalesce(publishedAt, _createdAt),
    excerpt, 
    "slug": slug.current,
    "image": coalesce(heroImage, coverImage, image),
    externalLink
  }
`;

export async function data() {
  const entries = await sanity.fetch(JOURNAL_QUERY);
  return { entries };
}
