import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'story',
  title: 'Story',
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
      name: 'date',
      type: 'date',
      title: 'Date',
      options: {dateFormat: 'YYYY-MM-DD'},
      initialValue: () => new Date().toISOString().slice(0, 10),
    }),
    defineField({name: 'heroImage', type: 'imageWithMeta', title: 'Hero image'}),
    defineField({name: 'summary', type: 'text', rows: 3}),
    defineField({name: 'gallery', type: 'array', of: [{type: 'imageWithMeta'}]}),
    defineField({name: 'tags', type: 'array', of: [{type: 'string'}], options: {layout: 'tags'}}),
    defineField({name: 'client', type: 'string', hidden: true}),
    defineField({name: 'location', type: 'string', hidden: true}),
    defineField({name: 'seo', type: 'seo'}),
  ],
  orderings: [{title: 'Date desc', name: 'dateDesc', by: [{field: 'date', direction: 'desc'}]}],
  preview: {
    select: {title: 'title', media: 'heroImage', date: 'date'},
    prepare: ({title, media, date}) => ({title, media, subtitle: date}),
  },
})
