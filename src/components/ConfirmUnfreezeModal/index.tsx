import { ButtonType, ConfirmationModalImageType } from "@/shared/types";
import { ConfirmationModal } from "../ConfirmationModal";
import { ConfirmationModalImage } from "@/assets/ConfirmationModalImage";
import { Button } from "../Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback } from "react";
import { setIsConfirmUnfreezeModalOpen, setIsTxExecuting } from "@/features/general/generalSlice";
import { setUnfreezeAmount } from "@/features/unfreeze/unfreezeSlice";
import { convertUnitToSubunit } from "@/helpers/convertUnitToSubunit";
import { useEstimateTxGasFee } from "@/hooks/useEstimateTxGasFee";
import { FT } from "coreum-js";

export const ConfirmUnfreezeModal = () => {
  const isConfirmUnfreezeModalOpen = useAppSelector(state => state.general.isConfirmUnfreezeModalOpen);
  const unfreezeAmount = useAppSelector(state => state.unfreeze.amount);
  const walletAddress = useAppSelector(state => state.unfreeze.walletAddress);
  const account = useAppSelector(state => state.general.account);
  const selectedCurrency = useAppSelector(state => state.currencies.selectedCurrency);
  const isTxExecuting = useAppSelector(state => state.general.isTxExecuting);

  const dispatch = useAppDispatch();
  const { signingClient, getTxFee } = useEstimateTxGasFee();

  const handleCancel = useCallback(() => {
    dispatch(setUnfreezeAmount('0'));
    dispatch(setIsConfirmUnfreezeModalOpen(false));
  }, []);

  const handleConfirm = useCallback(async () => {
    dispatch(setIsTxExecuting(true));

    try {
      const unfreezeFTMsg = FT.Unfreeze({
        sender: account,
        account: walletAddress,
        coin: {
          denom: selectedCurrency!.denom,
          amount: convertUnitToSubunit({
            amount: unfreezeAmount,
            precision: selectedCurrency!.precision,
          }),
        },
      });
      const txFee = await getTxFee([unfreezeFTMsg]);
      await signingClient?.signAndBroadcast(account, [unfreezeFTMsg], txFee ? txFee.fee : 'auto');
      dispatch(setUnfreezeAmount('0'));
      dispatch(setIsConfirmUnfreezeModalOpen(false));
    } catch (error) {
      console.log(error);
    }

    dispatch(setIsTxExecuting(true));
  }, [account, getTxFee, selectedCurrency, signingClient, unfreezeAmount, walletAddress]);

  return (
    <ConfirmationModal isOpen={isConfirmUnfreezeModalOpen}>
      <ConfirmationModalImage type={ConfirmationModalImageType.Burn} />
      <div className="flex flex-col w-full p-8 gap-8">
        <div className="flex flex-col text-center gap-2">
          <div className="font-space-grotesk text-lg text-[#EEE] font-medium">
            Unfreeze Tokens
          </div>
          <div className="font-noto-sans text-sm text-[#868991]">
            This action will be applied and affect this targeted holder. Would you like to proceed?
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
