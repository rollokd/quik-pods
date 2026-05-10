import { db } from "../app/db";
import { PodCanvas } from "../components/custom/pod-canvas";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";

const queryClients: QueryClient[] = [];

function renderPodCanvas() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  queryClients.push(queryClient);

  return render(
    <QueryClientProvider client={queryClient}>
      <PodCanvas />
    </QueryClientProvider>,
  );
}

async function addPod() {
  fireEvent.click(screen.getByText(/add pod/i));

  await waitFor(() => {
    expect(db.getPods()).toHaveLength(1);
  });

  return (await screen.findByRole("textbox")) as HTMLTextAreaElement;
}

async function waitForSavedText(text: string) {
  await waitFor(
    () => {
      expect(db.getPods()[0]?.text).toBe(text);
    },
    { timeout: 1_500 },
  );
}

afterEach(() => {
  queryClients.forEach((queryClient) => queryClient.clear());
  queryClients.splice(0, queryClients.length);
});

describe("PodCanvas", () => {
  test("adds a pod and saves it in the database", async () => {
    renderPodCanvas();

    const textarea = await addPod();
    const [pod] = db.getPods();

    expect(textarea.value).toBe("");
    expect(pod).toMatchObject({ x: 0, y: 0, text: "" });
    expect(pod.id).toEqual(expect.any(String));
  });

  test("saves entered text in the database after the user stops typing", async () => {
    renderPodCanvas();

    const textarea = await addPod();

    fireEvent.change(textarea, { target: { value: "Hello pod" } });

    expect(textarea.value).toBe("Hello pod");
    expect(db.getPods()[0]?.text).toBe("");

    await waitForSavedText("Hello pod");
  });

  test("saves only the final value after rapid typing", async () => {
    renderPodCanvas();

    const textarea = await addPod();

    fireEvent.change(textarea, { target: { value: "H" } });
    fireEvent.change(textarea, { target: { value: "He" } });
    fireEvent.change(textarea, { target: { value: "Hel" } });
    fireEvent.change(textarea, { target: { value: "Hell" } });
    fireEvent.change(textarea, { target: { value: "Hello" } });

    expect(textarea.value).toBe("Hello");
    expect(db.getPods()[0]?.text).toBe("");

    await waitForSavedText("Hello");
  });

  test("saves a 1000 character string", async () => {
    renderPodCanvas();

    const textarea = await addPod();
    const longText = "a".repeat(1_000);

    fireEvent.change(textarea, { target: { value: longText } });

    expect(textarea.value).toBe(longText);
    expect(textarea.value).toHaveLength(1_000);

    await waitForSavedText(longText);
    expect(db.getPods()[0]?.text).toHaveLength(1_000);
  });

  test("saves deleted text as an empty string", async () => {
    renderPodCanvas();

    const textarea = await addPod();

    fireEvent.change(textarea, {
      target: { value: "Text that will be deleted" },
    });
    await waitForSavedText("Text that will be deleted");

    fireEvent.change(textarea, { target: { value: "" } });

    expect(textarea.value).toBe("");

    await waitForSavedText("");
  });
});
