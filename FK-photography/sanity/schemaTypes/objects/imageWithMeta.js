export default {
  name: 'imageWithMeta',
  title: 'Image',
  type: 'image',
  options: {hotspot: true},
  fields: [
    {name: 'alt', type: 'string', title: 'Alt text', validation: (Rule) => Rule.required()},
    {name: 'caption', type: 'string', title: 'Caption'},
  ],
}
