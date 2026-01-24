"use client";

import LoadingOverlay from "@/app/(admin)/components/LoadingOverlay";
import { ErrorUser, User } from "@/app/types/user";
import { getUser, getUserByEmail } from "@/lib/services/actions/users.service";
import { parseUserForm, validateUserForm, withBasePath } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { startTransition, useState, useTransition } from "react";

export default function EditUserClient({ action, user }: { action: any, user: User }) {

  const router = useRouter();
  const [error, setError] = useState<ErrorUser>();
  const [isPending, startTransition] = useTransition();

  const method = "PUT";

  const baseInput =
    "w-full mt-2 p-2 border border-gray-200 rounded-lg bg-white transition";



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);

    const form = parseUserForm(formData, method);
    const validationErrors = validateUserForm(form);
    if (Object.keys(validationErrors).length) {
      setError(validationErrors);
      return;
    }



    startTransition(async () => {
      const response = await action(formData);
      if (response?.id) {
        formElement.reset();
        router.push(`/admin/user/edit/${response.id}?saved=1`);
      }
    });
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const form = parseUserForm(new FormData(e.currentTarget.form!));
    const fieldErrors = validateUserForm(form);

    setError((prev) => ({
      ...prev,
      [e.target.name]: fieldErrors[e.target.name as keyof ErrorUser],
    }));
  };


  const inputClass = (hasError?: boolean) =>
    `mt-1 w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${hasError
      ? "border-red-500 focus:border-red-500 focus:ring-red-200"
      : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
    }`;

  return (
    <>
      <div className="min-h-screen p-2 pt-0">
        <div className=" mb-6">
          <h1 className="text-2xl font-semibold">Editar Usuario</h1>
          <small className="mt-1 text-gray-500">
            Complete la información para registrar un nuevo colaborador en el
            blog. Los campos marcados con <span className="font-medium">*</span>{" "}
            son obligatorios.
          </small>
        </div>

        <div className=" max-w-5xl rounded-xl bg-white shadow-sm">


          {/* Card */}
          <form className="mt-8 rounded-xl border border-gray-200 p-6" onSubmit={handleSubmit}>
            {/* Información personal */}

            <section className="mb-8">
              <h2 className="mb-4 flex items-center gap-2 font-semibold text-gray-900">
                👤 Información Personal
              </h2>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nombre Completo *
                  </label>
                  <input
                    id="fullName"
                    name="name"
                    type="text"
                    onBlur={handleBlur}
                    className={inputClass(!!error?.name)}
                    defaultValue={user?.name}
                    placeholder="Juan Pérez"
                  />
                  {error?.name ? (
                    <div className="grid">
                      <small className="mt-2 text-xs text-red-600">{error.name}</small>
                    </div>
                  ) : (
                    <div className="grid">
                      <small className="mt-2 text-xs text-gray-500">
                        Ingresa tú nombre para identificarte.
                      </small>
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Correo Electrónico *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    readOnly={true}
                    className={inputClass(!!error?.email)}
                    onBlur={handleBlur}
                    defaultValue={user?.email}
                    placeholder="juan@ejemplo.com"
                  />
                  {error?.email ? (
                    <div className="grid">
                      <small className="mt-2 text-xs text-red-600">{error.email}</small>
                    </div>
                  ) : (
                    <div className="grid">
                      <small className="mt-2 text-xs text-gray-500">
                        Ingresa un email, este servira para hacer login.
                      </small>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Rol */}
            <section className="mb-8">
              <h2 className="mb-4 flex items-center gap-2 font-semibold text-gray-900">
                🔒 Rol y Permisos
              </h2>

              {/* hidden para enviar el rol */}
              <input type="hidden" name="role" value="USER" />

              <div className="max-w-sm rounded-lg border-2 border-blue-500 bg-blue-50 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Usuario</p>
                    <p className="text-sm text-gray-500">
                      Rol estándar con permisos básicos de lectura y comentarios.
                    </p>
                  </div>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
                    ✓
                  </span>
                </div>
              </div>
            </section>

            {/* Seguridad */}
            <section>
              <h2 className="mb-4 flex items-center gap-2 font-semibold text-gray-900">
                🔐 Seguridad
              </h2>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contraseña *
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className={inputClass(!!error?.password)}
                  />

                  {error?.password ? (
                    <div className="grid">
                      <small className="mt-2 text-xs text-red-600">{error.password}</small>
                    </div>
                  ) : (

                    <p className="mt-2 text-xs text-gray-500">
                      Mínimo 8 caracteres, una mayúscula y un número.
                    </p>
                  )}

                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirmar Contraseña *
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className={inputClass(!!error?.password || !!error?.confirmPassword)}
                  />
                  {error?.confirmPassword && (
                    <div className="grid">
                      <small className="mt-2 text-xs text-red-600">{error.confirmPassword}</small>
                    </div>
                  )}
                </div>
              </div>

            </section>
            <section>
              <h2 className="mb-4 mt-4 flex items-center gap-2 font-semibold text-gray-900">
                👤 Activación
              </h2>
              <div>
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="active"
                    defaultChecked={user?.active}
                    value="1"
                    className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />

                  <div>

                    <p className="text-sm text-gray-500 leading-snug mt-1">
                      Marca esta casilla para que activar o desactivar los usuarios que pueden acceder al panel de administración.
                    </p>
                  </div>
                </label>


              </div>

            </section>
            {/* Actions */}
            <div className="mt-10 flex justify-end gap-3">
              <button
                type="button"
                className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Actualizar Usuario
              </button>
            </div>
          </form>
        </div>
      </div>
      <LoadingOverlay show={isPending} />
    </>
  )
}