import { AlertType, ButtonType, ConfirmationModalImageType } from "@/shared/types";
import { ConfirmationModal } from "../ConfirmationModal";
import { ConfirmationModalImage } from "@/assets/ConfirmationModalImage";
import { Button } from "../Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback, useMemo, useState } from "react";
import { setIsConfirmClawbackModalOpen, setIsTxExecuting } from "@/features/general/generalSlice";
import { convertUnitToSubunit } from "@/helpers/convertUnitToSubunit";
import { useEstimateTxGasFee } from "@/hooks/useEstimateTxGasFee";
import { FT } from "coreum-js";
import { setSelectedCurrency, shouldRefetchCurrencies } from "@/features/currencies/currenciesSlice";
import { ModalInfoRow } from "../ModalInfoRow";
import { dispatchAlert } from "@/features/alerts/alertsSlice";
import { shortenAddress } from "@/helpers/shortenAddress";
import { Decimal } from "../Decimal";
import { shouldRefetchBalances } from "@/features/balances/balancesSlice";
import { setClawbackAmount, setClawbackWalletAddress } from "@/features/clawback/clawbackSlice";

export const ConfirmClawbackModal = () => {
  const isConfirmClawbakcModalOpen = useAppSelector(state => state.general.isConfirmClawbackModalOpen);
  const clawbackAmount = useAppSelector(state => state.clawback.amount);
  const walletAddress = useAppSelector(state => state.clawback.walletAddress);
  const account = useAppSelector(state => state.general.account);
  const selectedCurrency = useAppSelector(state => state.currencies.selectedCurrency);
  const isTxExecuting = useAppSelector(state => state.general.isTxExecuting);

  const [isTxSuccessful, setIsTxSuccessful] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { signingClient, getTxFee } = useEstimateTxGasFee();

  const handleClose = useCallback(() => {
    dispatch(setClawbackAmount('0'));
    dispatch(setClawbackWalletAddress(''));
    dispatch(setIsConfirmClawbackModalOpen(false));
    dispatch(setSelectedCurrency(null));
    setIsTxSuccessful(false);
  }, []);

  const handleConfirm = useCallback(async () => {
    dispatch(setIsTxExecuting(true));

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const clawbackFTMsg = FT.Clawback({
        sender: account,
        account: walletAddress,
        coin: {
          denom: selectedCurrency!.denom,
          amount: convertUnitToSubunit({
            amount: clawbackAmount,
            precision: selectedCurrency!.precision,
          }),
        },
      });
      const txFee = await getTxFee([clawbackFTMsg]);
      await signingClient?.signAndBroadcast(account, [clawbackFTMsg], txFee ? txFee.fee : 'auto');
      setIsTxSuccessful(true);
      dispatch(shouldRefetchBalances(true));
      dispatch(shouldRefetchCurrencies(true));
    } catch (error) {
      dispatch(dispatchAlert({
        type: AlertType.Error,
        title: 'Fungible Token Clawback Failed',
        message: (error as { message: string}).message,
      }));
    }

    dispatch(setIsTxExecuting(false));
  }, [account, getTxFee, selectedCurrency, signingClient, walletAddress, clawbackAmount]);

  const renderContent = useMemo(() => {
    if (isTxSuccessful) {
      return (
        <div className="flex flex-col w-full p-8 gap-8">
          <div className="flex flex-col text-center gap-6">
            <div className="font-space-grotesk text-lg text-[#EEE] font-medium">
              Successfully Clawback
            </div>
            <div className="flex flex-col items-center w-full gap-2">
              <ModalInfoRow label="Wallet Address" value={shortenAddress(walletAddress)} />
              <ModalInfoRow
                label="Clawback Amount"
                value={(
                  <div className="flex flex-wrap max-w-full gap-1 w-full items-baseline justify-end">
                    <Decimal className="break-all max-w-full !inline" value={clawbackAmount} precision={selectedCurrency?.precision || 0} />
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
            Clawback Account
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
  }, [handleClose, handleConfirm, isTxExecuting, isTxSuccessful, selectedCurrency, walletAddress, clawbackAmount]);

  return (
    <ConfirmationModal isOpen={isConfirmClawbakcModalOpen}>
      <ConfirmationModalImage type={isTxSuccessful ? ConfirmationModalImageType.Success : ConfirmationModalImageType.Clawback} />
      {renderContent}
    </ConfirmationModal>
  );
};
