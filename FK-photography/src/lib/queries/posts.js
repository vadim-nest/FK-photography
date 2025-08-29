import { sanity } from "../sanity/client";

// src/lib/queries/posts.js
export const POSTS_LIST = `*[_type == "post"] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  excerpt,
  heroImage{
    ...,
    asset->{
      _id,
      url,
      metadata{ lqip, dimensions{aspectRatio,width,height} }
    }
  }
}`;

// with pagination (skip/take)
export const POSTS_PAGE = `
*[_type == "post"] 
  | order(publishedAt desc)
  [$offset...$to]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    heroImage{
      ...,
      asset->{
        _id,
        url,
        metadata{ lqip, dimensions{ aspectRatio, width, height } }
      }
    }
  }`;

export async function fetchPostsPage(offset = 0, limit = 12) {
  const to = offset + limit; // do math in JS
  return sanity.fetch(POSTS_PAGE, { offset, to }); // pass as GROQ params
}

export const POST_BY_SLUG = `
*[_type == "post" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, publishedAt, excerpt,
  heroImage{ ..., asset->{ url, metadata{ lqip, dimensions{ aspectRatio } } } },
  body[],
  seo{ title, description, ogImage{ ..., asset->{ url, metadata{ lqip } } } }
}`;
