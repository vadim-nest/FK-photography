// src/pages/_error/+Page.jsx
import React from "react";
import { usePageContext } from "vike-react/usePageContext";

export default function Page() {
  const { abortStatusCode, abortReason, is404 } = usePageContext();
  const code = abortStatusCode ?? (is404 ? 404 : 500);

  let title = "Something went wrong";
  if (is404) title = "Page not found";
  if (abortStatusCode === 403) title = "Forbidden";
  if (abortStatusCode === 401) title = "Unauthorised";

  return (
    <main id="main" className="p-16 text-center">
      <h1 className="text-3xl font-bold">{code}</h1>
      <p className="mt-2">
        {typeof abortReason === "string" ? abortReason : title}
      </p>
      <p className="mt-6">
        <a href="/" className="underline underline-offset-4">
          Go home
        </a>
      </p>
    </main>
  );
}
