export default {
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}, {type: 'imageWithMeta'}],
      validation: (Rule) => Rule.min(0),
    },
    {name: 'seo', title: 'SEO', type: 'seo'},
  ],
  preview: {
    prepare: () => ({title: 'Homepage'}),
  },
}
