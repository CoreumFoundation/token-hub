'use client';

import { useCallback, useMemo, useState } from "react";
import { Modal } from "../Modal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setIsBurnNFTModalOpen,
  setIsDeWhitelistNFTModalOpen,
  setIsEditNFTModalOpen,
  setIsFreezeNFTModalOpen,
  setIsNFTCollectionViewModalOpen,
  setIsUnfreezeNFTModalOpen,
  setIsWhitelistNFTModalOpen,
} from "@/features/general/generalSlice";
import { NFTItem } from "../NFTItem";
import { ActionItem, GeneralIconType, NFT } from "@/shared/types";
import { GeneralIcon } from "@/assets/GeneralIcon";
import { setSelectedNFTSend } from "@/features/nft/nftSlice";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { Spinner } from "../Spinner";

export const ViewNFTCollectionModal = () => {
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const router = useRouter();

  const isNFTCollectionViewModalOpen = useAppSelector(state => state.general.isNFTCollectionViewModalOpen);
  const selectedNFTClass = useAppSelector(state => state.nfts.selectedNFTClass);

  const nftItems = useAppSelector(state => state.nfts.nftItems);
  const ownedNFTItems = useAppSelector(state => state.nfts.ownedNftItems);
  const isNFTItemsLoading = useAppSelector(state => state.nfts.isNFTItemsLoading);

  const dispatch = useAppDispatch();

  const handleCloseModal = useCallback(async () => {
    dispatch(setIsNFTCollectionViewModalOpen(false));
  }, [dispatch]);

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

  const onDeWhitelistClick = useCallback((nft: NFT) => {
    dispatch(setSelectedNFTSend(nft));
    dispatch(setIsDeWhitelistNFTModalOpen(true));
    dispatch(setIsNFTCollectionViewModalOpen(false));
  }, []);

  const onEditClick = useCallback((nft: NFT) => {
    dispatch(setSelectedNFTSend(nft));
    dispatch(setIsEditNFTModalOpen(true));
    dispatch(setIsNFTCollectionViewModalOpen(false));
  }, []);

  const isEditableNFT = useCallback((nft: NFT) => {
    if (nft.data) {
      const typeURL = (nft.data as any)['@type'];

      if (typeURL === '/coreum.asset.nft.v1.DataDynamic') {
        return true;
      }

      return false;
    }

    return false;
  }, []);

  const renderContent = useMemo(() => {
    if (isNFTItemsLoading) {
      return (
        <Spinner className="w-12 h-12" />
      );
    }

    if (currentNFTItems?.length) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-4">
          {currentNFTItems?.map((item: NFT) => {
            const isActive = item.id === selectedNFT?.id;
            let items: ActionItem[] = [];
            const isBurnable = selectedNFTClass?.features.find((feature: string) => feature === 'burning');
            const isFreezing = selectedNFTClass?.features.find((feature: string) => feature === 'freezing');
            const isWhitelistingEnabled = selectedNFTClass?.features.find((feature: string) => feature === 'whitelisting');

            const isNFTOwnedByUser = ownedNFTItems[selectedNFTClass?.id || ''].find((nft: NFT) => nft.id === item.id);
            const isEditable = isEditableNFT(item);

            if (isNFTOwnedByUser) {
              items.push({
                id: 'send',
                label: 'Send',
                icon: <GeneralIcon type={GeneralIconType.Send} />,
                onClick: () => onSendClick(item),
              });
            }

            if (isNFTOwnedByUser && isEditable) {
              items.push({
                id: 'edit',
                label: 'Edit',
                icon: <GeneralIcon type={GeneralIconType.Edit} />,
                onClick: () => onEditClick(item),
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

            if (isBurnable && isNFTOwnedByUser) {
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
              items.push({
                id: 'dewhitelist',
                label: 'De-Whitelist',
                icon: <GeneralIcon type={GeneralIconType.Whitelist} />,
                onClick: () => onDeWhitelistClick(item),
              });
            }

            return (
              <NFTItem
                key={item.id}
                imgPath={item.image}
                label={item.name}
                onClick={() => onNFTClick(item)}
                isActive={isActive}
                isActionRow={true}
                actionItems={items}
              />
            );
          })}
        </div>
      );
    }

    return (
      <div className="flex flex-col w-full items-center p-10">
        <Image priority={false} src="/images/coins.png" width="200" height="200" alt="coins" />
        <div className="flex items-center gap-2">
          <GeneralIcon type={GeneralIconType.Error} />
          You don&apos;t have any NFT in this collection yet!
        </div>
      </div>
    );
  }, [
    isNFTItemsLoading,
    currentNFTItems,
    selectedNFT?.id,
    selectedNFTClass?.features,
    selectedNFTClass?.id,
    ownedNFTItems,
    onSendClick,
    onFreezeClick,
    onUnfreezeClick,
    onBurnClick,
    onWhitelistClick,
    onDeWhitelistClick,
    onNFTClick,
    onEditClick,
    isEditableNFT,
  ]);

  return (
    <Modal
      isOpen={isNFTCollectionViewModalOpen}
      title={selectedNFTClass ? selectedNFTClass.name : 'View NFT Class'}
      onClose={handleCloseModal}
      wrapperClassName="!w-[568px] max-w-full overflow-auto"
      bodyClassName={isNFTItemsLoading ? 'justify-center items-center p-10' : ''}
    >
      {renderContent}
    </Modal>
  );
};
