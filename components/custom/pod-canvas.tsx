"use client";

import { Button } from "@/components/ui/button";
import { Pod, PodProps } from "@/components/custom/pod";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export function PodCanvas({ pods }: { pods: PodProps[] }) {
  const [podsState, setPodsState] = useState(pods);

  function addPod() {
    setPodsState((prev) => [
      ...prev,
      {
        x: prev.length * 100,
        y: prev.length * 100,
        text: "",
      },
    ]);
  }

  return (
    <div className="relative flex flex-1 w-full max-w-3xl flex-col items-center justify-start p-4 sm:items-start">
      <Button className="w-full" onClick={addPod}>
        add pod
        <PlusIcon />
      </Button>
      <div className="relative flex">
        {podsState.map((pod, index) => (
          <Pod key={index} {...pod} />
        ))}
      </div>
    </div>
  );
}
