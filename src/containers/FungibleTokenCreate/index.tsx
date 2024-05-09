'use client';

import { GeneralIcon } from "@/assets/GeneralIcon";
import { Button } from "@/components/Button";
import { ExpandedList } from "@/components/ExpandedList";
import { Input } from "@/components/Input";
import { MessageBox } from "@/components/MessageBox";
import { TextArea } from "@/components/TextArea";
import { TokenCapability } from "@/components/TokenCapability";
import { FT_TOKEN_CAPABILITIES, SUBUNITS_REGEX, SYMBOL_REGEX, URL_REGEX } from "@/constants";
import { setIsConnectModalOpen, setIsTxExecuting } from "@/features/general/generalSlice";
import { AlertType, ButtonIconType, ButtonType, ExpandedListElem, GeneralIconType, Token, TokenCapabilityItem, TokenCapabilityType } from "@/shared/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Link from "next/link";
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import { FT, Feature, parseFloatToRoyaltyRate } from 'coreum-js';
import { useEstimateTxGasFee } from "@/hooks/useEstimateTxGasFee";
import { dispatchAlert } from "@/features/alerts/alertsSlice";
import Big from "big.js";

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

  const isConnected = useAppSelector(state => state.general.isConnected);
  const account = useAppSelector(state => state.general.account);
  const isTxExecuting = useAppSelector(state => state.general.isTxExecuting);
  const currencies = useAppSelector(state => state.currencies.issuedList);

  const dispatch = useAppDispatch();
  const { signingClient, getTxFee } = useEstimateTxGasFee();

  const handleClearState = useCallback(() => {
    setSymbol('');
    setSubunit('');
    setPrecision('0');
    setInitialAmount('0');
    setUrl('');
    setDescription('');
    setBurnRate('0');
    setSendCommissionRate('0');
    setMintingEnabled(false);
    setBurningEnabled(false);
    setFreezingEnabled(false);
    setWhitelistingEnabled(false);
    setIBCEnabled(false);
    setBlockEnabled(false);
  }, []);

  useEffect(() => {
    if (!isConnected) {
      handleClearState();
    }
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

    return featuresArray;
  }, [blockEnabled, burningEnabled, freezingEnabled, ibcEnabled, mintingEnabled, whitelistingEnabled]);

  const handleConnectWalletClick = useCallback(() => {
    dispatch(setIsConnectModalOpen(true));
  }, []);

  const handleIssueFTToken = useCallback(async () => {
    dispatch(setIsTxExecuting(true));
    try {
      const issueFTMsg = FT.Issue({
        issuer: account,
        symbol,
        subunit,
        precision: Number(precision),
        initialAmount: initialAmount.length ? initialAmount : '0',
        description,
        features: featuresToApply,
        burnRate: parseFloatToRoyaltyRate(burnRate),
        sendCommissionRate: parseFloatToRoyaltyRate(sendCommissionRate),
        uri: url,
      });

      const txFee = await getTxFee([issueFTMsg]);
      await signingClient?.signAndBroadcast(account, [issueFTMsg], txFee ? txFee.fee : 'auto');
      dispatch(dispatchAlert({
        type: AlertType.Success,
        title: 'Token was issued successfully',
      }));
    } catch (error: unknown) {
      dispatch(dispatchAlert({
        type: AlertType.Error,
        title: 'Fungible Token Issue Failed',
        message: (error as { message: string}).message,
      }));
    }
    dispatch(setIsTxExecuting(false));
  }, [
    account,
    description,
    featuresToApply,
    getTxFee,
    initialAmount,
    precision,
    signingClient,
    subunit,
    symbol,
    burnRate,
    sendCommissionRate,
    url,
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
      default:
        return [];
    }
  }, [blockEnabled, burningEnabled, freezingEnabled, ibcEnabled, mintingEnabled, whitelistingEnabled]);

  const tokenCapabilities: ExpandedListElem[] = useMemo(() => {
    return FT_TOKEN_CAPABILITIES.map((tokenCapability: TokenCapabilityItem) => {
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

    if (URL_REGEX.test(url)) {
      return '';
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

  const isFormValid = useMemo(() => {
    if (
      symbol.length
      && subunit.length
      && url.length
      && description.length
      && +burnRate <= 100
      && +sendCommissionRate <= 100
      && !isEnteredSubunitsValid.length
      && !isEnteredSymbolValid.length
      && !isURLValid.length
      && !isPrecisionValid?.length) {
      return true;
    }

    return false;
  }, [
    symbol.length,
    subunit.length,
    url.length,
    description.length,
    burnRate,
    sendCommissionRate,
    isEnteredSubunitsValid.length,
    isEnteredSymbolValid.length,
    isURLValid.length,
    isPrecisionValid?.length,
  ]);

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
    <div className="flex flex-col gap-10">
      <MessageBox>
        <ul className="list-disc text-[#868991] text-sm font-normal ml-5">
          <li>Smart tokens on the Coreum network enable enterprises to set predetermined behaviours and <Link className="text-[#25D695] underline" href="https://docs.coreum.dev/docs/modules/coreum-deterministic-gas" target="_blank">deterministic gas fee</Link> for certain tokens, facilitating the execution of contract-like functions directly on the blockchain&apos;s storage.</li>
          <li>Your <span className="text-[#9FA2AC] font-semibold">Fungible Tokens (FT)</span> will be stored in a collection that defines their behavior.</li>
        </ul>
      </MessageBox>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          label="Symbol"
          value={symbol}
          onChange={setSymbol}
          placeholder="Example: TOKEN"
          error={isEnteredSymbolValid}
          errorClassName="!-mb-9"
        />
        <Input
          label="Subunit"
          value={subunit}
          onChange={setSubunit}
          placeholder="Example: utoken"
          error={isEnteredSubunitsValid}
          errorClassName="!-mb-9"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
        />
      </div>
      <div className="grid grid-cols-1">
        <Input
          label="URL"
          value={url}
          onChange={setUrl}
          placeholder="http://example.com"
          error={isURLValid}
        />
      </div>
      <div className="grid grid-cols-1">
        <TextArea
          label="Description"
          value={description}
          onChange={setDescription}
          placeholder="Enter Token Description"
          rows={4}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          label="Burn Rate"
          value={burnRate}
          onChange={setBurnRate}
          placeholder="0"
          icon={<GeneralIcon type={GeneralIconType.Percentage} />}
          type="number"
          decimals={2}
          error={+burnRate > 100 ? 'Max burn rate value is 100%' : ''}
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
