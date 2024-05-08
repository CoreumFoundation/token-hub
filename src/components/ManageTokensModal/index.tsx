'use client';

import { useCallback, useEffect, useMemo, useState } from "react";
import { Modal } from "../Modal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSelectedCurrency } from "@/features/currencies/currenciesSlice";
import { setIsConfirmFreezeModalOpen, setIsConfirmGlobalFreezeModalOpen, setIsConfirmGlobalUnfreezeModalOpen, setIsConfirmMintModalOpen, setIsConfirmUnfreezeModalOpen, setIsConfirmWhitelistModalOpen, setIsManageCurrencyModalOpen } from "@/features/general/generalSlice";
import { ChainInfo, TabItem, TabItemType } from "@/shared/types";
import { MANAGE_FT_TOKENS_TABS } from "@/constants";
import { Tabs } from "../Tabs";
import { MintTokens } from "../MintTokens";
import { FreezeTokens } from "../FreezeTokens";
import { UnfreezeTokens } from "../UnfreezeTokens";
import { WhitelistTokens } from "../WhitelistTokens";
import { setMintAmount } from "@/features/mint/mintSlice";
import { setFreezeAmount, setFreezeWalletAddress } from "@/features/freeze/freezeSlice";
import { setUnfreezeAmount, setUnfreezeWalletAddress } from "@/features/unfreeze/unfreezeSlice";
import { setWhitelistAmount, setWhitelistWalletAddress } from "@/features/whitelist/whitelistSlice";
import { getManageFTTabs } from "@/helpers/getManageFtTabs";
import { validateAddress } from "@/helpers/validateAddress";

export const ManageTokensModal = () => {
  const selectedCurrency = useAppSelector(state => state.currencies.selectedCurrency);
  const manageFtTokensTabs = getManageFTTabs(selectedCurrency);

  const chains = useAppSelector(state => state.chains.list);

  const coreumChain = useMemo(() => {
    return chains.find((chain: ChainInfo) => chain.pretty_name.toLowerCase() === 'coreum');
  }, [chains]);

  const [selectedTab, setSelectedTab] = useState<TabItem | null>(manageFtTokensTabs?.[0] || null);

  useEffect(() => {
    if (manageFtTokensTabs.length && !selectedTab) {
      handleSetTab(manageFtTokensTabs[0]);
    }
  }, [manageFtTokensTabs, selectedTab]);

  const isManageCurrencyModalOpen = useAppSelector(state => state.general.isManageCurrencyModalOpen);

  const [amount, setAmount] = useState<string>('');
  const [walletAddress, setWalletAddress] = useState<string>('');

  const dispatch = useAppDispatch();

  const handleCloseConnectWalletModal = useCallback(() => {
    dispatch(setIsManageCurrencyModalOpen(false));
    dispatch(setSelectedCurrency(null));
    setSelectedTab(null);
  }, []);

  const handleSetTab = useCallback((value: TabItem) => {
    setSelectedTab(value);
    setAmount('');
    setWalletAddress('');
  }, []);

  const handleMintTokens = useCallback(() => {
    dispatch(setMintAmount(amount));
    dispatch(setIsManageCurrencyModalOpen(false));
    dispatch(setIsConfirmMintModalOpen(true));
  }, [amount]);

  const handleFreezeTokens = useCallback(() => {
    dispatch(setFreezeAmount(amount));
    dispatch(setFreezeWalletAddress(walletAddress));
    dispatch(setIsManageCurrencyModalOpen(false));
    dispatch(setIsConfirmFreezeModalOpen(true));
  }, [amount, walletAddress]);

  const handleGloballyFreezeTokens = useCallback(() => {
    dispatch(setIsManageCurrencyModalOpen(false));
    dispatch(setIsConfirmGlobalFreezeModalOpen(true));
  }, [amount]);

  const handleUnfreezeTokens = useCallback(() => {
    dispatch(setUnfreezeAmount(amount));
    dispatch(setUnfreezeWalletAddress(walletAddress));
    dispatch(setIsManageCurrencyModalOpen(false));
    dispatch(setIsConfirmUnfreezeModalOpen(true));
  }, [amount, walletAddress]);

  const handleGloballyUnfreezeTokens = useCallback(() => {
    dispatch(setIsManageCurrencyModalOpen(false));
    dispatch(setIsConfirmGlobalUnfreezeModalOpen(true));
  }, [amount]);

  const handleWhitelistTokens = useCallback(() => {
    dispatch(setWhitelistAmount(amount));
    dispatch(setWhitelistWalletAddress(walletAddress));
    dispatch(setIsManageCurrencyModalOpen(false));
    dispatch(setIsConfirmWhitelistModalOpen(true));
  }, [amount, walletAddress]);

  const renderTitle = useMemo(() => {
    if (!manageFtTokensTabs.length) {
      return null;
    }

    return (
      <Tabs
        selectedTab={selectedTab}
        items={manageFtTokensTabs}
        handleSelectTab={handleSetTab}
      />
    );
  }, [selectedTab, manageFtTokensTabs]);

  const walletAddressValidationError = useMemo(() => {
    if (!walletAddress.length) {
      return '';
    }

    const validatedWalletAddress = validateAddress(walletAddress);

    if (!validatedWalletAddress.result) {
      return 'Wallet address is invalid. Please double check entered value!';
    }

    if (validatedWalletAddress.prefix !== coreumChain?.bech32_prefix) {
      return `Prefix of wallet address is not matched with ${coreumChain?.bech32_prefix}!`;
    }

    return '';
  }, [coreumChain?.bech32_prefix, walletAddress]);

  const renderContent = useMemo(() => {
    switch (selectedTab?.id) {
      case TabItemType.Mint:
        return (
          <MintTokens
            selectedCurrency={selectedCurrency}
            mintAmount={amount}
            setMintAmount={setAmount}
            handleMintTokens={handleMintTokens}
          />
        );
      case TabItemType.Freeze:
        return (
          <FreezeTokens
            selectedCurrency={selectedCurrency}
            freezeAmount={amount}
            setFreezeAmount={setAmount}
            walletAddress={walletAddress}
            setWalletAddress={setWalletAddress}
            handleGloballyFreezeTokens={handleGloballyFreezeTokens}
            handleFreezeTokens={handleFreezeTokens}
            walletAddressValidationError={walletAddressValidationError}
          />
        );
      case TabItemType.Unfreeze:
        return (
          <UnfreezeTokens
            selectedCurrency={selectedCurrency}
            unfreezeAmount={amount}
            setUnfreezeAmount={setAmount}
            walletAddress={walletAddress}
            setWalletAddress={setWalletAddress}
            handleGloballyUnfreezeTokens={handleGloballyUnfreezeTokens}
            handleUnfreezeTokens={handleUnfreezeTokens}
            walletAddressValidationError={walletAddressValidationError}
          />
        );
      case TabItemType.Whitelist:
        return (
          <WhitelistTokens
            selectedCurrency={selectedCurrency}
            whitelistAmount={amount}
            setWhitelistAmount={setAmount}
            walletAddress={walletAddress}
            setWalletAddress={setWalletAddress}
            handleWhitelistTokens={handleWhitelistTokens}
            walletAddressValidationError={walletAddressValidationError}
          />
        );
      default:
    }
  }, [amount, selectedCurrency, selectedTab, walletAddress, walletAddressValidationError]);

  if (!manageFtTokensTabs.length) {
    return null;
  }

  return (
    <Modal
      isOpen={isManageCurrencyModalOpen}
      title={renderTitle}
      onClose={handleCloseConnectWalletModal}
      wrapperClassName="w-[480px] pt-4"
      headerClassName="!text-base"
    >
      {renderContent}
    </Modal>
  );
};
