import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
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
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({name: 'heroImage', type: 'imageWithMeta'}),
    defineField({name: 'excerpt', type: 'text', rows: 3}),
    defineField({name: 'body', type: 'richText'}),
    defineField({name: 'seo', type: 'seo', title: 'SEO'}),
  ],
  orderings: [
    {title: 'Published desc', name: 'pubDesc', by: [{field: 'publishedAt', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'title', media: 'heroImage'},
  },
})
