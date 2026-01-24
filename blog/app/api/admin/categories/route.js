import { getCategories, createCategory} from "@/lib/services/actions/categories.service";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "6");
  const categories = await getCategories({ page, limit });

  return Response.json(categories);
}

export async function POST(req) {
  try {
    const data = await req.json();
    const create = await createCategory(data);
    return Response.json(create);
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
