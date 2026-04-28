import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './src/schemas'
import {deskStructure} from './src/desk/structure'
import {media, mediaAssetSource} from 'sanity-plugin-media'

export default defineConfig({
  name: 'default',
  title: 'FK-photography',

  projectId: 'z4m6r2xn',
  dataset: 'production',

  plugins: [media(), structureTool({structure: deskStructure}), visionTool()],

  form: {
    image: {
      // 2. Explicitly set the mediaAssetSource as the only option
      assetSources: () => {
        return [mediaAssetSource]
      },
    },
    // Do the same for files if you use them
    file: {
      assetSources: () => {
        return [mediaAssetSource]
      },
    },
  },

  schema: {
    types: schemaTypes,
  },

  // Lock down actions for singletons (homepage + siteSettings)
  document: {
    actions: (prev, context) => {
      const isSingleton = ['homepage', 'siteSettings'].includes(context.schemaType)
      return isSingleton
        ? prev.filter((a) => !['unpublish', 'delete', 'duplicate'].includes(a.action))
        : prev
    },
  },
})
