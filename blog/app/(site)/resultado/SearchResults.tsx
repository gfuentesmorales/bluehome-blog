"use client";

import { useEffect, useState } from "react";
import Container from "../components/Contaier";
import { postsService } from "@/lib/services/posts.service";
import { useSearchParams } from "next/navigation";
import { Post } from "@/app/types/post";
import ImageSafe from "../components/ImageSafe";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const [query, setQuery] = useState(q);
  const [results, setResults] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);

  const [page, setPage] = useState(1);
  const limit = 10;

  const [loading, setLoading] = useState(false);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const { posts = [], totalPages = 0 } = await postsService.getAll(page, limit, query);
      setResults(posts ?? []);
      setTotal(totalPages ?? 0);
    } catch (err) {
      setResults([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  // Ejecutar búsqueda cuando cambie query o page
  useEffect(() => {
    const timeout = setTimeout(fetchResults, 300);
    return () => clearTimeout(timeout);
  }, [query, page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <Container>
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Resultados</h1>

        {/* BUSCADOR */}
        <div className="mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1); // resetear página al buscar
            }}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Buscar..."
          />
        </div>

        {/* LOADING */}
        {loading ? (
          <p className="text-gray-500 mb-6">Buscando...</p>
        ) : results.length > 0 ? (
          <>
            <p className="text-gray-500 mb-6">
              Mostrando {results.length} de {total} resultados {query && `para '${query}'`}
            </p>

            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((item: any) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="relative w-full h-48">

                    <ImageSafe
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />

                  </div>
                  <div className="p-4">
                    <h2 className="font-semibold text-lg mb-2">{item.title}</h2>
                    <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                    <p className="text-gray-400 text-xs">
                      By {item.author?.name || "Unknown"} • {item.date} •{" "}
                      {item.category?.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8 gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Anterior
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-4 py-2 rounded ${page === p ? "bg-primary text-white" : "bg-gray-200"
                    }`}
                >
                  {p}
                </button>
              ))}

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>

          </>
        ) : (
          <p className="text-center text-gray-500 mt-6">
            No se encontraron resultados.
          </p>
        )}
      </div>
    </Container>
  );
}
