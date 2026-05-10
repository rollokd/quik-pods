import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { z } from "zod";

const PodSchema = z.object({
  id: z.string(),
  x: z.number(),
  y: z.number(),
  text: z.string(),
});

const PodArray = z.array(PodSchema);

export type Pod = z.infer<typeof PodSchema>;

const podKey = () => ["pods"];
const addPodKey = () => ["addPod"];
const updatePodKey = (id: string) => ["updatePod", id];

export const podOptions = queryOptions({
  queryKey: podKey(),
  queryFn: async () => {
    const response = await fetch("/api/pods");

    const data = await response.json();
    return PodArray.parse(data);
  },
});

export const createPodOptions = mutationOptions({
  mutationKey: addPodKey(),
  mutationFn: async (pod: Omit<Pod, "id">) => {
    const response = await fetch("/api/pods", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pod),
    });

    return response;
  },
  onSettled: (_data, _error, _variables, _result, context) => {
    context.client.refetchQueries({ queryKey: podKey() });
  },
});

export const updatePodOptions = (id: string) =>
  mutationOptions({
    mutationKey: updatePodKey(id),
    mutationFn: async (pod: Pod) => {
      const response = await fetch(`/api/pods/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pod),
      });

      return response.json();
    },
    onSettled: (_data, _error, _variables, _result, context) => {
      context.client.invalidateQueries({ queryKey: podKey() });
    },
  });
