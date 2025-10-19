// src/pages/+onCreatePageContext.server.js (global)
export async function onCreatePageContext(pageContext) {
  const { sanity } = await import("@/lib/sanity/client.js");
  const { navigationQuery } = await import("@/lib/sanity/queries");

  try {
    const nav = await sanity.fetch(navigationQuery);
    pageContext.nav = nav;
  } catch (e) {
    console.error(e);
    pageContext.nav = [];
  }
}
