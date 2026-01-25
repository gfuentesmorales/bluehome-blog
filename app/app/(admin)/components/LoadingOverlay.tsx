'use client';

export default function LoadingOverlay({ show = false, text = "Cargando..." }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="animate-spin h-10 w-10 border-4 border-white border-t-transparent rounded-full mb-4"></div>
      <span className="text-white text-lg font-medium">{text}</span>
    </div>
  );
}
