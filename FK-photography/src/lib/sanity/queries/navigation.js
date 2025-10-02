export const navigationQuery = `*[_type == "navigationItem" && visible == true] | order(order asc) {
  _id,
  title,
  "href": select(
    linkType == "internal" => internalRef->slug.current,
    linkType == "external" => externalUrl
  ),
  order,
  visible
}`;
