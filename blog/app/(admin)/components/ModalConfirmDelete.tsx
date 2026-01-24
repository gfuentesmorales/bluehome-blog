"use client";

export default function ModalConfirmDelete({ open, onCancel, onConfirm, postTitle }:
  { open: boolean, onCancel: any, onConfirm: any, postTitle: string | undefined }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 text-center animate-fadeIn">

        {/* Ícono (SVG nativo) */}
        <div className="w-14 h-14 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M9 13h6m2 0a2 2 0 01-2 2H9a2 2 0 01-2-2m0 0V7h10v6m-5-6V4m-4-1h8l-1 1H8l-1-1z"
            />
          </svg>
        </div>

        {/* Título */}
        <h2 className="text-2xl font-semibold text-gray-900">
          Confirmar Eliminación
        </h2>

        {/* Mensaje */}
        <p className="text-gray-600 mt-2">
          ¿Estás seguro de que deseas eliminar el post{" "}
          <span className="font-semibold">"{postTitle}"</span>?
          Esta acción no se puede deshacer.
        </p>

        {/* Botones */}
        <div className="mt-6 flex gap-4 justify-center">
          <button
            onClick={onCancel}
            className="px-6 py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
