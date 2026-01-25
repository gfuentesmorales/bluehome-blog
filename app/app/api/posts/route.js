import { prisma } from "@/lib/prisma";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "6");
  const q = searchParams.get("search") || "";
  const skip = (page - 1) * limit;

  const where = {
    feature: false,
    ...(q !== "" && {
      OR: [
        { title: { contains: q } },
        { content: { contains: q } },
      ],
    }),
  };

  const posts = await prisma.post.findMany({
    include: { category: true, author: true },
    orderBy: { createdAt: "desc" },
    where,
    skip,
    take: limit,
  });

  const totalPosts = await prisma.post.count({
    where: { feature: false },
  });

  return Response.json({
    posts,
    currentPage: page,
    totalPages: Math.ceil(totalPosts / limit),
  });
}

// POST - crear un post
export async function POST(req) {
  const body = await req.json();
  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
    },
  });
  return Response.json(post);
}
