"use client";

import { useState, useTransition } from "react";
import Editor from "@/app/(admin)/components/Editor";
import ImageDropzone from "@/app/(admin)/components/ImageDropzone";
import LoadingOverlay from "@/app/(admin)/components/LoadingOverlay";
import { generateSlug, withBasePath } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Category } from "@/app/types/category";
import { Post } from "@/app/types/post";

export default function EditPostClient({ post, categories, action }:
  { post: Post, categories: Category[], action: any }) {

  const router = useRouter();
  const [image, setImage] = useState(post.image || "");
  const [isPending, startTransition] = useTransition();
  const [title, setTitle] = useState(post.title || "");
  const [slug, setSlug] = useState(post.slug || "");

  const baseInput =
    "w-full mt-2 p-2 border border-gray-200 rounded-lg bg-white transition";

  function handleSubmit(formData: any) {
    startTransition(async () => {
      const response = await action(formData);

      if (response?.id) {
        router.push(`/admin/post/${response.id}/edit?saved=1`);
      }
    });

  }
  function handleTitleBlur() {
    if (!slug.trim()) {
      setSlug(generateSlug(title));
    }
  }

  return (
    <>
      <form action={handleSubmit} className="p-2 pt-0">
        <input type="hidden" name="image" value={image} />

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Editar Post</h1>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition cursor-pointer"
          >
            Guardar
          </button>
        </div>
         <div className="mb-6">
          <small className="mt-1 text-gray-500">
            Actualice la información del artículo según sea necesario. Los campos marcados con * son obligatorios.
          </small>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna izquierda */}
          <div className="lg:col-span-2 space-y-6">
            <div className="border border-gray-200 rounded-lg bg-white shadow-sm p-5">
              <div className="text">
                <label className="text-sm font-medium">Título</label>
                <input
                  name="title"
                  defaultValue={post.title}
                  onBlur={handleTitleBlur}
                  onChange={(e) => setTitle(e.target.value)}
                  className={baseInput}
                />
                <small className="text-gray-500">Máximo 100 caracteres, impactante y descriptivo</small>
              </div>
              <div className="text">
                <label className="text-sm font-medium mt-4 block">Slug</label>
                <input
                  name="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className={baseInput}
                />
                <small className="text-gray-500">Personaliza tu URL para ayudar en el SEO de tu contenido</small>

              </div>
              <div className="text">
                <label className="text-sm font-medium mt-4 block">Subtítulo</label>
                <input
                  name="subTitle"
                  defaultValue={post.subTitle}
                  className={baseInput}
                />
              </div>
              <div className="text">
                <label className="text-sm font-medium mt-4 block">Contenido</label>
                <Editor name="content" initialValue={post.content} />
                <small className="text-gray-500">Utiliza el editor WYSIWYG para formatear tu contenido</small>

              </div>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="space-y-6">

            <div className="rounded-2xl border border-gray-200 p-5 bg-white shadow-sm">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="feature"
                  defaultChecked={post?.feature}
                  value="1"
                  className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />

                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Destacar Artículo
                  </h3>
                  <p className="text-sm text-gray-500 leading-snug mt-1">
                    Marca esta casilla para que el artículo aparezca en la sección de
                    destacados o en la página de inicio.
                  </p>
                </div>
              </label>
            </div>
            <div className="border border-gray-200 rounded-lg bg-white shadow-sm p-5">
              <label className="text-sm font-medium">Categoría</label>
              <select name="category" className={baseInput} defaultValue={post.category?.id}>
                {categories.map((c: Category) => (
                  <option key={c.id} value={c.id} >
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="border border-gray-200 rounded-lg bg-white shadow-sm p-5">
              <label className="text-sm font-medium">Imagen Destacada</label>
              <ImageDropzone onUploaded={(url: any) => setImage(url)} image={post?.image} />
            </div>

            <div className="border border-gray-200 rounded-lg bg-white shadow-sm p-5">
              <label className="text-sm font-medium">Autor</label>
              <select name="author" className={baseInput}>
                <option value="1">Admin</option>
              </select>
            </div>
          </div>
        </div>
      </form>
      <LoadingOverlay show={isPending} />
    </>
  );
}
