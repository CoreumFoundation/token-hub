import { ButtonType, ConfirmationModalImageType } from "@/shared/types";
import { ConfirmationModal } from "../ConfirmationModal";
import { ConfirmationModalImage } from "@/assets/ConfirmationModalImage";
import { Button } from "../Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback } from "react";
import { setIsConfirmMintModalOpen, setIsTxExecuting } from "@/features/general/generalSlice";
import { setMintAmount } from "@/features/mint/mintSlice";
import { useEstimateTxGasFee } from "@/hooks/useEstimateTxGasFee";
import { FT } from "coreum-js";
import { convertUnitToSubunit } from "@/helpers/convertUnitToSubunit";

export const ConfirmMintModal = () => {
  const isConfirmMintModalOpen = useAppSelector(state => state.general.isConfirmMintModalOpen);
  const mintAmount = useAppSelector(state => state.mint.amount);
  const account = useAppSelector(state => state.general.account);
  const selectedCurrency = useAppSelector(state => state.currencies.selectedCurrency);
  const isTxExecuting = useAppSelector(state => state.general.isTxExecuting);

  const dispatch = useAppDispatch();
  const { signingClient, getTxFee } = useEstimateTxGasFee();

  const handleCancel = useCallback(() => {
    dispatch(setMintAmount('0'));
    dispatch(setIsConfirmMintModalOpen(false));
  }, []);

  const handleConfirm = useCallback(async () => {
    dispatch(setIsTxExecuting(true));

    try {
      const mintFTMsg = FT.Mint({
        sender: account,
        coin: {
          denom: selectedCurrency!.denom,
          amount: convertUnitToSubunit({
            amount: mintAmount,
            precision: selectedCurrency!.precision,
          }),
        },
      });
      const txFee = await getTxFee([mintFTMsg]);
      await signingClient?.signAndBroadcast(account, [mintFTMsg], txFee ? txFee.fee : 'auto');
      dispatch(setMintAmount('0'));
      dispatch(setIsConfirmMintModalOpen(false));
    } catch (error) {
      console.log(error);
    }

    dispatch(setIsTxExecuting(false));
  }, [account, dispatch, getTxFee, mintAmount, selectedCurrency, signingClient]);

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
            loading={isTxExecuting}
            disabled={isTxExecuting}
          />
        </div>
      </div>
    </ConfirmationModal>
  );
};
