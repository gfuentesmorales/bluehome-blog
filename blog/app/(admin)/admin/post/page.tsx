import Link from "next/link";
import PostTable from "./PostTable";
import { getPosts } from "@/lib/services/actions/posts.service";
import { getCategories } from "@/lib/services/actions/categories.service";

export default async function AdminPost() {
  const { posts = [], totalPages = 1, currentPage = 1 } = await getPosts({
    page: 1,
    limit: 10
  });
  const { categories } = await getCategories();

  return (
    <PostTable posts={posts}
      categories={categories}
      initialTotalPages={totalPages}
      initialPage={currentPage} />
  );
}
