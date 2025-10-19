// src/pages/+Layout.jsx (global layout)
import React from "react";
import "@/styles/tailwind.css";
import "@/styles/theme.css";
import { usePageContext } from "vike-react/usePageContext";
import { Navbar } from "@/components/layout/Navbar";

export default function Layout({ children }) {
  const { nav = [] } = usePageContext();
  return (
    <>
      <Navbar items={nav} />
      {children}
    </>
  );
}
