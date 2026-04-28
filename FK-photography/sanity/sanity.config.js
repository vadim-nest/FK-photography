import {buildLegacyTheme, defineConfig} from 'sanity'
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

  theme: buildLegacyTheme({
    '--black': '#15120f',
    '--white': '#f7f4ef',
    '--brand-primary': '#9a7447',
    '--component-bg': '#f7f4ef',
    '--component-text-color': '#221f1b',
    '--default-button-color': '#4e4942',
    '--default-button-primary-color': '#8b6f4e',
    '--default-button-success-color': '#2f6b55',
    '--default-button-warning-color': '#b4772f',
    '--default-button-danger-color': '#a94438',
    '--focus-color': '#c8a96e',
    '--gray-base': '#221f1b',
    '--gray': '#847d73',
    '--main-navigation-color': '#211d19',
    '--main-navigation-color--inverted': '#f7f4ef',
    '--state-info-color': '#466f88',
    '--state-success-color': '#2f6b55',
    '--state-warning-color': '#b4772f',
    '--state-danger-color': '#a94438',
  }),

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
