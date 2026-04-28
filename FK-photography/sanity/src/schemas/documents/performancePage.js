import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'performancePage',
  title: 'Performance Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Performance',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
      rows: 3,
      initialValue:
        'Performance photography is about holding movement and light in the same breath: the blur of a gesture, the heat of a spotlight, the charged seconds that disappear as soon as they arrive.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Performance Images',
      type: 'array',
      of: [{type: 'imageWithMeta'}],
      validation: (Rule) => Rule.min(1).warning('Add images to fill the masonry scroll.'),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {title: 'title', media: 'images.0'},
  },
})
