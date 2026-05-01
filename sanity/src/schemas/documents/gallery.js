import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (R) => R.required()}),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, ''),
      },
      validation: (R) => R.required(),
    }),
    defineField({name: 'coverImage', type: 'imageWithMeta', title: 'Cover image'}),
    defineField({name: 'description', type: 'text', rows: 3}),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'imageWithMeta'}],
      validation: (R) => R.min(1).warning('Prefer at least one image'),
    }),
    defineField({name: 'seo', type: 'seo', title: 'SEO'}),
  ],
  preview: {
    select: {title: 'title', media: 'coverImage'},
  },
})
