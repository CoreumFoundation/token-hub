import { setIsConfirmEditNFTModalOpen, setIsEditNFTModalOpen, setIsNFTCollectionViewModalOpen } from "@/features/general/generalSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback, useMemo, useState } from "react";
import { Modal } from "../Modal";
import { Button } from "../Button";
import { ButtonType } from "@/shared/types";
import { NFTDataItem, setEditNFTData, setSelectedNFTDataValues } from "@/features/nft/nftSlice";
import { NFTUpdateDataContent } from "../NFTUpdateDataContent";

export const EditNFTModal = () => {
  const isEditNFTModalOpen = useAppSelector(state => state.general.isEditNFTModalOpen);
  const selectedNFTEdit = useAppSelector(state => state.nfts.selectedNFTSend);

  const selectedNFTDataValues = useAppSelector(state => state.nfts.selectedNFTDataValues);

  const dispatch = useAppDispatch();

  const handleCloseModal = useCallback(() => {
    dispatch(setIsEditNFTModalOpen(false));
    dispatch(setSelectedNFTDataValues([]));
  }, []);

  const handleOnClickBackButton = useCallback(() => {
    dispatch(setIsEditNFTModalOpen(false));
    dispatch(setIsNFTCollectionViewModalOpen(true));
    dispatch(setSelectedNFTDataValues([]));
  }, []);

  const isAllDataFilledIn = useMemo(() => {
    let isValid = true;

    for (let item of selectedNFTDataValues) {
      if (!item.currentValue.length) {
        isValid = false;
        break;
      }
    }

    return isValid;
  }, [selectedNFTDataValues]);

  const handleConfirmEditNFTToken = useCallback(() => {
    dispatch(setIsConfirmEditNFTModalOpen(true));
    dispatch(setIsEditNFTModalOpen(false));
  }, [dispatch]);

  const isFormValid = useMemo(() => {
    if (selectedNFTEdit && isAllDataFilledIn) {
      return true;
    }

    return false;
  }, [selectedNFTEdit, isAllDataFilledIn]);

  const handleUpdateDataInList = useCallback((
    newDataValue: string,
    dataIndex: number,
    contentType: 'input' | 'file' | 'current',
  ) => {
    const newData = selectedNFTDataValues.map((data: NFTDataItem, index: number) => {
      if (index === dataIndex) {
        const currentValue = contentType === 'current' ? newDataValue : data.currentValue;
        let contentValue = contentType === 'input' ? newDataValue : data.contentValue;
        let fileValue = contentType === 'file' ? newDataValue : data.fileValue;

        if (currentValue.length) {
          contentValue = '';
          fileValue = '';
        }

        return {
          ...data,
          contentValue,
          fileValue,
          currentValue,
        };
      }

      return data;
    });

    dispatch(setSelectedNFTDataValues(newData));
  }, [selectedNFTDataValues]);

  const handleClearDataInList = useCallback((dataIndex: number) => {
    const newData = selectedNFTDataValues.map((data: NFTDataItem, index: number) => {
      if (index === dataIndex) {
        return {
          ...data,
          contentValue: '',
          fileValue: '',
          currentValue: '',
        };
      }

      return data;
    });

    dispatch(setSelectedNFTDataValues(newData));
  }, [selectedNFTDataValues]);

  const renderNFTData = useMemo(() => {
    if (!selectedNFTDataValues.length) {
      return null;
    }

    return (
      <>
        {selectedNFTDataValues.map((item: NFTDataItem, index: number) => {
          return (
            <NFTUpdateDataContent
              key={`data-${index}`}
              index={index}
              currentValue={item.currentValue || ''}
              contentValue={item.contentValue}
              fileValue={item.fileValue}
              handleUpdateContent={handleUpdateDataInList}
              roles={item.roles}
              handleClearData={handleClearDataInList}
            />
          );
        })}
      </>
    );
  }, [selectedNFTDataValues]);

  return (
    <Modal
      isOpen={isEditNFTModalOpen}
      title="Edit NFT"
      onClose={handleCloseModal}
      wrapperClassName="w-[640px]"
    >
      <div className="flex flex-col w-full gap-8">
        <div className="flex flex-col w-full gap-8">
          <div className="flex flex-col w-full gap-2">
            <p className="text-[#868991] font-noto-sans text-sm leading-[21px]">
              ID
            </p>
            <div className="flex flex-col w-full bg-[#080908] rounded-[10px] py-3 px-4">
              <p className="text-[#EEE] font-noto-sans text-base tracking-[-0.24px]">
                {selectedNFTEdit?.id || ''}
              </p>
            </div>
          </div>
          <div className="flex flex-col w-full gap-2">
            <p className="text-[#868991] font-noto-sans text-sm leading-[21px]">
              Name
            </p>
            <div className="flex flex-col w-full bg-[#080908] rounded-[10px] py-3 px-4">
              <p className="text-[#EEE] font-noto-sans text-base tracking-[-0.24px]">
                {selectedNFTEdit?.name || ''}
              </p>
            </div>
          </div>
          <div className="flex flex-col w-full gap-2">
            <p className="text-[#868991] font-noto-sans text-sm leading-[21px]">
              URI
            </p>
            <div className="flex flex-col w-full bg-[#080908] rounded-[10px] py-3 px-4">
              <p className="text-[#EEE] font-noto-sans text-base tracking-[-0.24px]">
                {`${selectedNFTEdit?.uri || ''}${selectedNFTEdit?.uri_hash || ''}`}
              </p>
            </div>
          </div>
          {renderNFTData}
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
              onClick={handleConfirmEditNFTToken}
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
