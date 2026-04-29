// src/pages/journal/+data.js
import { sanity } from "@/lib/sanity/client";

const JOURNAL_QUERY = `
  *[_type in["post", "news", "documentaryProject"]] | order(coalesce(publishedAt, _createdAt) desc)[0...30] {
    _id,
    _type,
    title,
    "publishedAt": coalesce(publishedAt, _createdAt),
    excerpt, 
    "slug": slug.current,
    "image": select(
      defined(heroImage.asset) => heroImage{
        ...,
        asset->{
          _id,
          url,
          metadata{ lqip, dimensions{ aspectRatio, width, height } }
        }
      },
      defined(coverImage.asset) => coverImage{
        ...,
        asset->{
          _id,
          url,
          metadata{ lqip, dimensions{ aspectRatio, width, height } }
        }
      },
      defined(image.asset) => image{
        ...,
        asset->{
          _id,
          url,
          metadata{ lqip, dimensions{ aspectRatio, width, height } }
        }
      }
    ),
    externalLink
  }
`;

export async function data() {
  const entries = await sanity.fetch(JOURNAL_QUERY);
  return { entries };
}
