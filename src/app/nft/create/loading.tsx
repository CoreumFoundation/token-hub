import { Spinner } from "@/components/Spinner";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center w-full py-20">
      <Spinner className="w-12 h-12" />
    </div>
  );
}
