import { setIsBurnNFTModalOpen, setIsConfirmNFTBurnModalOpen, setIsNFTCollectionViewModalOpen } from "@/features/general/generalSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback } from "react";
import { Modal } from "../Modal";
import { Button } from "../Button";
import { ButtonType } from "@/shared/types";
import { NFTItem } from "../NFTItem";

export const BurnNFTModal = () => {
  const isBurnNFTModalOpen = useAppSelector(state => state.general.isBurnNFTModalOpen);
  const selectedNFTSend = useAppSelector(state => state.nfts.selectedNFTSend);
  const selectedNFTClass = useAppSelector(state => state.nfts.selectedNFTClass);

  const dispatch = useAppDispatch();

  const handleCloseModal = useCallback(() => {
    dispatch(setIsBurnNFTModalOpen(false));
  }, []);

  const handleOnClickBackButton = useCallback(() => {
    dispatch(setIsBurnNFTModalOpen(false));
    dispatch(setIsNFTCollectionViewModalOpen(true));
  }, []);

  const handleBurnNFTToken = useCallback(() => {
    dispatch(setIsConfirmNFTBurnModalOpen(true));
    dispatch(setIsBurnNFTModalOpen(false));
  }, []);

  return (
    <Modal
      isOpen={isBurnNFTModalOpen}
      title="Burn NFT"
      onClose={handleCloseModal}
      wrapperClassName="w-[640px]"
    >
      <div className="flex flex-col w-full gap-8">
        <div className="flex flex-col w-full">
          <label className="block text-sm text-[#868991] font-noto-sans">
            NFT
          </label>
          <div className="flex flex-col w-full items-center">
            <div className="flex flex-col items-center">
              <NFTItem
                label={selectedNFTSend?.id || ''}
                imgPath={selectedNFTSend?.image || ''}
                description={selectedNFTClass?.name}
                className="text-[#eee] text-base hover:bg-[#17191E] hover"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between w-full gap-2">
          <div className="flex items-center">
            <Button
              label="Back"
              onClick={handleOnClickBackButton}
              type={ButtonType.Secondary}
              className="text-sm !py-2 px-6 rounded-[10px] font-semibold w-[160px] !bg-transparent pl-0"
            />
          </div>
          <div className="flex items-center justify-end">
            <Button
              label="Confirm"
              onClick={handleBurnNFTToken}
              type={ButtonType.Primary}
              className="text-sm !py-2 px-6 rounded-[10px] font-semibold w-[160px]"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
