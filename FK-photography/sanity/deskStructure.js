export const deskStructure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Homepage')
        .child(S.editor().id('homepage').schemaType('homepage').documentId('homepage')),
      S.listItem()
        .title('Site Settings')
        .child(S.editor().id('siteSettings').schemaType('siteSettings').documentId('siteSettings')),
      S.documentTypeListItem('navigationItem'),
      S.divider(),
      S.documentTypeListItem('page'),
      S.documentTypeListItem('story'),
      S.documentTypeListItem('gallery'),
      S.documentTypeListItem('post'),
    ])
