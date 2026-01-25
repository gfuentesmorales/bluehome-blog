import { prisma } from "@/lib/prisma";
import { withSession } from "./withSession";
import { SessionLike } from "@/app/types/session";

export const getDashboardStats = withSession(async (session: SessionLike) => {
  const [totalPosts, totalUsers, totalCategories, totalViewsAgg] =
    await Promise.all([
      prisma.post.count(),
      prisma.user.count(),
      prisma.category.count(),
      prisma.post.aggregate({
        _sum: {
          views: true,
        },
      }),
    ]);

  return {
    posts: totalPosts,
    users: totalUsers,
    categories: totalCategories,
    views: totalViewsAgg._sum.views || 0,
  };
});

