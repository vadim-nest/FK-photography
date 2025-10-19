// src/components/portable/PortableBody.jsx
import React from "react";
import { PortableText } from "@portabletext/react";
import { makeImageComponents } from "@/components/portable/imageComponents.jsx";

export function PortableBody({ value, onImageClick }) {
  return (
    <PortableText
      value={value}
      components={makeImageComponents({ onImageClick })}
    />
  );
}
