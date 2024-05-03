'use client';

import { useCallback, useMemo, useState } from "react";
import { Modal } from "../Modal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSelectedCurrency } from "@/features/currencies/currenciesSlice";
import { setIsManageCurrencyModalOpen } from "@/features/general/generalSlice";
import { TabItem, TabItemType } from "@/shared/types";
import { MANAGE_FT_TOKENS_TABS } from "@/constants";
import { Tabs } from "../Tabs";
import { MintTokens } from "../MintTokens";
import { FreezeTokens } from "../FreezeTokens";
import { UnfreezeTokens } from "../UnfreezeTokens";
import { WhitelistTokens } from "../WhitelistTokens";

export const ManageTokensModal = () => {
  const [selectedTab, setSelectedTab] = useState<TabItem>(MANAGE_FT_TOKENS_TABS[0]);
  const selectedCurrency = useAppSelector(state => state.currencies.selectedCurrency);
  const isManageCurrencyModalOpen = useAppSelector(state => state.general.isManageCurrencyModalOpen);

  const [mintAmount, setMintAmount] = useState<string>('0');
  const [freezeAmount, setFreezeAmount] = useState<string>('0');
  const [unfreezeAmount, setUnfreezeAmount] = useState<string>('0');
  const [whitelistAmount, setWhitelistAmount] = useState<string>('0');
  const [walletAddress, setWalletAddress] = useState<string>('');

  const dispatch = useAppDispatch();

  const handleCloseConnectWalletModal = useCallback(() => {
    dispatch(setIsManageCurrencyModalOpen(false));
    dispatch(setSelectedCurrency(null));
  }, []);

  const handleSetTab = useCallback((value: TabItem) => {
    setSelectedTab(value);
  }, []);

  const handleMintTokens = useCallback(() => {

  }, []);

  const handleFreezeTokens = useCallback(() => {

  }, []);

  const handleGloballyFreezeTokens = useCallback(() => {

  }, []);

  const handleUnfreezeTokens = useCallback(() => {

  }, []);

  const handleGloballyUnfreezeTokens = useCallback(() => {

  }, []);

  const handleWhitelistTokens = useCallback(() => {

  }, []);


  const renderTitle = useMemo(() => {
    return (
      <Tabs
        selectedTab={selectedTab}
        items={MANAGE_FT_TOKENS_TABS}
        handleSelectTab={handleSetTab}
      />
    );
  }, [selectedTab]);

  const renderContent = useMemo(() => {
    switch (selectedTab.id) {
      case TabItemType.Mint:
        return (
          <MintTokens
            selectedCurrency={selectedCurrency}
            mintAmount={mintAmount}
            setMintAmount={setMintAmount}
            handleMintTokens={handleMintTokens}
          />
        );
      case TabItemType.Freeze:
        return (
          <FreezeTokens
            selectedCurrency={selectedCurrency}
            freezeAmount={freezeAmount}
            setFreezeAmount={setFreezeAmount}
            walletAddress={walletAddress}
            setWalletAddress={setWalletAddress}
            handleGloballyFreezeTokens={handleGloballyFreezeTokens}
            handleFreezeTokens={handleFreezeTokens}
          />
        );
      case TabItemType.Unfreeze:
        return (
          <UnfreezeTokens
            selectedCurrency={selectedCurrency}
            unfreezeAmount={unfreezeAmount}
            setUnfreezeAmount={setUnfreezeAmount}
            walletAddress={walletAddress}
            setWalletAddress={setWalletAddress}
            handleGloballyUnfreezeTokens={handleGloballyUnfreezeTokens}
            handleUnfreezeTokens={handleUnfreezeTokens}
          />
        );
      case TabItemType.Whitelist:
        return (
          <WhitelistTokens
            selectedCurrency={selectedCurrency}
            whitelistAmount={whitelistAmount}
            setWhitelistAmount={setWhitelistAmount}
            walletAddress={walletAddress}
            setWalletAddress={setWalletAddress}
            handleWhitelistTokens={handleWhitelistTokens}
          />
        );
      default:
    }
  }, [
    freezeAmount,
    mintAmount,
    selectedCurrency,
    selectedTab,
    unfreezeAmount,
    walletAddress,
    whitelistAmount,
  ]);

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
