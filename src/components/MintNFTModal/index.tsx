'use client';

import { useCallback, useMemo, useState } from "react";
import { Modal } from "../Modal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsConfirmNFTMintModalOpen, setIsNFTMintModalOpen } from "@/features/general/generalSlice";
import { Input } from "../Input";
import { IPFS_REGEX, URL_REGEX, CID_REGEX, NFT_ID_REGEX } from "@/constants";
import { TextArea } from "../TextArea";
import { Button } from "../Button";
import { ButtonType, ChainInfo } from "@/shared/types";
import { validateAddress } from "@/helpers/validateAddress";
import { setNFTData, setNFTID, setNFTRecipient, setNFTURI, setNFTURIHash } from "@/features/nft/nftSlice";

export const MintNFTModal = () => {
  const [nftId, setNFTId] = useState<string>('');
  const [uri, setUri] = useState<string>('');
  const [uriHash, setUriHash] = useState<string>('');
  const [data, setData] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('');

  const isMintNFTModalOpen = useAppSelector(state => state.general.isNFTMintModalOpen);
  const isTxExecuting = useAppSelector(state => state.general.isTxExecuting);
  const chains = useAppSelector(state => state.chains.list);

  const dispatch = useAppDispatch();

  const handleCloseModal = useCallback(() => {
    dispatch(setIsNFTMintModalOpen(false));
  }, []);

  const coreumChain = useMemo(() => {
    return chains.find((chain: ChainInfo) => chain.pretty_name.toLowerCase() === 'coreum');
  }, [chains]);

  const isNFTIDValid = useMemo(() => {
    if (!nftId.length) {
      return '';
    }

    if (NFT_ID_REGEX.test(nftId)) {
      return '';
    }

    return `NFT ID must match regex format: ${NFT_ID_REGEX}`;
  }, [nftId]);

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

  const isRecipientAddressValid = useMemo(() => {
    if (!recipient.length) {
      return '';
    }

    const validatedWalletAddress = validateAddress(recipient);

    if (!validatedWalletAddress.result) {
      return 'Wallet address is invalid. Please double check entered value!';
    }

    if (validatedWalletAddress.prefix !== coreumChain?.bech32_prefix) {
      return `Prefix of wallet address is not matched with ${coreumChain?.bech32_prefix}!`;
    }

    return '';
  }, [coreumChain?.bech32_prefix, recipient]);

  const isFormValid = useMemo(() => {
    if (!isNFTIDValid.length && !isURIValid.length && !isURIHashValid.length && !isRecipientAddressValid.length && nftId.length && uri.length) {
      return true;
    }

    return false;
  }, [isNFTIDValid.length, isRecipientAddressValid.length, isURIHashValid.length, isURIValid.length, nftId.length, uri.length]);

  const handleMintNFT = useCallback(() => {
    dispatch(setNFTID(nftId));
    dispatch(setNFTURI(uri));
    dispatch(setNFTURIHash(uriHash));
    dispatch(setNFTRecipient(recipient));
    dispatch(setNFTData(data));
    dispatch(setIsConfirmNFTMintModalOpen(true));
    dispatch(setIsNFTMintModalOpen(false));
    setNFTId('');
    setUri('');
    setUriHash('');
    setData('');
    setRecipient('');
  }, [data, nftId, recipient, uri, uriHash]);

  return (
    <Modal
      isOpen={isMintNFTModalOpen}
      title="Mint NFT"
      onClose={handleCloseModal}
    >
      <div className="flex flex-col w-full items-center gap-8">
        <Input
          label="ID"
          value={nftId}
          onChange={setNFTId}
          placeholder="e. g. NFT Name"
          error={isNFTIDValid}
        />
        <Input
          label="URI"
          value={uri}
          onChange={setUri}
          placeholder="ipfs://"
          error={isURIValid}
        />
        <Input
          label="URI Hash"
          value={uriHash}
          onChange={setUriHash}
          placeholder="Enter CID"
          error={isURIHashValid}
        />
        <Input
          label="Recipient"
          value={recipient}
          onChange={setRecipient}
          placeholder="Enter recipient's address"
          error={isRecipientAddressValid}
        />
        <TextArea
          label="Data"
          value={data}
          onChange={setData}
          placeholder="Type content here"
          rows={4}
          className="bg-[#080908] border-transparent"
        />
        <div className="flex w-full justify-end">
          <div className="flex items-center">
            <Button
              label="Continue"
              onClick={handleMintNFT}
              type={ButtonType.Primary}
              disabled={!isFormValid || isTxExecuting}
              loading={isTxExecuting}
              className="min-w-40 !py-2 !px-6 text-sm"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
