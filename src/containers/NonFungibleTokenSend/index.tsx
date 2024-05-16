'use client';

import { GeneralIcon } from "@/assets/GeneralIcon";
import { Button } from "@/components/Button";
import { Decimal } from "@/components/Decimal";
import { InfoRow } from "@/components/InfoRow";
import { Input } from "@/components/Input";
import { MessageBox } from "@/components/MessageBox";
import { NFTItem } from "@/components/NFTItem";
import { dispatchAlert } from "@/features/alerts/alertsSlice";
import { setIsConnectModalOpen, setIsSelectNFTModalOpen, setIsTxExecuting } from "@/features/general/generalSlice";
import { setSelectedNFTClass, setSelectedNFTSend, setShouldRefetchNFTItems } from "@/features/nft/nftSlice";
import { convertSubunitToUnit } from "@/helpers/convertUnitToSubunit";
import { pasteValueFromClipboard } from "@/helpers/pasteValueFromClipboard";
import { validateAddress } from "@/helpers/validateAddress";
import { useEstimateTxGasFee } from "@/hooks/useEstimateTxGasFee";
import { ButtonType, ButtonIconType, ChainInfo, GeneralIconType, AlertType, NFT as NFTType } from "@/shared/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { NFT } from "coreum-js";
import { useCallback, useEffect, useMemo, useState } from "react";

export const NonFungibleTokenSend = () => {
  const [destinationAddress, setDestinationAddress] = useState<string>('');

  const isConnected = useAppSelector(state => state.general.isConnected);
  const account = useAppSelector(state => state.general.account);
  const isTxExecuting = useAppSelector(state => state.general.isTxExecuting);
  const chains = useAppSelector(state => state.chains.list);

  const selectedNFTSend = useAppSelector(state => state.nfts.selectedNFTSend);
  const selectedNFTClass = useAppSelector(state => state.nfts.selectedNFTClass);

  const [selectedNFT, setSelectedNFT] = useState<NFTType | null>(null);

  const [txFee, setTxFee] = useState<string>('');

  useEffect(() => {
    if (selectedNFTSend) {
      setSelectedNFT(selectedNFTSend);
      dispatch(setSelectedNFTSend(null));
    }
  }, [selectedNFTSend]);

  useEffect(() => {
    if (!isConnected && selectedNFT) {
      setSelectedNFT(null);
    }
  }, [isConnected, selectedNFT]);

  const coreumChain = useMemo(() => {
    return chains.find((chain: ChainInfo) => chain.pretty_name.toLowerCase() === 'coreum');
  }, [chains]);

  const dispatch = useAppDispatch();
  const { signingClient, getTxFee } = useEstimateTxGasFee();

  const sendNFTMsg = useMemo(() => {
    return NFT.Send({
      classId: selectedNFTClass?.id || '',
      id: selectedNFT?.id || '',
      receiver: destinationAddress,
      sender: account,
    });
  }, [account, destinationAddress, selectedNFT?.id, selectedNFTClass?.id]);

  const txFeeValue = useCallback(async () => {
    try {
      if (account && destinationAddress && selectedNFTClass && selectedNFT) {
        const newTxFee = await getTxFee([sendNFTMsg]);
        const feeAmount = newTxFee?.fee.amount[0].amount;

        setTxFee(feeAmount || '');
      }
    } catch (error) {
      setTxFee('');
    }
  }, [account, destinationAddress, getTxFee, selectedNFT, selectedNFTClass, sendNFTMsg]);

  useEffect(() => {
    txFeeValue();
  }, [txFeeValue]);

  const handleSendTokens = useCallback(async () => {
    dispatch(setIsTxExecuting(true));
    try {
      const calculatedTxFee = await getTxFee([sendNFTMsg]);
      await signingClient?.signAndBroadcast(account, [sendNFTMsg], calculatedTxFee ? calculatedTxFee.fee : 'auto');
      dispatch(dispatchAlert({
        type: AlertType.Success,
        title: 'NFT Sent Successfully',
      }));
      dispatch(setShouldRefetchNFTItems(true));
      dispatch(setSelectedNFTClass(null));
      setSelectedNFT(null);
      setDestinationAddress('');
    } catch (error) {
      dispatch(dispatchAlert({
        type: AlertType.Error,
        title: 'Sending of NFT is Failed',
        message: (error as { message: string}).message,
      }));
    }
    dispatch(setIsTxExecuting(false));
  }, [sendNFTMsg, account, destinationAddress, getTxFee, selectedNFTClass?.id, selectedNFT?.id, signingClient]);

  const handleConnectWalletClick = useCallback(() => {
    dispatch(setIsConnectModalOpen(true));
  }, []);

  const handleSelectNFTModal = useCallback(() => {
    if (isConnected) {
      dispatch(setIsSelectNFTModalOpen(true));
    } else {
      dispatch(setIsConnectModalOpen(true));
    }
  }, [isConnected]);

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

  const isFormValid = useMemo(() => {
    if (selectedNFTClass && selectedNFT && !isDestinationAddressInvalid.length && destinationAddress.length) {
      return true;
    }

    return false;
  }, [isDestinationAddressInvalid.length, selectedNFTClass, selectedNFT, destinationAddress]);

  const renderButton = useMemo(() => {
    if (isConnected) {
      return (
        <Button
          label="Send"
          onClick={handleSendTokens}
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
  }, [isConnected, handleConnectWalletClick, handleSendTokens, isTxExecuting, isFormValid]);

  return (
    <div className="flex flex-col gap-10">
      <MessageBox>
        <ul className="list-disc text-[#868991] text-sm font-normal ml-5">
          <li>Depending on the features of your token, you might need to apply some actions to your token before sending it to other users.</li>
          <li>Please note, you will not be able to re-claim the assets unless the receiver sends it back to you.</li>
        </ul>
      </MessageBox>
      <div className="flex flex-col w-full">
        <label className="block text-sm text-[#868991] font-noto-sans">
          NFT
        </label>
        <div className="flex flex-col w-full items-center">
          {selectedNFT ? (
            <div className="flex flex-col items-center gap-2">
              <NFTItem
                label={selectedNFT.id}
                imgPath={selectedNFT.image}
                description={selectedNFTClass?.name}
                className="text-[#eee] text-base"
              />
              <div className="text-sm text-[#25D695] font-noto-sans cursor-pointer" onClick={handleSelectNFTModal}>
                Select Another NFT
              </div>
            </div>
          ) : (
            <div
              className="flex flex-col h-[200px] items-center justify-center px-6 border border-[#1B1D23] rounded-[10px] gap-3 cursor-pointer"
              onClick={handleSelectNFTModal}
            >
              <GeneralIcon type={GeneralIconType.Hand} />
              <div className="text-[#5E6773] font-noto-sans text-base text-center text-nowrap">
                Select the NFT
              </div>
            </div>
          )}
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
              <Decimal value={convertSubunitToUnit({ amount: txFee || '0', precision: 6 })} precision={6} />
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
