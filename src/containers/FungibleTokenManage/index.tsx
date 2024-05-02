'use client';

import { MessageBox } from "@/components/MessageBox";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/Button";
import { useAppDispatch } from "@/store/hooks";
import { useCallback } from "react";
import { setIsConnectModalOpen } from "@/features/general/generalSlice";
import { ButtonType, ButtonIconType } from "@/shared/types";

export const FungibleTokenManage = () => {
  const dispatch = useAppDispatch()

  const handleConnectWalletClick = useCallback(() => {
    dispatch(setIsConnectModalOpen(true));
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <MessageBox>
        <ul className="list-disc text-[#868991] text-sm font-normal ml-5">
          <li>View and manage the Smart Tokens you created or own.</li>
          <li>There are many ways to get on-chain data. Here we simply query a <Link className="text-[#25D695] underline font-medium" href="/">public REST server</Link> that expose different endpoints to query the blockchain.</li>
        </ul>
      </MessageBox>
      <div className="flex flex-col p-10 items-center gap-6">
        <Image src="/images/coins.svg" width="200" height="200" alt="coins" />
        <div className="text-base font-noto-sans">
          Connect your wallet to view and manage your assets!
        </div>
        <div className="flex items-center">
          <Button
            label="Connect Wallet"
            onClick={handleConnectWalletClick}
            type={ButtonType.Primary}
            iconType={ButtonIconType.Wallet}
            className="text-sm !py-2 px-6 rounded-[10px]"
            iconClassName="w-4"
          />
        </div>
      </div>
    </div>
  );
};
