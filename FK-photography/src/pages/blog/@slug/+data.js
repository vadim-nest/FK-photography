// src/pages/blog/@slug/+data.js (server-only)
import { sanity } from "@/lib/sanity/client.js";
import { POST_BY_SLUG } from "@/lib/sanity/queries";

export async function data(pageContext) {
  const { slug } = pageContext.routeParams;
  const post = await sanity.fetch(POST_BY_SLUG, { slug });
  return { post: post || null };
}
