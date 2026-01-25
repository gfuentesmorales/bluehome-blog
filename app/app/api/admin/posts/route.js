import { prisma } from "@/lib/prisma";
import { createPost } from "@/lib/services/actions/posts.service";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: "No autorizado" }, { status: 401 });
    }
    const data = await req.json();
    const create = createPost(data);
    return Response.json(create);
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "6");
  const q = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const status = searchParams.get("status") || "";
  const date = searchParams.get("date") || "";
  const skip = (page - 1) * limit;

  const where = {};

  if (q) {
    where.OR = [{ title: { contains: q } }, { content: { contains: q } }];
  }

  if (category) {
    where.categoryId = parseInt(category);
  }

  if (status) {
    where.status = status;
  }

  if (date) {
    const now = new Date();
    if (date === "today")
      where.createdAt = { gte: new Date(now.setHours(0, 0, 0, 0)) };
    if (date === "week")
      where.createdAt = { gte: new Date(now.setDate(now.getDate() - 7)) };
    if (date === "month")
      where.createdAt = { gte: new Date(now.setDate(now.getDate() - 30)) };
  }

  const posts = await prisma.post.findMany({
    include: { category: true, author: true },
    orderBy: { createdAt: "desc" },
    where,
    skip,
    take: limit,
  });

  const totalPosts = await prisma.post.count({ where });

  return Response.json({
    posts,
    currentPage: page,
    totalPages: Math.ceil(totalPosts / limit),
  });
}
