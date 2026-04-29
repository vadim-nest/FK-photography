export const DEFAULT_CONTACT_EMAIL = "hello@farukkara.com";
export const COMMISSION_SUBJECT = "Commission enquiry";

export function mailtoHref(email = DEFAULT_CONTACT_EMAIL, subject = COMMISSION_SUBJECT) {
  const address = email || DEFAULT_CONTACT_EMAIL;
  return `mailto:${address}?subject=${encodeURIComponent(subject)}`;
}
