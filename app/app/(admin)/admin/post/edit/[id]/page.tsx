import { revalidatePath } from "next/cache";
import EditPostClient from "./EditPostClient";
import { redirect } from "next/navigation";
import { getPostById, updatePost } from "@/lib/services/actions/posts.service";
import { getCategories } from "@/lib/services/actions/categories.service";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const post = await getPostById(Number(id));
  const { categories } = await getCategories();

  async function handleUpdatePost(formData: FormData) {
    "use server";
    const payload = {
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      subTitle: formData.get("subTitle") as string,
      category: {
        connect: {
          id: Number(formData.get("category")),
        }
      },
      author: {
        connect: { id: 1 }
      },
      feature: formData.get('feature') ? true : false,
      image: formData.get("image") as string,
      content: formData.get("content" as string),
      metaTitle: formData.get("metaTitle"),
      metaDescription: formData.get("metaDescription"),
    };

    const reponse = await updatePost(Number(id), payload);

    revalidatePath(`/admin/post/edit/${id}`);
    redirect(`/admin/post/edit/${id}?saved=1`);

  }

  return (
    <EditPostClient
      post={post}
      categories={categories}
      action={handleUpdatePost}
    />
  );
}
