"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState, useTransition } from "react";
import ModalConfirmDelete from "../../components/ModalConfirmDelete";
import { Category } from "@/app/types/category";
import LoadingOverlay from "../../components/LoadingOverlay";

export default function CategoryManager({ categories, action, totalPages, currentPage }:
  { categories: Category[], action: any, totalPages: number, currentPage: number }) {
  const [method, setMethod] = useState("POST");
  const [category, setCategory] = useState<Category | undefined>(undefined);
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [isPending, startTransition] = useTransition();

  const resetForm = () => {
    setCategory(undefined);
    setMethod("POST");
  };

  const handleSubmit = (formData: any) => {
    startTransition(async () => {
      await action(formData);
      setCategory(undefined);
      resetForm();
    });
  };

  const handleEdit = (currentCategory: Category) => {
    setCategory(currentCategory);
    setMethod("PUT");
  }

  const handleDelete = (currentCategory: Category) => {
    setCategory(currentCategory);
    setOpenModal(true);
    setMethod("DELETE");
  };

  const handleConfirmDelete = async () => {
    const formData = new FormData();
    formData.set("id", String(category?.id));
    formData.set("method", method);

    await action(formData);

    resetForm();
    setOpenModal(false);
  };

 
  return (

    <div className="w-full ">
      <div className=" mb-4">
        <h1 className="text-2xl font-semibold mb-1">Gestión de Categorías</h1>
        <small className="text-gray-500 mb-8">Crea, edita y elimina las categorías para tu blog.</small>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

        {/* LEFT PANEL */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
          <form action={handleSubmit}>
            <h2 className="font-semibold text-lg mb-4">Añadir Nueva Categoría</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Nombre de la categoría</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
                placeholder="e.g., Tecnología"
                value={category?.name ?? ""}
                onChange={(e) => {
                  setCategory({ ...category, name: e?.target?.value })
                }}
                name="name"
              />
            </div>

            {/* <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Descripción (opcional)</label>
              <textarea
                className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 resize-none focus:ring focus:ring-blue-200"
                placeholder="Breve resumen sobre la categoría"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div> */}

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg"
              >
                {method === 'PUT' ? 'Actualizar Categoría' : 'Crear Categoría'}
              </button>
              <input type="hidden" name="method" value={method} />
              <input type="hidden" name="id" value={category?.id ?? 0} />
              <button
                onClick={() => resetForm()}
                className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>





        {/* RIGHT PANEL */}
        <div className="md:col-span-2 bg-white shadow-md rounded-xl border border-gray-200">
          <h2 className="font-semibold text-lg p-6 pb-4">Categorías Existentes</h2>

          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="p-4 text-sm font-semibold text-gray-700">NOMBRE</th>
                <th className="p-4 text-sm font-semibold text-gray-700">POSTS</th>
                <th className="p-4 text-sm font-semibold text-right text-gray-700">ACCIONES</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((c: Category) => (
                <tr key={c.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-4">{c.name}</td>
                  <td className="p-4 text-gray-600">{c?._count.posts ?? 0}</td>
                  <td className="p-4 flex justify-end gap-3">
                    <a onClick={() => handleEdit(c)}>
                      <span className="material-icons text-[20px] cursor-pointer text-gray-600 hover:text-black ">edit</span>
                    </a>
                    <a onClick={() => handleDelete(c)}>
                      <span className="material-icons text-[20px] cursor-pointer text-gray-600 hover:text-black">delete</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* PAGINADOR */}
          <div className="p-4">
            <div className="flex justify-end gap-2 py-4">
              {Array.from({ length: totalPages }, (_, i) => (
                <Link
                  key={i}
                  href={`?page=${i + 1}`}
                  className={`px-3 py-1 rounded-lg border ${currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-white hover:bg-gray-100"
                    }`}
                >
                  {i + 1}
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
      <ModalConfirmDelete
        open={openModal}
        postTitle={category?.name}
        onCancel={() => setOpenModal(false)}
        onConfirm={() => handleConfirmDelete()}
      />
      <LoadingOverlay show={isPending} />
    </div>
  );
}
