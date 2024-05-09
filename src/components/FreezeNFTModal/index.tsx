import { setIsConfirmNFTFreezeModalOpen, setIsFreezeNFTModalOpen, setIsNFTCollectionViewModalOpen } from "@/features/general/generalSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback } from "react";
import { Modal } from "../Modal";
import { Button } from "../Button";
import { ButtonType } from "@/shared/types";
import { NFTItem } from "../NFTItem";

export const FreezeNFTModal = () => {
  const isFreezeNFTModalOpen = useAppSelector(state => state.general.isFreezeNFTModalOpen);
  const selectedNFTSend = useAppSelector(state => state.nfts.selectedNFTSend);
  const selectedNFTClass = useAppSelector(state => state.nfts.selectedNFTClass);

  const dispatch = useAppDispatch();

  const handleCloseModal = useCallback(() => {
    dispatch(setIsFreezeNFTModalOpen(false));
  }, []);

  const handleOnClickBackButton = useCallback(() => {
    dispatch(setIsFreezeNFTModalOpen(false));
    dispatch(setIsNFTCollectionViewModalOpen(true));
  }, []);

  const handleFreezeNFTToken = useCallback(() => {
    dispatch(setIsConfirmNFTFreezeModalOpen(true));
    dispatch(setIsFreezeNFTModalOpen(false));
  }, []);

  return (
    <Modal
      isOpen={isFreezeNFTModalOpen}
      title="Freeze NFT"
      onClose={handleCloseModal}
      wrapperClassName="w-[640px]"
    >
      <div className="flex flex-col w-full gap-8">
        <div className="flex flex-col w-full">
          <label className="block text-sm text-[#868991] font-noto-sans">
            NFT
          </label>
          <div className="flex flex-col w-full items-center">
            <div className="flex flex-col items-center gap-2">
              <NFTItem
                label={selectedNFTSend?.name || ''}
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
              onClick={handleFreezeNFTToken}
              type={ButtonType.Primary}
              className="text-sm !py-2 px-6 rounded-[10px] font-semibold w-[160px]"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
