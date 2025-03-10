'use client';

import { MessageBox } from "@/components/MessageBox";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { setIsBurnCurrencyModalOpen, setIsConnectModalOpen, setIsManageCurrencyModalOpen } from "@/features/general/generalSlice";
import { ButtonType, ButtonIconType, Token, GeneralIconType } from "@/shared/types";
import { GeneralIcon } from "@/assets/GeneralIcon";
import { FungibleTokenRow } from "@/components/FungibleTokenRow";
import { convertSubunitToUnit } from "@/helpers/convertUnitToSubunit";
import { Spinner } from "@/components/Spinner";
import { setSelectedCurrency } from "@/features/currencies/currenciesSlice";
import { getFTCurrencyOptions } from "@/helpers/getManageFtTabs";
import { useRouter } from "next/navigation";
import { shouldRefetchBalances } from "@/features/balances/balancesSlice";

export const FungibleTokenManage = () => {
  const currencies = useAppSelector(state => state.currencies.issuedList);
  const isFetching = useAppSelector(state => state.currencies.isLoading);
  const isConnected = useAppSelector(state => state.general.isConnected);
  const balances = useAppSelector(state => state.balances.list);
  const network = useAppSelector(state => state.general.network);
  const isBalancesFetching = useAppSelector(state => state.balances.isLoading);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleConnectWalletClick = useCallback(() => {
    dispatch(setIsConnectModalOpen(true));
  }, []);

  const handleCurrencySendClick = useCallback((currency: Token) => {
    dispatch(setSelectedCurrency(currency));
    router.push('/ft/send');
  }, []);

  const handleCurrencyManageClick = useCallback((currency: Token) => {
    dispatch(setSelectedCurrency(currency));
    dispatch(setIsManageCurrencyModalOpen(true));
  }, []);

  const handleCurrencyBurnClick = useCallback((currency: Token) => {
    dispatch(setSelectedCurrency(currency));
    dispatch(setIsBurnCurrencyModalOpen(true));
  }, []);

  useEffect(() => {
    dispatch(shouldRefetchBalances(true));
  }, []);

  const renderContent = useMemo(() => {
    if (isConnected) {
      if (isFetching || isBalancesFetching) {
        return (
          <div className="flex flex-col items-center justify-center w-full py-20">
            <Spinner className="w-12 h-12" />
          </div>
        );
      }

      if (currencies.length) {
        return (
          <div className="flex flex-col w-full gap-3">
            {currencies.map((currency: Token) => {
              const currentTokenBalance = balances.find((item: Token) => item.denom === currency.denom);
              const [isBurnable, isManageable] = getFTCurrencyOptions(currency);

              return (
                <FungibleTokenRow
                  key={currency.denom}
                  symbol={currency.symbol}
                  subunit={currency.subunit}
                  precision={currency.precision}
                  balance={convertSubunitToUnit({
                    amount: currentTokenBalance?.amount || '0',
                    precision: currency.precision,
                  })}
                  onSendClick={() => handleCurrencySendClick(currency)}
                  onManageClick={() => handleCurrencyManageClick(currency)}
                  onBurnClick={() => handleCurrencyBurnClick(currency)}
                  isBurnable={isBurnable}
                  isManageable={isManageable}
                />
              );
            })}
          </div>
        );
      }

      return (
        <div className="flex flex-col w-full items-center p-10">
          <Image priority={false} src="/images/coins.png" width="200" height="200" alt="coins" />
          <div className="flex items-center gap-2">
            <GeneralIcon type={GeneralIconType.Error} />
            You don&apos;t have any assets!
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col p-10 items-center gap-6">
        <Image priority={false} src="/images/coins.png" width="200" height="200" alt="coins" />
        <div className="text-base font-noto-sans">
          Connect your wallet to view and manage your assets!
        </div>
        <div className="flex items-center">
            <Button
              label="Connect Wallet"
              onClick={handleConnectWalletClick}
              type={ButtonType.Primary}
              iconType={ButtonIconType.Wallet}
              className="text-sm !py-2 px-6 rounded-[10px]"
              iconClassName="w-4"
            />
          </div>
      </div>
    );
  }, [currencies, isConnected, balances, isFetching]);

  return (
    <div className="flex flex-col gap-10">
      <MessageBox>
        <ul className="list-disc text-[#868991] text-sm font-normal ml-5">
          <li>View and manage the Smart Tokens you created.</li>
          <li>There are many ways to get on-chain data. Here we simply query a <Link className="text-[#25D695] underline font-medium" href={`https://full-node.${network}-1.coreum.dev:1317`} target="_blank">public REST server</Link> that exposes different endpoints to query the blockchain.</li>
        </ul>
      </MessageBox>
      {renderContent}
    </div>
  );
};
