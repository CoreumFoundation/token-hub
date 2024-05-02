'use client';

import { MessageBox } from "@/components/MessageBox";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback, useMemo } from "react";
import { setIsConnectModalOpen } from "@/features/general/generalSlice";
import { ButtonType, ButtonIconType, Token, GeneralIconType } from "@/shared/types";
import { GeneralIcon } from "@/assets/GeneralIcon";
import { FungibleTokenRow } from "@/components/FungibleTokenRow";
import { Coin } from "@cosmjs/amino";
import { convertSubunitToUnit } from "@/helpers/convertUnitToSubunit";

export const FungibleTokenManage = () => {
  const currencies = useAppSelector(state => state.currencies.issuedList);
  const isFetching = useAppSelector(state => state.currencies.isLoading);
  const isConnected = useAppSelector(state => state.general.isConnected);
  const balances = useAppSelector(state => state.balances.list);

  const dispatch = useAppDispatch();

  const handleConnectWalletClick = useCallback(() => {
    dispatch(setIsConnectModalOpen(true));
  }, []);

  const renderContent = useMemo(() => {
    if (isConnected) {
      if (currencies.length) {
        return (
          <div className="flex flex-col w-full gap-3">
            {currencies.map((currency: Token) => {
              const currentTokenBalance = balances.find((item: Coin) => item.denom === currency.denom);

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
                />
              );
            })}
          </div>
        );
      }

      return (
        <div className="flex flex-col w-full items-center p-10">
          <Image src="/images/coins.svg" width="200" height="200" alt="coins" />
          <div className="flex items-center gap-2">
            <GeneralIcon type={GeneralIconType.Error} />
            You don&apos;t have any asset!
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col p-10 items-center gap-6">
        <Image src="/images/coins.svg" width="200" height="200" alt="coins" />
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
  }, [currencies, isConnected, balances]);

  return (
    <div className="flex flex-col gap-10">
      <MessageBox>
        <ul className="list-disc text-[#868991] text-sm font-normal ml-5">
          <li>View and manage the Smart Tokens you created or own.</li>
          <li>There are many ways to get on-chain data. Here we simply query a <Link className="text-[#25D695] underline font-medium" href="/">public REST server</Link> that expose different endpoints to query the blockchain.</li>
        </ul>
      </MessageBox>
      {renderContent}
    </div>
  );
};
