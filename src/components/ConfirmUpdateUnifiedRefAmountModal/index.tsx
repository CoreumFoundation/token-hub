import { AlertType, ButtonType, ConfirmationModalImageType } from "@/shared/types";
import { ConfirmationModal } from "../ConfirmationModal";
import { ConfirmationModalImage } from "@/assets/ConfirmationModalImage";
import { Button } from "../Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback, useMemo, useState } from "react";
import { setIsConfirmUpdateDexUnifiedRefAmountOpen, setIsTxExecuting } from "@/features/general/generalSlice";
import { useEstimateTxGasFee } from "@/hooks/useEstimateTxGasFee";
import { setSelectedCurrency, shouldRefetchCurrencies } from "@/features/currencies/currenciesSlice";
import { ModalInfoRow } from "../ModalInfoRow";
import { dispatchAlert } from "@/features/alerts/alertsSlice";
import { Decimal } from "../Decimal";
import { shouldRefetchBalances } from "@/features/balances/balancesSlice";
import { setDexRefAmount } from "@/features/dex/dexSlice";
import { FT } from "coreum-js-nightly";

export const ConfirmUpdateDexUnifiedRefAmountModal = () => {
  const isConfirmUpdateDexUnifiedRefAmountOpen = useAppSelector(state => state.general.isConfirmUpdateDexUnifiedRefAmountOpen);
  const refAmount = useAppSelector(state => state.dex.refAmount);
  const account = useAppSelector(state => state.general.account);
  const selectedCurrency = useAppSelector(state => state.currencies.selectedCurrency);
  const isTxExecuting = useAppSelector(state => state.general.isTxExecuting);

  const [isTxSuccessful, setIsTxSuccessful] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { signingClient, getTxFee } = useEstimateTxGasFee();

  const handleClose = useCallback(() => {
    dispatch(setDexRefAmount(''));
    dispatch(setIsConfirmUpdateDexUnifiedRefAmountOpen(false));
    dispatch(setSelectedCurrency(null));
    setIsTxSuccessful(false);
  }, []);

  const handleConfirm = useCallback(async () => {
    dispatch(setIsTxExecuting(true));

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const updateDexUnifiedRefAmountMsg = FT.UpdateDEXUnifiedRefAmount({
        sender: account,
        denom: selectedCurrency?.denom || '',
        unifiedRefAmount: refAmount,
      });
      const txFee = await getTxFee([updateDexUnifiedRefAmountMsg]);
      await signingClient?.signAndBroadcast(account, [updateDexUnifiedRefAmountMsg], txFee ? txFee.fee : 'auto');
      setIsTxSuccessful(true);
      dispatch(shouldRefetchBalances(true));
      dispatch(shouldRefetchCurrencies(true));
    } catch (error) {
      dispatch(dispatchAlert({
        type: AlertType.Error,
        title: 'Fungible Token Update Unified Ref Amount Failed',
        message: (error as { message: string}).message,
      }));
    }

    dispatch(setIsTxExecuting(false));
  }, [account, getTxFee, selectedCurrency, signingClient, refAmount]);

  const renderContent = useMemo(() => {
    if (isTxSuccessful) {
      return (
        <div className="flex flex-col w-full p-8 gap-8">
          <div className="flex flex-col text-center gap-6">
            <div className="font-space-grotesk text-lg text-[#EEE] font-medium">
              Successfully Updated Unified Ref Amount
            </div>
            <div className="flex flex-col items-center w-full gap-2">
              <ModalInfoRow
                label="Unified ref amount"
                value={(
                  <div className="flex flex-wrap max-w-full gap-1 w-full items-baseline justify-end">
                    <Decimal className="break-all max-w-full !inline" value={refAmount} precision={0} />
                  </div>
                )}
              />
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
            Update Unified Ref Amount
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
  }, [handleClose, handleConfirm, isTxExecuting, isTxSuccessful, refAmount]);

  return (
    <ConfirmationModal isOpen={isConfirmUpdateDexUnifiedRefAmountOpen}>
      <ConfirmationModalImage type={isTxSuccessful ? ConfirmationModalImageType.Success : ConfirmationModalImageType.DEXUnifiedRefAmountChange} />
      {renderContent}
    </ConfirmationModal>
  );
};
