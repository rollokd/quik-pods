import { useState } from "react";

export interface PodProps {
  id: string;
  x: number;
  y: number;
  text: string;
}

export function Pod({ id, x, y, text }: PodProps) {
  const [value, setValue] = useState(text);
  return (
    // clear all input styling but add a custom border and allow custom positioning
    <textarea
      id={`pod-${id}`}
      className="absolute border-zinc-500 rounded-md p-1 border outline-none field-sizing-content min-w-20 w-full min-h-20 resize"
      style={{ left: x, top: y }}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
