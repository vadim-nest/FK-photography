// src/components/layout/Navbar.jsx
import React from "react";
import { navigate } from "vike/client/router";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export function Navbar({ items = [] }) {
  const [open, setOpen] = React.useState(false);
  const ensureLeadingSlash = (href = "") =>
    href.startsWith("/") ? href : `/${href}`;
  const go = (e, href, { closeSheet } = {}) => {
    e.preventDefault();
    navigate(ensureLeadingSlash(href));
    if (closeSheet) setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-zinc-950/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <a
          href="/"
          onClick={(e) => go(e, "/")}
          className="text-xl font-semibold"
        >
          FK Photography
        </a>

        <nav className="hidden gap-6 md:flex">
          {items.map((item) => {
            const href = ensureLeadingSlash(item.href);
            return (
              <a
                key={item._id}
                href={href}
                onClick={(e) => go(e, href)}
                className="text-sm font-medium text-zinc-700 hover:underline dark:text-zinc-300"
              >
                {item.title}
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
            <nav className="mt-6 grid gap-1">
              {items.map((item, i) => {
                const href = ensureLeadingSlash(item.href);
                return (
                  <React.Fragment key={item._id}>
                    <a
                      href={href}
                      onClick={(e) => go(e, href, { closeSheet: true })}
                      className="rounded-lg px-2 py-2 text-base hover:bg-black/5 dark:hover:bg-white/5"
                    >
                      {item.title}
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
