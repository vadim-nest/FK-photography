// pages/blog/@slug/+Page.jsx
import React, { useMemo } from "react";
import { useData } from "vike-react/useData";
import { PortableText } from "@portabletext/react";
import { SmartImage } from "../../../components/SmartImage.jsx";
import LightboxProvider from "@/context/LightboxProvider.jsx";
import { useLightbox } from "@/context/useLightbox.js";
import { toLightboxSlide } from "../../../lib/sanity/toLightboxSlide.js";

function BodyWithLightbox({ blocks }) {
  const lightbox = useLightbox();

  // collect all images once to form a gallery
  const images = useMemo(
    () =>
      (blocks || [])
        .filter((b) => b?._type === "image" || b?._type === "imageWithMeta")
        .map((b) => b),
    [blocks]
  );

  const slides = useMemo(
    () => images.map((img) => toLightboxSlide(img)),
    [images]
  );

  const components = {
    types: {
      image: ({ value }) => {
        const idx = images.findIndex((img) => img._key === value._key);
        return (
          <figure className="my-5">
            <button
              type="button"
              onClick={() => lightbox.show(slides, Math.max(0, idx))}
              className="block overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <SmartImage
                image={value}
                sizes="(max-width: 900px) 100vw, 900px"
              />
            </button>
            {value?.caption && (
              <figcaption className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                {value.caption}
              </figcaption>
            )}
          </figure>
        );
      },
      imageWithMeta: ({ value }) => components.types.image({ value }), // reuse
    },
  };

  return <PortableText value={blocks} components={components} />;
}

export default function PostPage() {
  const { post } = useData();
  if (!post) return <p>Not found</p>;

  return (
    <LightboxProvider>
      <article className="mx-auto max-w-[900px] p-5">
        <header className="grid gap-4">
          <h1 className="text-3xl font-bold">{post.title}</h1>
          {/* {post.heroImage && (
            <SmartImage
              image={post.heroImage}
              sizes="(max-width: 900px) 100vw, 900px"
            />
          )} */}
        </header>
        <section className="mt-6 prose prose-zinc dark:prose-invert">
          {post.body?.length ? (
            <BodyWithLightbox blocks={post.body} />
          ) : (
            <p>No content.</p>
          )}
        </section>
      </article>
    </LightboxProvider>
  );
}
