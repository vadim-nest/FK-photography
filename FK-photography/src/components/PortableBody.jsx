import { PortableText } from "@portabletext/react";
import { makeImageComponents } from "@/lib/portable/imageComponents.jsx";

export function PortableBody({ value, onImageClick }) {
  return (
    <PortableText
      value={value}
      components={makeImageComponents({ onImageClick })}
    />
  );
}
