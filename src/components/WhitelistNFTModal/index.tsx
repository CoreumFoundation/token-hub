import { setIsWhitelistNFTModalOpen } from "@/features/general/generalSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback } from "react";
import { Modal } from "../Modal";
import { Button } from "../Button";
import { ButtonType } from "@/shared/types";

export const WhitelistNFTModal = () => {
  const isWhitelistNFTModalOpen = useAppSelector(state => state.general.isWhitelistNFTModalOpen);

  const dispatch = useAppDispatch();

  const handleCloseModal = useCallback(() => {
    dispatch(setIsWhitelistNFTModalOpen(false));
  }, []);

  const handleWhitelistNFTToken = useCallback(() => {

  }, []);

  return (
    <Modal
      isOpen={isWhitelistNFTModalOpen}
      title="Whitelist NFT"
      onClose={handleCloseModal}
      wrapperClassName="w-[640px]"
    >
      <div className="flex flex-col w-full gap-8">
        <div className="flex w-full justify-end">
          <div className="flex items-center">
            <Button
              label="Confirm"
              onClick={handleWhitelistNFTToken}
              type={ButtonType.Primary}
              className="text-sm !py-2 px-6 rounded-[10px] font-semibold w-[160px]"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
