// src/pages/index/+Page.jsx
import React from "react";
import { useData } from "vike-react/useData";
import { PortableBody } from "@/components/portable/PortableBody";

export default function Page() {
  const { homepage } = useData();
  return (
    <header>
      <h1 className="text-3xl font-bold">Homepage</h1>
      <PortableBody value={homepage?.content} />
    </header>
  );
}
