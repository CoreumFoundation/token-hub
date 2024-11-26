'use client';

import { GeneralIcon } from "@/assets/GeneralIcon";
import { Button } from "@/components/Button";
import { ExpandedList } from "@/components/ExpandedList";
import { Input } from "@/components/Input";
import { MessageBox } from "@/components/MessageBox";
import { TextArea } from "@/components/TextArea";
import { TokenCapability } from "@/components/TokenCapability";
import { FT_TOKEN_CAPABILITIES, IPFS_REGEX, SUBUNITS_REGEX, SYMBOL_REGEX, URL_REGEX } from "@/constants";
import { setIsConnectModalOpen, setIsSuccessIssueFTModalOpen, setIsTxExecuting } from "@/features/general/generalSlice";
import { AlertType, ButtonIconType, ButtonType, ExpandedListElem, GeneralIconType, Token, TokenCapabilityItem, TokenCapabilityType } from "@/shared/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Link from "next/link";
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import { FT, Feature, convertStringToAny, parseFloatToRoyaltyRate } from 'coreum-js';
import { useEstimateTxGasFee } from "@/hooks/useEstimateTxGasFee";
import { dispatchAlert } from "@/features/alerts/alertsSlice";
import Big from "big.js";
import { setIssuedToken, shouldRefetchCurrencies } from "@/features/currencies/currenciesSlice";
import { shouldRefetchBalances } from "@/features/balances/balancesSlice";
import { convertUnitToSubunit } from "@/helpers/convertUnitToSubunit";
import { ExtensionFungibleTokenSettings } from "@/components/ExtensionFungibleTokenSettings";
import { clearExtensionState } from "@/features/extension/extensionSlice";

export const FungibleTokenCreate = () => {
  const [symbol, setSymbol] = useState<string>('');
  const [subunit, setSubunit] = useState<string>('');
  const [precision, setPrecision] = useState<string>('');
  const [initialAmount, setInitialAmount] = useState<string>('');

  const [url, setUrl] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const [burnRate, setBurnRate] = useState<string>('');
  const [sendCommissionRate, setSendCommissionRate] = useState<string>('');

  const [mintingEnabled, setMintingEnabled] = useState<boolean>(false);
  const [burningEnabled, setBurningEnabled] = useState<boolean>(false);
  const [freezingEnabled, setFreezingEnabled] = useState<boolean>(false);
  const [whitelistingEnabled, setWhitelistingEnabled] = useState<boolean>(false);
  const [ibcEnabled, setIBCEnabled] = useState<boolean>(false);
  const [blockEnabled, setBlockEnabled] = useState<boolean>(false);
  const [clawbackEnabled, setClawbackEnabled] = useState<boolean>(false);
  const [extensionEnabled, setExtensionEnabled] = useState<boolean>(false);

  const extensionCodeId = useAppSelector(state => state.extension.codeId);
  const extensionLabel = useAppSelector(state => state.extension.label);
  const extensionFunds = useAppSelector(state => state.extension.funds);
  const extensionIssuanceMsg = useAppSelector(state => state.extension.issuanceMsg);

  const isConnected = useAppSelector(state => state.general.isConnected);
  const account = useAppSelector(state => state.general.account);
  const isTxExecuting = useAppSelector(state => state.general.isTxExecuting);
  const currencies = useAppSelector(state => state.currencies.issuedList);

  const dispatch = useAppDispatch();
  const { signingClient, getTxFee } = useEstimateTxGasFee();

  const handleClearState = useCallback(() => {
    setSymbol('');
    setSubunit('');
    setPrecision('');
    setInitialAmount('');
    setUrl('');
    setDescription('');
    setBurnRate('');
    setSendCommissionRate('');
    setMintingEnabled(false);
    setBurningEnabled(false);
    setFreezingEnabled(false);
    setWhitelistingEnabled(false);
    setIBCEnabled(false);
    setBlockEnabled(false);
    setClawbackEnabled(false);
    dispatch(clearExtensionState());
  }, []);

  useEffect(() => {
    if (!isConnected) {
      handleClearState();
    }

    return () => {
      handleClearState();
    };
  }, [isConnected]);

  const featuresToApply = useMemo(() => {
    let featuresArray: number[] = [];

    if (mintingEnabled) {
      featuresArray.push(Feature.minting);
    }

    if (burningEnabled) {
      featuresArray.push(Feature.burning);
    }

    if (freezingEnabled) {
      featuresArray.push(Feature.freezing);
    }

    if (whitelistingEnabled) {
      featuresArray.push(Feature.whitelisting);
    }

    if (ibcEnabled) {
      featuresArray.push(Feature.ibc);
    }

    if (blockEnabled) {
      featuresArray.push(Feature.block_smart_contracts);
    }

    if (clawbackEnabled){
      featuresArray.push(Feature.clawback);
    }

    if (extensionEnabled) {
      featuresArray.push(Feature.extension);
    }

    return featuresArray;
  }, [
    blockEnabled,
    burningEnabled,
    freezingEnabled,
    ibcEnabled,
    mintingEnabled,
    whitelistingEnabled,
    clawbackEnabled,
    extensionEnabled,
  ]);

  const handleConnectWalletClick = useCallback(() => {
    dispatch(setIsConnectModalOpen(true));
  }, []);

  const handleIssueFTToken = useCallback(async () => {
    dispatch(setIsTxExecuting(true));
    try {
      const extensionSettings = {
        codeId: extensionCodeId,
        label: extensionLabel,
        funds: extensionFunds,
        issuanceMsg: new TextEncoder().encode(extensionIssuanceMsg),
      };

      console.log({ extensionSettings });

      const issueFTMsg = FT.Issue({
        issuer: account,
        symbol,
        subunit,
        precision: Number(precision),
        initialAmount: convertUnitToSubunit({ amount: initialAmount, precision: Number(precision)}),
        description,
        features: featuresToApply,
        burnRate: parseFloatToRoyaltyRate(burnRate),
        sendCommissionRate: parseFloatToRoyaltyRate(sendCommissionRate),
        uri: url,
        ...(extensionEnabled && {
          extensionSettings,
        })
      });

      const txFee = await getTxFee([issueFTMsg]);
      const response = await signingClient?.signAndBroadcast(account, [issueFTMsg], txFee ? txFee.fee : 'auto');

      if (response?.transactionHash) {
        dispatch(setIsSuccessIssueFTModalOpen(true));
        dispatch(setIssuedToken({
          symbol,
          subunit,
          precision,
          initialAmount,
          description,
          features: featuresToApply,
          burnRate,
          sendCommissionRate,
          uri: url,
          txHash: response?.transactionHash,
        }));
        handleClearState();
        dispatch(shouldRefetchCurrencies(true));
        dispatch(shouldRefetchBalances(true));
      }
    } catch (error: unknown) {
      dispatch(dispatchAlert({
        type: AlertType.Error,
        title: 'Fungible Token Issue Failed',
        message: (error as { message: string}).message,
      }));
    }
    dispatch(setIsTxExecuting(false));
  }, [
    featuresToApply,
    account,
    symbol,
    subunit,
    precision,
    initialAmount,
    description,
    burnRate,
    sendCommissionRate,
    url,
    extensionEnabled,
    extensionCodeId,
    extensionLabel,
    extensionFunds,
    extensionIssuanceMsg,
    getTxFee,
    signingClient,
    handleClearState,
  ]);

  const getTokenStateItem = useCallback((type: TokenCapabilityType): [boolean, Dispatch<SetStateAction<boolean>>] | [] => {
    switch (type) {
      case TokenCapabilityType.Mint:
        return [mintingEnabled, setMintingEnabled];
      case TokenCapabilityType.Burn:
        return [burningEnabled, setBurningEnabled];
      case TokenCapabilityType.Freeze:
        return [freezingEnabled, setFreezingEnabled];
      case TokenCapabilityType.Whitelist:
        return [whitelistingEnabled, setWhitelistingEnabled];
      case TokenCapabilityType.IBC:
        return [ibcEnabled, setIBCEnabled];
      case TokenCapabilityType.Block:
        return [blockEnabled, setBlockEnabled];
      case TokenCapabilityType.Clawback:
        return [clawbackEnabled, setClawbackEnabled];
      case TokenCapabilityType.Extension:
        return [extensionEnabled, setExtensionEnabled];
      default:
        return [];
    }
  }, [
    blockEnabled,
    burningEnabled,
    clawbackEnabled,
    freezingEnabled,
    ibcEnabled,
    mintingEnabled,
    whitelistingEnabled,
    extensionEnabled,
  ]);

  const isEnteredSymbolValid = useMemo(() => {
    if (!symbol.length) {
      return '';
    }

    const symbolInExistingCurrencies = currencies.find((item: Token) => item.symbol === symbol);
    if (symbolInExistingCurrencies) {
      return `You already issued the token with symbol: ${symbol}. Please, use another value for symbol.`;
    } else if (SYMBOL_REGEX.test(symbol)) {
      return '';
    }

    return `Symbol must match regex format: ${SYMBOL_REGEX}`;
  }, [symbol, currencies]);

  const isEnteredSubunitsValid = useMemo(() => {
    if (!subunit.length) {
      return '';
    }

    const subunitInExistingCurrencies = currencies.find((item: Token) => item.subunit === subunit);
    if (subunitInExistingCurrencies) {
      return `You already issued the token with subunit: ${subunit}. Please, use another value for subunit.`;
    } else if (SUBUNITS_REGEX.test(subunit)) {
      return '';
    }

    return `Symbol must match regex format: ${SUBUNITS_REGEX}`;
  }, [subunit, currencies]);

  const isURLValid = useMemo(() => {
    if (!url.length) {
      return '';
    }

    if (url.startsWith('i')) {
      if (IPFS_REGEX.test(url)) {
        return '';
      }
    } else {
      if (URL_REGEX.test(url)) {
        return '';
      }
    }

    return `URL is invalid`;
  }, [url]);

  const isPrecisionValid = useMemo(() => {
    if (!precision.length) {
      return '';
    }

    if (Big(precision).lt(1)) {
      return 'Min value of precision is 1';
    }

    if (Big(precision).gt(20)) {
      return 'Max value of precision is 20';
    }
  }, [precision]);

  const isDescriptionValid = useMemo(() => {
    if (!description.length) {
      return '';
    }

    if (description.length > 200) {
      return `The length of description mush be less than or equal 200. Current length is ${description.length}`;
    }

    return '';
  }, [description]);

  const isEnteredCodeIdValid = useMemo(() => {
    if (!extensionEnabled) {
      return '';
    }

    if (!extensionCodeId.length) {
      return 'Extension\'s code id cannot be empty';
    }

    if (!Number.isInteger(Number(extensionCodeId))) {
      return 'Extension\'s code id must be an integer';
    }

    return '';
  }, [extensionCodeId, extensionEnabled]);

  const isEnteredLabelValid = useMemo(() => {
    if (!extensionLabel.length) {
      return 'Extension\'s label cannot be empty';
    }

    return '';
  }, [extensionLabel.length]);

  const isIssuanceMsgValid = useMemo(() => {
    if (!extensionIssuanceMsg.length) {
      return '';
    }

    try {
      JSON.parse(extensionIssuanceMsg);
    } catch (error) {
      return 'Extension\'s issuance message must be a valid JSON';
    }

    return '';
  }, [extensionIssuanceMsg]);

  const isExtenstionSettingsValid = useMemo(() => {
    if (extensionEnabled) {
      return !isIssuanceMsgValid.length && !isEnteredLabelValid.length && !isEnteredCodeIdValid.length;
    }

    return true;
  }, [extensionEnabled, isEnteredCodeIdValid.length, isEnteredLabelValid.length, isIssuanceMsgValid.length]);

  const isFormValid = useMemo(() => {
    if (
      symbol.length
      && subunit.length
      && description.length
      && +burnRate <= 100
      && +sendCommissionRate <= 100
      && !isEnteredSubunitsValid.length
      && !isEnteredSymbolValid.length
      && !isURLValid.length
      && !isPrecisionValid?.length
      && !isDescriptionValid.length
      && isExtenstionSettingsValid
    ) {
      return true;
    }

    return false;
  }, [
    symbol.length,
    subunit.length,
    description.length,
    burnRate,
    sendCommissionRate,
    isEnteredSubunitsValid.length,
    isEnteredSymbolValid.length,
    isURLValid.length,
    isPrecisionValid?.length,
    isDescriptionValid.length,
    isExtenstionSettingsValid,
  ]);

  const handleSetBlockEnabled = useCallback((value: boolean) => {
    if (value) {
      setBlockEnabled(value);
      setExtensionEnabled(false);
    } else {
      setBlockEnabled(false);
    }
  }, []);

  const handleSetExtensionEnabled = useCallback((value: boolean) => {
    if (value) {
      setExtensionEnabled(value);
      setBlockEnabled(false);
    } else {
      setExtensionEnabled(false);
    }
  }, []);

  const tokenCapabilities: ExpandedListElem[] = useMemo(() => {
    return FT_TOKEN_CAPABILITIES.map((tokenCapability: TokenCapabilityItem) => {
      let [enabled, setEnabled] = getTokenStateItem(tokenCapability.type);

      const tokenCapabilityProps = {
        ...tokenCapability,
        enabled: enabled || false,
        setEnabled: tokenCapability.type === TokenCapabilityType.Block
          ? handleSetBlockEnabled
          : (
            tokenCapability.type === TokenCapabilityType.Extension
              ? handleSetExtensionEnabled
              : setEnabled ? setEnabled : () => {}
          ),
        ...(tokenCapability.type === TokenCapabilityType.Extension && {
          extensionSettings: <ExtensionFungibleTokenSettings />,
        }),
      };

      return {
        id: tokenCapability.type,
        content: (
          <TokenCapability
            {...tokenCapabilityProps}
          />
        ),
      };
    });
  }, [getTokenStateItem]);

  const renderButton = useMemo(() => {
    if (isConnected) {
      return (
        <Button
          label="Create Token"
          onClick={handleIssueFTToken}
          type={ButtonType.Primary}
          iconType={ButtonIconType.Token}
          disabled={!isFormValid || isTxExecuting}
          loading={isTxExecuting}
          className="min-w-[200px]"
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
  }, [isConnected, isFormValid, handleIssueFTToken, isTxExecuting]);


  return (
    <div className="flex flex-col gap-9 sm:gap-10 scroll-smooth">
      <MessageBox>
        <ul className="list-disc text-[#868991] text-sm font-normal ml-5">
          <li>Smart tokens on the Coreum network enable enterprises to set predetermined behaviours and <Link className="text-[#25D695] underline" href="https://docs.coreum.dev/docs/modules/coreum-deterministic-gas" target="_blank">deterministic gas fee</Link> for certain tokens, facilitating the execution of contract-like functions directly on the blockchain&apos;s storage.</li>
          <li>Your <span className="text-[#9FA2AC] font-semibold">Fungible Tokens (FTs)</span> will inherit a set of <Link className="text-[#25D695]" href="#features-ft">features</Link> that determine their behaviour.</li>
        </ul>
      </MessageBox>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-3">
        <Input
          label="Symbol"
          value={symbol}
          onChange={setSymbol}
          placeholder="Example: TOKEN"
          error={isEnteredSymbolValid}
          errorClassName="-mb-12 md:!-mb-9"
        />
        <Input
          label="Subunit"
          value={subunit}
          onChange={setSubunit}
          placeholder="Example: utoken"
          error={isEnteredSubunitsValid}
          errorClassName="-mb-12 md:-mb-9"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-3">
        <Input
          label="Precision"
          value={precision}
          onChange={setPrecision}
          placeholder="0"
          type="number"
          error={isPrecisionValid}
        />
        <Input
          label="Initial Amount"
          value={initialAmount}
          onChange={setInitialAmount}
          placeholder="0"
          type="number"
          decimals={Number(precision)}
        />
      </div>
      <div className="grid grid-cols-1">
        <Input
          label="URL"
          value={url}
          onChange={setUrl}
          placeholder="http://example.com"
          error={isURLValid}
          errorClassName="-mb-12 md:-mb-9"
        />
      </div>
      <div className="grid grid-cols-1">
        <TextArea
          label="Description"
          value={description}
          onChange={setDescription}
          placeholder="Enter Token Description"
          rows={4}
          error={isDescriptionValid}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-9 sm:gap-3">
        <Input
          label="Burn Rate"
          value={burnRate}
          onChange={setBurnRate}
          placeholder="0"
          icon={<GeneralIcon type={GeneralIconType.Percentage} />}
          type="number"
          decimals={2}
          error={+burnRate > 100 ? 'Max burn rate value is 100%' : ''}
          tooltipContent="The percentage of each token transaction that is permanently removed from circulation; this reduction is applied on top of the sending amount."
          errorClassName="!-mb-12 md:!-mb-9"
        />
        <Input
          label="Send Commission Rate"
          value={sendCommissionRate}
          onChange={setSendCommissionRate}
          placeholder="0"
          icon={<GeneralIcon type={GeneralIconType.Percentage} />}
          type="number"
          decimals={2}
          error={+sendCommissionRate > 100 ? 'Max send commission rate value is 100%' : ''}
          tooltipContent="Percentage of each token transaction paid to the token's creator; the commission is applied on top of the sending amount."
          errorClassName="!-mb-12 md:!-mb-9"
        />
      </div>
      <div className="flex w-full" id="features-ft">
        <ExpandedList
          label="Token Features"
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
