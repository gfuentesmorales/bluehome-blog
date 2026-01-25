import { prisma } from "@/lib/prisma";

export async function GET() {
  const posts = await prisma.post.findMany({
    include: { category: true, author: true },
    orderBy: { views: "desc" },
    take: 3,
  });
  return Response.json({ posts });
}
