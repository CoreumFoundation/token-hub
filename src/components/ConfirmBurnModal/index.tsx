import { ButtonType, ConfirmationModalImageType } from "@/shared/types";
import { ConfirmationModal } from "../ConfirmationModal";
import { ConfirmationModalImage } from "@/assets/ConfirmationModalImage";
import { Button } from "../Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback } from "react";
import { setIsConfirmBurnModalOpen } from "@/features/general/generalSlice";

export const ConfirmBurnModal = () => {
  const isConfirmBurnModalOpen = useAppSelector(state => state.general.isConfirmBurnModalOpen);

  const dispatch = useAppDispatch();

  const handleCancel = useCallback(() => {
    dispatch(setIsConfirmBurnModalOpen(false));
  }, []);

  const handleConfirm = useCallback(() => {
    dispatch(setIsConfirmBurnModalOpen(false));
  }, []);

  return (
    <ConfirmationModal isOpen={isConfirmBurnModalOpen}>
      <ConfirmationModalImage type={ConfirmationModalImageType.Burn} />
      <div className="flex flex-col w-full p-8 gap-8">
        <div className="flex flex-col text-center gap-2">
          <div className="font-space-grotesk text-lg text-[#EEE] font-medium">
            Burn Tokens
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
