import { db } from "../app/db";
import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, vi } from "vitest";
import { server } from "./mocks/server";

function toAbsoluteRequest(input: RequestInfo | URL): RequestInfo | URL {
  if (typeof input === "string" && input.startsWith("/")) {
    return new URL(input, "http://localhost:3000").toString();
  }

  return input;
}

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });

  const mswFetch = globalThis.fetch;

  vi.stubGlobal("fetch", (input: RequestInfo | URL, init?: RequestInit) =>
    mswFetch(toAbsoluteRequest(input), init),
  );
});

afterEach(() => {
  cleanup();
  db.clearDb();
  server.resetHandlers();
});

afterAll(() => {
  vi.unstubAllGlobals();
  server.close();
});
