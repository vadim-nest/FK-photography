import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'richText',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  preview: {
    prepare: () => ({title: 'Homepage'}),
  },
})
