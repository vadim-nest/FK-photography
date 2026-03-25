// src/pages/index/+Page.jsx
import React from "react";
import { useData } from "vike-react/useData";
import { PortableBody } from "@/components/portable/PortableBody";

export default function Page() {
  const { homepage } = useData();
  return (
    <div className="w-7xl max-w-full mx-auto">
      <PortableBody value={homepage?.content} />
    </div>
  );
}
