import Link from "next/link";
import CategoryManager from "./CategoryManager";
import { revalidatePath } from "next/cache";
import { getCategories, createCategory, updateCategory, deleteCategory } from "@/lib/services/actions/categories.service";

export default async function AdminCategory() {

  const { categories, totalPages, currentPage } = await getCategories(1, 10);


  async function generateCategory(formData: any) {
    "use server";
    const action = formData.get('method') ?? "DEFAULT";
    const id = formData.get('id') ?? 0;
    const payload = {
      name: formData.get("name")
    };
    if (action === 'POST') {
      await createCategory(payload);
    }

    if (action === "PUT" && id) {
      await updateCategory(Number(id), payload);
    }
    if (action === 'DELETE' && id) {
      await deleteCategory(Number(id));
    }

    revalidatePath(".");
  }

  return (
    <CategoryManager categories={categories} action={generateCategory} totalPages={totalPages} currentPage={currentPage} />
  );
}
