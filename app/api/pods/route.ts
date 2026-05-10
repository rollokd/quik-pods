import { db } from "@/app/db";

export async function GET() {
  const pods = await db.getPods();
  return new Response(JSON.stringify(pods), { status: 200 });
}
export async function POST(request: Request) {
  const body = await request.json();
  const parsed = db.addPod.schema.safeParse(body);
  if (!parsed.success) {
    return new Response(JSON.stringify(parsed.error), { status: 400 });
  }
  const pod = await db.addPod.fn(parsed.data);
  return new Response(JSON.stringify(pod), { status: 201 });
}
