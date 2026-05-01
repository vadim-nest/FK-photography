// src/components/journal/BentoGallery.jsx
import React, { useMemo, useRef, useState, useEffect } from "react";

const GAP = 11;
const TARGET_ROW_HEIGHT = 400; // Adjust this to make rows taller or shorter

export function BentoGrid({ value, onImageClick }) {
  const images = value?.images;
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // 1. Instantly measure the container width so we can do the math
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      setContainerWidth(entries[0].contentRect.width);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // 2. The Justified Math Algorithm
  const rows = useMemo(() => {
    if (!images?.length || containerWidth === 0) return [];

    const validImages = images.filter(
      (img) => img.dimensions?.width && img.dimensions?.height,
    );
    let currentRow = [];
    let rowsArray = [];
    let currentRatioSum = 0;

    validImages.forEach((img, i) => {
      // Calculate the true aspect ratio of the photo
      const ratio = img.dimensions.width / img.dimensions.height;
      currentRow.push({ ...img, ratio });
      currentRatioSum += ratio;

      // Calculate what the row height would be if we forced these images to fill the width
      const availableWidth = containerWidth - (currentRow.length - 1) * GAP;
      const projectedHeight = availableWidth / currentRatioSum;

      // If the row height drops below our target, or if it's the very last image, finish the row
      if (projectedHeight < TARGET_ROW_HEIGHT || i === validImages.length - 1) {
        // Safety check for the last row: don't stretch 1 or 2 images to massive sizes
        const isLastRow = i === validImages.length - 1;
        const finalHeight =
          isLastRow && projectedHeight > TARGET_ROW_HEIGHT * 1.3
            ? TARGET_ROW_HEIGHT // Lock to target if there aren't enough images to fill it naturally
            : projectedHeight;

        rowsArray.push({
          height: finalHeight,
          images: currentRow.map((rImg) => ({
            ...rImg,
            displayWidth: finalHeight * rImg.ratio,
          })),
        });

        // Reset for the next row
        currentRow = [];
        currentRatioSum = 0;
      }
    });

    return rowsArray;
  }, [images, containerWidth]);

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col"
      style={{ gap: GAP }}
    >
      {rows.map((row, rIdx) => (
        <div key={rIdx} className="flex flex-row w-full" style={{ gap: GAP }}>
          {row.images.map((img, iIdx) => (
            <figure
              key={img._key || iIdx}
              className="relative group cursor-zoom-in overflow-hidden rounded-[1rem] flex-shrink-0"
              style={{ width: img.displayWidth, height: row.height }}
              onClick={() => onImageClick?.(img)}
            >
              <img
                src={img.url}
                alt={img.alt || ""}
                loading="lazy"
                className="w-full h-full object-contain block"
                style={{ borderRadius: "1rem" }}
              />
            </figure>
          ))}
        </div>
      ))}
    </div>
  );
}
