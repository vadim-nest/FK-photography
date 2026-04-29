import React from "react";
import { DEFAULT_CONTACT_EMAIL, mailtoHref } from "@/lib/contact";

export function SiteFooter({ contact = {} }) {
  const email = contact.email || DEFAULT_CONTACT_EMAIL;
  const copyright =
    contact.copyright || `(c) ${new Date().getFullYear()} Faruk Kara`;

  return (
    <footer className="border-t border-[#cec8c0] bg-[#eae6e0] px-6 py-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-[#9e9890]">
            Available for commissions
          </p>
          <a
            href={mailtoHref(email)}
            className="mt-2 inline-flex font-display text-[1.35rem] font-light leading-none text-[#1c1a17] no-underline transition-colors hover:text-[#8b6f4e]"
          >
            {email}
          </a>
        </div>
        <p className="font-mono text-[0.57rem] uppercase tracking-[0.12em] text-[#9e9890]">
          {copyright}
        </p>
      </div>
    </footer>
  );
}
