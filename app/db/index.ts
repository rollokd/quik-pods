import { z } from "zod";

const basePodSchema = z.object({
  x: z.number(),
  y: z.number(),
  text: z.string(),
});

const PodSchema = basePodSchema.extend({
  id: z.string(),
});

type PodSchema = z.infer<typeof PodSchema>;

const AddPodSchema = basePodSchema;

type AddPodSchema = z.infer<typeof AddPodSchema>;

const _db: PodSchema[] = [];

const addPod = (pod: AddPodSchema) => {
  const newPod = { ...pod, id: crypto.randomUUID() };
  _db.push(newPod);
  return newPod;
};

const getPods = () => {
  return _db;
};

const updatePod = (id: string, pod: AddPodSchema) => {
  const index = _db.findIndex((p) => p.id === id);
  if (index !== -1) {
    _db[index] = { ...pod, id };
  }
  return _db[index];
};

const deletePod = (id: string) => {
  const index = _db.findIndex((pod) => pod.id === id);
  if (index !== -1) {
    _db.splice(index, 1);
  }
};

const clearDb = () => {
  _db.splice(0, _db.length);
};

export const db = {
  PodSchema,
  addPod: {
    schema: AddPodSchema,
    fn: addPod,
  },
  getPods,
  updatePod,
  deletePod,
  clearDb,
};
