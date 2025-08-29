export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {name: 'title', type: 'string', validation: (R) => R.required()},
    {
      name: 'slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (R) => R.required(),
    },
    {name: 'publishedAt', type: 'datetime', initialValue: () => new Date().toISOString()},
    {name: 'heroImage', type: 'imageWithMeta'},
    {name: 'excerpt', type: 'text', rows: 3},
    {name: 'body', type: 'richText'},
    // simple SEO for now
    {
      name: 'seo',
      type: 'object',
      fields: [
        {name: 'title', type: 'string'},
        {name: 'description', type: 'text'},
        {name: 'ogImage', type: 'imageWithMeta'},
      ],
    },
  ],
  preview: {
    select: {title: 'title', media: 'heroImage'},
  },
}
