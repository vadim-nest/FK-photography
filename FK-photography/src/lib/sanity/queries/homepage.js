export const homepageQuery = `*[_id == "homepage"][0]{
  heading,
  intro,
  quoteText,
  quoteAuthor,
  featureSections[]{
    ...,
    "smallText": coalesce(smallText, eyebrow),
    images[]{
      ...,
      asset->{
        _id,
        url,
        metadata{ lqip, dimensions{ aspectRatio, width, height } }
      }
    }
  },
  contactWidget,
  newsletterWidget,
  content[]{
    ..., 
    imageWithMeta{..., asset->}
  },
  seo{...}
}`;
