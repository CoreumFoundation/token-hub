import { AlertType, ButtonType, ConfirmationModalImageType } from "@/shared/types";
import { ConfirmationModal } from "../ConfirmationModal";
import { ConfirmationModalImage } from "@/assets/ConfirmationModalImage";
import { Button } from "../Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback, useMemo, useState } from "react";
import { setIsConfirmNFTDeWhitelistModalOpen, setIsTxExecuting, setIsWhitelistNFTModalOpen } from "@/features/general/generalSlice";
import { useEstimateTxGasFee } from "@/hooks/useEstimateTxGasFee";
import { NFT } from "coreum-js-nightly";
import { dispatchAlert } from "@/features/alerts/alertsSlice";
import { NFTItem } from "../NFTItem";
import { setSelectedNFTClass, setSelectedNFTSend, setShouldRefetchNFTItems } from "@/features/nft/nftSlice";

export const ConfirmNFTDeWhitelistModal = () => {
  const isConfirmNFTDeWhitelistModalOpen = useAppSelector(state => state.general.isConfirmNFTDeWhitelistModalOpen);
  const selectedNFTSend = useAppSelector(state => state.nfts.selectedNFTSend);
  const selectedNFTClass = useAppSelector(state => state.nfts.selectedNFTClass);
  const account = useAppSelector(state => state.general.account);
  const deWhitelistAccount = useAppSelector(state => state.nfts.deWhitelistAccount);
  const isTxExecuting = useAppSelector(state => state.general.isTxExecuting);

  const [isTxSuccessful, setIsTxSuccessful] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { signingClient, getTxFee } = useEstimateTxGasFee();

  const handleClose = useCallback(() => {
    dispatch(setIsConfirmNFTDeWhitelistModalOpen(false));
    dispatch(setSelectedNFTClass(null));
    dispatch(setSelectedNFTSend(null));
    setIsTxSuccessful(false);
  }, []);

  const handleBackClick = useCallback(() => {
    dispatch(setIsConfirmNFTDeWhitelistModalOpen(false));
    dispatch(setIsWhitelistNFTModalOpen(true));
  }, []);

  const handleConfirm = useCallback(async () => {
    dispatch(setIsTxExecuting(true));

    try {
      const whitelistNFTMsg = NFT.RemoveFromWhitelist({
        sender: account,
        account: deWhitelistAccount,
        classId: selectedNFTClass?.id || '',
        id: selectedNFTSend?.id || '',
      });
      const txFee = await getTxFee([whitelistNFTMsg]);
      await signingClient?.signAndBroadcast(account, [whitelistNFTMsg], txFee ? txFee.fee : 'auto');
      setIsTxSuccessful(true);
      dispatch(setShouldRefetchNFTItems(true));
    } catch (error) {
      dispatch(dispatchAlert({
        type: AlertType.Error,
        title: 'NFT Whitelist Failed',
        message: (error as { message: string}).message,
      }));
    }

    dispatch(setIsTxExecuting(false));
  }, [account, getTxFee, selectedNFTSend, signingClient, deWhitelistAccount, selectedNFTClass]);

  const renderContent = useMemo(() => {
    if (isTxSuccessful) {
      return (
        <div className="flex flex-col w-full p-8 gap-8">
          <div className="flex flex-col text-center font-space-grotesk text-lg text-[#EEE] font-medium">
            Successfully De-Whitelist NFT
          </div>
          <div className="flex items-center justify-center w-full">
            <div className="flex flex-col items-center">
              <NFTItem
                label={selectedNFTSend?.id || ''}
                imgPath={selectedNFTSend?.image || ''}
                description={selectedNFTClass?.name}
                className="text-[#eee] text-base hover:bg-[#17191E] hover"
              />
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
            De-Whitelist NFT
          </div>
          <div className="font-noto-sans text-sm text-[#868991]">
            This action will be applied and affect this targeted holder. Would you like to proceed?
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
  }, [
    handleBackClick,
    handleClose,
    handleConfirm,
    isTxExecuting,
    isTxSuccessful,
    selectedNFTClass?.name,
    selectedNFTSend,
  ]);

  return (
    <ConfirmationModal isOpen={isConfirmNFTDeWhitelistModalOpen}>
      <ConfirmationModalImage
        type={isTxSuccessful
          ? ConfirmationModalImageType.Success
          : ConfirmationModalImageType.Whitelist
        }
      />
      {renderContent}
    </ConfirmationModal>
  );
};
