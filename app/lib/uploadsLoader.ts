export const uploadsLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const filename = src.startsWith("/") ? src.split("/").pop() : src;
  return `${basePath}/uploads/${filename}?w=${width}&q=${quality ?? 75}`;
};
