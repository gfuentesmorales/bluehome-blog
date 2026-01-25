import { postsService } from "@/lib/services/posts.service";
import { truncate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import ImageSafe from "../components/ImageSafe";
import { Post } from "@/app/types/post";

export default async function PostFeatured() {
  const { posts: featurePosts } = await postsService.getFeatured();

  return (
    <section className="mt-20">
      <h2 className="text-3xl font-bold text-center mb-12">Artículos Relacionados</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featurePosts.map((item: Post) => (
          <div
            key={item.id}
            className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden group flex flex-col"
          >
            <Link href={`/${item.slug}`}>
              <ImageSafe
                alt={item.title}
                src={item.image || ""}
                width={800}
                height={400}
                className="w-full h-56 object-cover"
              />
              <div className="p-6 flex-grow">
                <p className="text-sm font-bold text-primary mb-2">
                  {item?.category?.name}
                </p>

                <h3 className="text-xl font-bold mb-3  transition-colors">
                  {item.title}
                </h3>

                <p className="text-gray-500 mb-4 line-clamp-2">
                  {truncate(item.content, 150)}
                </p>
              </div>

              <div className="p-6 pt-0">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="material-icons text-base mr-1">calendar_today</span>
                  <span>{new Date(item.createdAt).toLocaleDateString("es-CL", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
