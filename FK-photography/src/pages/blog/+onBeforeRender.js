import { fetchPostsPage } from "@/lib/sanity/queries";

export async function onBeforeRender() {
  const posts = await fetchPostsPage();
  
  return { pageContext: { pageProps: { posts } } };
}
