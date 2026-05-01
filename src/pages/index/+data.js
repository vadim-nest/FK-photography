// src/pages/index/+data.js (server-only)
export { data };

import { sanity } from "@/lib/sanity/client";
import { homepageQuery } from "@/lib/sanity/queries";

const LATEST_JOURNAL_QUERY = `
  *[_type in["post", "news", "documentaryProject"]]
    | order(coalesce(publishedAt, _createdAt) desc)[0...3] {
      _id,
      _type,
      title,
      "publishedAt": coalesce(publishedAt, _createdAt),
      excerpt,
      "slug": slug.current,
      externalLink,
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
      )
    }
`;

async function data() {
  const [homepage, latestJournal] = await Promise.all([
    sanity.fetch(homepageQuery),
    sanity.fetch(LATEST_JOURNAL_QUERY),
  ]);

  return { homepage, latestJournal };
}
