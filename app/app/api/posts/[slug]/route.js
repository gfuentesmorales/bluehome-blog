import { prisma } from "@/lib/prisma";

export async function GET(req, { params }) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug: slug },
    include: {
      category: true,
      author: true,
    },
  });

  if (!post) {
    return new Response(JSON.stringify({ error: "Post no encontrado" }), {
      status: 404,
    });
  }

  return Response.json({ post });
}
