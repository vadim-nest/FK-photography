import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'documentaryProject',
  title: 'Documentary Project',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (R) => R.required()}),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (R) => R.required(),
    }),
    defineField({name: 'year', type: 'string', title: 'Year (e.g. 2023)'}),
    defineField({name: 'location', type: 'string'}),
    defineField({name: 'excerpt', type: 'text', rows: 3}),
    defineField({
      name: 'coverImage',
      type: 'imageWithMeta',
      description: 'Main image used on the hub page grid.',
    }),

    // 🔥 HIGHLIGHT: Added Hub Overrides
    defineField({
      name: 'hubPresentation',
      title: 'Hub Page Overrides',
      type: 'object',
      description: 'Override how this project appears on the main Documentary hub page.',
      options: {collapsible: true, collapsed: false},
      fields: [
        defineField({
          name: 'layout',
          title: 'Hub Layout Style',
          type: 'string',
          initialValue: null, // null = auto-rotate by position
          options: {
            list: [
              {
                title: 'Auto (rotates by position — recommended)',
                value: null,
              },
              {
                title: 'Cinematic — Full width image, title overlay',
                value: 'cinematic',
              },
              {
                title: 'Editorial — Large image left, big title right',
                value: 'editorial',
              },
              {
                title: 'Sequence — Title above, image strip below',
                value: 'sequence',
              },
            ],
            layout: 'radio',
          },
          description:
            'Controls how this project appears on the hub page. Leave on Auto unless you need to override the default rotation.',
        }),
        defineField({
          name: 'text',
          title: 'Excerpt',
          type: 'text',
          rows: 3,
          description:
            'Custom text just for the hub page. If left blank, standard excerpt is used.',
        }),
        defineField({
          name: 'images',
          title: 'Images',
          type: 'array',
          of: [{type: 'imageWithMeta'}],
          description:
            'Select exactly the images you want to show on the hub (up to 3 for Layout A, up to 2 for Layout B). Overwrites default cover/gallery logic.',
        }),
      ],
    }),

    defineField({
      name: 'photoRows',
      title: 'Project Layout (Rows)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'photoRow',
          fields: [
            defineField({
              name: 'layout',
              type: 'string',
              options: {
                list: [
                  {value: 'solo', title: 'Solo — Full Width (1 image)'},
                  {value: 'spread', title: 'Spread — Centered Panoramic (1 image)'},
                  {value: 'dominant', title: 'Dominant — Large Left + Stacked Right (2+ images)'},
                  {value: 'trio', title: 'Trio — Three Equal Columns (3 images)'},
                  {value: 'offset', title: 'Offset — Large Left + Dropped Right (2 images)'},
                  {value: 'strip', title: 'Strip — Small Horizontal Row (4 images)'},
                  {
                    value: 'featurePortrait',
                    title: 'Feature Portrait — Text Left + Portrait Right (1+ images)',
                  },
                ],
              },
            }),
            defineField({
              name: 'images',
              type: 'array',
              of: [{type: 'imageWithMeta'}],
              validation: (Rule) =>
                Rule.custom((images, context) => {
                  const layout = context.parent?.layout
                  if (!layout) return true

                  const count = images?.length || 0

                  if ((layout === 'solo' || layout === 'spread') && count !== 1) {
                    return 'This layout requires exactly 1 image'
                  }
                  if ((layout === 'dominant' || layout === 'offset') && count < 2) {
                    return 'This layout requires at least 2 images'
                  }
                  if (layout === 'trio' && count !== 3) {
                    return 'Trio layout requires exactly 3 images'
                  }
                  if (layout === 'strip' && count < 2) {
                    return 'Strip layout works best with 4 images'
                  }
                  return true
                }),
            }),
            defineField({
              name: 'pullQuote',
              type: 'object',
              fields: [
                {name: 'text', type: 'text', rows: 3},
                {
                  name: 'attribution',
                  type: 'string',
                },
              ],
            }),
          ],
        },
      ],
    }),
    defineField({name: 'photoCount', type: 'number'}),
    defineField({name: 'order', type: 'number', title: 'Sort Order (Lower = First)'}),
  ],
  orderings: [{title: 'Manual Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
})
