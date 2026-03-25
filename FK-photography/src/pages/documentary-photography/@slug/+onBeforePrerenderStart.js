import { sanity } from "@/lib/sanity/client.js";

export default async function onBeforePrerenderStart() {
  const slugs = await sanity.fetch(
    `*[_type == "documentaryProject" && defined(slug.current)].slug.current`,
  );
  // This tells Vike exactly which URLs to build at compile time
  return slugs.map((s) => `/documentary-photography/${s}`);
}
