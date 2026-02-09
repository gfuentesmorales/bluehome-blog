"use client";

import { useEffect, useState, useTransition } from "react";
import Editor from "@/app/(admin)/components/Editor";
import ImageDropzone from "@/app/(admin)/components/ImageDropzone";
import LoadingOverlay from "@/app/(admin)/components/LoadingOverlay";
import { generateSlug, withBasePath } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Category } from "@/app/types/category";


export default function CreatePostClient({ categories, action }: { categories: any, action: any }) {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const baseInput =
    "w-full mt-2 p-2 border border-gray-200 rounded-lg bg-white transition";


  function handleSubmit(formData: any) {
    startTransition(async () => {
      const response = await action(formData);

      if (response?.id) {
        router.push(`/admin/post/edit/${response.id}?saved=1`);

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
        <div className="flex items-center justify-between ">
          <h1 className="text-2xl font-semibold">Crear Post</h1>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition cursor-pointer"
          >
            Guardar
          </button>
        </div>
        <div className="mb-6">
          <small className="mt-1 text-gray-500">
            Complete la información para crear un nuevo artículo en el blog. Los campos marcados con * son obligatorios.
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
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={handleTitleBlur}
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
                  className={baseInput}
                />
              </div>
              <div className="text">
                <label className="text-sm font-medium mt-4 block">Contenido</label>
                <Editor name="content" />
                <small className="text-gray-500">Utiliza el editor WYSIWYG para formatear tu contenido</small>

              </div>
            </div>
          
            <div className="border border-gray-200 rounded-lg bg-white shadow-sm p-5">
              <div className="text">
                <label className="text-sm font-medium">Meta Titulo</label>
                <input
                  name="metaTitle"
                  className={baseInput}
                />
                <small className="text-gray-500">Máximo 100 caracteres, esto ayudara al posicionamiento de tus entradas.</small>
              </div>
                <div className="text">
                <label className="text-sm font-medium">Meta Descripción</label>
                <textarea
                  name="metaDescription"
                  className={baseInput}
                  rows={5}
                ></textarea>
                <small className="text-gray-500">Utiliza una descripción adecuada para mostrar en los buscadores.</small>
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
                  value={1}
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
              <select name="category" className={baseInput} >
                {categories.map((c: Category) => (
                  <option key={c.id} value={c.id} >
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="border border-gray-200 rounded-lg bg-white shadow-sm p-5">
              <label className="text-sm font-medium">Imagen Destacada</label>
              <ImageDropzone onUploaded={(url: any) => setImage(url)} />
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
