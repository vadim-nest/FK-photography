// Global app shell for every page
import { Fragment } from "react";
import "@/styles/tailwind.css"; // shadcn variables + tailwind import
import "@/styles/theme.css"; // your minimal theme (also has @import "tailwindcss")
import { usePageContext } from "vike-react/usePageContext";
import { Navbar } from "@/components/layout/Navbar";

export default function Layout({ children }) {
  const { nav = [] } = usePageContext();

  return (
    <Fragment>
      <Navbar items={nav} />
      {children}
    </Fragment>
  );
}
