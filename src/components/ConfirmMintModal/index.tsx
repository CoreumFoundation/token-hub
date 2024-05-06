import { ButtonType, ConfirmationModalImageType } from "@/shared/types";
import { ConfirmationModal } from "../ConfirmationModal";
import { ConfirmationModalImage } from "@/assets/ConfirmationModalImage";
import { Button } from "../Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback } from "react";
import { setIsConfirmMintModalOpen } from "@/features/general/generalSlice";
import { setMintAmount } from "@/features/mint/mintSlice";

export const ConfirmMintModal = () => {
  const isConfirmMintModalOpen = useAppSelector(state => state.general.isConfirmMintModalOpen);
  const mintAmount = useAppSelector(state => state.mint.amount);

  const dispatch = useAppDispatch();

  const handleCancel = useCallback(() => {
    dispatch(setMintAmount('0'));
    dispatch(setIsConfirmMintModalOpen(false));
  }, []);

  const handleConfirm = useCallback(() => {
    // TODO: add mint
    console.log({ mintAmount });
    dispatch(setMintAmount('0'));
    dispatch(setIsConfirmMintModalOpen(false));
  }, [mintAmount]);

  return (
    <ConfirmationModal isOpen={isConfirmMintModalOpen}>
      <ConfirmationModalImage type={ConfirmationModalImageType.Mint} />
      <div className="flex flex-col w-full p-8 gap-8">
        <div className="flex flex-col text-center gap-2">
          <div className="font-space-grotesk text-lg text-[#EEE] font-medium">
            Mint Tokens
          </div>
          <div className="font-noto-sans text-sm text-[#868991]">
            This action will be globally applied and might affect all current holders of this token. Would you like to proceed?
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button
            label="Cancel"
            onClick={handleCancel}
            type={ButtonType.Secondary}
            className="text-sm !py-2 px-6 rounded-[10px] font-semibold w-[160px]"
          />
          <Button
            label="Confirm"
            onClick={handleConfirm}
            type={ButtonType.Primary}
            className="text-sm !py-2 px-6 rounded-[10px] font-semibold w-[160px]"
          />
        </div>
      </div>
    </ConfirmationModal>
  );
};
