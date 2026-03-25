// src/components/layout/NavItem.jsx
import React from "react";
import { ensureLeadingSlash, isExternal } from "@/lib/links";
import { usePageContext } from "vike-react/usePageContext";

export const NavItem = ({ item, onClick, scrolled = true }) => {
  const { urlPathname = "" } = usePageContext();
  const href = ensureLeadingSlash(item?.href);
  const external = isExternal(href);

  // Active if exact match, or if we're on a sub-path (e.g. /blog/post-slug marks /blog active)
  const isActive =
    !external &&
    (href === urlPathname || (href !== "/" && urlPathname.startsWith(href)));

  return (
    <a
      href={href}
      onClick={(e) => onClick?.(e, href)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-current={isActive ? "page" : undefined}
      className={[
        "font-mono text-[0.65rem] tracking-[0.13em] uppercase no-underline",
        "transition-colors duration-300",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b6f4e] focus-visible:ring-offset-2 rounded-sm",
        // Colour: when scrolled (light bg) use ink tones; when over dark hero use warm white
        scrolled
          ? isActive
            ? "text-[#1c1a17]"
            : "text-[#57524d] hover:text-[#1c1a17]"
          : isActive
            ? "text-[#f2ede6]"
            : "text-[rgba(242,237,230,0.55)] hover:text-[#f2ede6]",
      ].join(" ")}
    >
      {item?.title ?? href}
    </a>
  );
};
