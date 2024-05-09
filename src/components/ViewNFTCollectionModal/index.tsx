'use client';

import { useCallback, useMemo, useState } from "react";
import { Modal } from "../Modal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsBurnNFTModalOpen, setIsFreezeNFTModalOpen, setIsNFTCollectionViewModalOpen, setIsUnfreezeNFTModalOpen, setIsWhitelistNFTModalOpen } from "@/features/general/generalSlice";
import { NFTItem } from "../NFTItem";
import { ActionItem, GeneralIconType, NFT } from "@/shared/types";
import { GeneralIcon } from "@/assets/GeneralIcon";
import { setSelectedNFTSend } from "@/features/nft/nftSlice";

export const ViewNFTCollectionModal = () => {
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);

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
  }, []);

  const onUnfreezeClick = useCallback((nft: NFT) => {
    dispatch(setSelectedNFTSend(nft));
    dispatch(setIsUnfreezeNFTModalOpen(true));
  }, []);

  const onFreezeClick = useCallback((nft: NFT) => {
    dispatch(setSelectedNFTSend(nft));
    dispatch(setIsFreezeNFTModalOpen(true));
  }, []);

  const onBurnClick = useCallback((nft: NFT) => {
    dispatch(setSelectedNFTSend(nft));
    dispatch(setIsBurnNFTModalOpen(true));
  }, []);

  const onWhitelistClick = useCallback((nft: NFT) => {
    dispatch(setSelectedNFTSend(nft));
    dispatch(setIsWhitelistNFTModalOpen(true));
  }, []);

  return (
    <Modal
      isOpen={isNFTCollectionViewModalOpen}
      title={selectedNFTClass ? selectedNFTClass.name : 'View NFT Class'}
      onClose={handleCloseModal}
      wrapperClassName="w-[568px] max-w-full"
    >
      <div className="grid grid-cols-3 w-full gap-4">
        {currentNFTItems.map((item: NFT) => {
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
    </Modal>
  );
};