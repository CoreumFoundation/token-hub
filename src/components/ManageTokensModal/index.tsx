'use client';

import { useCallback, useMemo, useState } from "react";
import { Modal } from "../Modal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSelectedCurrency } from "@/features/currencies/currenciesSlice";
import { setIsBurnCurrencyModalOpen, setIsManageCurrencyModalOpen } from "@/features/general/generalSlice";
import { ButtonType, GeneralIconType, TabItem, TabItemType } from "@/shared/types";
import { MANAGE_FT_TOKENS_TABS } from "@/constants";
import { Tabs } from "../Tabs";
import { Input } from "../Input";
import { GeneralIcon } from "@/assets/GeneralIcon";
import { Button } from "../Button";

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

  const renderMintBody = useMemo(() => {
    return (
      <div className="flex flex-col w-full gap-8">
        <Input
          label="Mint Amount"
          value={mintAmount}
          onChange={setMintAmount}
          placeholder="0"
          type="number"
          buttonLabel={(
            <div className="flex items-center gap-1.5 text-[#EEE]">
              <GeneralIcon type={GeneralIconType.DefaultToken} />
              {selectedCurrency?.symbol.toUpperCase()}
            </div>
          )}
          warning="The minted tokens will be transferred to the issuer address"
        />
        <div className="flex w-full justify-end">
          <div className="flex items-center">
            <Button
              label="Continue"
              onClick={handleMintTokens}
              type={ButtonType.Primary}
              className="text-sm !py-2 px-6 rounded-[10px] font-semibold w-[160px]"
            />
          </div>
        </div>
      </div>
    );
  }, [mintAmount, selectedCurrency]);

  const renderFreezeBody = useMemo(() => {
    return (
      <div className="flex flex-col w-full gap-8">
        <Input
          label="Account Address"
          value={walletAddress}
          onChange={setWalletAddress}
          placeholder="Enter wallet address"
          buttonLabel="Paste"
        />
        <Input
          label="Freeze Amount"
          value={freezeAmount}
          onChange={setFreezeAmount}
          placeholder="0"
          type="number"
          buttonLabel={(
            <div className="flex items-center gap-1.5 text-[#EEE]">
              <GeneralIcon type={GeneralIconType.DefaultToken} />
              {selectedCurrency?.symbol.toUpperCase()}
            </div>
          )}
          warning={`The target account will have this amount of ${selectedCurrency?.symbol.toUpperCase()} frozen and won't be able to transfer it.`}
        />
        <div className="flex w-full justify-between gap-4">
          <Button
            label="Globally Freeze"
            onClick={handleGloballyFreezeTokens}
            type={ButtonType.Secondary}
            className="text-sm !py-2 px-6 rounded-[10px] font-semibold w-[160px]"
          />
          <Button
            label="Continue"
            onClick={handleFreezeTokens}
            type={ButtonType.Primary}
            className="text-sm !py-2 px-6 rounded-[10px] font-semibold w-[160px]"
          />
        </div>
      </div>
    );
  }, [freezeAmount, selectedCurrency, walletAddress]);

  const renderUnfreezeBody = useMemo(() => {
    return (
      <div className="flex flex-col w-full gap-8">
        <Input
          label="Account Address"
          value={walletAddress}
          onChange={setWalletAddress}
          placeholder="Enter wallet address"
          buttonLabel="Paste"
        />
        <Input
          label="Unfreeze Amount"
          value={unfreezeAmount}
          onChange={setUnfreezeAmount}
          placeholder="0"
          type="number"
          buttonLabel={(
            <div className="flex items-center gap-1.5 text-[#EEE]">
              <GeneralIcon type={GeneralIconType.DefaultToken} />
              {selectedCurrency?.symbol.toUpperCase()}
            </div>
          )}
          warning={`The target account will have this amount of ${selectedCurrency?.symbol.toUpperCase()} unfrozen and will be able to transfer it.`}
        />
        <div className="flex w-full justify-between gap-4">
          <Button
            label="Globally Unreeze"
            onClick={handleGloballyUnfreezeTokens}
            type={ButtonType.Secondary}
            className="text-sm !py-2 px-6 rounded-[10px] font-semibold w-[160px]"
          />
          <Button
            label="Continue"
            onClick={handleUnfreezeTokens}
            type={ButtonType.Primary}
            className="text-sm !py-2 px-6 rounded-[10px] font-semibold w-[160px]"
          />
        </div>
      </div>
    );
  }, [selectedCurrency, unfreezeAmount, walletAddress]);

  const renderWhitelistBody = useMemo(() => {
    return (
      <div className="flex flex-col w-full gap-8">
        <Input
          label="Account Address"
          value={walletAddress}
          onChange={setWalletAddress}
          placeholder="Enter wallet address"
          buttonLabel="Paste"
        />
        <Input
          label="Whitelist Amount"
          value={whitelistAmount}
          onChange={setWhitelistAmount}
          placeholder="0"
          type="number"
          buttonLabel={(
            <div className="flex items-center gap-1.5 text-[#EEE]">
              <GeneralIcon type={GeneralIconType.DefaultToken} />
              {selectedCurrency?.symbol.toUpperCase()}
            </div>
          )}
          warning={`The target account will be able to hold up to this amount of ${selectedCurrency?.symbol.toUpperCase()}`}
        />
        <div className="flex w-full justify-end">
          <div className="flex items-center">
            <Button
              label="Continue"
              onClick={handleWhitelistTokens}
              type={ButtonType.Primary}
              className="text-sm !py-2 px-6 rounded-[10px] font-semibold w-[160px]"
            />
          </div>
        </div>
      </div>
    );
  }, [selectedCurrency, walletAddress, whitelistAmount]);

  const renderContent = useMemo(() => {
    switch (selectedTab.id) {
      case TabItemType.Mint:
        return renderMintBody;
      case TabItemType.Freeze:
        return renderFreezeBody;
      case TabItemType.Unfreeze:
        return renderUnfreezeBody;
      case TabItemType.Whitelist:
        return renderWhitelistBody;
      default:

    }
  }, [renderFreezeBody, renderMintBody, renderUnfreezeBody, renderWhitelistBody, selectedTab.id]);

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
