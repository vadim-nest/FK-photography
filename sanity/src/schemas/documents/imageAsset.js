import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'sanity.imageAsset',
  title: 'Image Asset',
  type: 'document',
  fields: [
    defineField({
      name: 'altText',
      type: 'string',
      title: 'Alt Text',
      description:
        'Describe this image for screen readers. This will follow the image everywhere it is used.',
      // Optional: Make it required so you don't forget
      validation: (Rule) => Rule.required().min(2).max(160),
    }),
  ],
})
