'use client';

import { MessageBox } from "@/components/MessageBox";
import { Spinner } from "@/components/Spinner";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Link from "next/link";
import { useCallback, useMemo } from "react";
import Image from "next/image";
import { GeneralIcon } from "@/assets/GeneralIcon";
import { ButtonIconType, ButtonType, GeneralIconType } from "@/shared/types";
import { Class } from 'coreum-js/dist/main/coreum/asset/nft/v1/nft';
import { Button } from "@/components/Button";
import { setIsConnectModalOpen, setIsNFTMintModalOpen, setisNFTCollectionViewModalOpen } from "@/features/general/generalSlice";
import { NonFungibleTokenRow } from "@/components/NonFungibleTokenRow";
import { setSelectedNFTClass } from "@/features/nft/nftSlice";

export const NonFungibleTokenManage = () => {
  const network = useAppSelector(state => state.general.network);
  const isConnected = useAppSelector(state => state.general.isConnected);
  const collections = useAppSelector(state => state.nfts.collections);
  const isFetching = useAppSelector(state => state.nfts.isLoading);

  const dispatch = useAppDispatch();

  const handleConnectWalletClick = useCallback(() => {
    dispatch(setIsConnectModalOpen(true));
  }, []);

  const handleClassViewClick = useCallback((collection: Class) => {
    dispatch(setSelectedNFTClass(collection));
    dispatch(setisNFTCollectionViewModalOpen(true));
  }, []);

  const handleClassMintClick = useCallback((collection: Class) => {
    dispatch(setSelectedNFTClass(collection));
    dispatch(setIsNFTMintModalOpen(true));
  }, []);

  const renderContent = useMemo(() => {
    if (isConnected) {
      if (isFetching) {
        return (
          <div className="flex flex-col items-center justify-center w-full py-20">
            <Spinner className="w-12 h-12" />
          </div>
        );
      }

      if (collections.length) {
        return (
          <div className="flex flex-col w-full gap-3">
            {collections.map((collection: Class) => {
              return (
                <NonFungibleTokenRow
                  key={collection.id}
                  name={collection.name}
                  onMintClick={() => handleClassMintClick(collection)}
                  onViewClick={() => handleClassViewClick(collection)}
                />
              );
            })}
          </div>
        );
      }

      return (
        <div className="flex flex-col w-full items-center p-10">
          <Image src="/images/coins.svg" width="200" height="200" alt="coins" />
          <div className="flex items-center gap-2">
            <GeneralIcon type={GeneralIconType.Error} />
            You don&apos;t have any asset!
          </div>
        </div>
      );
    }

    return (
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
    );
  }, [isConnected, isFetching, collections]);

  return (
    <div className="flex flex-col gap-10">
      <MessageBox>
        <ul className="list-disc text-[#868991] text-sm font-normal ml-5">
          <li>View and manage the Smart Tokens you created or own.</li>
          <li>There are many ways to get on-chain data. Here we simply query a <Link className="text-[#25D695] underline font-medium" href={`https://full-node.${network}-1.coreum.dev:1317`} target="_blank">public REST server</Link> that expose different endpoints to query the blockchain.</li>
        </ul>
      </MessageBox>
      {renderContent}
    </div>
  );
};
