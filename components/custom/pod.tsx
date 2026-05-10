import { updatePodOptions } from "@/app/queries/pods";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";

export interface PodProps {
  id: string;
  x: number;
  y: number;
  text: string;
}

export function Pod({ id, x, y, text }: PodProps) {
  const [value, setValue] = useState(text);
  const [debouncedValue] = useDebounceValue(value, 500);

  const { mutate } = useMutation(updatePodOptions(id));

  useEffect(() => {
    mutate({ id, x, y, text: debouncedValue });
  }, [debouncedValue, mutate, id, x, y]);

  return (
    <textarea
      id={`pod-${id}`}
      className="absolute border-zinc-500 rounded-md p-1 border outline-none field-sizing-content min-w-20 w-full min-h-20 resize"
      style={{ left: x, top: y }}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
