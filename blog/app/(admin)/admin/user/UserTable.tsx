
"use client";

import { PaginatedUsers, User } from "@/app/types/user";
import { truncate } from "@/lib/utils";
import Link from "next/link";
import ModalConfirmDelete from "../../components/ModalConfirmDelete";
import { useState } from "react";
import { deleteUser, getUsers } from "@/lib/services/actions/users.service";

export default function UserTable({ data }: {
  data: PaginatedUsers
}) {

  const { users: initialUsers, currentPage: initialPage, totalPages: initialTotalPages, total } = data;
  const [users, setUsers] = useState(initialUsers);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [userDelete, setUserDelete] = useState<User>();
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(initialTotalPages);

  async function fetchUsers() {
    try {
      const result = await getUsers({
        page: currentPage,
        limit: 10,
      });
      setUsers(result?.users ?? []);
      setTotalPages(result?.totalPages ?? 0);
    } catch (err) {
      console.error(err);
    }
  }


  const handleDelete = (user: User) => {
    setUserDelete(user);
    setOpenModal(true);
  }

  const handleDeleteUser = async () => {
    if (!userDelete?.id) return;
    const deleteItem = await deleteUser(userDelete?.id);
    if (deleteItem) {
      setOpenModal(false);
      fetchUsers();
    }

  }

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Usuarios</h1>
          <small className="text-gray-500">Edita, crea o elimina tus usuarios</small>
        </div>

        <Link href={'/admin/user/new'} className="mt-4 md:mt-0 px-4 py-2 rounded-lg bg-blue-600 text-white cursor-pointer">
          Crear usuario
        </Link>
      </div>
      <div className="w-full bg-white rounded-2xl p-6 shadow-sm border border-gray-100 min-h-[calc(80vh-4rem)] flex flex-col">
        <div className="flex flex-wrap gap-3 mb-4">

        </div>
        <div className="overflow-x-auto border border-gray-100 rounded-xl">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="p-4"><input type="checkbox" /></th>
                <th className="p-4">Id</th>
                <th className="p-4">Nombre</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Acción</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {users.map((user: User) => (
                <tr key={user?.id}>
                  <td className="p-4"><input type="checkbox" /></td>
                  <td className="p-4">{user.id}</td>
                  <td className="p-4">{truncate(user.name, 100)}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.role}</td>
                  <td className="p-4">

                    <Link href={`/admin/user/edit/${user.id}`}>
                      <span className="material-icons text-[20px] cursor-pointer text-gray-600 hover:text-black">edit</span>
                    </Link>
                    <a onClick={() => handleDelete(user)}>
                      <span className="material-icons text-[20px] cursor-pointer text-gray-600 hover:text-black">delete</span>
                    </a>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Paginador */}
        <div className="flex items-center justify-end gap-2 mt-auto pt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <Link
              key={i}
              href={`/admin/user?page=${i + 1}`}
              className={`px-3 py-1 rounded-lg ${currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}
            >
              {i + 1}
            </Link>
          ))}
        </div>
        <ModalConfirmDelete
          open={openModal}
          postTitle={userDelete?.name}
          onCancel={() => setOpenModal(false)}
          onConfirm={() => handleDeleteUser()}
        />
      </div>
    </div>
  );
}