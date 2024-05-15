import { AlertType, ButtonType, ConfirmationModalImageType } from "@/shared/types";
import { ConfirmationModal } from "../ConfirmationModal";
import { ConfirmationModalImage } from "@/assets/ConfirmationModalImage";
import { Button } from "../Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback, useMemo, useState } from "react";
import { setIsConfirmNFTMintModalOpen, setIsTxExecuting } from "@/features/general/generalSlice";
import { useEstimateTxGasFee } from "@/hooks/useEstimateTxGasFee";
import { NFT, convertStringToAny } from "coreum-js";
import { ModalInfoRow } from "../ModalInfoRow";
import { dispatchAlert } from "@/features/alerts/alertsSlice";
import { setNFTData, setNFTID, setNFTRecipient, setNFTURI, setNFTURIHash, setSelectedNFTClass, setShouldRefetchNFTItems } from "@/features/nft/nftSlice";
import { shortenAddress } from "@/helpers/shortenAddress";

export const ConfirmNFTMintModal = () => {
  const isConfirmNFTMintModalOpen = useAppSelector(state => state.general.isConfirmNFTMintModalOpen);
  const isTxExecuting = useAppSelector(state => state.general.isTxExecuting);
  const account = useAppSelector(state => state.general.account);

  const selectedCollection = useAppSelector(state => state.nfts.selectedNFTClass);
  const nftId = useAppSelector(state => state.nfts.nftID);
  const nftURI = useAppSelector(state => state.nfts.nftURI);
  const nftURIHash = useAppSelector(state => state.nfts.nftURIHash);
  const nftRecipient = useAppSelector(state => state.nfts.nftRecipient);
  const nftData = useAppSelector(state => state.nfts.nftData);

  const [isTxSuccessful, setIsTxSuccessful] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { signingClient, getTxFee } = useEstimateTxGasFee();

  const handleClose = useCallback(() => {
    dispatch(setNFTID(''));
    dispatch(setNFTURI(''));
    dispatch(setNFTURIHash(''));
    dispatch(setNFTRecipient(''));
    dispatch(setNFTData(''));
    dispatch(setIsConfirmNFTMintModalOpen(false));
    dispatch(setSelectedNFTClass(null));
    setIsTxSuccessful(false);
  }, []);

  const handleConfirm = useCallback(async () => {
    dispatch(setIsTxExecuting(true));
    try {
      const nftDataValue = convertStringToAny(nftData);
      const nftMintObj = {
        sender: account,
        classId: selectedCollection?.id || '',
        id: nftId,
        uri: nftURI,
        uriHash: nftURIHash,
        recipient: nftRecipient,
        data: nftDataValue,
      };

      const mintNFTMsg = NFT.Mint(nftMintObj);

      const txFee = await getTxFee([mintNFTMsg]);
      await signingClient?.signAndBroadcast(account, [mintNFTMsg], txFee ? txFee.fee : 'auto');
      setIsTxSuccessful(true);
      dispatch(setShouldRefetchNFTItems(true));
    } catch (error) {
      dispatch(dispatchAlert({
        type: AlertType.Error,
        title: 'NFT Mint Failed',
        message: (error as { message: string}).message,
      }));
    }

    dispatch(setIsTxExecuting(false));
  }, [account, dispatch, getTxFee, nftData, nftId, nftRecipient, nftURI, nftURIHash, selectedCollection?.id, signingClient]);

  const formatData = useCallback((dataToFormat: string) => {
    try {
      const data = btoa(dataToFormat);

      return data;
    } catch (error) {
      dispatch(dispatchAlert({
        type: AlertType.Error,
        title: "Failed to parse data",
        message: (error as { message: string}).message,
      }))
      return '';
    }
  }, []);

  const renderContent = useMemo(() => {
    if (isTxSuccessful) {
      return (
        <div className="flex flex-col w-full p-8 gap-8">
          <div className="flex flex-col text-center gap-6">
            <div className="font-space-grotesk text-lg text-[#EEE] font-medium">
              Successfully Minted Tokens
            </div>
            <div className="flex flex-col items-center w-full gap-2">
              <ModalInfoRow
                label="NFT ID"
                value={nftId}
              />
              <ModalInfoRow
                label="URI"
                value={nftURI}
              />
              <ModalInfoRow
                label="URI Hash"
                value={shortenAddress(nftURIHash)}
              />
              {nftRecipient && (
                <ModalInfoRow
                  label="Recipient"
                  value={shortenAddress(nftRecipient)}
                />
              )}
              {formatData(nftData).length && (
                <ModalInfoRow
                  label="Data"
                  value={formatData(nftData)}
                  className="flex-col !items-start !gap-1"
                  valueClassName="!text-left"
                />
              )}
            </div>
          </div>
          <div className="flex items-center w-full">
            <Button
              label="Done"
              onClick={handleClose}
              type={ButtonType.Primary}
              className="text-sm !py-2 px-6 rounded-[10px] font-semibold"
            />
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col w-full p-8 gap-8">
        <div className="flex flex-col text-center gap-2">
          <div className="font-space-grotesk text-lg text-[#EEE] font-medium">
            Mint NFT
          </div>
          <div className="flex flex-col items-center w-full gap-2">
            <ModalInfoRow
              label="NFT ID"
              value={nftId}
            />
            <ModalInfoRow
              label="URI"
              value={nftURI}
            />
            <ModalInfoRow
              label="URI Hash"
              value={shortenAddress(nftURIHash)}
            />
            {nftRecipient && (
              <ModalInfoRow
                label="Recipient"
                value={shortenAddress(nftRecipient)}
              />
            )}
            {nftData.length && (
              <ModalInfoRow
                label="Data"
                value={btoa(nftData)}
                className="flex-col !items-start !gap-1"
                valueClassName="!text-left"
              />
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button
            label="Cancel"
            onClick={handleClose}
            type={ButtonType.Secondary}
            className="text-sm !py-2 px-6 rounded-[10px] font-semibold w-[160px]"
          />
          <Button
            label="Confirm"
            onClick={handleConfirm}
            type={ButtonType.Primary}
            className="text-sm !py-2 px-6 rounded-[10px] font-semibold w-[160px]"
            loading={isTxExecuting}
            disabled={isTxExecuting}
          />
        </div>
      </div>
    );
  }, [handleClose, handleConfirm, isTxExecuting, isTxSuccessful, nftId, nftRecipient, nftURI, nftURIHash]);

  return (
    <ConfirmationModal isOpen={isConfirmNFTMintModalOpen}>
      <ConfirmationModalImage type={isTxSuccessful ? ConfirmationModalImageType.Success : ConfirmationModalImageType.Mint} />
      {renderContent}
    </ConfirmationModal>
  );
};
