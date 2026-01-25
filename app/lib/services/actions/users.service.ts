"use server";

import { SessionLike } from "@/app/types/session";
import { withSession } from "./withSession";
import { prisma } from "@/lib/prisma";
import { ParamsDefault } from "@/app/types/default";
import { PaginatedUsers, User } from "@/app/types/user";
import { hashPassword } from "@/lib/password";

export const getUsers = withSession(
  async (
    session: SessionLike,
    params: ParamsDefault
  ): Promise<PaginatedUsers> => {
    const { page = 1, limit = 6 } = params;

    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
      }),
      prisma.user.count(),
    ]);

    return {
      users,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      total,
    };
  }
);

export const getUser = withSession(
  async (session: SessionLike, id: Number): Promise<User> => {
    return await prisma.user.findUnique({
      where: { id: Number(id) },
    });
  }
);

export const getUserByEmail = withSession(
  async (session: SessionLike, email: string): Promise<User> => {
    return await prisma.user.findUnique({
      where: { email: email },
    });
  }
);

export const createUser = withSession(
  async (session: SessionLike, data: any): Promise<User> => {
    const { password, confirmPassword, ...rest } = data;
    const passwordHash = await hashPassword(password);
    return await prisma.user.create({
      data: {
        ...rest,
        password: passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }
);

export const updateUser = withSession(
  async (session: SessionLike, id: number, data: any): Promise<User> => {
    const { password, confirmPassword, ...rest } = data;
    const updateData: Record<string, any> = { ...rest };
    if (password) {
      updateData.password = await hashPassword(password);
    }
    return await prisma.user.update({
      where: { id: Number(id) },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }
);

export const deleteUser = withSession(
  async (session: SessionLike, id: number): Promise<User> => {
    if (id != 1) {
      return await prisma.user.delete({
        where: { id: Number(id) },
      });
    }
    throw new Error("No autorizado");
  }
);
