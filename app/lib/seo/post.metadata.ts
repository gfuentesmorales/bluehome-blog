import { Metadata } from "next";
import { getPostBySlug } from "../services/server/post.services";

export async function getPostMetadata(slug: string): Promise<Metadata> {
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post no encontrado",
      description: "El contenido que buscas no existe.",
    };
  }

  const description =
    post.excerpt ?? post.content?.replace(/<[^>]*>?/gm, "").slice(0, 160);

  return {
    title: `${post?.metaTitle !== null ? post.metaTitle : post?.title} | Blue Home`,
    description: `${post?.metaDescription !== null ? post?.metaDescription : post?.description}`,
    openGraph: {
      title: post.title,   
      description,
      type: "article",
      images: post.image
        ? [
            {
              url: post.image,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
    },
  };
}
