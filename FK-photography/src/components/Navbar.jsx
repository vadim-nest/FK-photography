import React from "react";
import { navigate } from "vike/client/router";

export function Navbar({ items }) {
  const go = (e, href) => {
    e.preventDefault();
    navigate(href);
  };  

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <a
          href="/"
          onClick={(e) => go(e, "/")}
          className="text-xl font-semibold"
        >
          FK Photography
        </a>
        <nav className="hidden gap-6 md:flex">
          {(items || []).map((item) => (
            <a
              key={item._id}
              href={item.href}
              // onClick={(e) => go(e, item.href)}
              className="text-sm font-medium hover:underline"
            >
              {item.title}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
