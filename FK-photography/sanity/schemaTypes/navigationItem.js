export default {
  name: 'navigationItem',
  title: 'Navigation Item',
  type: 'document',
  fields: [
    {name: 'title', type: 'string', title: 'Title', validation: (R) => R.required()},
    {
      name: 'linkType',
      type: 'string',
      title: 'Link type',
      options: {list: ['internal', 'external'], layout: 'radio'},
      initialValue: 'internal',
      validation: (R) => R.required(),
    },
    {
      name: 'internalRef',
      title: 'Internal reference',
      type: 'reference',
      to: [{type: 'page'}, {type: 'story'}, {type: 'gallery'}],
      hidden: ({parent}) => parent?.linkType !== 'internal',
    },
    {
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      hidden: ({parent}) => parent?.linkType !== 'external',
    },
    {name: 'order', type: 'number', title: 'Order', initialValue: 0},
    {name: 'visible', type: 'boolean', title: 'Visible', initialValue: true},
  ],
  orderings: [{title: 'Order asc', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
}
