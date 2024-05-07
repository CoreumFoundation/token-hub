import { COREUM_TOKEN_MAINNET, COREUM_TOKEN_TESTNET } from "@/constants";
import { setBalances } from "@/features/balances/balancesSlice";
import { setCurrencies } from "@/features/currencies/currenciesSlice";
import { setAccount, setIsConnected } from "@/features/general/generalSlice";
import { Network } from "@/shared/types";
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
      dispatch(setCurrencies(network === Network.Testnet ? [COREUM_TOKEN_TESTNET] : [COREUM_TOKEN_MAINNET]));
    }
  }, [network]);
};
