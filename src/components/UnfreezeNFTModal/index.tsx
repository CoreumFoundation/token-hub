import { setIsUnfreezeNFTModalOpen } from "@/features/general/generalSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback } from "react";
import { Modal } from "../Modal";
import { Button } from "../Button";
import { ButtonType } from "@/shared/types";

export const UnfreezeNFTModal = () => {
  const isUnfreezeNFTModalOpen = useAppSelector(state => state.general.isUnfreezeNFTModalOpen);

  const dispatch = useAppDispatch();

  const handleCloseModal = useCallback(() => {
    dispatch(setIsUnfreezeNFTModalOpen(false));
  }, []);

  const handleUnfreezeNFTToken = useCallback(() => {

  }, []);

  return (
    <Modal
      isOpen={isUnfreezeNFTModalOpen}
      title="Unfreeze NFT"
      onClose={handleCloseModal}
      wrapperClassName="w-[640px]"
    >
      <div className="flex flex-col w-full gap-8">
        <div className="flex w-full justify-end">
          <div className="flex items-center">
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
