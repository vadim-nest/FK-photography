import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'documentaryHubSettings',
  title: 'Documentary Hub Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'introText',
      title: 'Intro & Interleaved Paragraphs',
      type: 'array',
      of: [{type: 'string'}],
      description:
        'Add paragraphs here. The first one appears at the top, the rest will be placed between projects.',
    }),
    defineField({
      name: 'featuredVideos',
      title: 'Featured Videos',
      type: 'array',
      description:
        'Add one or more videos. Multiple videos will automatically display in a grid at the bottom.',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'embedUrl', type: 'url', title: 'Embed URL (YouTube/Vimeo)'},
            {name: 'label', type: 'string'},
            {name: 'caption', type: 'string'},
          ],
        },
      ],
    }),
  ],
})
