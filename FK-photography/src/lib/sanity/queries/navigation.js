export const navigationQuery = `*[_type == "navigationItem" && visible == true] | order(order asc) {
  _id,
  "title": select(
    title == "Blog" => "Journal",
    title
  ),
  "href": select(
    title in ["About", "About me", "About Me"] => "about-faruk-kara",
    linkType == "internal" && internalRef->slug.current == "blog" => "journal",
    linkType == "internal" => internalRef->slug.current,
    linkType == "external" => externalUrl
  ),
  order,
  visible
}`;
