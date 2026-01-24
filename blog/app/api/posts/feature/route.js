import { prisma } from "@/lib/prisma";

export async function GET() {
  const posts = await prisma.post.findMany({
    include: { category: true, author: true },
    orderBy: { createdAt: "desc" },
    where: {
      feature: true,
    },
    take: 1,
  });
  return Response.json({ posts });
}
