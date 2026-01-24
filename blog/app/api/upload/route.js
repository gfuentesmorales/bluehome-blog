import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") ;

    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadDir = path.join(process.cwd(), "public/uploads");

    // Crear carpeta si no existe
    await mkdir(uploadDir, { recursive: true });

    // Nombre seguro (evitar sobrescribir)
    const filename = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, filename);

    await writeFile(filePath, buffer);

    return new Response(
      JSON.stringify({
        message: "Imagen subida con éxito",
        url: `/uploads/${filename}`,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Error al subir imagen" }), { status: 500 });
  }
}