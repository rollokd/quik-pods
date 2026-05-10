import { db } from "@/app/db";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PUT(request: Request, { params }: RouteContext) {
  const { id } = await params;
  const body = await request.json();

  console.log("PUT request", { id, body });
  const newPod = await db.updatePod(id, body);

  return new Response(
    JSON.stringify({
      success: true,
      postId: id,
      data: newPod,
    }),
  );
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const { id } = await params;

  await db.deletePod(id);

  return new Response(
    JSON.stringify({
      success: true,
      postId: id,
    }),
  );
}
