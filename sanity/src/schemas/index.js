import siteSettings from './documents/siteSettings'
import navigationItem from './documents/navigationItem'
import homepage from './documents/homepage'
import post from './documents/post'
import news from './documents/news'
import documentaryProject from './documents/documentaryProject'
import documentaryHubSettings from './documents/documentaryHubSettings'
import performancePage from './documents/performancePage'
import aboutPage from './documents/aboutPage'
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
  news,
  post,
  documentaryProject,
  documentaryHubSettings,
  performancePage,
  aboutPage,
  imageAsset,
  bentoGallery,
  // objects
  seo,
  imageWithMeta,
  richText,
]
