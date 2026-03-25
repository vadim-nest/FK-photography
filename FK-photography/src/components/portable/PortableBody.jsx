// src/components/portable/PortableBody.jsx
import React from "react";
import { PortableText } from "@portabletext/react";
import { makeImageComponents } from "@/components/portable/imageComponents.jsx";

export function PortableBody({ value, onImageClick, components: customComponents = {} }) {
  // Merge the standard image components with any custom ones (like BentoGallery)
  const mergedComponents = {
    ...makeImageComponents({ onImageClick }),
    ...customComponents,
    types: {
      ...makeImageComponents({ onImageClick }).types,
      ...customComponents.types,
    },
  };

  return (
    <PortableText
      value={value}
      components={mergedComponents}
    />
  );
}