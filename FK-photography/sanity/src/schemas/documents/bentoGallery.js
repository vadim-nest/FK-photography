import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'bentoGallery',
  title: 'Bento Image Gallery',
  type: 'object',
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'imageWithMeta'}], // reusing the image type you already have
      options: {
        layout: 'grid',
      },
      validation: (Rule) => Rule.min(1).max(6).error('You can add between 1 and 6 images.'),
    }),
  ],
  preview: {
    select: {
      images: 'images',
    },
    prepare({images}) {
      return {
        title: `Bento Gallery (${images?.length || 0} images)`,
        media: images?.[0],
      }
    },
  },
})
