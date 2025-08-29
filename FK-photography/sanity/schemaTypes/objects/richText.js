export default {
  name: 'richText',
  title: 'Rich Text',
  type: 'array',
  of: [
    {type: 'block'}, // paragraphs, headings, lists
    {type: 'imageWithMeta'}, // inline full-bleed images
    // add more custom blocks later (quote, embed, gallery, code, etc.)
  ],
}
