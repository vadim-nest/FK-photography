import siteSettings from './siteSettings'
import navigationItem from './navigationItem'
import page from './page'
import story from './story'
import gallery from './gallery'

import seo from './objects/seo'
import imageWithMeta from './objects/imageWithMeta'

export const schemaTypes = [
  // documents
  siteSettings,
  navigationItem,
  page,
  story,
  gallery,
  // objects
  seo,
  imageWithMeta,
]
