export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {name: 'title', type: 'string', title: 'Site title', validation: (R) => R.required()},
    {name: 'description', type: 'text', rows: 3, title: 'Description'},
    {name: 'logo', type: 'image', title: 'Logo', options: {hotspot: true}},
    {name: 'accentColor', type: 'string', title: 'Accent colour (hex)'},
    {
      name: 'social',
      title: 'Social links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Label'},
            {name: 'url', type: 'url', title: 'URL'},
          ],
        },
      ],
    },
    {name: 'copyright', type: 'string', title: 'Copyright'},
    // Add later when needed:
    // { name: 'defaultOgImage', type: 'image', title: 'Default OG Image', options: { hotspot: true } },
    // { name: 'googleAnalyticsId', type: 'string', title: 'Google Analytics ID' },
    // { name: 'plausibleDomain', type: 'string', title: 'Plausible domain' },
  ],
}
