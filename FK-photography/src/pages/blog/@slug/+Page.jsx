import { useData } from "vike-react/useData";
import LightboxProvider from "@/providers/LightboxProvider.jsx";
import { BodyWithLightbox } from "@/components/BodyWithLightbox.jsx";

export default function PostPage() {
  const { post } = useData();

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
