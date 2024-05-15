import { setIsConfirmNFTWhitelistModalOpen, setIsNFTCollectionViewModalOpen, setIsWhitelistNFTModalOpen } from "@/features/general/generalSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback, useMemo, useState } from "react";
import { Modal } from "../Modal";
import { Button } from "../Button";
import { ButtonType, ChainInfo } from "@/shared/types";
import { NFTItem } from "../NFTItem";
import { Input } from "../Input";
import { pasteValueFromClipboard } from "@/helpers/pasteValueFromClipboard";
import { validateAddress } from "@/helpers/validateAddress";
import { setWhitelistAccount } from "@/features/nft/nftSlice";

export const WhitelistNFTModal = () => {
  const isWhitelistNFTModalOpen = useAppSelector(state => state.general.isWhitelistNFTModalOpen);
  const selectedNFTSend = useAppSelector(state => state.nfts.selectedNFTSend);
  const selectedNFTClass = useAppSelector(state => state.nfts.selectedNFTClass);
  const chains = useAppSelector(state => state.chains.list);

  const [whitelistAccountAddress, setWhitelistAccountAddress] = useState<string>('');

  const coreumChain = useMemo(() => {
    return chains.find((chain: ChainInfo) => chain.pretty_name.toLowerCase() === 'coreum');
  }, [chains]);

  console.log(chains);

  const dispatch = useAppDispatch();

  const handleCloseModal = useCallback(() => {
    dispatch(setIsWhitelistNFTModalOpen(false));
  }, []);

  const handleOnClickBackButton = useCallback(() => {
    dispatch(setIsWhitelistNFTModalOpen(false));
    dispatch(setIsNFTCollectionViewModalOpen(true));
  }, []);

  const handleWhitelistNFTToken = useCallback(() => {
    dispatch(setIsConfirmNFTWhitelistModalOpen(true));
    dispatch(setIsWhitelistNFTModalOpen(false));
    dispatch(setWhitelistAccount(whitelistAccountAddress));
  }, [whitelistAccountAddress]);

  const whitelistAddressValidationError = useMemo(() => {
    if (!whitelistAccountAddress.length) {
      return '';
    }

    const validatedWalletAddress = validateAddress(whitelistAccountAddress);

    if (!validatedWalletAddress.result) {
      return 'Wallet address is invalid. Please double check entered value!';
    }

    if (validatedWalletAddress.prefix !== coreumChain?.bech32_prefix) {
      return `Prefix of wallet address is not matched with ${coreumChain?.bech32_prefix}!`;
    }

    return '';
  }, [coreumChain?.bech32_prefix, whitelistAccountAddress]);

  const isFormValid = useMemo(() => {
    if (selectedNFTSend && !whitelistAddressValidationError.length && whitelistAccountAddress.length) {
      return true;
    }

    return false;
  }, [selectedNFTSend, whitelistAccountAddress.length, whitelistAddressValidationError.length]);

  return (
    <Modal
      isOpen={isWhitelistNFTModalOpen}
      title="Whitelist NFT"
      onClose={handleCloseModal}
      wrapperClassName="w-[640px]"
    >
      <div className="flex flex-col w-full gap-8">
        <div className="flex flex-col w-full">
          <label className="block text-sm text-[#868991] font-noto-sans">
            NFT
          </label>
          <div className="flex flex-col w-full items-center">
            <div className="flex flex-col items-center gap-2">
              <NFTItem
                label={selectedNFTSend?.id || ''}
                imgPath={selectedNFTSend?.image || ''}
                description={selectedNFTClass?.name}
                className="text-[#eee] text-base hover:bg-[#17191E] hover"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <Input
            label="Account Address"
            value={whitelistAccountAddress}
            onChange={setWhitelistAccountAddress}
            placeholder="Enter wallet address"
            buttonLabel={whitelistAccountAddress.length ? '' : 'Paste'}
            error={whitelistAddressValidationError}
            handleOnButtonClick={() => !whitelistAccountAddress.length && pasteValueFromClipboard(setWhitelistAccountAddress)}
            warning="Only the targeted address can receive this NFT."
          />
        </div>
        <div className="flex items-center justify-between w-full gap-2">
          <div className="flex items-center">
            <Button
              label="Back"
              onClick={handleOnClickBackButton}
              type={ButtonType.Secondary}
              className="text-sm !py-2 px-6 rounded-[10px] font-semibold w-[160px] !bg-transparent pl-0"
            />
          </div>
          <div className="flex items-center justify-end">
            <Button
              label="Confirm"
              onClick={handleWhitelistNFTToken}
              type={ButtonType.Primary}
              className="text-sm !py-2 px-6 rounded-[10px] font-semibold w-[160px]"
              disabled={!isFormValid}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
