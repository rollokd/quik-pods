"use client";

import { Button } from "@/components/ui/button";
import { Pod } from "@/components/custom/pod";
import { PlusIcon } from "lucide-react";
import { createPodOptions, podOptions } from "@/app/queries/pods";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Spinner } from "../ui/spinner";
import { getQueryClient } from "@/app/get-query-client";

export function PodCanvas() {
  const queryClient = getQueryClient();
  const {
    data: pods,
    isPending: isPodsPending,
    isError,
  } = useQuery(podOptions);

  const { mutate, isPending: isCreatingPod } = useMutation(createPodOptions);

  return (
    <div className="relative flex flex-1 w-full max-w-3xl flex-col items-center justify-start p-4 sm:items-start">
      <Button
        className="w-full"
        onClick={() =>
          mutate(
            { x: 0, y: (pods?.length ?? 0) * 100, text: "" },
            { onSuccess: () => queryClient.refetchQueries(podOptions) },
          )
        }
        disabled={isCreatingPod}
      >
        {isCreatingPod ? (
          <>
            <Spinner /> adding pod...
          </>
        ) : (
          <>
            <PlusIcon />
            add pod
          </>
        )}
      </Button>
      {isError ? (
        <div className="relative flex w-full h-96">
          <p>Error loading pods</p>
        </div>
      ) : isPodsPending ? (
        <div className="relative flex w-full h-96">
          <Spinner /> loading pods...
        </div>
      ) : (
        <div className="relative flex w-full h-96">
          {pods.map((pod, index) => (
            <Pod key={index} {...pod} />
          ))}
        </div>
      )}
    </div>
  );
}
