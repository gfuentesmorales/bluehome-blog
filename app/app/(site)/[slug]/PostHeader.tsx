import Image from "next/image";
import ImageSafe from "../components/ImageSafe";
import { Post } from "@/app/types/post";

export default async function PostHeader({ post } : { post: Post }) {
  return (
    <header className="mb-12 text-center">
      <a className="text-primary font-bold uppercase tracking-wider text-sm mb-4 inline-block" href="#">{post?.subTitle}</a>
      <h1 className="text-4xl md:text-5xl font-bold text-text-light dark:text-text-dark mb-6 leading-tight">{post?.title}</h1>
      <div className="flex items-center justify-center text-muted-light dark:text-muted-dark space-x-6">
        <div className="flex items-center">
          <div className="relative  w-12 h-12 rounded-full mr-3">
            <ImageSafe 
              src="/uploads/avatar.png"
              fill
              className="object-cover rounded-full"
               alt={"Admin"}
            />
          </div>
          
          <span>Por {post?.author?.name}</span>
        </div>
        <div className="flex items-center text-gray-500">
          <span className="material-icons text-xl mr-2 ">calendar_today</span>
          <span>{new Date(post.createdAt).toLocaleDateString("es-CL", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</span>
        </div>
      </div>
    </header>
  )
}