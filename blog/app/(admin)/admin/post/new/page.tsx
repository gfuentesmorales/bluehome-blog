import CreatePostClient from "./CreatePost";
import { createPost } from "@/lib/services/actions/posts.service";
import { getCategories } from "@/lib/services/actions/categories.service";

export default async function Page() {

  const { categories } = await getCategories();

  async function generatePost(formData: any) {
    "use server";

    const payload = {
      title: formData.get("title"),
      slug: formData.get("slug"),
      subTitle: formData.get("subTitle"),
      categoryId: Number(formData.get("category")),
      authorId: 1,
      feature: formData.get('feature') ? true : false,
      image: formData.get("image"),
      content: formData.get("content"),
    };

    return await createPost(payload);
  }

  return (
    <CreatePostClient
      categories={categories}
      action={generatePost}
    />
  );
}
