import { setBalances, shouldRefetchBalances } from "@/features/balances/balancesSlice";
import { setCurrencies, setIsFetched, shouldRefetchCurrencies } from "@/features/currencies/currenciesSlice";
import { setAccount, setIsConnected } from "@/features/general/generalSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";

export const useCurrentNetwork = () => {
  const network = useAppSelector(state => state.general.network);
  const isConnected = useAppSelector(state => state.general.isConnected);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isConnected) {
      dispatch(setAccount(''));
      dispatch(setIsConnected(false));
      dispatch(setBalances([]));
      dispatch(setCurrencies([]));
      dispatch(setIsFetched(false));
    }
  }, [network]);
};
