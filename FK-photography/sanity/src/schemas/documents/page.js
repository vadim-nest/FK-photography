import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', title: 'Title', validation: (R) => R.required()}),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
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
    defineField({name: 'heroImage', type: 'imageWithMeta', title: 'Hero image'}),
    defineField({name: 'intro', type: 'text', title: 'Intro', rows: 3}),
    defineField({name: 'content', title: 'Content', type: 'richText'}),
    defineField({name: 'seo', type: 'seo', title: 'SEO'}),
  ],
  preview: {
    select: {title: 'title', media: 'heroImage'},
  },
})
