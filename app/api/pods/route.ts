import { db } from "@/app/db";

export async function GET() {
  const pods = await db.getPods();
  return new Response(JSON.stringify(pods), { status: 200 });
}

export async function POST(request: Request) {
  const body = await request.json();
  const pod = await db.addPod(body);
  return new Response(JSON.stringify(pod), { status: 201 });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await db.deletePod(id);
  return new Response(null, { status: 204 });
}
