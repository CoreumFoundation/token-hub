import { AlertType, ButtonType, ConfirmationModalImageType } from "@/shared/types";
import { ConfirmationModal } from "../ConfirmationModal";
import { ConfirmationModalImage } from "@/assets/ConfirmationModalImage";
import { Button } from "../Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback, useMemo, useState } from "react";
import { setIsConfirmUnfreezeModalOpen, setIsTxExecuting } from "@/features/general/generalSlice";
import { setUnfreezeAmount, setUnfreezeWalletAddress } from "@/features/unfreeze/unfreezeSlice";
import { convertUnitToSubunit } from "@/helpers/convertUnitToSubunit";
import { useEstimateTxGasFee } from "@/hooks/useEstimateTxGasFee";
import { FT } from "coreum-js";
import { setSelectedCurrency } from "@/features/currencies/currenciesSlice";
import { ModalInfoRow } from "../ModalInfoRow";
import { dispatchAlert } from "@/features/alerts/alertsSlice";
import { shortenAddress } from "@/helpers/shortenAddress";

export const ConfirmUnfreezeModal = () => {
  const isConfirmUnfreezeModalOpen = useAppSelector(state => state.general.isConfirmUnfreezeModalOpen);
  const unfreezeAmount = useAppSelector(state => state.unfreeze.amount);
  const walletAddress = useAppSelector(state => state.unfreeze.walletAddress);
  const account = useAppSelector(state => state.general.account);
  const selectedCurrency = useAppSelector(state => state.currencies.selectedCurrency);
  const isTxExecuting = useAppSelector(state => state.general.isTxExecuting);

  const [isTxSuccessful, setIsTxSuccessful] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { signingClient, getTxFee } = useEstimateTxGasFee();

  const handleClose = useCallback(() => {
    dispatch(setUnfreezeAmount('0'));
    dispatch(setUnfreezeWalletAddress(''));
    dispatch(setIsConfirmUnfreezeModalOpen(false));
    dispatch(setSelectedCurrency(null));
    setIsTxSuccessful(false);
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

      setIsTxSuccessful(true);
    } catch (error) {
      dispatch(dispatchAlert({
        type: AlertType.Error,
        title: 'Fungible Token Unfreeze Failed',
        message: (error as { message: string}).message,
      }));
    }

    dispatch(setIsTxExecuting(true));
  }, [account, getTxFee, selectedCurrency, signingClient, unfreezeAmount, walletAddress]);

  const renderContent = useMemo(() => {
    if (isTxSuccessful) {
      return (
        <div className="flex flex-col w-full p-8 gap-8">
          <div className="flex flex-col text-center gap-6">
            <div className="font-space-grotesk text-lg text-[#EEE] font-medium">
              Successfully Unfreezed Tokens
            </div>
            <div className="flex flex-col items-center w-full gap-2">
              <ModalInfoRow label="Wallet Address" value={shortenAddress(walletAddress)} />
              <ModalInfoRow label="Unfreeze Amount" value={`${unfreezeAmount} ${selectedCurrency?.symbol.toUpperCase()}`} />
            </div>
          </div>
          <div className="flex items-center w-full">
            <Button
              label="Done"
              onClick={handleClose}
              type={ButtonType.Primary}
              className="text-sm !py-2 px-6 rounded-[10px] font-semibold"
            />
          </div>
        </div>
      );
    }

    return (
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
            onClick={handleClose}
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
    );
  }, [handleClose, handleConfirm, isTxExecuting, isTxSuccessful, selectedCurrency?.symbol, unfreezeAmount, walletAddress]);

  return (
    <ConfirmationModal isOpen={isConfirmUnfreezeModalOpen}>
      <ConfirmationModalImage type={isTxSuccessful ? ConfirmationModalImageType.Success : ConfirmationModalImageType.Unfreeze} />
      {renderContent}
    </ConfirmationModal>
  );
};
