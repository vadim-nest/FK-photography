// Server-only: fetched at build-time (prerender) or on-demand in dev
import { sanity } from "@/lib/sanity/client.js";
import { POSTS_PAGE } from "@/lib/sanity/queries";

export async function data() {
  // first page only; add pagination later
  const offset = 0;
  const limit = 12;
  const to = offset + limit;
  const posts = await sanity.fetch(POSTS_PAGE, { offset, to });
  return { posts };
}
