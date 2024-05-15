import { setIsConfirmNFTUnfreezeModalOpen, setIsNFTCollectionViewModalOpen, setIsUnfreezeNFTModalOpen } from "@/features/general/generalSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback } from "react";
import { Modal } from "../Modal";
import { Button } from "../Button";
import { ButtonType } from "@/shared/types";
import { NFTItem } from "../NFTItem";

export const UnfreezeNFTModal = () => {
  const isUnfreezeNFTModalOpen = useAppSelector(state => state.general.isUnfreezeNFTModalOpen);
  const selectedNFTSend = useAppSelector(state => state.nfts.selectedNFTSend);
  const selectedNFTClass = useAppSelector(state => state.nfts.selectedNFTClass);

  const dispatch = useAppDispatch();

  const handleCloseModal = useCallback(() => {
    dispatch(setIsUnfreezeNFTModalOpen(false));
  }, []);

  const handleOnClickBackButton = useCallback(() => {
    dispatch(setIsUnfreezeNFTModalOpen(false));
    dispatch(setIsNFTCollectionViewModalOpen(true));
  }, []);

  const handleUnfreezeNFTToken = useCallback(() => {
    dispatch(setIsConfirmNFTUnfreezeModalOpen(true));
    dispatch(setIsUnfreezeNFTModalOpen(false));
  }, []);

  return (
    <Modal
      isOpen={isUnfreezeNFTModalOpen}
      title="Unfreeze NFT"
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
              onClick={handleUnfreezeNFTToken}
              type={ButtonType.Primary}
              className="text-sm !py-2 px-6 rounded-[10px] font-semibold w-[160px]"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
