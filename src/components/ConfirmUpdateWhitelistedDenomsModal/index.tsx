import { AlertType, ButtonType, ConfirmationModalImageType } from "@/shared/types";
import { ConfirmationModal } from "../ConfirmationModal";
import { ConfirmationModalImage } from "@/assets/ConfirmationModalImage";
import { Button } from "../Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback, useMemo, useState } from "react";
import { setIsConfirmClawbackModalOpen, setIsConfirmUpdateDexUnifiedRefAmountOpen, setIsConfirmUpdateDexWhitelistedDenomsOpen, setIsTxExecuting } from "@/features/general/generalSlice";
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
import { setDexRefAmount, setDexWhitelistedDenoms } from "@/features/dex/dexSlice";

export const ConfirmUpdateDexWhitelistedDenomsModal = () => {
  const isConfirmUpdateDexWhitelistedDenomsOpen = useAppSelector(state => state.general.isConfirmUpdateDexWhitelistedDenomsOpen);
  const whitelistedDenoms = useAppSelector(state => state.dex.whitelistDenoms);
  const account = useAppSelector(state => state.general.account);
  const selectedCurrency = useAppSelector(state => state.currencies.selectedCurrency);
  const isTxExecuting = useAppSelector(state => state.general.isTxExecuting);

  const [isTxSuccessful, setIsTxSuccessful] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { signingClient, getTxFee } = useEstimateTxGasFee();

  const handleClose = useCallback(() => {
    dispatch(setDexWhitelistedDenoms(['']));
    dispatch(setIsConfirmUpdateDexWhitelistedDenomsOpen(false));
    dispatch(setSelectedCurrency(null));
    setIsTxSuccessful(false);
  }, []);

  const handleConfirm = useCallback(async () => {
    dispatch(setIsTxExecuting(true));

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const updateDexWhitelistedDenomsMsg = FT.UpdateDEXWhitelistedDenoms({
        sender: account,
        denom: selectedCurrency?.denom || '',
        whitelistedDenoms,
      });
      const txFee = await getTxFee([updateDexWhitelistedDenomsMsg]);
      await signingClient?.signAndBroadcast(account, [updateDexWhitelistedDenomsMsg], txFee ? txFee.fee : 'auto');
      setIsTxSuccessful(true);
      dispatch(shouldRefetchBalances(true));
      dispatch(shouldRefetchCurrencies(true));
    } catch (error) {
      dispatch(dispatchAlert({
        type: AlertType.Error,
        title: 'Fungible Token Update Whiteslited Denoms Failed',
        message: (error as { message: string}).message,
      }));
    }

    dispatch(setIsTxExecuting(false));
  }, [dispatch]);

  const renderDenoms = useMemo(() => {
    return (
      <>
        {whitelistedDenoms.map((denom: string, index: number) => {
          if (index === 0) {
            return (
              <div
                key={`whitelisting-denom-${index}`}
                className="flex items-center"
              >
                <p className="flex-1 w-full bg-transparent text-[#EEE] outline-none text-base truncate">
                  {denom}
                </p>
              </div>
            );
          }

          return (
            <div className="flex items-center w-full gap-2" key={`whitelisting-denom-${index}`}>
              <div className="flex-none flex items-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.8378 1.84783C12.8378 1.45847 12.5221 1.14282 12.1327 1.14282C11.7434 1.14282 11.4277 1.45847 11.4277 1.84783L11.4277 7.35433C11.4277 10.2356 13.7635 12.5714 16.6448 12.5714H22.1513C22.5407 12.5714 22.8563 12.2558 22.8563 11.8664C22.8563 11.477 22.5407 11.1614 22.1513 11.1614H16.6448C14.5422 11.1614 12.8378 9.4569 12.8378 7.35433V1.84783Z"
                    fill="#5E6773"
                  />
                </svg>
              </div>
              <div className="flex-1 flex items-center truncate">
                <p className="flex-1 w-full bg-transparent text-[#EEE] outline-none text-base truncate">
                  {denom}
                </p>
              </div>
            </div>
          );
        })}
      </>
    );
  }, [whitelistedDenoms]);

  const renderContent = useMemo(() => {
    if (isTxSuccessful) {
      return (
        <div className="flex flex-col w-full p-8 gap-8">
          <div className="flex flex-col text-center gap-6">
            <div className="font-space-grotesk text-lg text-[#EEE] font-medium">
              Successfully Updated Whitelisted Denoms
            </div>
            <div className="flex flex-col w-full gap-1">
              <p className="text-[#5E6773] font-noto-sans text-sm font-normal leading-[21px] tracking-[-0.21px] capitalize text-left">
                Whitelisted Denoms
              </p>
              {renderDenoms}
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
            Update Whitelisted Denoms
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
    <ConfirmationModal isOpen={isConfirmUpdateDexWhitelistedDenomsOpen}>
      <ConfirmationModalImage type={isTxSuccessful ? ConfirmationModalImageType.Success : ConfirmationModalImageType.DEXUnifiedRefAmountChange} />
      {renderContent}
    </ConfirmationModal>
  );
};
