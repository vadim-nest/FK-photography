// src/hooks/useLightbox.js
import { createContext, useContext } from "react";

export const LightboxContext = createContext(null);

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx)
    throw new Error("useLightbox must be used within <LightboxProvider>");
  return ctx;
}
