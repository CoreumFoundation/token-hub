import { useEffect, useMemo } from "react";
import { useAppSelector } from "@/store/hooks";

export const ModalsHandler = () => {
  const isConnectModalOpen = useAppSelector(state => state.general.isConnectModalOpen);
  const isManageCurrencyModalOpen = useAppSelector(state => state.general.isManageCurrencyModalOpen);
  const isBurnCurrencyModalOpen = useAppSelector(state => state.general.isBurnCurrencyModalOpen);
  const isConfirmMintModalOpen = useAppSelector(state => state.general.isConfirmMintModalOpen);
  const isConfirmFreezeModalOpen = useAppSelector(state => state.general.isConfirmFreezeModalOpen);
  const isConfirmGlobalFreezeModalOpen = useAppSelector(state => state.general.isConfirmGlobalFreezeModalOpen);
  const isConfirmUnfreezeModalOpen = useAppSelector(state => state.general.isConfirmUnfreezeModalOpen);
  const isConfirmGlobalUnfreezeModalOpen = useAppSelector(state => state.general.isConfirmGlobalUnfreezeModalOpen);
  const isConfirmWhitelistModalOpen = useAppSelector(state => state.general.isConfirmWhitelistModalOpen);
  const isConfirmBurnModalOpen = useAppSelector(state => state.general.isConfirmBurnModalOpen);
  const isSelectNFTModalOpen = useAppSelector(state => state.general.isSelectNFTModalOpen);
  const isNFTCollectionViewModalOpen = useAppSelector(state => state.general.isNFTCollectionViewModalOpen);
  const isNFTMintModalOpen = useAppSelector(state => state.general.isNFTMintModalOpen);
  const isConfirmNFTMintModalOpen = useAppSelector(state => state.general.isConfirmNFTMintModalOpen);
  const isFreezeNFTModalOpen = useAppSelector(state => state.general.isFreezeNFTModalOpen);
  const isUnfreezeNFTModalOpen = useAppSelector(state => state.general.isUnfreezeNFTModalOpen);
  const isBurnNFTModalOpen = useAppSelector(state => state.general.isBurnNFTModalOpen);
  const isWhitelistNFTModalOpen = useAppSelector(state => state.general.isWhitelistNFTModalOpen);
  const isConfirmNFTBurnModalOpen = useAppSelector(state => state.general.isConfirmNFTBurnModalOpen);
  const isConfirmNFTFreezeModalOpen = useAppSelector(state => state.general.isConfirmNFTFreezeModalOpen);
  const isConfirmNFTUnfreezeModalOpen = useAppSelector(state => state.general.isConfirmNFTUnfreezeModalOpen);
  const isConfirmNFTWhitelistModalOpen = useAppSelector(state => state.general.isConfirmNFTWhitelistModalOpen);
  const isSuccessIssueFTModalOpen = useAppSelector(state => state.general.isSuccessIssueFTModalOpen);
  const isSuccessIssueNFTModalOpen = useAppSelector(state => state.general.isSuccessIssueNFTModalOpen);
  const isDeWhitelistNFTModalOpen = useAppSelector(state => state.general.isDeWhitelistNFTModalOpen);
  const isConfirmNFTDeWhitelistModalOpen = useAppSelector(state => state.general.isConfirmNFTDeWhitelistModalOpen);


  const isOpen = useMemo(() => {
    return isConnectModalOpen
      || isManageCurrencyModalOpen
      || isBurnCurrencyModalOpen
      || isConfirmMintModalOpen
      || isConfirmFreezeModalOpen
      || isConfirmGlobalFreezeModalOpen
      || isConfirmUnfreezeModalOpen
      || isConfirmGlobalUnfreezeModalOpen
      || isConfirmWhitelistModalOpen
      || isConfirmBurnModalOpen
      || isSelectNFTModalOpen
      || isNFTCollectionViewModalOpen
      || isNFTMintModalOpen
      || isConfirmNFTMintModalOpen
      || isUnfreezeNFTModalOpen
      || isBurnNFTModalOpen
      || isWhitelistNFTModalOpen
      || isConfirmNFTBurnModalOpen
      || isConfirmNFTFreezeModalOpen
      || isConfirmNFTUnfreezeModalOpen
      || isConfirmNFTWhitelistModalOpen
      || isSuccessIssueFTModalOpen
      || isSuccessIssueNFTModalOpen
      || isDeWhitelistNFTModalOpen
      || isConfirmNFTDeWhitelistModalOpen
      || isFreezeNFTModalOpen
  }, [
    isBurnCurrencyModalOpen,
    isBurnNFTModalOpen,
    isConfirmBurnModalOpen,
    isConfirmFreezeModalOpen,
    isConfirmGlobalFreezeModalOpen,
    isConfirmGlobalUnfreezeModalOpen,
    isConfirmMintModalOpen,
    isConfirmNFTBurnModalOpen,
    isConfirmNFTDeWhitelistModalOpen,
    isConfirmNFTFreezeModalOpen,
    isConfirmNFTMintModalOpen,
    isConfirmNFTUnfreezeModalOpen,
    isConfirmNFTWhitelistModalOpen,
    isConfirmUnfreezeModalOpen,
    isConfirmWhitelistModalOpen,
    isConnectModalOpen,
    isDeWhitelistNFTModalOpen,
    isManageCurrencyModalOpen,
    isNFTCollectionViewModalOpen,
    isNFTMintModalOpen,
    isSelectNFTModalOpen,
    isSuccessIssueFTModalOpen,
    isSuccessIssueNFTModalOpen,
    isUnfreezeNFTModalOpen,
    isWhitelistNFTModalOpen,
    isFreezeNFTModalOpen
  ]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'scroll';
    };
  }, [isOpen]);

  return null;
};
