import siteSettings from './documents/siteSettings'
import navigationItem from './documents/navigationItem'
import homepage from './documents/homepage'
import page from './documents/page'
import story from './documents/story'
import gallery from './documents/gallery'
import post from './documents/post'
import documentaryProject from './documents/documentaryProject'
import documentaryHubSettings from './documents/documentaryHubSettings'
import imageAsset from './documents/imageAsset'
import bentoGallery from './documents/bentoGallery'

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
  documentaryProject,
  documentaryHubSettings,
  imageAsset,
  bentoGallery,
  // objects
  seo,
  imageWithMeta,
  richText,
]
