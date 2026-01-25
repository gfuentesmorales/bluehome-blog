import fs from "fs";
import path from "path";

export async function GET(req, { params }) {
  const { filename } = await params; 

  const uploadsPath = path.join(process.cwd(), "public/uploads", filename);

  try {
    const file = await fs.promises.readFile(uploadsPath);
    const ext = path.extname(filename).toLowerCase();
    const mime =
      ext === ".png"
        ? "image/png"
        : ext === ".jpg" || ext === ".jpeg"
        ? "image/jpeg"
        : "application/octet-stream";

    return new Response(file, { headers: { "Content-Type": mime } });
  } catch (err) {
    console.error("File not found:", filename, err);
    return new Response("Not found", { status: 404 });
  }
}
