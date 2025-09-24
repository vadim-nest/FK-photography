import siteSettings from './documents/siteSettings'
import navigationItem from './documents/navigationItem'
import homepage from './documents/homepage'
import page from './documents/page'
import story from './documents/story'
import gallery from './documents/gallery'
import post from './documents/post'

import seo from './objects/seo'
import imageWithMeta from './objects/imageWithMeta'
import richText from './objects/richText'

export const schemaTypes = [
  // documents
  siteSettings,
  navigationItem,
  homepage,
  page,
  story,
  gallery,
  post,
  // objects
  seo,
  imageWithMeta,
  richText,
]
