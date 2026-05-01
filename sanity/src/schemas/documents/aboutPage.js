import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fieldsets: [
    {name: 'intro', title: 'Intro', options: {collapsible: true, collapsed: false}},
    {name: 'trust', title: 'Invitations & Trust', options: {collapsible: true, collapsed: false}},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'About Faruk',
      validation: (Rule) => Rule.required(),
      fieldset: 'intro',
    }),
    defineField({
      name: 'portrait',
      title: 'Portrait',
      type: 'imageWithMeta',
      description: 'A portrait of Faruk. Prefer a natural image without a camera in hand.',
      fieldset: 'intro',
    }),
    defineField({
      name: 'intro',
      title: 'Short Bio',
      type: 'text',
      rows: 4,
      initialValue:
        'Faruk Kara is a Cambridge-based photographer drawn to atmosphere, movement, and the quiet charge of real moments.',
      validation: (Rule) => Rule.required(),
      fieldset: 'intro',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'richText',
      description: 'Longer professional but personal biography.',
      fieldset: 'intro',
    }),
    defineField({
      name: 'locationLine',
      title: 'Location Line',
      type: 'string',
      initialValue: 'Based in Cambridge, available worldwide.',
      validation: (Rule) => Rule.required(),
      fieldset: 'intro',
    }),
    defineField({
      name: 'invitationIntro',
      title: 'Invitation Intro',
      type: 'text',
      rows: 3,
      initialValue:
        'Faruk is often invited into spaces where the work is already alive: rehearsal rooms, small stages, theatre productions, band performances, and community stories.',
      fieldset: 'trust',
    }),
    defineField({
      name: 'contexts',
      title: 'Invited To Capture',
      type: 'array',
      description:
        'Use these instead of client logos. Add theatres, productions, bands, rehearsals, venues, or kinds of assignments where trust and access matter.',
      fieldset: 'trust',
      of: [
        {
          type: 'object',
          title: 'Context Card',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Small Label',
              type: 'string',
              description: 'Examples: Theatre, Live music, Rehearsal, Editorial, Community.',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'imageWithMeta',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'label',
              media: 'image',
            },
          },
        },
      ],
      initialValue: [
        {
          title: 'Theatre productions',
          label: 'Stage',
          description:
            'Quiet coverage of rehearsals, dress runs, and performances without disturbing the room.',
        },
        {
          title: 'Band performances',
          label: 'Live music',
          description:
            'Images that hold the energy of a set: gesture, crowd, light, and the seconds between songs.',
        },
        {
          title: 'Stories with access',
          label: 'Documentary',
          description:
            'Work made by being invited in, listening first, and photographing with care.',
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      fieldset: 'intro',
    }),
  ],
  preview: {
    select: {title: 'title', media: 'portrait'},
  },
})
