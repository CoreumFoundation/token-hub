'use client';

import { useCallback, useMemo, useState } from "react";
import { Modal } from "../Modal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSelectedCurrency } from "@/features/currencies/currenciesSlice";
import { setIsBurnCurrencyModalOpen, setIsConfirmBurnModalOpen } from "@/features/general/generalSlice";
import { Input } from "../Input";
import { GeneralIcon } from "@/assets/GeneralIcon";
import { ButtonType, GeneralIconType, Token } from "@/shared/types";
import { Button } from "../Button";
import { setBurnAmount } from "@/features/burn/burnSlice";
import { convertSubunitToUnit } from "@/helpers/convertUnitToSubunit";
import Big from "big.js";

export const BurnTokensModal = () => {
  const [amount, setAmount] = useState<string>('');

  const selectedCurrency = useAppSelector(state => state.currencies.selectedCurrency);
  const isBurnCurrencyModalOpen = useAppSelector(state => state.general.isBurnCurrencyModalOpen);
  const balances = useAppSelector(state => state.balances.list);

  const currentCurrencyBalance = useMemo(() => {
    return balances.find((balanceItem: Token) => balanceItem.denom === selectedCurrency?.denom);
  }, [balances, selectedCurrency]);

  const availableBalance = useMemo(() => {
    return convertSubunitToUnit({
      amount: currentCurrencyBalance?.amount || '0',
      precision: selectedCurrency?.precision || 0,
    });
  }, [selectedCurrency?.precision, currentCurrencyBalance?.amount]);

  const dispatch = useAppDispatch();

  const handleCloseModal = useCallback(() => {
    dispatch(setIsBurnCurrencyModalOpen(false));
    dispatch(setSelectedCurrency(null));
  }, []);

  const handleBurnTokens = useCallback(() => {
    dispatch(setBurnAmount(amount));
    dispatch(setIsBurnCurrencyModalOpen(false));
    dispatch(setIsConfirmBurnModalOpen(true));
  }, [amount]);

  return (
    <Modal
      isOpen={isBurnCurrencyModalOpen}
      title="Burn Tokens"
      onClose={handleCloseModal}
      wrapperClassName="w-[480px]"
    >
      <div className="flex flex-col w-full gap-8">
        <Input
          label="Burn Amount"
          value={amount}
          onChange={setAmount}
          placeholder="0"
          type="number"
          buttonLabel={(
            <div className="flex items-center gap-1.5 text-[#EEE]">
              <GeneralIcon type={GeneralIconType.DefaultToken} />
              {selectedCurrency?.symbol.toUpperCase()}
            </div>
          )}
          warning="The burnt tokens will not be recoverable"
          decimals={selectedCurrency?.precision || 0}
          error={Big(amount || '0').gt(availableBalance) ? 'Insufficient Balance' : ''}
        />
        <div className="flex w-full justify-end">
          <div className="flex items-center">
            <Button
              label="Continue"
              onClick={handleBurnTokens}
              type={ButtonType.Primary}
              className="text-sm !py-2 px-6 rounded-[10px] font-semibold w-[160px]"
              disabled={!amount.length || +amount === 0 || Big(amount || '0').gt(availableBalance)}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
