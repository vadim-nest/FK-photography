import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'imageWithMeta',
  title: 'Image',
  type: 'image',
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alt text',
      validation: (Rule) => Rule.required().min(2).max(160),
    }),
    defineField({
      name: 'caption',
      type: 'string',
      title: 'Caption',
      validation: (Rule) => Rule.max(200),
    }),
  ],
})
