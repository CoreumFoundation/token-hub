import { AlertType, ButtonType, ConfirmationModalImageType } from "@/shared/types";
import { ConfirmationModal } from "../ConfirmationModal";
import { ConfirmationModalImage } from "@/assets/ConfirmationModalImage";
import { Button } from "../Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback, useMemo, useState } from "react";
import { setIsConfirmBurnModalOpen, setIsTxExecuting } from "@/features/general/generalSlice";
import { setBurnAmount } from "@/features/burn/burnSlice";
import { convertUnitToSubunit } from "@/helpers/convertUnitToSubunit";
import { useEstimateTxGasFee } from "@/hooks/useEstimateTxGasFee";
import { FT } from "coreum-js";
import { ModalInfoRow } from "../ModalInfoRow";
import { setSelectedCurrency } from "@/features/currencies/currenciesSlice";
import { dispatchAlert } from "@/features/alerts/alertsSlice";
import { Decimal } from "../Decimal";

export const ConfirmBurnModal = () => {
  const isConfirmBurnModalOpen = useAppSelector(state => state.general.isConfirmBurnModalOpen);
  const burnAmount = useAppSelector(state => state.burn.amount);
  const account = useAppSelector(state => state.general.account);
  const selectedCurrency = useAppSelector(state => state.currencies.selectedCurrency);
  const isTxExecuting = useAppSelector(state => state.general.isTxExecuting);

  const [isTxSuccessful, setIsTxSuccessful] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { signingClient, getTxFee } = useEstimateTxGasFee();

  const handleClose = useCallback(() => {
    dispatch(setBurnAmount('0'));
    dispatch(setIsConfirmBurnModalOpen(false));
    dispatch(setSelectedCurrency(null));
    setIsTxSuccessful(false);
  }, []);

  const handleConfirm = useCallback(async () => {
    dispatch(setIsTxExecuting(true));

    try {
      const burnFTMsg = FT.Burn({
        sender: account,
        coin: {
          denom: selectedCurrency!.denom,
          amount: convertUnitToSubunit({
            amount: burnAmount,
            precision: selectedCurrency!.precision,
          }),
        },
      });
      const txFee = await getTxFee([burnFTMsg]);
      await signingClient?.signAndBroadcast(account, [burnFTMsg], txFee ? txFee.fee : 'auto');
      setIsTxSuccessful(true);
    } catch (error) {
      dispatch(dispatchAlert({
        type: AlertType.Error,
        title: 'Fungible Token Burn Failed',
        message: (error as { message: string}).message,
      }));
    }

    dispatch(setIsTxExecuting(false));
  }, [account, burnAmount, getTxFee, selectedCurrency, signingClient]);

  const renderContent = useMemo(() => {
    if (isTxSuccessful) {
      return (
        <div className="flex flex-col w-full p-8 gap-8">
          <div className="flex flex-col text-center gap-6">
            <div className="font-space-grotesk text-lg text-[#EEE] font-medium">
              Successfully Burned Tokens
            </div>
            <div className="flex items-center w-full">
              <ModalInfoRow
                label="Burn Amount"
                value={(
                  <div className="flex flex-wrap max-w-full gap-1 w-full items-baseline justify-end">
                    <Decimal className="break-all max-w-full !inline" value={burnAmount} precision={selectedCurrency?.precision || 0} />
                    <span className="text-left text-xs max-w-full break-all">{selectedCurrency?.symbol.toUpperCase()}</span>
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
            Burn Tokens
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
  }, [burnAmount, handleClose, handleConfirm, isTxExecuting, isTxSuccessful, selectedCurrency]);

  return (
    <ConfirmationModal isOpen={isConfirmBurnModalOpen}>
      <ConfirmationModalImage type={isTxSuccessful ? ConfirmationModalImageType.Success : ConfirmationModalImageType.Burn} />
      {renderContent}
    </ConfirmationModal>
  );
};
