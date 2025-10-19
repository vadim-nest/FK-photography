// src/providers/LightboxProvider.jsx
import React, { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { LightboxContext } from "@/hooks/useLightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

export default function LightboxProvider({ children }) {
  const [slides, setSlides] = useState([]);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const api = useMemo(
    () => ({
      show(slidesIn, startIndex = 0) {
        setSlides(slidesIn);
        setIndex(startIndex);
        setOpen(true);
      },
      hide() {
        setOpen(false);
      },
    }),
    []
  );

  return (
    <LightboxContext.Provider value={api}>
      {children}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        plugins={[Zoom]}
      />
    </LightboxContext.Provider>
  );
}
