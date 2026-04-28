export const navigationQuery = `*[_type == "navigationItem" && visible == true] | order(order asc) {
  _id,
  "title": select(
    title == "Blog" => "Journal",
    title
  ),
  "href": select(
    linkType == "internal" && internalRef->slug.current == "blog" => "journal",
    linkType == "internal" => internalRef->slug.current,
    linkType == "external" => externalUrl
  ),
  order,
  visible
}`;
