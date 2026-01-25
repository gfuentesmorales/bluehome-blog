import { isEmpty, truncate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import ImageSafe from "./ImageSafe";
import { getFeaturedPost, getPopularPost } from "@/lib/services/server/post.services";

export default async function FeaturedPost() {

  const [mainPost, popularPosts] = await Promise.all([
    getFeaturedPost(),
    getPopularPost()
  ]);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

      {/* Post principal */}
      {!isEmpty(mainPost) && (
        <div className="lg:col-span-8">
          <div className="bg-white  dark:bg-card-dark rounded-lg shadow-lg overflow-hidden group flex flex-col md:flex-row">

            {/* Imagen */}

            <div className="md:w-1/2 min-h-[450px]">

              <Link href={`/${mainPost.slug}`}>
                <div className="w-full h-full relative">
                  <ImageSafe
                    alt={mainPost.title}
                    src={mainPost?.image ?? ''}
                    fill
                    className="object-cover"
                    style={{ objectPosition: "center" }}
                  />
                </div>

              </Link>

            </div>

            {/* Texto */}
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
              <Link href={`/${mainPost.slug}`}>
                <p className="text-sm text-primary font-bold uppercase tracking-wider mb-2">
                  {mainPost.category?.name}
                </p>

                <h2 className="text-2xl md:text-3xl font-bold text-text-light dark:text-text-dark mb-4  transition-colors">
                  {mainPost.title}
                </h2>
                <p className="text-gray-500 k mb-4 line-clamp-2">
                  {truncate(mainPost.content, 150)}
                </p>

                <div className="flex items-center text-sm text-gray-500">
                  <span className="material-icons text-base mr-2 ">calendar_today</span>
                  <span>{new Date(mainPost.createdAt).toLocaleDateString()}</span>
                </div>
              </Link>
            </div>

          </div>
        </div>
      )}
      {/* Populares */}
      {!isEmpty(popularPosts) && (
        <div className="lg:col-span-4">
          <div className="bg-white  dark:bg-card-dark rounded-lg shadow-lg p-6 h-full">
            <h3 className="text-xl font-bold mb-4">Populares</h3>

            <div className="space-y-10">
              {popularPosts.map((post: any) => (
                <Link href={`/${post.slug}`} key={post.id} className="flex items-start space-x-4 group">
                  <ImageSafe
                    alt={post.title}
                    src={post.image}
                    width={80}
                    height={80}
                    className="rounded-md  w-20 h-20 object-cover"
                    style={{ objectPosition: "center" }}
                  />


                  <div>
                    <p className="text-sm font-bold text-primary mb-1">
                      {post.category?.name}
                    </p>

                    <h4 className="font-semibold transition-colors leading-tight">
                      {post.title}
                    </h4>

                  </div>
                </Link>
              ))}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
