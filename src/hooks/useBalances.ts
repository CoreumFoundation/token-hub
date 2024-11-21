import { setBalances, shouldRefetchBalances } from "@/features/balances/balancesSlice";
import { fetchSecondaryCurrenciesInfo } from "@/features/currencies/currenciesSlice";
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
  const shouldRefetch = useAppSelector(state => state.balances.shouldRefetch);
  const network = useAppSelector(state => state.general.network);
  const balancesRedux = useAppSelector(state => state.currencies.secondaryList);
  const isCurrenciesLoading = useAppSelector(state => state.currencies.isLoading);

  const dispatch = useAppDispatch();

  const { data: balances, refetch, isLoading } = useBalances({
    chainId: networkInfo.chainId,
    bech32Address: account,
  });

  useEffect(() => {
    if (isConnected) {
      if (balances && !isCurrenciesLoading && !balancesRedux.length) {
        const userIssuedBalances: any[] = [];
        const userOtherBalances: Coin[] = [];
        balances.forEach((token: Coin) => {
          const isIssued = currencies.find((currency: Token) => currency.denom === token.denom);

          if (isIssued) {
            userIssuedBalances.push({
              ...isIssued,
              amount: token.amount,
            });
          } else {
            userOtherBalances.push(token);
          }
        });

        dispatch(setBalances(userIssuedBalances));
        dispatch(fetchSecondaryCurrenciesInfo({ network, currencies: userOtherBalances }));
      }
    } else {
      dispatch(setBalances([]));
    }
  }, [
    currencies,
    balances,
    isConnected,
    network,
    isCurrenciesLoading,
    balancesRedux.length,
  ]);

  useEffect(() => {
    if (shouldRefetch && !isLoading) {
      refetch();
      dispatch(shouldRefetchBalances(false));
    }
  }, [shouldRefetch, refetch, isLoading]);
};
