'use client';

import dynamic from "next/dynamic";
import { Spinner } from "@/components/Spinner";

const NonFungibleTokenCreate = dynamic(
  () => import("@/containers/NonFungibleTokenCreate").then(mod => mod.NonFungibleTokenCreate),
  {
    loading: () => (
      <div className="flex flex-col items-center justify-center w-full py-20">
        <Spinner className="w-12 h-12" />
      </div>
    ),
    ssr: false,
  }
);

export default function NFTCreate() {
  return <NonFungibleTokenCreate />;
}
