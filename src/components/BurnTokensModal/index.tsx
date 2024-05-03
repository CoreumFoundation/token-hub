'use client';

import { useCallback, useState } from "react";
import { Modal } from "../Modal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSelectedCurrency } from "@/features/currencies/currenciesSlice";
import { setIsBurnCurrencyModalOpen } from "@/features/general/generalSlice";
import { Input } from "../Input";
import { GeneralIcon } from "@/assets/GeneralIcon";
import { ButtonType, GeneralIconType } from "@/shared/types";
import { Button } from "../Button";

export const BurnTokensModal = () => {
  const [burnAmount, setBurnAmount] = useState<string>('');

  const selectedCurrency = useAppSelector(state => state.currencies.selectedCurrency);
  const isBurnCurrencyModalOpen = useAppSelector(state => state.general.isBurnCurrencyModalOpen);

  const dispatch = useAppDispatch();

  const handleCloseConnectWalletModal = useCallback(() => {
    dispatch(setIsBurnCurrencyModalOpen(false));
    dispatch(setSelectedCurrency(null));
  }, []);

  const handleBurnTokens = useCallback(() => {
    console.log('burn');
  }, []);

  return (
    <Modal
      isOpen={isBurnCurrencyModalOpen}
      title="Burn Tokens"
      onClose={handleCloseConnectWalletModal}
      wrapperClassName="w-[480px]"
    >
      <div className="flex flex-col w-full gap-8">
        <Input
          label="Burn Amount"
          value={burnAmount}
          onChange={setBurnAmount}
          placeholder="0"
          type="number"
          buttonLabel={(
            <div className="flex items-center gap-1.5 text-[#EEE]">
              <GeneralIcon type={GeneralIconType.DefaultToken} />
              {selectedCurrency?.symbol.toUpperCase()}
            </div>
          )}
          warning="The burnt tokens will not be recoverable"
        />
        <div className="flex w-full justify-end">
          <div className="flex items-center">
            <Button
              label="Continue"
              onClick={handleBurnTokens}
              type={ButtonType.Primary}
              className="text-sm !py-2 px-6 rounded-[10px] font-semibold w-[160px]"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
