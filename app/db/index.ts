interface PodSchema {
  id: string;
  x: number;
  y: number;
  text: string;
}

const _db: PodSchema[] = [];

const addPod = (pod: PodSchema) => {
  _db.push(pod);
};

const getPods = () => {
  return _db;
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
  addPod,
  getPods,
  deletePod,
  clearDb,
};
