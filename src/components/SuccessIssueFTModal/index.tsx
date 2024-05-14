import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ConfirmationModal } from "../ConfirmationModal";
import { AlertType, ButtonType, ConfirmationModalImageType, GeneralIconType, Network } from "@/shared/types";
import { ConfirmationModalImage } from "@/assets/ConfirmationModalImage";
import { useCallback, useMemo } from "react";
import { ModalInfoRow } from "../ModalInfoRow";
import { Button } from "../Button";
import { setIsSuccessIssueFTModalOpen } from "@/features/general/generalSlice";
import { setIssuedToken } from "@/features/currencies/currenciesSlice";
import { Feature } from "coreum-js";
import { Decimal } from "../Decimal";
import { convertSubunitToUnit } from "@/helpers/convertUnitToSubunit";
import { shortenAddress } from "@/helpers/shortenAddress";
import { Input } from "../Input";
import { dispatchAlert } from "@/features/alerts/alertsSlice";
import { GeneralIcon } from "@/assets/GeneralIcon";
import Link from "next/link";

export const SuccessIssueFTModal = () => {
  const isSuccessIssueFTModalOpen = useAppSelector(state => state.general.isSuccessIssueFTModalOpen);
  const issuedFTToken = useAppSelector(state => state.currencies.issuedToken);
  const network = useAppSelector(state => state.general.network);

  const dispatch = useAppDispatch();

  const handleClose = useCallback(() => {
    dispatch(setIsSuccessIssueFTModalOpen(false));
    dispatch(setIssuedToken(null));
  }, []);

  const convertFeatureToString = useCallback((feature: Feature) => {
    switch (feature) {
      case Feature.minting:
        return 'minting';
      case Feature.burning:
        return 'burning';
      case Feature.freezing:
        return 'freezing';
      case Feature.whitelisting:
        return 'whitelisting';
      case Feature.ibc:
        return 'ibc';
      case Feature.block_smart_contracts:
        return 'block_smart_contracts';
      default:
        return feature;
    }
  }, []);

  const convertedFeatures = useMemo(() => {
    if (!issuedFTToken || !issuedFTToken.features.length) {
      return '-';
    }

    return (
      <div className="flex flex-1 gap-1 flex-wrap justify-end">
        {issuedFTToken.features.map((item: Feature) => {
          const feature = convertFeatureToString(item);

          return (
            <Button
              key={`feature-${feature}`}
              label={String(feature)}
              onClick={() => {}}
              type={ButtonType.Secondary}
              className="!py-0.5 px-2 text-sm !w-fit !rounded enabled:hover:!opacity-100"
            />
          );
        })}
      </div>
    );
  }, [convertFeatureToString, issuedFTToken]);

  const handleCopyTransactionHash = useCallback(() => {
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = issuedFTToken?.txHash || '';

    document.body.appendChild(tempTextArea);

    tempTextArea.select();
    tempTextArea.setSelectionRange(0, 99999);

    document.execCommand('copy');
    document.body.removeChild(tempTextArea);

    dispatch(dispatchAlert({
      type: AlertType.Success,
      title: 'Transaction hash was copied!'
    }));
  }, [issuedFTToken]);

  const renderTxHashIcons = useMemo(() => {
    const explorerUrl = network === Network.Mainnet
      ? `https://explorer.coreum.com/coreum/transactions/${issuedFTToken?.txHash || ''}`
      : `https://explorer.testnet-1.coreum.dev/coreum/transactions/${issuedFTToken?.txHash || ''}`;

    return (
      <div className="flex items-center gap-1">
        <GeneralIcon type={GeneralIconType.Copy} onClick={handleCopyTransactionHash} className="group cursor-pointer" pathClassName="group-hover:fill-[#eee]" />
        <Link href={explorerUrl} target="_blank"><GeneralIcon type={GeneralIconType.Explorer} className="group cursor-pointer" pathClassName="group-hover:fill-[#eee]" /></Link>
      </div>
    );
  }, [handleCopyTransactionHash, issuedFTToken?.txHash, network]);

  return (
    <ConfirmationModal isOpen={isSuccessIssueFTModalOpen}>
      <ConfirmationModalImage type={ConfirmationModalImageType.Success} />
      <div className="flex flex-col w-full p-8 gap-8">
        <div className="flex flex-col text-center gap-6">
          <div className="font-space-grotesk text-lg text-[#EEE] font-medium">
            Successfully Created Token
          </div>
          <div className="flex flex-col items-center w-full gap-2">
            <ModalInfoRow
              label="Symbol"
              value={issuedFTToken?.symbol}
            />
            <ModalInfoRow
              label="Subunit"
              value={issuedFTToken?.subunit}
            />
            <ModalInfoRow
              label="Precision"
              value={issuedFTToken?.precision}
            />
            <ModalInfoRow
              label="Initial Amount"
              value={(
                <div className="flex flex-wrap max-w-full gap-1 w-full items-baseline justify-end">
                  <Decimal
                    className="break-all max-w-full !inline"
                    value={issuedFTToken?.initialAmount || '0'}
                    precision={Number(issuedFTToken?.precision) || 0}
                  />
                  <span className="text-left text-xs max-w-full break-all">{issuedFTToken?.symbol.toUpperCase()}</span>
                </div>
              )}
            />
            <ModalInfoRow
              label="URL"
              value={shortenAddress(issuedFTToken?.uri || '')}
            />
            <ModalInfoRow
              label="Token Features"
              value={convertedFeatures}
              className={issuedFTToken?.features.length ? 'items-baseline' : ''}
            />
            <ModalInfoRow
              label="Description"
              value={issuedFTToken?.description}
              className="flex-col !items-start !gap-1"
              valueClassName="!text-left"
            />
          </div>
        </div>
        <div className="flex items-center w-full">
         <Input
            label={"Transaction Hash"}
            value={issuedFTToken?.txHash || ''}
            placeholder=""
            icon={renderTxHashIcons}
            className="!items-start"
          />
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
    </ConfirmationModal>
  );
};
