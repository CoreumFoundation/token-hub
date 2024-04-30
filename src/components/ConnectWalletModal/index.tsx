'use client';

import { useCallback } from "react";
import { Modal } from "../Modal";
import { WalletOption, WalletType } from "@/shared/types";
import { WalletItem } from "../WalletItem";
import { CONNECT_WALLET_OPTIONS } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsConnectModalOpen } from "@/features/general/generalSlice";
import { WalletType as GrazWalletType, useDisconnect, useSuggestChainAndConnect } from "graz";

export const ConnectWalletModal = () => {
  const { suggestAndConnectAsync } = useSuggestChainAndConnect();
  const { disconnectAsync } = useDisconnect();
  const currentNetworkInfo = useAppSelector(state => state.general.currentNetworkInfo);
  const isConnectWalletModalOpen = useAppSelector(state => state.general.isConnectModalOpen);

  const dispatch = useAppDispatch();

  const handleCloseConnectWalletModal = useCallback(() => {
    dispatch(setIsConnectModalOpen(false));
  }, []);

  const handleWalletClick = useCallback(async (type: WalletType) => {
    try {
      await disconnectAsync();
      await suggestAndConnectAsync({
        chainInfo: currentNetworkInfo,
        walletType: type as unknown as GrazWalletType,
      });
      dispatch(setIsConnectModalOpen(false));
    } catch (error) {
      console.log(error);
    }
  }, [currentNetworkInfo, disconnectAsync, dispatch, suggestAndConnectAsync]);

  return (
    <Modal
      isOpen={isConnectWalletModalOpen}
      title="Connect Wallet"
      onClose={handleCloseConnectWalletModal}
      wrapperClassName="w-[480px]"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CONNECT_WALLET_OPTIONS.map((walletOption: WalletOption) => {
          return (
            <WalletItem
              key={walletOption.type}
              type={walletOption.type}
              label={walletOption.label}
              onClick={handleWalletClick}
            />
          );
        })}
      </div>
    </Modal>
  );
};
