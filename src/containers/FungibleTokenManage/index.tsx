import { MessageBox } from "@/components/MessageBox";
import Link from "next/link";

export const FungibleTokenManage = () => {
  return (
    <div className="flex flex-col gap-10">
      <MessageBox>
        <ul className="list-disc text-[#868991] text-sm font-normal ml-5">
          <li>View and manage the Smart Tokens you created or own.</li>
          <li>There are many ways to get on-chain data. Here we simply query a <Link className="text-[#25D695] underline font-medium" href="/">public REST server</Link> that expose different endpoints to query the blockchain.</li>
        </ul>
      </MessageBox>
    </div>
  );
};
