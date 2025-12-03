// src/components/layout/NavItem.jsx
import React from "react";
import { ensureLeadingSlash, isExternal } from "@/lib/links";
import { usePageContext } from "vike-react/usePageContext";

export const NavItem = ({ item, onClick }) => {
  const { urlPathname = "" } = usePageContext();
  const href = ensureLeadingSlash(item?.href);
  const external = isExternal(href);
  const isActive = !external && href === urlPathname;

  return (
    <a
      href={href}
      onClick={(e) => onClick?.(e, href)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-current={isActive ? "page" : undefined}
      className={[
        "text-xl font-medium rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "text-zinc-700 hover:underline dark:text-zinc-900",
        isActive ? "underline underline-offset-4" : "",
      ].join(" ")}
    >
      {item?.title ?? href}
    </a>
  );
};
