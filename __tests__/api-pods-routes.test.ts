import { db } from "../app/db";
import { DELETE, PUT } from "../app/api/pods/[id]/route";
import { GET, POST } from "../app/api/pods/route";
import { describe, expect, test } from "vitest";

function jsonRequest(url: string, body: unknown, method = "POST") {
  return new Request(url, {
    method,
    body: JSON.stringify(body),
  });
}

function routeContext(id: string) {
  return { params: Promise.resolve({ id }) };
}

describe("pods API routes", () => {
  test("GET /api/pods returns all pods", async () => {
    const firstPod = db.addPod.fn({ x: 10, y: 20, text: "first pod" });
    const secondPod = db.addPod.fn({ x: 30, y: 40, text: "second pod" });

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual([firstPod, secondPod]);
  });

  test("POST /api/pods creates a pod", async () => {
    const response = await POST(
      new Request("http://localhost/api/pods", {
        method: "POST",
        body: JSON.stringify({
          x: 12,
          y: 34,
          text: "created pod",
        }),
      }),
    );
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body).toMatchObject({ x: 12, y: 34, text: "created pod" });
    expect(body).toHaveProperty("id", expect.any(String));
    expect(db.getPods()).toEqual([body]);
  });

  test("POST /api/pods returns 400 for invalid payloads", async () => {
    const response = await POST(
      jsonRequest("http://localhost/api/pods", {
        x: "not a number",
        y: 34,
        text: "invalid pod",
      }),
    );

    expect(response.status).toBe(400);
    expect(db.getPods()).toHaveLength(0);
  });

  test("PUT /api/pods/:id updates an existing pod", async () => {
    const pod = db.addPod.fn({ x: 1, y: 2, text: "original" });

    const response = await PUT(
      jsonRequest(
        `http://localhost/api/pods/${pod.id}`,
        {
          x: 50,
          y: 60,
          text: "updated",
        },
        "PUT",
      ),
      routeContext(pod.id),
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      success: true,
      postId: pod.id,
      data: { id: pod.id, x: 50, y: 60, text: "updated" },
    });
    expect(db.getPods()).toEqual([
      { id: pod.id, x: 50, y: 60, text: "updated" },
    ]);
  });

  test("DELETE /api/pods/:id deletes an existing pod", async () => {
    const pod = db.addPod.fn({ x: 1, y: 2, text: "delete me" });

    const response = await DELETE(
      new Request(`http://localhost/api/pods/${pod.id}`, { method: "DELETE" }),
      routeContext(pod.id),
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({ success: true, postId: pod.id });
    expect(db.getPods()).toHaveLength(0);
  });
});
