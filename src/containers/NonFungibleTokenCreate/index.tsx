'use client';

import { GeneralIcon } from "@/assets/GeneralIcon";
import { Button } from "@/components/Button";
import { ExpandedList } from "@/components/ExpandedList";
import { Input } from "@/components/Input";
import { MessageBox } from "@/components/MessageBox";
import { TextArea } from "@/components/TextArea";
import { TokenCapability } from "@/components/TokenCapability";
import { CID_REGEX, IPFS_REGEX, NFT_TOKEN_CAPABILITIES, SYMBOL_NFT_REGEX, URL_REGEX } from "@/constants";
import { dispatchAlert } from "@/features/alerts/alertsSlice";
import { shouldRefetchBalances } from "@/features/balances/balancesSlice";
import { setIsConnectModalOpen, setIsSuccessIssueNFTModalOpen, setIsTxExecuting } from "@/features/general/generalSlice";
import { setIssuedNFTCollection, setShouldFetchNFTCollections } from "@/features/nft/nftSlice";
import { useEstimateTxGasFee } from "@/hooks/useEstimateTxGasFee";
import { AlertType, ButtonIconType, ButtonType, ExpandedListElem, GeneralIconType, TokenCapabilityItem, TokenCapabilityType } from "@/shared/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Big from "big.js";
import { ClassFeature, NFT, parseFloatToRoyaltyRate } from "coreum-js";
import Link from "next/link";
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";

export const NonFungibleTokenCreate = () => {
  const [symbol, setSymbol] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [uri, setUri] = useState<string>('');
  const [uriHash, setUriHash] = useState<string>('');
  const [royalties, setRoyalties] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const [burningEnabled, setBurningEnabled] = useState<boolean>(false);
  const [freezingEnabled, setFreezingEnabled] = useState<boolean>(false);
  const [whitelistingEnabled, setWhitelistingEnabled] = useState<boolean>(false);
  const [disableSendingEnabled, setDisableSendingEnabled] = useState<boolean>(false);
  const [soulboundEnabled, setSoulboundEnabled] = useState<boolean>(false);

  const isConnected = useAppSelector(state => state.general.isConnected);
  const account = useAppSelector(state => state.general.account);
  const isTxExecuting = useAppSelector(state => state.general.isTxExecuting);

  const dispatch = useAppDispatch();
  const { signingClient, getTxFee } = useEstimateTxGasFee();

  const handleConnectWalletClick = useCallback(() => {
    dispatch(setIsConnectModalOpen(true));
  }, []);

  const handleClearState = useCallback(() => {
    setSymbol('');
    setName('');
    setUri('');
    setRoyalties('');
    setUriHash('');
    setDescription('');
    setBurningEnabled(false);
    setFreezingEnabled(false);
    setWhitelistingEnabled(false);
    setDisableSendingEnabled(false);
    setSoulboundEnabled(false);
  }, []);

  useEffect(() => {
    if (!isConnected) {
      handleClearState();
    }
  }, [isConnected]);

  const getTokenStateItem = useCallback((type: TokenCapabilityType): [boolean, Dispatch<SetStateAction<boolean>>] | [] => {
    switch (type) {
      case TokenCapabilityType.Burn:
        return [burningEnabled, setBurningEnabled];
      case TokenCapabilityType.Freeze:
        return [freezingEnabled, setFreezingEnabled];
      case TokenCapabilityType.Whitelist:
        return [whitelistingEnabled, setWhitelistingEnabled];
      case TokenCapabilityType.DisableSend:
        return [disableSendingEnabled, setDisableSendingEnabled];
      case TokenCapabilityType.Soulbound:
        return [soulboundEnabled, setSoulboundEnabled];
      default:
        return [];
    }
  }, [burningEnabled, disableSendingEnabled, freezingEnabled, soulboundEnabled, whitelistingEnabled]);

  const tokenCapabilities: ExpandedListElem[] = useMemo(() => {
    return NFT_TOKEN_CAPABILITIES.map((tokenCapability: TokenCapabilityItem) => {
      const [enabled, setEnabled] = getTokenStateItem(tokenCapability.type);

      return {
        id: tokenCapability.type,
        content: (
          <TokenCapability
            {...tokenCapability}
            enabled={enabled || false}
            setEnabled={setEnabled ? setEnabled : () => {}}
          />
        ),
      };
    });
  }, [getTokenStateItem]);

  const isEnteredNameValid = useMemo(() => {
    if (!name.length) {
      return '';
    }

    if (name.length > 128) {
      return 'Max length of NFT Collection Name is 128';
    }

    return '';
  }, [name]);

  const isEnteredSymbolValid = useMemo(() => {
    if (!symbol.length) {
      return '';
    }

    if (SYMBOL_NFT_REGEX.test(symbol)) {
      return '';
    }

    return `Symbol must match regex format: ${SYMBOL_NFT_REGEX}`;
  }, [symbol]);

  const isRoyaltiesValid = useMemo(() => {
    if (!royalties.length) {
      return '';
    }

    if (Big(royalties).lt(0)) {
      return 'Min royalties value is 0%';
    }

    if (Big(royalties).gt(100)) {
      return 'Max royalties value is 100%';
    }

    return '';
  }, [royalties]);

  const isURIValid = useMemo(() => {
    if (!uri.length) {
      return '';
    }

    if (uri.startsWith('i')) {
      if (IPFS_REGEX.test(uri)) {
        return '';
      }
    } else {
      if (URL_REGEX.test(uri)) {
        return '';
      }
    }

    return `URL is invalid`;
  }, [uri]);

  const isURIHashValid = useMemo(() => {
    if (!uriHash.length) {
      return '';
    }

    if (uri === 'ipfs://') {
      if (CID_REGEX.test(uriHash)) {
        return '';
      }

      return 'URI Hash is invalid';
    }

    if (uriHash.length > 128) {
      return `The length of URI Hash must be less than or equal 128. Current length is ${uriHash.length}`;
    }

    return '';
  }, [uri, uriHash]);

  const isDescriptionValid = useMemo(() => {
    if (!description.length) {
      return '';
    }

    if (description.length > 256) {
      return `The length of description mush be less than or equal 256. Current length is ${description.length}`;
    }

    return '';
  }, [description]);

  const isFormValid = useMemo(() => {
    if (
      symbol.length
      && name.length
      && uri.length
      && uriHash.length
      && description.length
      && !isEnteredSymbolValid.length
      && !isRoyaltiesValid.length
      && !isURIValid.length
      && !isURIHashValid.length
      && !isEnteredNameValid.length
      && !isDescriptionValid.length
      && royalties.length
    ) {
      return true;
    }

    return false;
  }, [
    symbol.length,
    name.length,
    uri.length,
    uriHash.length,
    description.length,
    isRoyaltiesValid.length,
    isURIValid.length,
    isURIHashValid.length,
    isEnteredSymbolValid.length,
    isEnteredNameValid.length,
    isDescriptionValid.length,
    royalties,
  ]);

  const featuresToApply = useMemo(() => {
    let featuresArray: number[] = [];

    if (burningEnabled) {
      featuresArray.push(ClassFeature.burning);
    }

    if (freezingEnabled) {
      featuresArray.push(ClassFeature.freezing);
    }

    if (whitelistingEnabled) {
      featuresArray.push(ClassFeature.whitelisting);
    }

    if (disableSendingEnabled) {
      featuresArray.push(ClassFeature.disable_sending);
    }

    return featuresArray;
  }, [burningEnabled, disableSendingEnabled, freezingEnabled, whitelistingEnabled]);

  const handleIssueNFTCollection = useCallback(async () => {
    dispatch(setIsTxExecuting(true));
    try {
      const issueNFTMsg = NFT.IssueClass({
        issuer: account,
        symbol,
        name,
        description,
        uri,
        uriHash,
        features: featuresToApply,
        royaltyRate: parseFloatToRoyaltyRate(royalties),
      });

      const txFee = await getTxFee([issueNFTMsg]);
      const response = await signingClient?.signAndBroadcast(account, [issueNFTMsg], txFee ? txFee.fee : 'auto');

      if (response?.transactionHash) {
        dispatch(setIsSuccessIssueNFTModalOpen(true));
        dispatch(setShouldFetchNFTCollections(true));
        dispatch(shouldRefetchBalances(true));
        dispatch(setIssuedNFTCollection({
          name,
          symbol,
          royalties,
          description,
          features: featuresToApply,
          uri,
          uriHash,
          txHash: response?.transactionHash,
        }));
        handleClearState();
      }
    } catch (error) {
      dispatch(dispatchAlert({
        type: AlertType.Error,
        title: 'NFT Issue Class Failed',
        message: (error as { message: string}).message,
      }))
    }
    dispatch(setIsTxExecuting(false));
  }, [account, description, dispatch, featuresToApply, getTxFee, name, royalties, signingClient, symbol, uri, uriHash]);

  const renderButton = useMemo(() => {
    if (isConnected) {
      return (
        <Button
          label="Create Collection"
          onClick={handleIssueNFTCollection}
          type={ButtonType.Primary}
          iconType={ButtonIconType.Plus}
          disabled={!isFormValid || isTxExecuting}
          loading={isTxExecuting}
          className="min-w-[200px] px-2"
        />
      );
    }

    return (
      <Button
        label="Connect Wallet"
        onClick={handleConnectWalletClick}
        type={ButtonType.Primary}
        iconType={ButtonIconType.Wallet}
      />
    );
  }, [handleConnectWalletClick, handleIssueNFTCollection, isConnected, isFormValid, isTxExecuting]);

  return (
    <div className="flex flex-col gap-10">
      <MessageBox>
        <ul className="list-disc text-[#868991] text-sm font-normal ml-5">
          <li>Smart tokens on the Coreum network enable enterprises to set predetermined behaviours and <Link className="text-[#25D695] underline" href="https://docs.coreum.dev/docs/modules/coreum-deterministic-gas" target="_blank">deterministic gas fee</Link> for certain tokens, facilitating the execution of contract-like functions directly on the blockchain&apos;s storage.</li>
          <li>Your <span className="text-[#9FA2AC] font-semibold">Non-Fungible Tokens (NFTs)</span> will be stored in a collection that defines their behavior.</li>
          <li>After creating a collection, you can mint NFTs and transfer them to others.</li>
          <li>Each collection can feature its unique set of rules and functionalities.</li>
          <li>For instance, you might create a collection permitting user-to-user NFT transfers or another that restricts transfers to a specific address using the Soulbound feature</li>
        </ul>
      </MessageBox>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          label="Name"
          value={name}
          onChange={setName}
          placeholder="e. g. Collection Name"
          error={isEnteredNameValid}
        />
        <Input
          label="Symbol"
          value={symbol}
          onChange={setSymbol}
          placeholder="e. g. TOKEN"
          error={isEnteredSymbolValid}
          errorClassName="!-mb-9"
        />
      </div>
      <div className="grid grid-cols-1">
        <Input
          label="URI"
          value={uri}
          onChange={setUri}
          placeholder="ipfs://"
          error={isURIValid}
        />
      </div>
      <div className="grid grid-cols-1">
        <Input
          label="URI Hash"
          value={uriHash}
          onChange={setUriHash}
          placeholder="Enter CID"
          error={isURIHashValid}
        />
      </div>
      <div className="grid grid-cols-1">
        <TextArea
          label="Description"
          value={description}
          onChange={setDescription}
          placeholder="Enter token description"
          rows={4}
          error={isDescriptionValid}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          label="Royalties"
          value={royalties}
          onChange={setRoyalties}
          placeholder="0"
          icon={<GeneralIcon type={GeneralIconType.Percentage} />}
          type="number"
          decimals={2}
          error={isRoyaltiesValid}
        />
      </div>
      <div className="flex w-full">
        <ExpandedList
          label="Token Capabilities"
          listItems={tokenCapabilities}
        />
      </div>
      <div className="flex w-full justify-end">
        <div className="flex items-center">
          {renderButton}
        </div>
      </div>
    </div>
  );
};
