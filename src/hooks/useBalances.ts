import { fetchBalancesByAccount, shouldRefetchBalances } from "@/features/balances/balancesSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";

export const useAccountBalances = () => {
  const currencies = useAppSelector(state => state.currencies.list);
  const account = useAppSelector(state => state.general.account);
  const isConnected = useAppSelector(state => state.general.isConnected);
  const shouldRefetch = useAppSelector(state => state.balances.shouldRefetch);
  const network = useAppSelector(state => state.general.network);

  const dispatch = useAppDispatch();

  const isBalancesFetched = useAppSelector(state => state.balances.isFetched);
  const isLoading = useAppSelector(state => state.balances.isLoading);
  const balances = useAppSelector(state => state.balances.list);

  useEffect(() => {
    if (isConnected && account.length && !isLoading && currencies.length && !isBalancesFetched && !balances.length) {
      dispatch(fetchBalancesByAccount({ account, network }));
    }
  }, [account, balances.length, currencies, dispatch, isBalancesFetched, isConnected, isLoading, network]);

  useEffect(() => {
    if (shouldRefetch && !isLoading && account.length) {
      dispatch(fetchBalancesByAccount({ account, network }));
      dispatch(shouldRefetchBalances(false));
    }
  }, [shouldRefetch, isLoading, dispatch, account, network]);
};
