export default {
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    {name: 'title', type: 'string', validation: (R) => R.required()},
    {
      name: 'slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (R) => R.required(),
    },
    {name: 'coverImage', type: 'imageWithMeta', title: 'Cover image'},
    {name: 'description', type: 'text', rows: 3},
    {name: 'images', type: 'array', of: [{type: 'imageWithMeta'}], options: {sortable: true}},
  ],
}
