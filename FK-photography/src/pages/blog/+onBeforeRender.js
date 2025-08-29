import { fetchPostsPage } from "../../lib/queries/posts.js";

export async function onBeforeRender() {
  const posts = await fetchPostsPage();
  
  return { pageContext: { pageProps: { posts } } };
}
