export const homepageQuery = `*[_id == "homepage"][0]{
  content[]{
    ..., 
    imageWithMeta{..., asset->}
  },
  seo{...}
}`;
