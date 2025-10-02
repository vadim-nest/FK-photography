import { SmartImage } from "@/components/media/SmartImage.jsx";

export function makeImageComponents({ onImageClick } = {}) {
  const Figure = ({ value }) => {    
    return (
      <figure className="my-5">
        <button
          type="button"
          onClick={onImageClick ? () => onImageClick(value) : undefined}
          className={
            onImageClick
              ? "block overflow-hidden rounded-xl focus:outline-none focus:ring-2"
              : undefined
          }
        >
          <SmartImage
            image={value} // must accept Sanity image object
            alt={value?.alt || ""} // prefer dedicated alt field on the image block
            sizes="(max-width: 900px) 100vw, 900px"
            // SmartImage should apply hotspot/crop & lqip internally
          />
        </button>
        {value?.caption && (
          <figcaption className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            {value.caption}
          </figcaption>
        )}
      </figure>
    );
  };

  return {
    types: {
      image: Figure,
      imageWithMeta: Figure, // reuse
    },
  };
}
