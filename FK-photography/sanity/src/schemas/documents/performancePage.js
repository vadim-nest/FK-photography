import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'performancePage',
  title: 'Performance Page',
  type: 'document',
  fieldsets: [
    {name: 'intro', title: 'Page Intro', options: {collapsible: true, collapsed: false}},
    {name: 'content', title: 'Performance Sections', options: {collapsible: true, collapsed: false}},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Performance',
      validation: (Rule) => Rule.required(),
      fieldset: 'intro',
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
      rows: 3,
      initialValue:
        'Performance photography is about holding movement and light in the same breath: the blur of a gesture, the heat of a spotlight, the charged seconds that disappear as soon as they arrive.',
      validation: (Rule) => Rule.required(),
      fieldset: 'intro',
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      description:
        'Add one section per theatre production, music gig, festival, rehearsal, or other performance story. Drag sections to change their order.',
      fieldset: 'content',
      of: [
        {
          type: 'object',
          title: 'Performance Section',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'subtitle',
              title: 'Small Text',
              type: 'string',
              description: 'Optional context such as Theatre, Music, Dance, Rehearsal, or venue.',
            }),
            defineField({
              name: 'text',
              title: 'Text',
              type: 'text',
              rows: 3,
              description: 'Optional short note for this set of photos.',
            }),
            defineField({
              name: 'layout',
              title: 'Layout',
              type: 'string',
              initialValue: 'masonry',
              options: {
                list: [
                  {title: 'Masonry grid', value: 'masonry'},
                  {title: 'Featured image + grid', value: 'featured'},
                ],
                layout: 'radio',
              },
            }),
            defineField({
              name: 'images',
              title: 'Images',
              type: 'array',
              options: {layout: 'grid'},
              of: [{type: 'imageWithMeta'}],
              validation: (Rule) => Rule.min(1).warning('Add at least one image to this section.'),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'subtitle',
              media: 'images.0',
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).warning('Add at least one performance section.'),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      fieldset: 'intro',
    }),
  ],
  preview: {
    select: {title: 'title', media: 'sections.0.images.0'},
  },
})
