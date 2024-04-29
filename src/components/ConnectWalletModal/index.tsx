'use client';

import { FC, useCallback } from "react";
import { Modal } from "../Modal";
import { WalletOption, WalletType } from "@/shared/types";
import { WalletItem } from "../WalletItem";
import { CONNECT_WALLET_OPTIONS } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsConnectModalOpen } from "@/features/general/generalSlice";

export const ConnectWalletModal = () => {
  const isConnectWalletModalOpen = useAppSelector(state => state.general.isConnectModalOpen);

  const dispatch = useAppDispatch();

  const handleCloseConnectWalletModal = useCallback(() => {
    dispatch(setIsConnectModalOpen(false));
  }, []);

  const handleWalletClick = useCallback((type: WalletType) => {
    console.log({ type });
  }, []);

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
