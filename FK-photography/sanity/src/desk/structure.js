// Desk structure with singletons (Homepage, Site Settings, Documentary Hub Settings)
export const deskStructure = (S) =>
  S.list()
    .title('Content')
    .items([
      // --- SINGLETONS ---
      S.listItem()
        .title('Homepage')
        .child(S.editor().id('homepage').schemaType('homepage').documentId('homepage')),

      S.listItem()
        .title('Site Settings')
        .child(S.editor().id('siteSettings').schemaType('siteSettings').documentId('siteSettings')),

      S.listItem()
        .title('Documentary Hub Settings')
        .child(
          S.editor()
            .id('documentaryHubSettings')
            .schemaType('documentaryHubSettings')
            .documentId('documentaryHubSettings'),
        ),

      S.divider(),

      // --- LISTS ---
      S.documentTypeListItem('navigationItem'),
      S.divider(),
      S.documentTypeListItem('page'),
      S.documentTypeListItem('story'),
      S.documentTypeListItem('gallery'),
      S.documentTypeListItem('post'),

      // New: Documentary Projects List
      S.documentTypeListItem('documentaryProject').title('Documentaries'),
    ])
