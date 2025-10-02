import { sanity } from "@/lib/sanity/client.js";

export default async function onBeforePrerenderStart() {
  // Fetch all post slugs; keep it cheap (no heavy fields)
  const slugs = await sanity.fetch(
    `*[_type == "post" && defined(slug.current)].slug.current`
  );
  // Return URLs for the static generator
  return slugs.map((s) => `/blog/${s}`);
}
