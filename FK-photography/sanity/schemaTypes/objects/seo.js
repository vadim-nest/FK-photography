export default {
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    {name: 'title', type: 'string', title: 'Title'},
    {name: 'description', type: 'text', rows: 3, title: 'Description'},
    {name: 'ogImage', type: 'image', title: 'OG Image', options: {hotspot: true}},
    {name: 'noindex', type: 'boolean', title: 'No index'},
  ],
}
