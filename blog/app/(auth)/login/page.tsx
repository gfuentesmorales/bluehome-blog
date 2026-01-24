"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: any) {
    e.preventDefault();
    setError("");
    const res = await signIn("credentials", {
      email: e.target.email.value,
      password: e.target.password.value,
      redirect: false
    });
    if (res?.error) {
      setError("Credenciales incorrectas");
      return;
    }
   router.push("/admin");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
            <svg
              className="h-7 w-7 text-blue-600"
              fill="none"
              strokeWidth="1.8"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 4v16h14V4H5zm4 4h6M9 12h6m-6 4h6"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Panel de Administración
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Bienvenido de nuevo. Por favor, inicia sesión.
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>

          <div>
            <label className="text-gray-700 font-medium block mb-1">
              Email o Nombre de Usuario
            </label>
            <input
              type="text"
              name="email"
              placeholder="Introduce tu email o usuario"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium block mb-1">
              Contraseña
            </label>
            <div className="relative w-full">
              <input
                type="password"
                name="password"
                placeholder="Introduce tu contraseña"
                className="w-full rounded-lg border border-zinc-300 bg-white p-3.5 text-base text-zinc-900 placeholder:text-zinc-500  "
              />

              <div className="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer text-zinc-500 dark:text-zinc-400">
                <span className="material-icons text-[20px]">visibility_off</span>
              </div>
            </div>
          </div>

          {error && (
            <div className="w-full rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 flex justify-between items-center animate-fade-in">
             {error} 
            </div>)
          }

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition"
          >
            Iniciar Sesión
          </button>

        </form>


      </div>
    </div>
  );
}
