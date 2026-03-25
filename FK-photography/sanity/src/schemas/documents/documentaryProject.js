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
              description:
                'Text block (used for standard quotes, or the intro text block on "Feature Portrait" layout)',
              fields: [
                {name: 'text', type: 'text', rows: 3},
                {
                  name: 'attribution',
                  type: 'string',
                  description: 'Used as the bold title on Feature Portrait layout',
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
