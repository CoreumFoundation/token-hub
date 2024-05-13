'use client';

import { GeneralIcon } from "@/assets/GeneralIcon";
import { Amount } from "@/components/Amount";
import { Button } from "@/components/Button";
import { ChainSelector } from "@/components/ChainSelector";
import { Decimal } from "@/components/Decimal";
import { InfoRow } from "@/components/InfoRow";
import { Input } from "@/components/Input";
import { MessageBox } from "@/components/MessageBox";
import { SectionWithLabel } from "@/components/SectionWithLabel";
import { dispatchAlert } from "@/features/alerts/alertsSlice";
import { setIsConnectModalOpen, setIsTxExecuting } from "@/features/general/generalSlice";
import { convertSubunitToUnit, convertUnitToSubunit } from "@/helpers/convertUnitToSubunit";
import { pasteValueFromClipboard } from "@/helpers/pasteValueFromClipboard";
import { validateAddress } from "@/helpers/validateAddress";
import { useEstimateTxGasFee } from "@/hooks/useEstimateTxGasFee";
import { AlertType, ButtonIconType, ButtonType, ChainInfo, DropdownItem, GeneralIconType, Network, Token } from "@/shared/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Coin } from "@cosmjs/amino";
import Big from "big.js";
import { Bank, FT } from "coreum-js";
import { useCallback, useEffect, useMemo, useState } from "react";
import { setSelectedCurrency as setSelectedFTCurrency } from "@/features/currencies/currenciesSlice";
import { shouldRefetchBalances } from "@/features/balances/balancesSlice";
import { MsgTransfer } from "cosmjs-types/ibc/applications/transfer/v1/tx";
import { MsgTransferEncodeObject } from "@cosmjs/stargate";
import { getSendFTviaIBCMsg } from "@/helpers/getSendFTviaIBCMsg";

export const FungibleTokenSend = () => {
  const [destinationAddress, setDestinationAddress] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [selectedCurrency, setSelectedCurrency] = useState<DropdownItem | null>(null);

  const currencies = useAppSelector(state => state.currencies.list);
  const balances = useAppSelector(state => state.balances.list);
  const isConnected = useAppSelector(state => state.general.isConnected);
  const destinationChain = useAppSelector(state => state.general.destinationChain);
  const account = useAppSelector(state => state.general.account);
  const isTxExecuting = useAppSelector(state => state.general.isTxExecuting);
  const network = useAppSelector(state => state.general.network);

  const selectedFTCurrency = useAppSelector(state => state.currencies.selectedCurrency);

  const coreumNetworkName = network === Network.Mainnet ? 'coreum' : 'coreumtestnet';

  const dispatch = useAppDispatch();
  const { signingClient, getTxFee } = useEstimateTxGasFee();

  const currenciesToDropdownItem: DropdownItem[] = useMemo(() => {
    return currencies.map((item: Token) => {
      return {
        id: item.denom,
        label: item.symbol,
        icon: (item.denom === 'utestcore' || item.denom === 'ucore')
          ? <GeneralIcon type={GeneralIconType.Coreum} className="w-5 h-5"  />
          : <GeneralIcon type={GeneralIconType.DefaultToken} className="w-5 h-5" />
      };
    });
  }, [currencies]);

  const handleClearState = useCallback(() => {
    setDestinationAddress('');
    setAmount('');
    setSelectedCurrency(currenciesToDropdownItem[0]);
  }, [currenciesToDropdownItem]);

  useEffect(() => {
    if (!isConnected) {
      handleClearState();
    }
  }, [network, isConnected, currenciesToDropdownItem]);

  useEffect(() => {
    if (!selectedCurrency && (currenciesToDropdownItem.length || selectedFTCurrency)) {
      if (selectedFTCurrency) {
        setSelectedCurrency({
          id: selectedFTCurrency.denom,
          label: selectedFTCurrency.symbol,
          icon: <GeneralIcon type={GeneralIconType.DefaultToken} className="w-5 h-5" />,
        });
        dispatch(setSelectedFTCurrency(null));
      } else {
        setSelectedCurrency(currenciesToDropdownItem[0]);
      }
    }
  }, [currenciesToDropdownItem, selectedCurrency, selectedFTCurrency]);

  const currentCurrency = useMemo(() => {
    return currencies.find((currencyItem: Token) => currencyItem.denom === selectedCurrency?.id);
  }, [currencies, selectedCurrency]);

  const currentCurrencyBalance = useMemo(() => {
    return balances.find((balanceItem: Coin) => balanceItem.denom === selectedCurrency?.id);
  }, [balances, selectedCurrency]);

  const availableBalance = useMemo(() => {
    return convertSubunitToUnit({
      amount: currentCurrencyBalance?.amount || '0',
      precision: currentCurrency?.precision || 0,
    });
  }, [currentCurrency?.precision, currentCurrencyBalance?.amount]);

  const isDestinationAddressInvalid = useMemo(() => {
    if (!destinationAddress.length) {
      return '';
    }

    const validatedDestinationAddress = validateAddress(destinationAddress);

    if (!validatedDestinationAddress.result) {
      return 'Destination address is invalid. Please double check entered value!';
    }

    if (validatedDestinationAddress.prefix !== destinationChain?.bech32_prefix) {
      return `Prefix of destination address is not matched with ${destinationChain?.bech32_prefix}!`;
    }

    if (destinationAddress.toLowerCase() === account.toLowerCase()) {
      return 'Destination address cannot be the same as sender account';
    }

    return '';
  }, [account, destinationAddress, destinationChain, network]);

  const isFormValid = useMemo(() => {
    if (amount.length && Big(amount).lte(Big(availableBalance)) && destinationAddress.length && !isDestinationAddressInvalid.length) {
      return true;
    }

    return false;
  }, [amount, availableBalance, destinationAddress.length, isDestinationAddressInvalid.length]);

  const handleConnectWalletClick = useCallback(() => {
    dispatch(setIsConnectModalOpen(true));
  }, []);

  const handleSendTokens = useCallback(async () => {
    dispatch(setIsTxExecuting(true));
    try {
      const sendFTMsg = Bank.Send({
        fromAddress: account,
        toAddress: destinationAddress,
        amount: [
          {
            denom: currentCurrency?.denom || '',
            amount: convertUnitToSubunit({
              amount,
              precision: currentCurrency?.precision || 0,
            }),
          }
        ],
      });

      const txFee = await getTxFee([sendFTMsg]);
      await signingClient?.signAndBroadcast(account, [sendFTMsg], txFee ? txFee.fee : 'auto');
      dispatch(dispatchAlert({
        type: AlertType.Success,
        title: 'Token was sent successfully',
      }));
      setDestinationAddress('');
      setAmount('');
    } catch (error) {
      dispatch(dispatchAlert({
        type: AlertType.Error,
        title: 'Fungible Token Send Failed',
        message: (error as { message: string}).message,
      }));
    }
    dispatch(shouldRefetchBalances(true));
    dispatch(setIsTxExecuting(false));
  }, [
    account,
    amount,
    currentCurrency,
    destinationAddress,
    getTxFee,
    signingClient,
  ]);

  const handleSendTokensIBC = useCallback(async () => {
    dispatch(setIsTxExecuting(true));
    try {
      const sendFTIBCMsg: MsgTransferEncodeObject = getSendFTviaIBCMsg({
        sourcePort: 'transfer',
        sourceChannel: destinationChain?.coreum_channel_id || '',
        token: {
          denom: currentCurrency?.denom || '',
          amount: convertUnitToSubunit({
            amount,
            precision: currentCurrency?.precision || 0,
          }),
        },
        sender: account,
        receiver: destinationAddress,
        network,
      });

      const txFee = await getTxFee([sendFTIBCMsg]);
      await signingClient?.signAndBroadcast(account, [sendFTIBCMsg], txFee ? txFee.fee : 'auto');
      dispatch(dispatchAlert({
        type: AlertType.Success,
        title: 'Token was sent via IBC successfully',
      }));
      setDestinationAddress('');
      setAmount('');
    } catch (error) {
      dispatch(dispatchAlert({
        type: AlertType.Error,
        title: 'Fungible Token Send Failed',
        message: (error as { message: string}).message,
      }));
      console.log(error);
    }
    dispatch(shouldRefetchBalances(true));
    dispatch(setIsTxExecuting(false));
  }, [
    account,
    amount,
    currentCurrency?.denom,
    currentCurrency?.precision,
    destinationAddress,
    destinationChain?.coreum_channel_id,
    getTxFee,
    network,
    signingClient,
  ]);

  const handleSend = useCallback(() => {
    if (destinationChain?.chain_name === coreumNetworkName) {
      handleSendTokens();
    } else {
      handleSendTokensIBC();
    }
  }, [coreumNetworkName, destinationChain?.chain_name]);

  const handleMaxButtonClick = useCallback(() => {
    setAmount(availableBalance);
  }, [availableBalance]);

  const renderButton = useMemo(() => {
    if (isConnected) {
      return (
        <Button
          label="Send"
          onClick={handleSend}
          type={ButtonType.Primary}
          iconType={ButtonIconType.Send}
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
  }, [isConnected, isFormValid, handleSendTokens, isTxExecuting]);

  return (
    <div className="flex flex-col gap-10">
      <MessageBox>
        <ul className="list-disc text-[#868991] text-sm font-normal ml-5">
          <li>Depending on the features of your token, you might need to apply some actions to your token before sending it to other users.</li>
          <li>Please note, you will not be able to re-claim the assets unless the receiver sends it back to you.</li>
        </ul>
      </MessageBox>
      <div className="flex flex-col w-full relative">
        <SectionWithLabel label="Amount">
          <Amount
            value={amount}
            onChangeValue={setAmount}
            selectedCurrency={selectedCurrency}
            currencies={currenciesToDropdownItem}
            onSelectCurrency={setSelectedCurrency}
            onMaxButtonClick={handleMaxButtonClick}
            balance={availableBalance}
            precision={currentCurrency?.precision || 0}
          />
        </SectionWithLabel>
        {!Big(amount || '0').lte(Big(availableBalance)) && (
          <div className="absolute bottom-0 flex -mb-7 text-xs items-center gap-2 text-[#DE0F3E]">
            <GeneralIcon type={GeneralIconType.Error} /> Insufficient balance
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <ChainSelector />
        <div className="col-span-2">
          <Input
            label="Destination Address"
            value={destinationAddress}
            onChange={setDestinationAddress}
            placeholder="Enter Destination Address"
            error={isDestinationAddressInvalid.length ? isDestinationAddressInvalid : undefined}
            buttonLabel={destinationAddress.length ? '' : 'Paste'}
            handleOnButtonClick={() => !destinationAddress.length && pasteValueFromClipboard(setDestinationAddress)}
          />
        </div>
      </div>
      <div className="flex flex-col w-full items-center gap-2">
        <InfoRow
          label={"Fee"}
          value={(
            <div className="flex items-baseline gap-1">
              ~
              <Decimal value={convertSubunitToUnit({ amount: '8625', precision: 6 })} precision={6} />
              <span className="text-xs">COREUM</span>
            </div>
          )}
        />
        <InfoRow
          label={"Estimated Time"}
          value="1 - 3 minutes"
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
