"use server";

import { prisma } from "@/lib/prisma";
import { withSession } from "./withSession";
import { SessionLike } from "@/app/types/session";

export const getCategories = withSession(
  async (session: SessionLike, params = { page: 1, limit: 6 }) => {
    const { page = 1, limit = 6 } = params;

    const skip = (page - 1) * limit;

    const [categories, total] = await Promise.all([
      prisma.category.findMany({
        include: {
          _count: {
            select: { posts: true },
          },
        },
        skip,
        take: limit,
      }),
      prisma.category.count(),
    ]);

    return {
      categories,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      total,
    };
  }
);

export const createCategory = withSession(
  async (_session: SessionLike, data: unknown) => {
    return prisma.category.create({
      data,
    });
  }
);

export const updateCategory = withSession(
  async (_session: SessionLike, id: Number, data: unknown) => {
    return await prisma.category.update({
      data: data,
      where: { id: Number(id) },
    });
  }
);

export const deleteCategory = withSession(
  async (_session: SessionLike, id: Number) => {
    return await prisma.category.delete({
      where: { id: Number(id) },
    });
  }
);
