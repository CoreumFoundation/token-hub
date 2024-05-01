'use client';

import { GeneralIcon } from "@/assets/GeneralIcon";
import { Amount } from "@/components/Amount";
import { Button } from "@/components/Button";
import { ChainSelector } from "@/components/ChainSelector";
import { InfoRow } from "@/components/InfoRow";
import { Input } from "@/components/Input";
import { MessageBox } from "@/components/MessageBox";
import { SectionWithLabel } from "@/components/SectionWithLabel";
import { COREUM_TOKEN } from "@/constants";
import { setIsConnectModalOpen } from "@/features/general/generalSlice";
import { ButtonIconType, ButtonType, ChainInfo, DropdownItem, GeneralIconType, Token } from "@/shared/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback, useEffect, useMemo, useState } from "react";

export const FungibleTokenSend = () => {
  const [destinationAddress, setDestinationAddress] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [selectedCurrency, setSelectedCurrency] = useState<DropdownItem | null>(null);

  const currencies = useAppSelector(state => state.currencies.list);
  const currenciesLoading = useAppSelector(state => state.currencies.isLoading);

  const dispatch = useAppDispatch();

  const currenciesToDropdownItem: DropdownItem[] = useMemo(() => {
    return [COREUM_TOKEN].concat(currencies).map((item: Token) => {
      return {
        id: item.denom,
        label: item.symbol,
        icon: item.denom === 'utestcore'
          ? <GeneralIcon type={GeneralIconType.Coreum} />
          : <GeneralIcon type={GeneralIconType.DefaultToken} />
      };
    });
  }, [currencies]);

  useEffect(() => {
    if (!selectedCurrency && currenciesToDropdownItem.length) {
      setSelectedCurrency(currenciesToDropdownItem[0]);
    }
  }, [currenciesToDropdownItem, selectedCurrency]);


  const handleConnectWalletClick = useCallback(() => {
    dispatch(setIsConnectModalOpen(true));
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <MessageBox>
        <ul className="list-disc text-[#868991] text-sm font-normal ml-5">
          <li>Depending of the nature of your Smart Token you can send it to another user.</li>
          <li>Please note, you will not be able to re-claim the assets unless the receiver sends it back to you.</li>
        </ul>
      </MessageBox>
      <SectionWithLabel label="Amount">
        <Amount
          value={amount}
          onChangeValue={setAmount}
          selectedCurrency={selectedCurrency}
          currencies={currenciesToDropdownItem}
          onSelectCurrency={setSelectedCurrency}
          onMaxButtonClick={() => {}}
          balance={"0.00"}
        />
      </SectionWithLabel>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <ChainSelector />
        <div className="col-span-2">
          <Input
            label="Destination Address"
            value={destinationAddress}
            onChange={setDestinationAddress}
            placeholder="Enter Destination Address"
          />
        </div>
      </div>
      <div className="flex flex-col w-full items-center gap-2">
        <InfoRow
          label={"Fee"}
          value="~ 0.00 COREUM"
        />
        <InfoRow
          label={"Estimated Time"}
          value="1 - 3 minutes"
        />
      </div>
      <div className="flex w-full justify-end">
        <div className="flex items-center">
          <Button
            label="Connect Wallet"
            onClick={handleConnectWalletClick}
            type={ButtonType.Primary}
            iconType={ButtonIconType.Wallet}
          />
        </div>
      </div>
    </div>
  );
};
