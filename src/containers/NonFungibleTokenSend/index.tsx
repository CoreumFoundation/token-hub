'use client';

import { GeneralIcon } from "@/assets/GeneralIcon";
import { Button } from "@/components/Button";
import { ChainSelector } from "@/components/ChainSelector";
import { Decimal } from "@/components/Decimal";
import { InfoRow } from "@/components/InfoRow";
import { Input } from "@/components/Input";
import { MessageBox } from "@/components/MessageBox";
import { setIsConnectModalOpen } from "@/features/general/generalSlice";
import { convertSubunitToUnit } from "@/helpers/convertUnitToSubunit";
import { pasteValueFromClipboard } from "@/helpers/pasteValueFromClipboard";
import { validateAddress } from "@/helpers/validateAddress";
import { ButtonType, ButtonIconType, ChainInfo, GeneralIconType } from "@/shared/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback, useMemo, useState } from "react";

export const NonFungibleTokenSend = () => {
  const [destinationAddress, setDestinationAddress] = useState<string>('');

  const isConnected = useAppSelector(state => state.general.isConnected);
  const account = useAppSelector(state => state.general.account);
  const isTxExecuting = useAppSelector(state => state.general.isTxExecuting);
  const chains = useAppSelector(state => state.chains.list);

  const coreumChain = useMemo(() => {
    return chains.find((chain: ChainInfo) => chain.pretty_name.toLowerCase() === 'coreum');
  }, [chains]);

  const dispatch = useAppDispatch();

  const handleSendTokens = useCallback(async () => {

  }, []);

  const handleConnectWalletClick = useCallback(() => {
    dispatch(setIsConnectModalOpen(true));
  }, []);

  const isDestinationAddressInvalid = useMemo(() => {
    if (!destinationAddress.length) {
      return '';
    }

    const validatedDestinationAddress = validateAddress(destinationAddress);

    if (!validatedDestinationAddress.result) {
      return 'Destination address is invalid. Please double check entered value!';
    }

    if (validatedDestinationAddress.prefix !== coreumChain?.bech32_prefix) {
      return `Prefix of destination address is not matched with ${coreumChain?.bech32_prefix}!`;
    }

    if (destinationAddress.toLowerCase() === account.toLowerCase()) {
      return 'Destination address cannot be the same as sender account';
    }

    return '';
  }, [account, coreumChain?.bech32_prefix, destinationAddress]);

  const renderButton = useMemo(() => {
    if (isConnected) {
      return (
        <Button
          label="Send"
          onClick={handleSendTokens}
          type={ButtonType.Primary}
          iconType={ButtonIconType.Send}
          disabled={isTxExecuting}
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
  }, [isConnected, handleConnectWalletClick, handleSendTokens, isTxExecuting]);

  return (
    <div className="flex flex-col gap-10">
      <MessageBox>
        <ul className="list-disc text-[#868991] text-sm font-normal ml-5">
          <li>Depending of the nature of your Smart Token you can send it to another user.</li>
          <li>Please note, you will not be able to re-claim the assets unless the receiver sends it back to you.</li>
        </ul>
      </MessageBox>
      <div className="flex flex-col w-full">
        <label className="block text-sm text-[#868991] font-noto-sans">
          NFT
        </label>
        <div className="flex flex-col w-full items-center">
          <div className="flex flex-col h-[200px] items-center justify-center px-6 border border-[#1B1D23] rounded-[10px] gap-3 cursor-pointer">
            <GeneralIcon type={GeneralIconType.Hand} />
            <div className="text-[#5E6773] font-noto-sans text-base text-center text-nowrap">
              Select the NFT
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="flex flex-col w-full gap-2">
          <label className="block text-sm text-[#868991] font-noto-sans">
            Destination Chain
          </label>
          <div className="flex items-center w-full py-3 px-4 bg-[#080908] rounded-[10px] gap-2 text-base font-medium text-[#eee] cursor-pointer">
            <GeneralIcon type={GeneralIconType.Coreum} />
            {coreumChain?.pretty_name}
          </div>
        </div>
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
