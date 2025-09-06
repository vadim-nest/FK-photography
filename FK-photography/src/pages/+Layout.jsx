// Global app shell for every page
import { Fragment } from "react";
import "@/index.css"; // shadcn variables + tailwind import
import "@/styles.css"; // your minimal theme (also has @import "tailwindcss")
import { usePageContext } from "vike-react/usePageContext";
import { Navbar } from "@/components/Navbar";

export default function Layout({ children }) {
  const { nav = [] } = usePageContext();

  return (
    <Fragment>
      <Navbar items={nav} />
      {children}
    </Fragment>
  );
}
