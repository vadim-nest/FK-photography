export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    {name: 'title', type: 'string', title: 'Title', validation: (R) => R.required()},
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {source: 'title', maxLength: 96},
      validation: (R) => R.required(),
    },
    {name: 'heroImage', type: 'imageWithMeta', title: 'Hero image'},
    {name: 'intro', type: 'text', title: 'Intro', rows: 3},
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}, {type: 'imageWithMeta'}],
    },
    {name: 'seo', type: 'seo', title: 'SEO'},
  ],
}
