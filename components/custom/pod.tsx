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
    <input
      id={`pod-${id}`}
      className="outline-none"
      style={{ position: "absolute", left: x, top: y }}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
