import { fetchCurrenciesByAccount } from "@/features/currencies/currenciesSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";

export const useCurrencies = () => {
  const network = useAppSelector(state => state.general.network);
  const account = useAppSelector(state => state.general.account);
  const isConnected = useAppSelector(state => state.general.isConnected);
  const currencies = useAppSelector(state => state.currencies.list);
  const isFetched = useAppSelector(state => state.currencies.isFetched);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isFetched && account) {
      dispatch(fetchCurrenciesByAccount({ account, network }));
    }
  }, [account, currencies.length, dispatch, isConnected, isFetched, network]);

  useEffect(() => {
    if (account) {
      dispatch(fetchCurrenciesByAccount({ account, network }));
    }
  }, [network, account]);
};
