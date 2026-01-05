// src/components/layout/Navbar.jsx
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { NavItem } from "./NavItem";
import { ensureLeadingSlash, isExternal, makeNavClick } from "@/lib/links";

export function Navbar({ items = [] }) {
  const [open, setOpen] = React.useState(false);

  // Desktop click handler (does SPA nav, doesn’t close sheet)
  const go = React.useMemo(() => makeNavClick(), []);
  // Mobile click handler (also closes the sheet)
  const goMobile = React.useMemo(() => makeNavClick({ setOpen }), []);
  const allItems = [{ href: "/", title: "Home" }, ...items];

  return (
    <header
      className={["sticky top-8 z-50 rounded-2xl bg-[#E0E1E0] shadow-lg"].join(" ")}
    >
      <a
        href="#main"
        className={[
          "sr-only focus:not-sr-only focus:absolute focus:inset-x-4 focus:top-4",
          "focus:rounded focus:bg-background focus:px-3 focus:py-2  ",
        ].join(" ")}
      >
        Skip to content
      </a>

      <div className="mx-auto items-center p-4">
        {/* Desktop nav */}
        <nav
          className="mx-auto hidden p-4 justify-around gap-6 md:flex"
          aria-label="Primary"
        >
          {allItems.map((item) => (
            <NavItem key={item?._id || item?.href} item={item} onClick={go} />
          ))}
        </nav>

        {/* Mobile sheet */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              size="sm"
              variant="outline"
              className="md:hidden"
              aria-label="Open menu"
            >
              Menu
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-80">
            <nav className="mt-6 grid gap-1" aria-label="Mobile">
              {allItems.map((item, i) => {
                const href = ensureLeadingSlash(item?.href);
                const external = isExternal(href);
                return (
                  <React.Fragment key={item?._id || href}>
                    <a
                      href={href}
                      onClick={(e) => goMobile(e, href)}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="rounded-lg px-2 py-2 text-base hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:hover:bg-white/5"
                    >
                      {item?.title ?? href}
                    </a>
                    {i < items.length - 1 && <Separator />}
                  </React.Fragment>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
