import { setBalances } from "@/features/balances/balancesSlice";
import { Token } from "@/shared/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Coin } from "@cosmjs/amino";
import { useBalances } from "graz";
import { useEffect } from "react";

export const useAccountBalances = () => {
  const networkInfo = useAppSelector(state => state.general.currentNetworkInfo);
  const currencies = useAppSelector(state => state.currencies.list);
  const account = useAppSelector(state => state.general.account);
  const isConnected = useAppSelector(state => state.general.isConnected);

  const dispatch = useAppDispatch();

  const { data: balances } = useBalances({
    chainId: networkInfo.chainId,
    bech32Address: account,
  });

  useEffect(() => {
    if (isConnected && balances) {
      const userBalances = balances?.filter((tokenBalance: Coin) =>
        currencies.find((currency: Token) => currency.denom === tokenBalance.denom),
      );

      dispatch(setBalances(userBalances));
    }
  }, [currencies, balances, isConnected]);
};
