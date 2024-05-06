import { ButtonType, ConfirmationModalImageType } from "@/shared/types";
import { ConfirmationModal } from "../ConfirmationModal";
import { ConfirmationModalImage } from "@/assets/ConfirmationModalImage";
import { Button } from "../Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback, useMemo, useState } from "react";
import { setIsConfirmFreezeModalOpen, setIsTxExecuting } from "@/features/general/generalSlice";
import { setFreezeAmount, setFreezeWalletAddress } from "@/features/freeze/freezeSlice";
import { convertUnitToSubunit } from "@/helpers/convertUnitToSubunit";
import { useEstimateTxGasFee } from "@/hooks/useEstimateTxGasFee";
import { FT } from "coreum-js";
import { setSelectedCurrency } from "@/features/currencies/currenciesSlice";
import { ModalInfoRow } from "../ModalInfoRow";

export const ConfirmFreezeModal = () => {
  const isConfirmFreezeModalOpen = useAppSelector(state => state.general.isConfirmFreezeModalOpen);
  const freezeAmount = useAppSelector(state => state.freeze.amount);
  const walletAddress = useAppSelector(state => state.freeze.walletAddress);
  const account = useAppSelector(state => state.general.account);
  const selectedCurrency = useAppSelector(state => state.currencies.selectedCurrency);
  const isTxExecuting = useAppSelector(state => state.general.isTxExecuting);

  const [isTxSuccessful, setIsTxSuccessful] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { signingClient, getTxFee } = useEstimateTxGasFee();

  const handleClose = useCallback(() => {
    dispatch(setFreezeAmount('0'));
    dispatch(setFreezeWalletAddress(''));
    dispatch(setIsConfirmFreezeModalOpen(false));
    dispatch(setSelectedCurrency(null));
    setIsTxSuccessful(false);
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
      setIsTxSuccessful(true);
    } catch (error) {
      console.log(error);
    }

    dispatch(setIsTxExecuting(false));
  }, [account, freezeAmount, getTxFee, selectedCurrency, signingClient, walletAddress]);

  const renderContent = useMemo(() => {
    if (isTxSuccessful) {
      return (
        <div className="flex flex-col w-full p-8 gap-8">
          <div className="flex flex-col text-center gap-6">
            <div className="font-space-grotesk text-lg text-[#EEE] font-medium">
              Successfully Freezed Tokens
            </div>
            <div className="flex flex-col items-center w-full gap-2">
              <ModalInfoRow label="Wallet Address" value={walletAddress} />
              <ModalInfoRow label="Freeze Amount" value={`${freezeAmount} ${selectedCurrency?.symbol.toUpperCase()}`} />
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
            Freeze Tokens
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
  }, [freezeAmount, handleClose, handleConfirm, isTxExecuting, isTxSuccessful, selectedCurrency?.symbol, walletAddress]);

  return (
    <ConfirmationModal isOpen={isConfirmFreezeModalOpen}>
      <ConfirmationModalImage type={isTxSuccessful ? ConfirmationModalImageType.Success : ConfirmationModalImageType.Freeze} />
      {renderContent}
    </ConfirmationModal>
  );
};
