import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({name: 'title', type: 'string', title: 'Title', validation: (R) => R.max(70)}),
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
      title: 'Description',
      validation: (R) => R.max(160),
    }),
    defineField({
      name: 'ogImage',
      type: 'imageWithMeta',
      title: 'OG Image',
      description: 'Recommended 1200×630',
    }),
    defineField({name: 'noindex', type: 'boolean', title: 'No index', initialValue: false}),
  ],
})
