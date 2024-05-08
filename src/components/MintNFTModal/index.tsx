'use client';

import { useCallback } from "react";
import { Modal } from "../Modal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsNFTMintModalOpen } from "@/features/general/generalSlice";

export const MintNFTModal = () => {
  const isMintNFTModalOpen = useAppSelector(state => state.general.isNFTMintModalOpen);

  const dispatch = useAppDispatch();

  const handleCloseModal = useCallback(() => {
    dispatch(setIsNFTMintModalOpen(false));
  }, []);

  return (
    <Modal
      isOpen={isMintNFTModalOpen}
      title="Mint NFT"
      onClose={handleCloseModal}
    >
      <div>
        Mint
      </div>
    </Modal>
  );
};
