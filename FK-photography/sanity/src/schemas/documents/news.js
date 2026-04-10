// sanity/schemas/news.js
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'news',
  title: 'News',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (R) => R.required()}),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({name: 'image', type: 'imageWithMeta', title: 'Image'}),
    defineField({
      name: 'excerpt',
      title: 'Excerpt / Summary',
      type: 'array',
      of: [
        {
          type: 'block',
          // We only need basic formatting for an excerpt
          styles: [],
          lists: [],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [{name: 'href', type: 'url'}],
              },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'externalLink',
      type: 'url',
      title: 'External Link',
      description: 'Optional link to an external website (e.g. awards page, publication)',
    }),
  ],
  orderings: [
    {title: 'Published desc', name: 'pubDesc', by: [{field: 'publishedAt', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'title', media: 'image'},
  },
})
