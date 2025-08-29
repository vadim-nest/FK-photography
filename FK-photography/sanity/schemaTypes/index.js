import siteSettings from './siteSettings'
import navigationItem from './navigationItem'
import page from './page'
import story from './story'
import gallery from './gallery'
import post from './post'

import seo from './objects/seo'
import imageWithMeta from './objects/imageWithMeta'
import richText from './objects/richText'

export const schemaTypes = [
  // documents
  siteSettings,
  navigationItem,
  page,
  story,
  gallery,
  post,
  // objects
  seo,
  imageWithMeta,
  richText,
]
