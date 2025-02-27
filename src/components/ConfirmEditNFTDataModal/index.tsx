import { AlertType, ButtonType, ConfirmationModalImageType } from "@/shared/types";
import { ConfirmationModal } from "../ConfirmationModal";
import { ConfirmationModalImage } from "@/assets/ConfirmationModalImage";
import { Button } from "../Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback, useMemo, useState } from "react";
import { setIsConfirmEditNFTModalOpen, setIsEditNFTModalOpen, setIsTxExecuting } from "@/features/general/generalSlice";
import { useEstimateTxGasFee } from "@/hooks/useEstimateTxGasFee";
import { NFT } from "coreum-js-nightly";
import { dispatchAlert } from "@/features/alerts/alertsSlice";
import { setSelectedNFTClass, setSelectedNFTSend, setShouldRefetchNFTItems } from "@/features/nft/nftSlice";
import { DataDynamicIndexedItem } from "coreum-js-nightly/dist/main/coreum/asset/nft/v1/types";
import { convertStringToUint8Array } from "@/helpers/convertStringToAny";

export const ConfirmEditNFTDataModal = () => {
  const isConfirmEditNFTModalOpen = useAppSelector(state => state.general.isConfirmEditNFTModalOpen);
  const selectedNFTSend = useAppSelector(state => state.nfts.selectedNFTSend);
  const selectedNFTClass = useAppSelector(state => state.nfts.selectedNFTClass);
  const account = useAppSelector(state => state.general.account);
  const isTxExecuting = useAppSelector(state => state.general.isTxExecuting);

  const selectedNFTDataValues = useAppSelector(state => state.nfts.selectedNFTDataValues);

  const [isTxSuccessful, setIsTxSuccessful] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { signingClient, getTxFee } = useEstimateTxGasFee();

  const handleClose = useCallback(() => {
    dispatch(setIsConfirmEditNFTModalOpen(false));
    dispatch(setSelectedNFTClass(null));
    dispatch(setSelectedNFTSend(null));
    setIsTxSuccessful(false);
  }, []);

  const handleBackClick = useCallback(() => {
    dispatch(setIsConfirmEditNFTModalOpen(false));
    dispatch(setIsEditNFTModalOpen(true));
  }, []);

  const handleConfirm = useCallback(async () => {
    dispatch(setIsTxExecuting(true));

    try {
      let updatedNFTDataPayload = [];

      for (const index in selectedNFTDataValues) {
        const dataValue = DataDynamicIndexedItem.create({
          index: +index,
          data: convertStringToUint8Array(selectedNFTDataValues[index].currentValue),
        });

        updatedNFTDataPayload.push(dataValue);
      }

      const editNFTDataMsg = NFT.UpdateData({
        sender: account,
        classId: selectedNFTClass?.id || '',
        id: selectedNFTSend?.id || '',
        items: updatedNFTDataPayload,
      });

      const txFee = await getTxFee([editNFTDataMsg]);
      await signingClient?.signAndBroadcast(account, [editNFTDataMsg], txFee ? txFee.fee : 'auto');
      setIsTxSuccessful(true);
      dispatch(setShouldRefetchNFTItems(true));
    } catch (error) {
      console.log({ error });

      dispatch(dispatchAlert({
        type: AlertType.Error,
        title: 'Update NFT Data Failed',
        message: (error as { message: string}).message,
      }));
    }

    dispatch(setIsTxExecuting(false));
  }, [account, getTxFee, selectedNFTSend, signingClient, selectedNFTClass, selectedNFTDataValues]);

  const renderContent = useMemo(() => {
    if (isTxSuccessful) {
      return (
        <div className="flex flex-col w-full p-8 gap-8">
          <div className="flex flex-col text-center font-space-grotesk text-lg text-[#EEE] font-medium">
            Successfully Updated NFT Data
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
            Edit NFT Data
          </div>
          <div className="font-noto-sans text-sm text-[#868991]">
            This action will immediately update the NFT data and might affect the current owner. Would you like to proceed?
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button
            label="Back"
            onClick={handleBackClick}
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
  }, [handleBackClick, handleClose, handleConfirm, isTxExecuting, isTxSuccessful]);

  return (
    <ConfirmationModal isOpen={isConfirmEditNFTModalOpen}>
      <ConfirmationModalImage
        type={isTxSuccessful
          ? ConfirmationModalImageType.Success
          : ConfirmationModalImageType.Edit
        }
      />
      {renderContent}
    </ConfirmationModal>
  );
};
