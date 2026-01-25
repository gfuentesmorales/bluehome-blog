"use client";

import { useState, useEffect } from "react";
import { postsService } from "@/lib/services/posts.service";
import { truncate } from "@/lib/utils";
import Image from "next/image";
import ImageSafe from "./ImageSafe";
import Link from "next/link";

export default function PostsClient() {
  const [posts, setPosts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    postsService.getAll(currentPage, postsPerPage)
    .then((res: any) => {
      setPosts(res.posts);
      setTotalPages(res.totalPages);
    });
  }, [currentPage]);
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-card-dark rounded-lg shadow-lg overflow-hidden group flex flex-col"
          >
            <Link className="block" href={`/${post.slug}`}>
              <div className="relative w-full h-56">
                <ImageSafe
                  src={post?.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6 flex-grow">
                <p className="text-sm font-bold text-primary mb-2">
                  {post.category?.name}
                </p>

                <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-3 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-500 mb-4 line-clamp-2">
                  {truncate(post.content, 150)}
                </p>
              </div>

              <div className="p-6 pt-0">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="material-icons text-base mr-1">
                    calendar_today
                  </span>
                  <span>
                    {new Date(post.createdAt).toLocaleDateString("es-CL", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Paginador */}
      <div className="flex justify-center mt-8 gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Anterior
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 rounded ${currentPage === page ? "bg-primary text-white" : "bg-gray-200"
              }`}
          >
            {page}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </>
  );
}
