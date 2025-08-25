export default {
  name: 'story',
  title: 'Story',
  type: 'document',
  fields: [
    {name: 'title', type: 'string', validation: (R) => R.required()},
    {
      name: 'slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (R) => R.required(),
    },
    {
      name: 'date',
      type: 'date',
      title: 'Date',
      options: {dateFormat: 'YYYY-MM-DD'},
      initialValue: () => new Date().toISOString().slice(0, 10),
    },
    {name: 'heroImage', type: 'imageWithMeta', title: 'Hero image'},
    {name: 'summary', type: 'text', rows: 3},
    {name: 'gallery', type: 'array', of: [{type: 'imageWithMeta'}]},
    {name: 'tags', type: 'array', of: [{type: 'string'}], options: {layout: 'tags'}},
    {name: 'client', type: 'string', hidden: true}, // unhide when needed
    {name: 'location', type: 'string', hidden: true},
    {name: 'seo', type: 'seo'},
  ],
}
