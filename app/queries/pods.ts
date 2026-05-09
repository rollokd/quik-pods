import { PodProps } from "@/components/custom/pod";
import { mutationOptions, queryOptions } from "@tanstack/react-query";

export const podOptions = queryOptions({
  queryKey: ["pod"],
  queryFn: async () => {
    const response = await fetch("/api/pods");

    return response.json();
  },
});

export const addPodOptions = mutationOptions({
  mutationKey: ["addPod"],
  mutationFn: async (pod: PodProps) => {
    const response = await fetch("/api/pods", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pod),
    });

    return response.json();
  },
});

export const updatePodOptions = mutationOptions({
  mutationKey: ["updatePod"],
  mutationFn: async (pod: PodProps) => {
    const response = await fetch(`/api/pods/${pod.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pod),
    });

    return response.json();
  },
});
