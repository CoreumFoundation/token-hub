'use client';

import dynamic from "next/dynamic";
import { Spinner } from "@/components/Spinner";

const FungibleTokenCreate = dynamic(
  () => import("@/containers/FungibleTokenCreate").then(mod => mod.FungibleTokenCreate),
  {
    loading: () => (
      <div className="flex flex-col items-center justify-center w-full py-20">
        <Spinner className="w-12 h-12" />
      </div>
    ),
    ssr: false,
  }
);

export default function FTCreate() {
  return <FungibleTokenCreate />;
}
