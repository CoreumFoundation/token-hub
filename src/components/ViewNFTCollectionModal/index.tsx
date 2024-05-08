'use client';

import { useCallback } from "react";
import { Modal } from "../Modal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setisNFTCollectionViewModalOpen } from "@/features/general/generalSlice";

export const ViewNFTCollectionModal = () => {
  const isNFTCollectionViewModalOpen = useAppSelector(state => state.general.isNFTCollectionViewModalOpen);
  const selectedNFTClass = useAppSelector(state => state.nfts.selectedNFTClass);

  const dispatch = useAppDispatch();

  const handleCloseModal = useCallback(() => {
    dispatch(setisNFTCollectionViewModalOpen(false));
  }, []);

  return (
    <Modal
      isOpen={isNFTCollectionViewModalOpen}
      title={selectedNFTClass ? selectedNFTClass.name : 'View NFT Class'}
      onClose={handleCloseModal}
    >
      <div>
        View
      </div>
    </Modal>
  );
};
