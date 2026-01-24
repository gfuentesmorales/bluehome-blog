import { updateCategory, deleteCategory } from "@/lib/services/actions/categories.service";

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const data = await req.json();
    const update = updateCategory(id, data);
    return Response.json(update);
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    const deleteCat = await deleteCategory(id)
    return Response.json(deleteCat);
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
