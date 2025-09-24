import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'navigationItem',
  title: 'Navigation Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'linkType',
      type: 'string',
      title: 'Link type',
      options: {list: ['internal', 'external'], layout: 'radio'},
      initialValue: 'internal',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'internalRef',
      title: 'Internal reference',
      type: 'reference',
      to: [{type: 'page'}, {type: 'story'}, {type: 'gallery'}],
      hidden: ({parent}) => parent?.linkType !== 'internal',
      validation: (Rule) =>
        Rule.custom((val, ctx) => {
          if (ctx.parent?.linkType === 'internal' && !val) return 'Required for internal links'
          return true
        }),
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      hidden: ({parent}) => parent?.linkType !== 'external',
      validation: (Rule) =>
        Rule.custom((val, ctx) => {
          if (ctx.parent?.linkType === 'external' && !val) return 'Required for external links'
          return true
        }),
    }),
    defineField({name: 'order', type: 'number', title: 'Order', initialValue: 0}),
    defineField({name: 'visible', type: 'boolean', title: 'Visible', initialValue: true}),
  ],
  orderings: [{title: 'Order asc', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({title}),
  },
})
