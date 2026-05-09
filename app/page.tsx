import { PodCanvas } from "@/components/custom/pod-canvas";
import { PodProps } from "@/components/custom/pod";
import { getQueryClient } from "./get-query-client";
import { podOptions } from "./queries/pods";

export default function Home() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(podOptions);

  return (
    <div className="flex flex-col flex-1 items-center justify-centerfont-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
        <h1>Quik Pods</h1>
        <PodCanvas />
      </main>
    </div>
  );
}
