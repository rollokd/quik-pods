import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "../app/page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

test("Page", () => {
  render(<Page />, { wrapper });
  expect(
    screen.getByRole("heading", { level: 1, name: "Quik Pods" }),
  ).toBeDefined();
  expect(screen.getByText("add pod")).toBeDefined();
});
