import { sanity } from "@/lib/sanity/client.js";
import { POST_BY_SLUG } from "@/lib/sanity/queries";

export async function data(pageContext) {
  const { slug } = pageContext.routeParams;
  const post = await sanity.fetch(POST_BY_SLUG, { slug });

  // 🔥 HIGHLIGHT: Fetching recent posts (excluding the current one)
  const recentPosts = await sanity.fetch(
    `*[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0...3] {
      _id, title, "slug": slug.current, publishedAt, _createdAt,
      "category": categories[0]->title,
      heroImage{
        ...,
        asset->{
          _id,
          url,
          metadata{ lqip, dimensions{ aspectRatio, width, height } }
        }
      }
    }`,
    { slug },
  );

  return {
    post: post || null,
    recentPosts, // Now your UI will actually receive this!
  };
}
