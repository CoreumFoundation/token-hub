'use client';

import { useCallback, useMemo, useState } from "react";
import { Modal } from "../Modal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsSelectNFTModalOpen } from "@/features/general/generalSlice";
import { NFTItem } from "../NFTItem";
import { ButtonType, NFT, NFTClass } from "@/shared/types";
import { Button } from "../Button";
import { setSelectedNFTSend, setSelectedNFTClass as setSelectedNFTCollection } from "@/features/nft/nftSlice";

export const SelectNFTModal = () => {
  const [selectedNFTClass, setSelectedNFTClass] = useState<NFTClass | null>(null);
  const [draftSelectedNFTClass, setDraftSelectedNFTClass] = useState<NFTClass | null>(null);
  const [draftSelectedNFT, setDraftSelectedNFT] = useState<NFT | null>(null);

  const isSelectNFTModalOpen = useAppSelector(state => state.general.isSelectNFTModalOpen);

  const nftClasses = useAppSelector(state => state.nfts.collections);
  const nftItems = useAppSelector(state => state.nfts.nftItems);

  const dispatch = useAppDispatch();

  const handleCloseModal = useCallback(() => {
    dispatch(setIsSelectNFTModalOpen(false));
  }, []);

  const onNFTClick = useCallback((nft: NFT) => {
    setDraftSelectedNFT(nft);
  }, []);

  const onNFTConfirmClick = useCallback(() => {
    dispatch(setSelectedNFTSend(draftSelectedNFT));
    dispatch(setSelectedNFTCollection(selectedNFTClass));
    dispatch(setIsSelectNFTModalOpen(false));
    setDraftSelectedNFT(null);
    setDraftSelectedNFTClass(null);
    setSelectedNFTClass(null);
  }, [draftSelectedNFT, selectedNFTClass]);

  const onNFTClassClick = useCallback((collection: NFTClass) => {
    setDraftSelectedNFTClass(collection);
  }, []);

  const onNFTClassConfirmClick = useCallback(() => {
    setSelectedNFTClass(draftSelectedNFTClass);
  }, [draftSelectedNFTClass]);

  const currentNFTItems = useMemo(() => {
    if (!selectedNFTClass) {
      return [];
    }

    const items = nftItems[selectedNFTClass.id];

    return items;
  }, [nftItems, selectedNFTClass]);

  const renderContent = useMemo(() => {
    if (!selectedNFTClass) {
      return (
        <div className="flex flex-col w-full gap-8">
          <div className="grid grid-cols-3 w-full gap-4">
            {nftClasses.map((collection: NFTClass) => {
              const isActive = collection.id === draftSelectedNFTClass?.id;

              return (
                <NFTItem
                  key={collection.id}
                  imgPath={collection.image}
                  label={collection.name}
                  onClick={() => onNFTClassClick(collection)}
                  isActive={isActive}
                />
              );
            })}
          </div>
          <div className="flex w-full justify-end">
            <div className="flex items-center">
              <Button
                label="Confirm"
                onClick={onNFTClassConfirmClick}
                type={ButtonType.Primary}
                className="text-sm !py-2 px-6 rounded-[10px] font-semibold w-[160px]"
                disabled={!draftSelectedNFTClass}
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col w-full gap-8">
        <div className="grid grid-cols-3 w-full gap-4">
          {currentNFTItems?.map((item: NFT) => {
            const isActive = item.id === draftSelectedNFT?.id;

            return (
              <NFTItem
                key={item.id}
                imgPath={item.image}
                label={item.name.length ? item.name : item.id}
                onClick={() => onNFTClick(item)}
                isActive={isActive}
              />
            );
          })}
        </div>
        <div className="flex w-full justify-end">
            <div className="flex items-center">
              <Button
                label="Continue"
                onClick={onNFTConfirmClick}
                type={ButtonType.Primary}
                className="text-sm !py-2 px-6 rounded-[10px] font-semibold w-[160px]"
                disabled={!draftSelectedNFT}
              />
            </div>
          </div>
      </div>
    );
  }, [currentNFTItems, draftSelectedNFT, draftSelectedNFTClass, nftClasses, onNFTClassClick, onNFTClassConfirmClick, onNFTClick, onNFTConfirmClick, selectedNFTClass]);

  return (
    <Modal
      isOpen={isSelectNFTModalOpen}
      title={selectedNFTClass ? selectedNFTClass.name : 'View NFT Class'}
      onClose={handleCloseModal}
      wrapperClassName="w-[568px] max-w-full"
    >
      <div className="flex flex-col">
        {renderContent}
      </div>
    </Modal>
  );
};
