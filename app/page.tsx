import { PodCanvas } from "@/components/custom/pod-canvas";
import { PodProps } from "@/components/custom/pod";

export default function Home() {
  const pods: PodProps[] = [];

  return (
    <div className="flex flex-col flex-1 items-center justify-centerfont-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
        <PodCanvas pods={pods} />
      </main>
    </div>
  );
}
