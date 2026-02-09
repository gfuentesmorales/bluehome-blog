"use server";

import { prisma } from "@/lib/prisma";
import { withSession } from "./withSession";
import { SessionLike } from "@/app/types/session";

export const createPost = withSession(
  async (session: SessionLike, input: any) => {
    return prisma.post.create({
      data: {
        ...input,
        authorId: session?.user?.id ?? 1,
      },
    });
  }
);

export const updatePost = withSession(
  async (session: SessionLike, id: Number, data: unknown) => {
    console.log('data', data);
    const updated = await prisma.post.update({
      where: { id: Number(id) },
      data,
    });

    return updated;
  }
);

export const deletePost = withSession(
  async (session: SessionLike, id: Number) => {
    const deleted = await prisma.post.delete({
      where: { id: Number(id) },
    });

    return deleted;
  }
);

export const getPosts = withSession(
  async (
    _session: SessionLike,
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

      if (String(date) == "today") {
        where.createdAt = {
          gte: new Date(now.setHours(0, 0, 0, 0)),
        };
      }

      if (String(date) == "week") {
        where.createdAt = {
          gte: new Date(now.setDate(now.getDate() - 7)),
        };
      }

      if (String(date) == "month") {
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
  }
);

export const getPostById = withSession(
  async (_session: SessionLike, id: Number) => {
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
      include: {
        category: true,
        author: true,
      },
    });
    if (!post) {
      throw new Error("Post no encontrado");
    }

    return post;
  }
);
