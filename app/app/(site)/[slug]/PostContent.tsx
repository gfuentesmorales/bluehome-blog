import Image from "next/image";
import ImageSafe from "../components/ImageSafe";
import { Post } from "@/app/types/post";

export default async function PostContent({ post }: { post: Post }) {
  return (
    <div className="content">

      {/* Imagen principal */}
      <div className="mb-12">

        <div className="relative w-full aspect-[3/2]">
          <ImageSafe
            src={post?.image ?? "" }
            alt={post.title ?? ""}
            fill
            className="object-cover rounded-md"
          />
        </div>
      </div>

      {/* CONTENIDO */}

      <div
        dangerouslySetInnerHTML={{
          __html: post.content,
        }}
        className="max-w-none text-text-light dark:text-text-dark text-lg leading-relaxed space-y-6 text-balance"
      />


      {/* SHARE */}
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">
          Compartir este artículo
        </h3>

        <div className="flex items-center gap-3">

          {/* Facebook */}
          <a className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 border hover:bg-primary hover:text-white transition-colors" href="#">
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path clipRule="evenodd" fillRule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
              />
            </svg>
          </a>

          {/* X/Twitter */}
          <a className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 border  hover:bg-primary hover:text-white transition-colors" href="#">
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675..." />
            </svg>
          </a>

          {/* Link */}
          <a className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 border hover:bg-primary hover:text-white transition-colors" href="#">
            <span className="material-icons text-xl">link</span>
          </a>

        </div>
      </div>

    </div>

  )
}