// Global app shell for every page
import "@/index.css"; // shadcn variables + tailwind import
import "@/styles.css"; // your minimal theme (also has @import "tailwindcss")

export default function Layout({ children }) {
  return <>
  {children}</>;
}
