import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export const getPosts = async (
  params = {
    page: 1,
    limit: 6,
    search: "",
    category: false,
    status: false,
    date: false,
  }
) => {
  const { page = 1, limit = 6, search = "", category, status, date } = params;

  const skip = (page - 1) * limit;
  let where: any = {};

  if (search) {
    where.OR = [
      { title: { contains: search } },
      { content: { contains: search } },
    ];
  }

  if (category) {
    where.categoryId = Number(category);
  }

  if (status) {
    where.status = status;
  }

  if (date) {
    const now = new Date();

    if (String(date) === "today") {
      where.createdAt = {
        gte: new Date(now.setHours(0, 0, 0, 0)),
      };
    }

    if (String(date) === "week") {
      where.createdAt = {
        gte: new Date(now.setDate(now.getDate() - 7)),
      };
    }

    if (String(date) === "month") {
      where.createdAt = {
        gte: new Date(now.setDate(now.getDate() - 30)),
      };
    }
  }

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      include: {
        category: true,
        author: true,
      },
      orderBy: { createdAt: "desc" },
      where,
      skip,
      take: limit,
    }),
    prisma.post.count({ where }),
  ]);

  return {
    posts,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    total,
  };
};

export const getFeaturedPost = unstable_cache(
  async () => {
    return prisma.post.findFirst({
      where: { feature: true },
      orderBy: { createdAt: "desc" },
    });
  },
  ["featured"],
  { revalidate: 300 }
);


export const getPopularPost = async () => {
  return await prisma.post.findMany({
    include: { category: true, author: true },
    orderBy: { views: "desc" },
    take: 3,
  });
};

export const getPostBySlug = async (slug: String) => {
  return await prisma.post.findUnique({
    where: { slug: slug },
    include: {
      category: true,
      author: true,
    },
  });
};
