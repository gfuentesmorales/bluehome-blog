"use client";

import Image, { ImageProps } from "next/image";

type ImageSafeProps = ImageProps & { fallback?: string };

export default function ImageSafe({
  src,
  alt,
  fallback = "/uploads/placeholder.png",
  ...rest
}: ImageSafeProps) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (src instanceof Blob) {
    const objectUrl = URL.createObjectURL(src);
    return <Image src={objectUrl} alt={alt || "image"} {...rest} unoptimized />;
  }

  if (typeof src === "string" && src.startsWith("blob:")) {
    return <Image src={src} alt={alt || "image"} {...rest} unoptimized />;
  }
  
  if (!src) {
    return <Image src={`${basePath}${fallback}`} alt={alt || "image"} {...rest} unoptimized />;
  }

  if (typeof src === "string") {
    const filename = src.split("/").pop() ?? fallback.split("/").pop() ?? "placeholder.png";
    const apiSrc = `${basePath}/api/upload/${filename}`;
    return <Image src={apiSrc} alt={alt || "image"} {...rest} unoptimized />;
  }



  return <Image src={src} alt={alt || "image"} {...rest} unoptimized />;
}
