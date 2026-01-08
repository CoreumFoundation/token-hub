'use client';

import { useCallback, useEffect, useMemo, useState } from "react";
import { Modal } from "../Modal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSelectedCurrency } from "@/features/currencies/currenciesSlice";
import { setIsConfirmClawbackModalOpen, setIsConfirmFreezeModalOpen, setIsConfirmGlobalFreezeModalOpen, setIsConfirmGlobalUnfreezeModalOpen, setIsConfirmMintModalOpen, setIsConfirmUnfreezeModalOpen, setIsConfirmUpdateDexUnifiedRefAmountOpen, setIsConfirmUpdateDexWhitelistedDenomsOpen, setIsConfirmWhitelistModalOpen, setIsManageCurrencyModalOpen } from "@/features/general/generalSlice";
import { ChainInfo, TabItem, TabItemType } from "@/shared/types";
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
import { ClawbackTokens } from "../ClawbackTokens";
import { setClawbackAmount, setClawbackWalletAddress } from "@/features/clawback/clawbackSlice";
import { AssetFTManageRow } from "../AssetFTManageRow";
import { DEXUnifiedRefAmountChangeAction } from "../DEXUnifiedRefAmountChangeAction";
import { setDexRefAmount, setDexWhitelistedDenoms } from "@/features/dex/dexSlice";
import { DEXUpdateWhitelistedDenomsAction } from "../DEXUpdateWhitelistedDenomsAction";

export const ManageTokensModal = () => {
  const selectedCurrency = useAppSelector(state => state.currencies.selectedCurrency);
  const manageFtTokensTabs = getManageFTTabs(selectedCurrency);
  const chains = useAppSelector(state => state.chains.list);

  const coreumChain = useMemo(() => {
    return chains.find((chain: ChainInfo) => chain.prettyName?.toLowerCase() === 'coreum');
  }, [chains]);

  const [selectedTab, setSelectedTab] = useState<TabItem | null>(null);

  const isManageCurrencyModalOpen = useAppSelector(state => state.general.isManageCurrencyModalOpen);

  const [amount, setAmount] = useState<string>('');
  const [walletAddress, setWalletAddress] = useState<string>('');

  const handleClearState = useCallback(() => {
    setAmount('');
    setWalletAddress('');
    setSelectedTab(null);
  }, []);

  const dispatch = useAppDispatch();

  const handleCloseModal = useCallback(() => {
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
    handleClearState();
  }, [amount]);

  const handleFreezeTokens = useCallback(() => {
    dispatch(setFreezeAmount(amount));
    dispatch(setFreezeWalletAddress(walletAddress));
    dispatch(setIsManageCurrencyModalOpen(false));
    dispatch(setIsConfirmFreezeModalOpen(true));
    handleClearState();
  }, [amount, walletAddress]);

  const handleGloballyFreezeTokens = useCallback(() => {
    dispatch(setIsManageCurrencyModalOpen(false));
    dispatch(setIsConfirmGlobalFreezeModalOpen(true));
    handleClearState();
  }, [amount]);

  const handleUnfreezeTokens = useCallback(() => {
    dispatch(setUnfreezeAmount(amount));
    dispatch(setUnfreezeWalletAddress(walletAddress));
    dispatch(setIsManageCurrencyModalOpen(false));
    dispatch(setIsConfirmUnfreezeModalOpen(true));
    handleClearState();
  }, [amount, walletAddress]);

  const handleGloballyUnfreezeTokens = useCallback(() => {
    dispatch(setIsManageCurrencyModalOpen(false));
    dispatch(setIsConfirmGlobalUnfreezeModalOpen(true));
    handleClearState();
  }, [amount]);

  const handleWhitelistTokens = useCallback(() => {
    dispatch(setWhitelistAmount(amount));
    dispatch(setWhitelistWalletAddress(walletAddress));
    dispatch(setIsManageCurrencyModalOpen(false));
    dispatch(setIsConfirmWhitelistModalOpen(true));
    handleClearState();
  }, [amount, walletAddress]);

  const handleClawbackTokens = useCallback(() => {
    dispatch(setClawbackAmount(amount));
    dispatch(setClawbackWalletAddress(walletAddress));
    dispatch(setIsManageCurrencyModalOpen(false));
    dispatch(setIsConfirmClawbackModalOpen(true));
    handleClearState();
  }, [amount, walletAddress]);

  const handleUpdateDexUnifiedRefAmount = useCallback(() => {
    dispatch(setDexRefAmount(amount));
    dispatch(setIsManageCurrencyModalOpen(false));
    dispatch(setIsConfirmUpdateDexUnifiedRefAmountOpen(true));
    handleClearState();
  }, [amount]);

  const handleUpdateDexWhitelistedDenoms = useCallback(() => {
    dispatch(setIsManageCurrencyModalOpen(false));
    dispatch(setIsConfirmUpdateDexWhitelistedDenomsOpen(true));
    handleClearState();
  }, []);

  const handleBackClick = useCallback(() => {
    setSelectedTab(null);
    setAmount('');
    setWalletAddress('');
  }, []);

  const renderAvailableActions = useMemo(() => {
    return (
      <div className="flex flex-col w-full gap-2">
        {manageFtTokensTabs.map((item: TabItem) =>
          <AssetFTManageRow key={item.id} id={item.id} label={item.label} onClick={() => handleSetTab(item)} />
        )}
      </div>
    );
  }, [handleSetTab, manageFtTokensTabs]);

  const renderTitle = useMemo(() => {
    if (!manageFtTokensTabs.length) {
      return null;
    }

    if (selectedTab) {
      return (
        <div className="flex flex-col">
          <p className="text-[#EEE] font-space-grotesk text-[18px] font-medium leading-[27px] tracking-[-0.27px]">
            {selectedTab.label}
          </p>
        </div>
      );
    }

    return (
      <div className="flex flex-col">
        <p className="text-[#EEE] font-space-grotesk text-[18px] font-medium leading-[27px] tracking-[-0.27px]">
          Select an option
        </p>
      </div>
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

    if (validatedWalletAddress.prefix !== coreumChain?.bech32Prefix) {
      return `Prefix of wallet address is not matched with ${coreumChain?.bech32Prefix}!`;
    }

    return '';
  }, [coreumChain?.bech32Prefix, walletAddress]);

  const renderCurrentAction = useMemo(() => {
    switch (selectedTab?.id) {
      case TabItemType.Mint:
        return (
          <MintTokens
            selectedCurrency={selectedCurrency}
            mintAmount={amount}
            setMintAmount={setAmount}
            handleMintTokens={handleMintTokens}
            handleBackClick={handleBackClick}
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
            handleBackClick={handleBackClick}
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
            handleBackClick={handleBackClick}
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
            handleBackClick={handleBackClick}
          />
        );
      case TabItemType.Clawback:
        return (
          <ClawbackTokens
            selectedCurrency={selectedCurrency}
            clawbackAmount={amount}
            setClawbackAmount={setAmount}
            walletAddress={walletAddress}
            setWalletAddress={setWalletAddress}
            handleClawbackTokens={handleClawbackTokens}
            walletAddressValidationError={walletAddressValidationError}
            handleBackClick={handleBackClick}
          />
        );
      case TabItemType.DEXUnifiedRefAmountChange:
        return (
          <DEXUnifiedRefAmountChangeAction
            refAmount={amount}
            setRefAmount={setAmount}
            handleUpdateDexUnifiedRefAmount={handleUpdateDexUnifiedRefAmount}
            handleBackClick={handleBackClick}
          />
        );
      case TabItemType.DEXWhitelistedDenoms:
        return (
          <DEXUpdateWhitelistedDenomsAction
            handleUpdateDexWhitelistedDenoms={handleUpdateDexWhitelistedDenoms}
            handleBackClick={handleBackClick}
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
      onClose={handleCloseModal}
      wrapperClassName="w-[480px]"
      headerClassName="!text-base"
    >
      {selectedTab ? renderCurrentAction : renderAvailableActions}
    </Modal>
  );
};
