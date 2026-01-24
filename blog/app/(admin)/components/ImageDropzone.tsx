"use client";

import { http } from "@/lib/http/client";
import { useState, useEffect, useRef } from "react";
import ImageSafe from "./ImageSafe";

export default function ImageDropzone({ onUploaded, image = null }: { onUploaded: any, image?: any }) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 👉 si viene imagen desde afuera, úsala como preview inicial
  useEffect(() => {
    if (image) setPreview(image);
  }, [image]);

  const uploadFile = async (file: any) => {
    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);
    const res : any = await http("/api/admin/upload", {
      method: "POST",
      body: formData,
    });


    setIsUploading(false);

    if (res.url) {
      onUploaded(res.url);
    }
  };

  const handleFile = (file: File | null) => {
    if (!file) return;
    setPreview(URL.createObjectURL(file)); // preview local
    uploadFile(file);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  };
  console.log('previw',  preview);

  return (
    <div className="flex flex-col gap-4">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className="mt-3 border-2 border-dashed border-gray-300 rounded-xl p-3 text-center text-gray-500 cursor-pointer"
      >
        <input
          ref={fileInputRef}
          type="file"
          id="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => handleFile(e.target.files?.[0] || null)}
        />


        {!preview ? (
          <>
            <span className="material-icons text-4xl mb-2">cloud_upload</span>
            <p className="font-medium">Click para subir o arrastra y suelta</p>
            <p className="text-xs mt-1">SVG, PNG, JPG (MAX. 800×400px)</p>
          </>
        ) : (
          <div className="relative w-full h-64 rounded-xl overflow-hidden">
            <ImageSafe src={preview} fill alt="Image" className="object-cover object-center" />
          </div>
        )}
      </div>

      {isUploading && (
        <p className="text-blue-600 text-center">Subiendo imagen...</p>
      )}
    </div>
  );
}
