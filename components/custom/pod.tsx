import { useId, useState } from "react";

export interface PodProps {
  x: number;
  y: number;
  text: string;
}

export function Pod({ x, y, text }: PodProps) {
  const [value, setValue] = useState(text);
  const id = useId();
  return (
    // clear all input styling but add a custom border and allow custom positioning
    <textarea
      id={`pod-${id}`}
      className="absolute border-red-500 border outline-none field-sizing-content min-w-20 min-h-20 resize"
      style={{ left: x, top: y }}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
