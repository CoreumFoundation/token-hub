'use client';

import { FC, useCallback } from "react";
import { Modal } from "../Modal";
import { WalletOption, WalletType } from "@/shared/types";
import { WalletItem } from "../WalletItem";
import { CONNECT_WALLET_OPTIONS } from "@/constants";

interface ConnectWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConnectWalletModal: FC<ConnectWalletModalProps> = ({
  isOpen,
  onClose,
}) => {
  const handleWalletClick = useCallback((type: WalletType) => {
    console.log({ type });
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      title="Connect Coreum Wallet"
      onClose={onClose}
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
