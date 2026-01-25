import { prisma } from "@/lib/prisma";
import { getPostById, updatePost, deletePost } from "@/lib/services/actions/posts.service";

export async function GET(req, { params }) {
  const { id } = await params;

  const post = await getPostById(id);

  if (!post) {
    return new Response(JSON.stringify({ error: "Post no encontrado" }), {
      status: 404,
    });
  }

  return Response.json(post);
}

export async function PUT(req, { params }) {
  try {
    const data = await req.json();
    const { id } = await params;
    const updated = await updatePost(id, data);
    return Response.json(updated);
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    const deleteItem = await deletePost(id);
    return Response.json(deleteItem);
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
