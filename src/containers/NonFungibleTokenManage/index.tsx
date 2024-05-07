'use client';

import { MessageBox } from "@/components/MessageBox";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";

export const NonFungibleTokenManage = () => {
  const network = useAppSelector(state => state.general.network);

  return (
    <div className="flex flex-col gap-10">
      <MessageBox>
        <ul className="list-disc text-[#868991] text-sm font-normal ml-5">
          <li>View and manage the Smart Tokens you created or own.</li>
          <li>There are many ways to get on-chain data. Here we simply query a <Link className="text-[#25D695] underline font-medium" href={`https://full-node.${network}-1.coreum.dev:1317`} target="_blank">public REST server</Link> that expose different endpoints to query the blockchain.</li>
        </ul>
      </MessageBox>
    </div>
  );
};
