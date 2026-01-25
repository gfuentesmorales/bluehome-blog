"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Search() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) return;

    router.push(`/resultado?q=${encodeURIComponent(query)}`);
    return;
  };

  return (
    <>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-text-light dark:text-text-dark mb-4">
          Descubre nuestros artículos destacados
        </h1>
        <p className="text-lg text-muted-light dark:text-muted-dark max-w-3xl mx-auto">
          Explora contenido útil, tendencias del mercado y guías prácticas diseñadas para ayudarte a tomar mejores decisiones e inspirarte en cada paso.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
        {/* Search Bar */}
        <div className="md:col-span-12">
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="search"
              placeholder="Buscar un articulo..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-md 
                   border border-muted-light
                   bg-card-light dark:bg-card-dark 
                   text-text-light dark:text-text-dark
                   border-gray-300 
                   bg-white
                   transition"
            />

            <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 
                       text-muted-light dark:text-muted-dark">
              search
            </span>
          </form>
        </div>
      </div>
    </>
  );
}
