export { data };

import { sanity } from "@/lib/sanity/client";
import { homepageQuery } from "@/lib/queries/homepage";

async function data() {
  const homepage = await sanity.fetch(homepageQuery);
  return { homepage }; // becomes pageContext.data
}
