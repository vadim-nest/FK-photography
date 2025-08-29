// import S from '@sanity/desk-tool/structure-builder'

export const deskStructure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .child(S.editor().id('siteSettings').schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      S.documentTypeListItem('navigationItem'),
      S.documentTypeListItem('page'),
      S.documentTypeListItem('story'),
      S.documentTypeListItem('gallery'),
      S.documentTypeListItem('post'),
    ])
