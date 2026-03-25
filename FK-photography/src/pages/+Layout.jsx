// src/pages/+Layout.jsx (global layout)
import React from "react";
import "@/styles/theme.css";
import { usePageContext } from "vike-react/usePageContext";
import { Navbar } from "@/components/layout/Navbar";

export default function Layout({ children }) {
  const { nav = [] } = usePageContext();
  return (
    <>
      <div className="bg-[#eae6e0]">
        <div className="mx-auto min-h-screen h-fit">
          <Navbar items={nav} />
          <div className="pt-14" />
          {children}
        </div>
      </div>
    </>
  );
}
