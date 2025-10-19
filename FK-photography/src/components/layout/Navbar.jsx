// src/components/layout/Navbar.jsx
import React from "react";
import { navigate } from "vike/client/router";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export function Navbar({ items = [] }) {
  const [open, setOpen] = React.useState(false);

  const ensureLeadingSlash = React.useCallback((href = "") => {
    if (!href) return "/";
    return href.startsWith("/") || href.startsWith("http") ? href : `/${href}`;
  }, []);

  const isExternal = React.useCallback(
    (href = "") => /^https?:\/\//i.test(href),
    []
  );

  const go = React.useCallback(
    (e, href, { closeSheet } = {}) => {
      if (e.defaultPrevented) return;
      const to = ensureLeadingSlash(href);

      // Allow normal browser behaviour for external links and with modifiers
      if (
        isExternal(to) ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        e.button !== 0
      )
        return;

      e.preventDefault();
      navigate(to);
      if (closeSheet) setOpen(false);
    },
    [ensureLeadingSlash, isExternal]
  );

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-zinc-950/70">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:inset-x-4 focus:top-4 focus:rounded focus:bg-background focus:px-3 focus:py-2"
      >
        Skip to content
      </a>

      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <a
          href="/"
          onClick={(e) => go(e, "/")}
          className="text-xl font-semibold"
        >
          FK Photography
        </a>

        <nav className="hidden gap-6 md:flex" aria-label="Primary">
          {items.map((item) => {
            const href = ensureLeadingSlash(item?.href);
            const external = isExternal(href);
            return (
              <a
                key={item?._id || href}
                href={href}
                onClick={(e) => go(e, href)}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="text-sm font-medium text-zinc-700 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded dark:text-zinc-300"
              >
                {item?.title ?? href}
              </a>
            );
          })}
        </nav>

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
              {items.map((item, i) => {
                const href = ensureLeadingSlash(item?.href);
                const external = isExternal(href);
                return (
                  <React.Fragment key={item?._id || href}>
                    <a
                      href={href}
                      onClick={(e) => go(e, href, { closeSheet: true })}
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
