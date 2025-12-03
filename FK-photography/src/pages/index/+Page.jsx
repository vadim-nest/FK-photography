// src/pages/index/+Page.jsx
import React from "react";
import { useData } from "vike-react/useData";
import { PortableBody } from "@/components/portable/PortableBody";

export default function Page() {
  const { homepage } = useData();
  return (
    <div>
      <PortableBody value={homepage?.content} />
    </div>
  );
}
