import { AlertType, ButtonType, ConfirmationModalImageType } from "@/shared/types";
import { ConfirmationModal } from "../ConfirmationModal";
import { ConfirmationModalImage } from "@/assets/ConfirmationModalImage";
import { Button } from "../Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback, useMemo, useState } from "react";
import { setIsConfirmGlobalFreezeModalOpen, setIsTxExecuting } from "@/features/general/generalSlice";
import { useEstimateTxGasFee } from "@/hooks/useEstimateTxGasFee";
import { FT } from "coreum-js";
import { setSelectedCurrency, shouldRefetchCurrencies } from "@/features/currencies/currenciesSlice";
import { dispatchAlert } from "@/features/alerts/alertsSlice";
import { shouldRefetchBalances } from "@/features/balances/balancesSlice";

export const ConfirmGlobalFreezeModal = () => {
  const isConfirmGlobalFreezeModalOpen = useAppSelector(state => state.general.isConfirmGlobalFreezeModalOpen);
  const account = useAppSelector(state => state.general.account);
  const isTxExecuting = useAppSelector(state => state.general.isTxExecuting);
  const selectedCurrency = useAppSelector(state => state.currencies.selectedCurrency);

  const [isTxSuccessful, setIsTxSuccessful] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { signingClient, getTxFee } = useEstimateTxGasFee();

  const handleClose = useCallback(() => {
    dispatch(setIsConfirmGlobalFreezeModalOpen(false));
    dispatch(setSelectedCurrency(null));
    setIsTxSuccessful(false);
  }, []);

  const handleConfirm = useCallback(async () => {
    dispatch(setIsTxExecuting(true));

    try {
      const globalFreezeFTMsg = FT.GloballyFreeze({
        sender: account,
        denom: selectedCurrency!.denom,
      });
      const txFee = await getTxFee([globalFreezeFTMsg]);
      await signingClient?.signAndBroadcast(account, [globalFreezeFTMsg], txFee ? txFee.fee : 'auto');
      setIsTxSuccessful(true);
      dispatch(shouldRefetchBalances(true));
      dispatch(shouldRefetchCurrencies(true));
    } catch (error) {
      dispatch(dispatchAlert({
        type: AlertType.Error,
        title: 'Fungible Token Global Freeze Failed',
        message: (error as { message: string}).message,
      }));
    }

    dispatch(setIsTxExecuting(false));
  }, [account, getTxFee, selectedCurrency, signingClient]);

  const renderContent = useMemo(() => {
    if (isTxSuccessful) {
      return (
        <div className="flex flex-col w-full p-8 gap-8">
          <div className="flex flex-col text-center gap-6">
            <div className="font-space-grotesk text-lg text-[#EEE] font-medium">
              Successfully Freeze Tokens Globally
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
            Globally Freeze Tokens
          </div>
          <div className="font-noto-sans text-sm text-[#868991]">
            This action will be globally applied and might affect all current holders of this token. Would you like to proceed?
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
  }, [handleClose, handleConfirm, isTxExecuting, isTxSuccessful]);

  return (
    <ConfirmationModal isOpen={isConfirmGlobalFreezeModalOpen}>
      <ConfirmationModalImage type={isTxSuccessful ? ConfirmationModalImageType.Success : ConfirmationModalImageType.Freeze} />
      {renderContent}
    </ConfirmationModal>
  );
};
