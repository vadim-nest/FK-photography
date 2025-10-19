// src/pages/index/+data.js (server-only)
export { data };

import { sanity } from "@/lib/sanity/client";
import { homepageQuery } from "@/lib/sanity/queries";

async function data() {
  const homepage = await sanity.fetch(homepageQuery);
  return { homepage };
}
