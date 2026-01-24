import { notFound } from "next/navigation";
import Container from "../components/Contaier";
import PostContent from "./PostContent";
import PostFeatured from "./PostFeatured";
import PostHeader from "./PostHeader";
import { getFeaturedPost, getPostBySlug } from "@/lib/services/server/post.services";
import { getPostMetadata } from "@/lib/seo/post.metadata";
import { Metadata } from "next";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
   const { slug } = await params; 
  return getPostMetadata(slug);
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const [post, featured] = await Promise.all([
    getPostBySlug(slug),
    getFeaturedPost()
  ]);

  if (!post) {
    notFound(); 
  }
  return (
    <Container className="max-w-8xl mx-auto ">
      {post && (
        <>
          <PostHeader post={post} />
          <PostContent post={post} />
        </>
      )}
      {featured && (
        <div className="mb-5">
          <PostFeatured />
        </div>
      )}
    </Container>
  );
}
