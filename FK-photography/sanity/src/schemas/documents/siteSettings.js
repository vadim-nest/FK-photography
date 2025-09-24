import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Site title',
      validation: (R) => R.required(),
    }),
    defineField({name: 'description', type: 'text', rows: 3, title: 'Description'}),
    // Switch to imageWithMeta so you can manage alt text
    defineField({name: 'logo', type: 'imageWithMeta', title: 'Logo'}),
    defineField({name: 'accentColor', type: 'string', title: 'Accent colour (hex)'}),
    defineField({
      name: 'social',
      title: 'Social links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Label', validation: (R) => R.required()},
            {name: 'url', type: 'url', title: 'URL', validation: (R) => R.required()},
          ],
        },
      ],
    }),
    defineField({name: 'copyright', type: 'string', title: 'Copyright'}),
    // Keep these for later if needed:
    // defineField({name: 'defaultOgImage', type: 'imageWithMeta', title: 'Default OG Image'}),
    // defineField({name: 'googleAnalyticsId', type: 'string', title: 'Google Analytics ID'}),
    // defineField({name: 'plausibleDomain', type: 'string', title: 'Plausible domain'}),
  ],
  preview: {
    select: {title: 'title', media: 'logo'},
  },
})
