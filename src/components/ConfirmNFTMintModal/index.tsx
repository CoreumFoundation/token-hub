import { AlertType, ButtonType, ConfirmationModalImageType } from "@/shared/types";
import { ConfirmationModal } from "../ConfirmationModal";
import { ConfirmationModalImage } from "@/assets/ConfirmationModalImage";
import { Button } from "../Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback, useMemo, useState } from "react";
import { setIsConfirmNFTMintModalOpen, setIsTxExecuting } from "@/features/general/generalSlice";
import { useEstimateTxGasFee } from "@/hooks/useEstimateTxGasFee";
import { NFT } from "coreum-js-nightly";
import { ModalInfoRow } from "../ModalInfoRow";
import { dispatchAlert } from "@/features/alerts/alertsSlice";
import {
  defaultNFTDataItem,
  NFTDataItem,
  setDataEditable,
  setNFTData,
  setNFTID,
  setNFTMultipleDataValues,
  setNFTRecipient,
  setNFTURI,
  setNFTURIHash,
  setSelectedNFTClass,
  setShouldRefetchNFTItems,
} from "@/features/nft/nftSlice";
import { shortenAddress } from "@/helpers/shortenAddress";
import { convertStringToAny, convertStringToDataDynamic } from "@/helpers/convertStringToAny";
import { DataEditor } from "coreum-js-nightly/dist/main/coreum/asset/nft/v1/types";

export const ConfirmNFTMintModal = () => {
  const isConfirmNFTMintModalOpen = useAppSelector(state => state.general.isConfirmNFTMintModalOpen);
  const isTxExecuting = useAppSelector(state => state.general.isTxExecuting);
  const account = useAppSelector(state => state.general.account);

  const selectedCollection = useAppSelector(state => state.nfts.selectedNFTClass);
  const nftId = useAppSelector(state => state.nfts.nftID);
  const nftURI = useAppSelector(state => state.nfts.nftURI);
  const nftURIHash = useAppSelector(state => state.nfts.nftURIHash);
  const nftRecipient = useAppSelector(state => state.nfts.nftRecipient);
  const isDataEditable = useAppSelector(state => state.nfts.isDataEditable);

  const nftMultipleDataValues = useAppSelector(state => state.nfts.nftMultipleDataValues);

  const [isTxSuccessful, setIsTxSuccessful] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { signingClient, getTxFee } = useEstimateTxGasFee();

  const handleClose = useCallback(() => {
    dispatch(setNFTID(''));
    dispatch(setNFTURI(''));
    dispatch(setNFTURIHash(''));
    dispatch(setNFTRecipient(''));
    dispatch(setNFTData(''));
    dispatch(setDataEditable(false));
    dispatch(setNFTMultipleDataValues([defaultNFTDataItem]));
    dispatch(setIsConfirmNFTMintModalOpen(false));
    dispatch(setSelectedNFTClass(null));
    setIsTxSuccessful(false);
  }, []);

  const dataList = useMemo(() => {
    return nftMultipleDataValues.map((item: NFTDataItem) => {
      return {
        editors: item.roles,
        data: item.contentValue.length
          ? item.contentValue
          : item.fileValue,
      };
    }).filter((item: { editors: DataEditor[]; data: string; }) => !!item.data.length);
  }, [nftMultipleDataValues]);

  const handleConfirm = useCallback(async () => {
    dispatch(setIsTxExecuting(true));
    try {
      let nftDataPayload: any;

      if (isDataEditable) {
        let payload = [];

        for (const dataItem of dataList) {
          payload.push({ editors: dataItem.editors, data: btoa(dataItem.data) });
        }

        nftDataPayload = convertStringToDataDynamic(payload);
      } else {
        nftDataPayload = convertStringToAny(dataList?.[0].data);
      }

      const nftMintObj = {
        sender: account,
        classId: selectedCollection?.id || '',
        id: nftId,
        uri: nftURI,
        uriHash: nftURIHash,
        recipient: nftRecipient,
        data: nftDataPayload as any,
      };

      let mintNFTMsg = NFT.Mint(nftMintObj);

      if (nftDataPayload && (nftDataPayload as any).array.length) {
        mintNFTMsg = {
          ...mintNFTMsg,
          value: {
            ...mintNFTMsg.value,
            data: {
              typeUrl: (nftDataPayload as any)?.array[0],
              value: (nftDataPayload as any)?.array[1],
            } as any,
          }
        };
      }

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
  }, [
    account,
    getTxFee,
    isDataEditable,
    nftId,
    nftRecipient,
    nftURI,
    nftURIHash,
    selectedCollection?.id,
    signingClient,
    dataList,
  ]);

  const formatData = useCallback((dataToFormat: string) => {
    try {
      const data = btoa(dataToFormat);

      return data;
    } catch (error) {
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
              {isDataEditable
                ? (
                  <ModalInfoRow
                    label="Data"
                    value={"Multiple"}
                    className="flex-col !items-start !gap-1"
                    valueClassName="!text-left"
                  />
                ) : formatData(dataList?.[0].data).length ? (
                <ModalInfoRow
                  label="Data"
                  value={formatData(dataList?.[0].data)}
                  className="flex-col !items-start !gap-1"
                  valueClassName="!text-left"
                />
              ) : ''}
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
            {isDataEditable
              ? (
                <ModalInfoRow
                  label="Data"
                  value={"Multiple"}
                  className="flex-col !items-start !gap-1"
                  valueClassName="!text-left"
                />
              ) : formatData(dataList?.[0]?.data).length ? (
              <ModalInfoRow
                label="Data"
                value={formatData(dataList?.[0]?.data)}
                className="flex-col !items-start !gap-1"
                valueClassName="!text-left"
              />
            ) : ''}
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
  }, [
    formatData,
    handleClose,
    handleConfirm,
    isTxExecuting,
    isTxSuccessful,
    nftId,
    nftRecipient,
    nftURI,
    nftURIHash,
    dataList,
    isDataEditable,
  ]);

  return (
    <ConfirmationModal isOpen={isConfirmNFTMintModalOpen}>
      <ConfirmationModalImage type={isTxSuccessful ? ConfirmationModalImageType.Success : ConfirmationModalImageType.Mint} />
      {renderContent}
    </ConfirmationModal>
  );
};
