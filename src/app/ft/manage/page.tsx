'use client';

import dynamic from "next/dynamic";
import { Spinner } from "@/components/Spinner";

const FungibleTokenManage = dynamic(
  () => import("@/containers/FungibleTokenManage").then(mod => mod.FungibleTokenManage),
  {
    loading: () => (
      <div className="flex flex-col items-center justify-center w-full py-20">
        <Spinner className="w-12 h-12" />
      </div>
    ),
    ssr: false,
  }
);

export default function FTManage() {
  return <FungibleTokenManage />;
}
