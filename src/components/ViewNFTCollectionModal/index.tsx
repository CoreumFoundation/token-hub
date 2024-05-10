'use client';

import { useCallback, useMemo, useState } from "react";
import { Modal } from "../Modal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsBurnNFTModalOpen, setIsFreezeNFTModalOpen, setIsNFTCollectionViewModalOpen, setIsUnfreezeNFTModalOpen, setIsWhitelistNFTModalOpen } from "@/features/general/generalSlice";
import { NFTItem } from "../NFTItem";
import { ActionItem, GeneralIconType, NFT } from "@/shared/types";
import { GeneralIcon } from "@/assets/GeneralIcon";
import { setSelectedNFTSend } from "@/features/nft/nftSlice";
import { useRouter } from "next/navigation";
import Image from 'next/image';

export const ViewNFTCollectionModal = () => {
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const router = useRouter();

  const isNFTCollectionViewModalOpen = useAppSelector(state => state.general.isNFTCollectionViewModalOpen);
  const selectedNFTClass = useAppSelector(state => state.nfts.selectedNFTClass);

  const nftItems = useAppSelector(state => state.nfts.nftItems);

  const dispatch = useAppDispatch();

  const handleCloseModal = useCallback(() => {
    dispatch(setIsNFTCollectionViewModalOpen(false));
  }, []);

  const currentNFTItems = useMemo(() => {
    if (!selectedNFTClass) {
      return [];
    }

    const items = nftItems[selectedNFTClass.id];

    return items;
  }, [nftItems, selectedNFTClass]);

  const onNFTClick = useCallback((nft: NFT) => {
    setSelectedNFT(nft);
  }, []);

  const onSendClick = useCallback((nft: NFT) => {
    dispatch(setSelectedNFTSend(nft));
    dispatch(setIsNFTCollectionViewModalOpen(false));
    router.push('/nft/send');
  }, []);

  const onUnfreezeClick = useCallback((nft: NFT) => {
    dispatch(setSelectedNFTSend(nft));
    dispatch(setIsUnfreezeNFTModalOpen(true));
    dispatch(setIsNFTCollectionViewModalOpen(false));
  }, []);

  const onFreezeClick = useCallback((nft: NFT) => {
    dispatch(setSelectedNFTSend(nft));
    dispatch(setIsFreezeNFTModalOpen(true));
    dispatch(setIsNFTCollectionViewModalOpen(false));
  }, []);

  const onBurnClick = useCallback((nft: NFT) => {
    dispatch(setSelectedNFTSend(nft));
    dispatch(setIsBurnNFTModalOpen(true));
    dispatch(setIsNFTCollectionViewModalOpen(false));
  }, []);

  const onWhitelistClick = useCallback((nft: NFT) => {
    dispatch(setSelectedNFTSend(nft));
    dispatch(setIsWhitelistNFTModalOpen(true));
    dispatch(setIsNFTCollectionViewModalOpen(false));
  }, []);

  return (
    <Modal
      isOpen={isNFTCollectionViewModalOpen}
      title={selectedNFTClass ? selectedNFTClass.name : 'View NFT Class'}
      onClose={handleCloseModal}
      wrapperClassName="!w-[568px] max-w-full !overflow-visible"
    >
      {currentNFTItems?.length ? (
        <div className="grid grid-cols-3 w-full gap-4">
          {currentNFTItems?.map((item: NFT) => {
            const isActive = item.id === selectedNFT?.id;
            let items: ActionItem[] = [];
            const isSendingDisabled = selectedNFTClass?.features.find((feature: string) => feature === 'disable_sending');
            const isBurnable = selectedNFTClass?.features.find((feature: string) => feature === 'burning');
            const isFreezing = selectedNFTClass?.features.find((feature: string) => feature === 'freezing');
            const isWhitelistingEnabled = selectedNFTClass?.features.find((feature: string) => feature === 'whitelisting');

            if (!isSendingDisabled) {
              items.push({
                id: 'send',
                label: 'Send',
                icon: <GeneralIcon type={GeneralIconType.Send} />,
                onClick: () => onSendClick(item),
              });
            }

            if (isFreezing) {
              items.push({
                id: 'freeze',
                label: 'Freeze',
                icon: <GeneralIcon type={GeneralIconType.Freeze} />,
                onClick: () => onFreezeClick(item),
              });
              items.push({
                id: 'unfreeze',
                label: 'Unfreeze',
                icon: <GeneralIcon type={GeneralIconType.Unfreeze} />,
                onClick: () => onUnfreezeClick(item),
              });
            };

            if (isBurnable) {
              items.push({
                id: 'burn',
                label: 'Burn',
                icon: <GeneralIcon type={GeneralIconType.Burn} />,
                onClick: () => onBurnClick(item),
              });
            }

            if (isWhitelistingEnabled) {
              items.push({
                id: 'whitelist',
                label: 'Whitelist',
                icon: <GeneralIcon type={GeneralIconType.Whitelist} />,
                onClick: () => onWhitelistClick(item),
              });
            }

            return (
              <NFTItem
                key={item.id}
                imgPath={item.image}
                label={item.name.length ? item.name : item.id}
                onClick={() => onNFTClick(item)}
                isActive={isActive}
                isActionRow={true}
                actionItems={items}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col w-full items-center p-10">
          <Image src="/images/coins.svg" width="200" height="200" alt="coins" />
          <div className="flex items-center gap-2">
            <GeneralIcon type={GeneralIconType.Error} />
            You don&apos;t have any NFT in this collection yet!
          </div>
        </div>
      )}
    </Modal>
  );
};
