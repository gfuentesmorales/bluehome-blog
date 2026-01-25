"use client";

import { truncate } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import ModalConfirmDelete from "../../components/ModalConfirmDelete";
import { Post } from "@/app/types/post";
import { deletePost, getPosts } from "@/lib/services/actions/posts.service";


export default function PostTable({ posts: initialPosts, categories, initialTotalPages, initialPage }: {
  posts: any, categories: any, initialTotalPages: any, initialPage: any
}) {
  const [posts, setPosts] = useState(initialPosts);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [openModal, setOpenModal] = useState(false);
  const [postDelete, setPostDelete] = useState<Post>();

  useEffect(() => {

    fetchPosts();
  }, [search, selectedCategory, selectedDate, currentPage]);

  async function fetchPosts() {
    try {
      const result = await getPosts({
        page: currentPage,
        limit: 10,
        search,
        category: Number(selectedCategory),
        date: selectedDate,
      });
      setPosts(result?.posts ?? []);
      setTotalPages(result?.totalPages ?? 0);
    } catch (err) {
      console.error(err);
    }
  }

  const handleDelete = async (post: Post) => {
    setPostDelete(post);
    setOpenModal(true);
  };

  const handleDeletePost = async () => {
    if (!postDelete?.id) return;
    const deleteItem = await deletePost(postDelete?.id);
    if (deleteItem) {
      setOpenModal(false);
      fetchPosts();
    }
  }


  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Publicaciones</h1>
          <small className="text-gray-500">Edita, crea o elimina tus publicaciones</small>
        </div>

        <Link href={'/admin/post/new'} className="mt-4 md:mt-0 px-4 py-2 rounded-lg bg-blue-600 text-white cursor-pointer">
          Crear publicación
        </Link>
      </div>
      <div className="w-full bg-white rounded-2xl p-6 shadow-sm border border-gray-100">



        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex items-center bg-gray-100 px-3 py-2 rounded-xl w-full md:w-72">
            <span className="material-icons text-gray-500 text-[20px] mr-2">search</span>
            <input
              type="text"
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por titulo o contenido..."
              className="bg-transparent outline-none w-full"
            />
          </div>


          <select
            className="px-4 py-2 bg-gray-100 rounded-xl flex items-center gap-2 pr-8 appearance-none cursor-pointer text-gray-700 font-medium"
            onChange={e => setSelectedCategory(e.target.value)}

          >
            <option value="">Filtrar por Categoría</option>
            {categories.map((category: any) => (
              <option value={category.id} key={category.id} >{category.name}</option>

            ))}

          </select>

          {/*   <button className="px-4 py-2 bg-gray-100 rounded-xl flex items-center gap-2">
            Filter by Status
            <span className="material-icons text-[18px]">expand_more</span>
          </button>*/}

          <select
            className="px-4 py-2 bg-gray-100 rounded-xl flex items-center gap-2 pr-8 appearance-none cursor-pointer text-gray-700 font-medium"
          >
            <option value="">Filtrar por fecha</option>
            <option value="today">Hoy</option>
            <option value="week">Esta semana</option>
            <option value="month">Este mes</option>
          </select>
        </div>
        {/* Tabla */}
        <div className="overflow-x-auto border border-gray-100 rounded-xl">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="p-4"><input type="checkbox" /></th>
                <th className="p-4">Titulo</th>
                <th className="p-4">Categoría</th>
                <th className="p-4">Estado</th>
                <th className="p-4">Destacado</th>
                <th className="p-4">Fecha Publicación</th>
                <th className="p-4">Acción</th>
              </tr>
            </thead>

            <tbody className="text-gray-700 text-sm">
              {posts.map((post: any) => (
                <tr key={post.id}>
                  <td className="p-4"><input type="checkbox" /></td>
                  <td className="p-4">{truncate(post.title, 50)}</td>
                  <td className="p-4">{post.category?.name}</td>
                  <td className="p-4">
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium">Publicado</span>
                  </td>
                  <td className="p-4">{post.feature ? "Sí" : "No"}</td>
                  <td className="p-4">
                    {new Date(post.createdAt).toLocaleDateString("es-CL", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    })}
                  </td>

                  <td className="p-4 flex gap-3">
                    <Link href={`/${post.slug}`} target="_blank">
                      <span className="material-icons text-[20px] cursor-pointer text-gray-600 hover:text-black">visibility</span>
                    </Link>
                    <Link href={`/admin/post/edit/${post.id}`}>
                      <span className="material-icons text-[20px] cursor-pointer text-gray-600 hover:text-black">edit</span>
                    </Link>
                    <a onClick={() => handleDelete(post)}>
                      <span className="material-icons text-[20px] cursor-pointer text-gray-600 hover:text-black">delete</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginador */}
        <div className="flex items-center justify-end mt-4 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <Link
              key={i}
              href={`/admin/post?page=${i + 1}`}
              className={`px-3 py-1 rounded-lg ${currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}
            >
              {i + 1}
            </Link>
          ))}
        </div>
        <ModalConfirmDelete
          open={openModal}
          postTitle={postDelete?.title}
          onCancel={() => setOpenModal(false)}
          onConfirm={() => handleDeletePost()}
        />
      </div>
    </div>
  )
}