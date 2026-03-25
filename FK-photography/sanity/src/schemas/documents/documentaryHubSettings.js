import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'documentaryHubSettings',
  title: 'Documentary Hub Settings',
  type: 'document',
  // You might want to hide 'create' and 'delete' in desk structure later
  fields: [
    defineField({
      name: 'introText',
      title: 'Intro Text',
      type: 'text',
      description: 'Plain text. Use double line breaks for new paragraphs.',
    }),
    defineField({
      name: 'featuredVideo',
      type: 'object',
      fields: [
        {name: 'embedUrl', type: 'url', title: 'Embed URL (YouTube/Vimeo)'},
        {name: 'label', type: 'string'},
        {name: 'caption', type: 'string'},
      ],
    }),
  ],
})
