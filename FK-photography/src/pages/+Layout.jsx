// src/pages/+Layout.jsx (global layout)
import React from "react";
import "@/styles/theme.css";
import { usePageContext } from "vike-react/usePageContext";
import { Navbar } from "@/components/layout/Navbar";

export default function Layout({ children }) {
  const { nav = [] } = usePageContext();
  return (
    <>
      <div className="bg-[#F5F5F5]">
        <div className="max-w-[90vw] mx-auto w-7xl min-h-screen h-fit">
          <Navbar items={nav} />
          <div className="pt-14" />
          {children}
        </div>
      </div>
    </>
  );
}
