import { DELETE, PUT } from "../../app/api/pods/[id]/route";
import { GET, POST } from "../../app/api/pods/route";
import { http } from "msw";

function getStringParam(param: string | readonly string[] | undefined) {
  return Array.isArray(param) ? param[0] : param;
}

export const handlers = [
  http.get("/api/pods", () => GET()),

  http.post("/api/pods", ({ request }) => POST(request)),

  http.put("/api/pods/:id", ({ request, params }) => {
    const id = getStringParam(params.id);

    if (!id) {
      return new Response("Missing pod id", { status: 400 });
    }

    return PUT(request, { params: Promise.resolve({ id }) });
  }),

  http.delete("/api/pods/:id", ({ request, params }) => {
    const id = getStringParam(params.id);

    if (!id) {
      return new Response("Missing pod id", { status: 400 });
    }

    return DELETE(request, { params: Promise.resolve({ id }) });
  }),
];
