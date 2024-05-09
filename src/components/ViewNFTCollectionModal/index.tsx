'use client';

import { useCallback, useMemo, useState } from "react";
import { Modal } from "../Modal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsNFTCollectionViewModalOpen } from "@/features/general/generalSlice";
import { NFTItem } from "../NFTItem";
import { GeneralIconType, NFT } from "@/shared/types";
import { GeneralIcon } from "@/assets/GeneralIcon";

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

          return (
            <NFTItem
              key={item.id}
              imgPath={item.image}
              label={item.name.length ? item.name : item.id}
              onClick={() => onNFTClick(item)}
              isActive={isActive}
              icon={<GeneralIcon type={GeneralIconType.Dots} className="group cursor-pointer" pathClassName={isActive ? 'fill-[#25D695]' : 'group-hover:fill-[#eee]'} />}
            />
          );
        })}
      </div>
    </Modal>
  );
};
