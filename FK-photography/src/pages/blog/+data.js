// src/pages/blog/+data.js (server-only)
import { POSTS_PAGE, fetchPostsPage } from "@/lib/sanity/queries";

export async function data() {
  const offset = 0;
  const limit = 12;
  // Either use the GROQ with params or the helper; keeping both as examples.
  // const posts = await sanity.fetch(POSTS_PAGE, { offset, to: offset + limit });
  const posts = await fetchPostsPage(offset, limit);
  return { posts };
}
