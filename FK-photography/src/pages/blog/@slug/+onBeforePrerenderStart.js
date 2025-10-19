// src/pages/blog/@slug/+onBeforePrerenderStart.js
import { sanity } from "@/lib/sanity/client.js";

export default async function onBeforePrerenderStart() {
  const slugs = await sanity.fetch(
    `*[_type == "post" && defined(slug.current)].slug.current`
  );
  return slugs.map((s) => `/blog/${s}`);
}
