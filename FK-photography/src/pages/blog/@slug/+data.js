import { sanity } from "@/lib/sanity/client.js";
import { POST_BY_SLUG } from "@/lib/sanity/queries";

export async function data(pageContext) {
  // Vike gives you route params as pageContext.routeParams
  const { slug } = pageContext.routeParams;
  const post = await sanity.fetch(POST_BY_SLUG, {slug: slug});
  return { post };
}
