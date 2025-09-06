// pages/+onCreatePageContext.server.js
export async function onCreatePageContext(pageContext) {
  // Fetch from Sanity (or wherever)
  const { sanity } = await import("@/lib/sanity/client.js");
  const { navigationQuery } = await import("@/lib/queries/navigation.js");

  try {
    const nav = await sanity.fetch(navigationQuery);
    pageContext.nav = nav; // attach to pageContext
  } catch (e) {
    console.error(e);
    pageContext.nav = []; // fail-safe
  }
}
