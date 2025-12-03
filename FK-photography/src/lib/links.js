// src/lib/links.js
import { navigate } from "vike/client/router";

export const ensureLeadingSlash = (href = "") =>
  !href
    ? "/"
    : href.startsWith("/") || href.startsWith("http")
      ? href
      : `/${href}`;

export const isExternal = (href = "") => /^https?:\/\//i.test(href);

/** Factory for onClick handlers that do SPA nav (and optionally close a sheet) */
export const makeNavClick =
  ({ setOpen } = {}) =>
  (e, href) => {
    if (e.defaultPrevented) return;
    const to = ensureLeadingSlash(href);

    // Let browser handle new tab/modified clicks & external links
    if (
      isExternal(to) ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      e.button !== 0
    ) {
      return;
    }

    e.preventDefault();
    navigate(to);
    if (setOpen) setOpen(false);
  };
