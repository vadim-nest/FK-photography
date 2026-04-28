import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fieldsets: [
    {name: 'header', title: 'Header', options: {collapsible: true, collapsed: false}},
    {name: 'belowHeader', title: 'Below Header', options: {collapsible: true, collapsed: false}},
  ],
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Faruk Kara',
      fieldset: 'header',
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
      rows: 4,
      description: 'Short homepage introduction shown to the left of the main image.',
      fieldset: 'header',
    }),
    defineField({
      name: 'quoteText',
      title: 'Quote Text',
      type: 'text',
      rows: 2,
      initialValue: 'There are no rules for good photos, there are only good photos.',
      fieldset: 'header',
    }),
    defineField({
      name: 'quoteAuthor',
      title: 'Quote Author',
      type: 'string',
      initialValue: 'Ansel Adams',
      fieldset: 'header',
    }),
    defineField({
      name: 'content',
      title: 'Header Image / Legacy Content',
      type: 'richText',
      description:
        'The first image is used as the homepage main image. The first text block is used as the quote fallback.',
      validation: (Rule) => Rule.min(0),
      fieldset: 'header',
    }),
    defineField({
      name: 'featureSections',
      title: 'Feature Sections',
      type: 'array',
      description:
        'Documentary, Performance and Journal sections shown below the header. Drag to change their order.',
      fieldset: 'belowHeader',
      validation: (Rule) => Rule.min(3).max(3),
      of: [
        {
          type: 'object',
          title: 'Feature Section',
          fields: [
            defineField({
              name: 'title',
              title: 'Large Text / Link Heading',
              type: 'string',
              description: 'The main visible heading, e.g. Documentary.',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'smallText',
              title: 'Small Text',
              type: 'string',
            }),
            defineField({
              name: 'href',
              title: 'Link URL or Path',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'layout',
              title: 'Layout',
              type: 'string',
              initialValue: 'documentary',
              options: {
                list: [
                  {title: 'Documentary collage', value: 'documentary'},
                  {title: 'Performance split', value: 'performance'},
                  {title: 'Journal cards', value: 'journal'},
                ],
                layout: 'radio',
              },
            }),
            defineField({
              name: 'images',
              title: 'Images',
              type: 'array',
              of: [{type: 'imageWithMeta'}],
              validation: (Rule) => Rule.max(3),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'layout',
              media: 'images.0',
            },
          },
        },
      ],
      initialValue: [
        {
          title: 'Documentary',
          smallText: 'Interested in the people and how they connect with their environment.',
          href: '/documentary-photography',
          layout: 'documentary',
        },
        {
          title: 'Performance',
          smallText: 'Inject humour and playfulness... where narrative demands.',
          href: '/live-performance-photography',
          layout: 'performance',
        },
        {
          title: 'Journal',
          smallText: 'Recording Cambridge in both town and gown.',
          href: '/journal',
          layout: 'journal',
        },
      ],
    }),
    defineField({
      name: 'contactWidget',
      title: 'Contact Widget',
      type: 'object',
      fieldset: 'belowHeader',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Have a story in mind?',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
          initialValue:
            'For commissions, collaborations, prints, or performance coverage, send a note and we can start there.',
        }),
        defineField({
          name: 'email',
          title: 'Email',
          type: 'email',
        }),
        defineField({
          name: 'linkText',
          title: 'Link Text',
          type: 'string',
          initialValue: 'Start a conversation',
        }),
      ],
    }),
    defineField({
      name: 'newsletterWidget',
      title: 'Newsletter Widget',
      type: 'object',
      fieldset: 'belowHeader',
      fields: [
        defineField({name: 'tag', title: 'Tag', type: 'string', initialValue: 'Newsletter'}),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Quiet dispatches',
        }),
        defineField({
          name: 'italicTitle',
          title: 'Italic Title',
          type: 'string',
          initialValue: 'from the field',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
          initialValue: 'New work and process notes, sent sparingly.',
        }),
      ],
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  preview: {
    prepare: () => ({title: 'Homepage'}),
  },
})
