// src/pages/+onCreatePageContext.server.js (global)
export async function onCreatePageContext(pageContext) {
  const { sanity } = await import("@/lib/sanity/client.js");
  const { navigationQuery } = await import("@/lib/sanity/queries");
  const { DEFAULT_CONTACT_EMAIL } = await import("@/lib/contact.js");

  try {
    const nav = await sanity.fetch(navigationQuery);
    pageContext.nav = nav;
  } catch (e) {
    console.error(e);
    pageContext.nav = [];
  }

  try {
    const contact = await sanity.fetch(`{
      "email": coalesce(*[_type == "siteSettings"][0].email, *[_id == "homepage"][0].contactWidget.email),
      "copyright": *[_type == "siteSettings"][0].copyright
    }`);
    pageContext.contact = {
      email: contact?.email || DEFAULT_CONTACT_EMAIL,
      copyright: contact?.copyright,
    };
  } catch (e) {
    console.error(e);
    pageContext.contact = { email: DEFAULT_CONTACT_EMAIL };
  }
}
