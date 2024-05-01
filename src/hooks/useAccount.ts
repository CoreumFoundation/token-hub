import { setAccount, setIsConnected } from "@/features/general/generalSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useAccount } from "graz";
import { useEffect } from "react";

export const useConnectedAccount = () => {
  const networkInfo = useAppSelector(state => state.general.currentNetworkInfo);
  const { data, isConnected } = useAccount({
    chainId: networkInfo.chainId,
  });
  const dispatch = useAppDispatch();
  const account = useAppSelector(state => state.general.account);
  const isAccountConnected = useAppSelector(state => state.general.isConnected);

  useEffect(() => {
    if (data?.bech32Address && account !== data?.bech32Address) {
      dispatch(setAccount(data?.bech32Address));
    }
  }, [account, data?.bech32Address]);

  useEffect(() => {
    if (isConnected !== isAccountConnected) {
      dispatch(setIsConnected(isConnected));
    }
  }, [isAccountConnected, isConnected]);
};
