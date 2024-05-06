import { ButtonType, ConfirmationModalImageType } from "@/shared/types";
import { ConfirmationModal } from "../ConfirmationModal";
import { ConfirmationModalImage } from "@/assets/ConfirmationModalImage";
import { Button } from "../Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback } from "react";
import { setIsConfirmFreezeModalOpen, setIsTxExecuting } from "@/features/general/generalSlice";
import { setFreezeAmount } from "@/features/freeze/freezeSlice";
import { convertUnitToSubunit } from "@/helpers/convertUnitToSubunit";
import { useEstimateTxGasFee } from "@/hooks/useEstimateTxGasFee";
import { FT } from "coreum-js";

export const ConfirmFreezeModal = () => {
  const isConfirmFreezeModalOpen = useAppSelector(state => state.general.isConfirmFreezeModalOpen);
  const freezeAmount = useAppSelector(state => state.freeze.amount);
  const walletAddress = useAppSelector(state => state.freeze.walletAddress);
  const account = useAppSelector(state => state.general.account);
  const selectedCurrency = useAppSelector(state => state.currencies.selectedCurrency);
  const isTxExecuting = useAppSelector(state => state.general.isTxExecuting);

  const dispatch = useAppDispatch();
  const { signingClient, getTxFee } = useEstimateTxGasFee();

  const handleCancel = useCallback(() => {
    dispatch(setFreezeAmount('0'));
    dispatch(setIsConfirmFreezeModalOpen(false));
  }, []);

  const handleConfirm = useCallback(async () => {
    dispatch(setIsTxExecuting(true));

    try {
      const freezeFTMsg = FT.Freeze({
        sender: account,
        account: walletAddress,
        coin: {
          denom: selectedCurrency!.denom,
          amount: convertUnitToSubunit({
            amount: freezeAmount,
            precision: selectedCurrency!.precision,
          }),
        },
      });
      const txFee = await getTxFee([freezeFTMsg]);
      await signingClient?.signAndBroadcast(account, [freezeFTMsg], txFee ? txFee.fee : 'auto');
      dispatch(setFreezeAmount('0'));
      dispatch(setIsConfirmFreezeModalOpen(false));
    } catch (error) {
      console.log(error);
    }

    dispatch(setIsTxExecuting(false));
  }, [account, freezeAmount, getTxFee, selectedCurrency, signingClient, walletAddress]);

  return (
    <ConfirmationModal isOpen={isConfirmFreezeModalOpen}>
      <ConfirmationModalImage type={ConfirmationModalImageType.Burn} />
      <div className="flex flex-col w-full p-8 gap-8">
        <div className="flex flex-col text-center gap-2">
          <div className="font-space-grotesk text-lg text-[#EEE] font-medium">
            Freeze Tokens
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
