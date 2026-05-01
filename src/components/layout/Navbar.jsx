// src/components/layout/Navbar.jsx
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NavItem } from "./NavItem";
import { ensureLeadingSlash, isExternal, makeNavClick } from "@/lib/links";
import { mailtoHref } from "@/lib/contact";

export function Navbar({ items = [], contact = {}, darkHero = false }) {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(!darkHero);

  const go = React.useMemo(() => makeNavClick(), []);
  const goMobile = React.useMemo(() => makeNavClick({ setOpen }), []);

  const allItems = [{ href: "/", title: "Home" }, ...items];
  const hireHref = mailtoHref(contact.email);

  // Transparent → opaque on scroll
  React.useEffect(() => {
    if (!darkHero) return; // light pages: always scrolled, no listener needed
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [darkHero]);

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-[rgba(234,230,224,0.93)] backdrop-blur-[14px] border-b border-[#cec8c0]"
          : "bg-transparent border-b border-transparent",
      ].join(" ")}
    >
      {/* Skip to content */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:inset-x-4 focus:top-3 focus:rounded focus:bg-[#eae6e0] focus:px-3 focus:py-2 focus:text-sm focus:z-50"
      >
        Skip to content
      </a>

      <div className="flex items-center justify-between px-12 py-5">
        {/* Logo */}
        <a
          href="/"
          onClick={(e) => go(e, "/")}
          className={[
            "font-display font-light text-[1.05rem] tracking-[0.04em] no-underline transition-colors duration-300",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b6f4e] focus-visible:ring-offset-2 rounded-sm",
            scrolled ? "text-[#1c1a17]" : "text-[#f2ede6]",
          ].join(" ")}
        >
          Faruk Kara
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {allItems
            .filter((item) => item.href !== "/")
            .map((item) => (
              <NavItem
                key={item?._id || item?.href}
                item={item}
                onClick={go}
                scrolled={scrolled}
              />
            ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href={hireHref}
          className={[
            "hidden md:inline-flex font-mono text-[0.65rem] tracking-[0.13em] uppercase",
            "px-4 py-[0.4rem] border rounded-[3px] no-underline",
            "transition-all duration-300",
            "hover:bg-[#8b6f4e] hover:text-[#eae6e0] hover:border-[#8b6f4e]",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b6f4e]",
            scrolled
              ? "text-[#8b6f4e] border-[rgba(139,111,78,0.4)]"
              : "text-[rgba(242,237,230,0.7)] border-[rgba(242,237,230,0.25)]",
          ].join(" ")}
        >
          Contact me
        </a>

        {/* Mobile trigger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              className={[
                "md:hidden font-mono text-[0.65rem] tracking-[0.13em] uppercase",
                "border rounded-[3px] px-3 py-[0.4rem] h-auto",
                "transition-colors duration-300",
                scrolled
                  ? "text-[#57524d] border-[#cec8c0] hover:text-[#1c1a17] hover:border-[#1c1a17]"
                  : "text-[rgba(242,237,230,0.7)] border-[rgba(242,237,230,0.25)] hover:text-[#f2ede6]",
              ].join(" ")}
              aria-label="Open menu"
            >
              Menu
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-72 bg-[#eae6e0] border-l border-[#cec8c0]"
          >
            <div className="pt-2 pb-6 border-b border-[#cec8c0] mb-6">
              <span className="font-display font-light text-[1rem] tracking-[0.04em] text-[#1c1a17]">
                Faruk Kara
              </span>
            </div>

            <nav className="flex flex-col" aria-label="Mobile">
              {allItems.map((item, i) => {
                const href = ensureLeadingSlash(item?.href);
                const external = isExternal(href);
                return (
                  <a
                    key={item?._id || href}
                    href={href}
                    onClick={(e) => goMobile(e, href)}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className={[
                      "font-mono text-[0.65rem] tracking-[0.13em] uppercase",
                      "py-4 border-b border-[#cec8c0] text-[#57524d]",
                      "transition-colors duration-150 hover:text-[#1c1a17]",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b6f4e]",
                      i === allItems.length - 1 ? "border-b-0" : "",
                    ].join(" ")}
                  >
                    {item?.title ?? href}
                  </a>
                );
              })}
            </nav>

            <a
              href={hireHref}
              onClick={() => setOpen(false)}
              className={[
                "mt-8 flex justify-center font-mono text-[0.65rem] tracking-[0.13em] uppercase",
                "px-4 py-3 border border-[rgba(139,111,78,0.4)] rounded-[3px]",
                "text-[#8b6f4e] no-underline",
                "transition-all hover:bg-[#8b6f4e] hover:text-[#eae6e0] hover:border-[#8b6f4e]",
              ].join(" ")}
            >
              Contact me
            </a>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
