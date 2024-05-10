import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ConfirmationModal } from "../ConfirmationModal";
import { ButtonType, ConfirmationModalImageType } from "@/shared/types";
import { ConfirmationModalImage } from "@/assets/ConfirmationModalImage";
import { useCallback, useMemo } from "react";
import { ModalInfoRow } from "../ModalInfoRow";
import { Button } from "../Button";
import { setIsSuccessIssueNFTModalOpen } from "@/features/general/generalSlice";
import { ClassFeature } from "coreum-js";
import { setIssuedNFTCollection } from "@/features/nft/nftSlice";
import { shortenAddress } from "@/helpers/shortenAddress";

export const SuccessIssueNFTModal = () => {
  const isSuccessIssueNFTModalOpen = useAppSelector(state => state.general.isSuccessIssueNFTModalOpen);
  const issuedNFTCollection = useAppSelector(state => state.nfts.issuedNFTCollection);

  const dispatch = useAppDispatch();

  const handleClose = useCallback(() => {
    dispatch(setIsSuccessIssueNFTModalOpen(false));
    dispatch(setIssuedNFTCollection(null));
  }, []);

  const convertFeatureToString = useCallback((feature: ClassFeature) => {
    switch (feature) {
      case ClassFeature.burning:
        return 'burning';
      case ClassFeature.freezing:
        return 'freezing';
      case ClassFeature.whitelisting:
        return 'whitelisting';
      case ClassFeature.disable_sending:
        return 'disable_sending';
      default:
        return feature;
    }
  }, []);

  const convertedFeatures = useMemo(() => {
    if (!issuedNFTCollection || !issuedNFTCollection?.features.length) {
      return '-';
    }

    return (
      <div className="flex flex-1 gap-1 flex-wrap justify-end">
        {issuedNFTCollection.features.map((item: ClassFeature) => {
          const feature = convertFeatureToString(item);

          return (
            <Button
              key={`feature-${feature}`}
              label={String(feature)}
              onClick={() => {}}
              type={ButtonType.Secondary}
              className="py-0.5 px-2 text-sm !w-fit rounded"
            />
          );
        })}
      </div>
    );
  }, [convertFeatureToString, issuedNFTCollection]);

  return (
    <ConfirmationModal isOpen={isSuccessIssueNFTModalOpen}>
      <ConfirmationModalImage type={ConfirmationModalImageType.Success} />
      <div className="flex">
        <div className="flex flex-col w-full p-8 gap-8">
          <div className="flex flex-col text-center gap-6">
            <div className="font-space-grotesk text-lg text-[#EEE] font-medium">
              Successfully Created Collection
            </div>
            <div className="flex flex-col items-center w-full gap-2">
              <ModalInfoRow
                label="Name"
                value={issuedNFTCollection?.name}
              />
              <ModalInfoRow
                label="Symbol"
                value={issuedNFTCollection?.symbol}
              />
              <ModalInfoRow
                label="Royalties"
                value={`${issuedNFTCollection?.royalties} %`}
              />
              <ModalInfoRow
                label="URI"
                value={issuedNFTCollection?.uri}
              />
              <ModalInfoRow
                label="URI Hash"
                value={shortenAddress(issuedNFTCollection?.uriHash || '')}
              />
              <ModalInfoRow
                label="Token Capabilities"
                value={convertedFeatures}
                className={issuedNFTCollection?.features.length ? 'items-baseline' : ''}
              />
              <ModalInfoRow
                label="Description"
                value={issuedNFTCollection?.description}
                className="flex-col !items-start !gap-1"
                valueClassName="!text-left"
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
      </div>
    </ConfirmationModal>
  );
};
