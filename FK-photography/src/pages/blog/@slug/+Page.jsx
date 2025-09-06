import React, { useMemo } from "react";
import { useData } from "vike-react/useData";
import { PortableBody } from "@/components/PortableBody.jsx";
import LightboxProvider from "@/context/LightboxProvider.jsx";
import { useLightbox } from "@/context/useLightbox.js";
import { toLightboxSlide } from "../../../lib/sanity/toLightboxSlide.js";

function BodyWithLightbox({ blocks }) {
  const lightbox = useLightbox();
  const images = useMemo(
    () =>
      (blocks || []).filter(
        (b) => b && (b._type === "image" || b._type === "imageWithMeta")
      ),
    [blocks]
  );
  const slides = useMemo(
    () => images.map(toLightboxSlide).filter(Boolean),
    [images]
  );

  const handleClick = (value) => {
    const idx = images.findIndex((img) => img._key === value._key);
    lightbox.show(slides, Math.max(0, idx));
  };

  return <PortableBody value={blocks} onImageClick={handleClick} />;
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
