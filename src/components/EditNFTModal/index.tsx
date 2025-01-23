import { setIsConfirmEditNFTModalOpen, setIsConfirmNFTDeWhitelistModalOpen, setIsDeWhitelistNFTModalOpen, setIsEditNFTModalOpen, setIsNFTCollectionViewModalOpen } from "@/features/general/generalSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback, useMemo, useState } from "react";
import { Modal } from "../Modal";
import { Button } from "../Button";
import { ButtonType, ChainInfo } from "@/shared/types";
import { NFTItem } from "../NFTItem";
import { Input } from "../Input";
import { pasteValueFromClipboard } from "@/helpers/pasteValueFromClipboard";
import { validateAddress } from "@/helpers/validateAddress";
import { setDeWhitelistAccount, setEditNFTData } from "@/features/nft/nftSlice";
import { FileUpload } from "../FileUpload";
import { TextArea } from "../TextArea";
import classNames from "classnames";

export const EditNFTModal = () => {
  const isEditNFTModalOpen = useAppSelector(state => state.general.isEditNFTModalOpen);
  const selectedNFTSend = useAppSelector(state => state.nfts.selectedNFTSend);
  const selectedNFTClass = useAppSelector(state => state.nfts.selectedNFTClass);
  const chains = useAppSelector(state => state.chains.list);

  const [data, setData] = useState<string>('');
  const [fileContent, setFileContent] = useState<string>('');

  const coreumChain = useMemo(() => {
    return chains.find((chain: ChainInfo) => chain.pretty_name.toLowerCase() === 'coreum');
  }, [chains]);

  const dispatch = useAppDispatch();

  const handleCloseModal = useCallback(() => {
    dispatch(setIsEditNFTModalOpen(false));
    setData('');
  }, []);

  const handleOnClickBackButton = useCallback(() => {
    dispatch(setIsEditNFTModalOpen(false));
    dispatch(setIsNFTCollectionViewModalOpen(true));
    setData('');
  }, []);

  const handleConfirmEditNFTToken = useCallback(() => {
    dispatch(setIsConfirmEditNFTModalOpen(true));
    dispatch(setIsEditNFTModalOpen(false));
    dispatch(setEditNFTData(fileContent.length ? fileContent : data));
    setData('');
  }, [data]);

  const isFormValid = useMemo(() => {
    if (selectedNFTSend && (!!data.length || !!fileContent.length)) {
      return true;
    }

    return false;
  }, [selectedNFTSend, data.length, fileContent.length]);

  return (
    <Modal
      isOpen={isEditNFTModalOpen}
      title="Edit NFT"
      onClose={handleCloseModal}
      wrapperClassName="w-[640px]"
    >
      <div className="flex flex-col w-full gap-8">
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-full gap-2">
            <p className="text-[#868991] font-noto-sans text-sm leading-[21px]">
              Name
            </p>
            <div className="flex flex-col w-full bg-[#080908] rounded-[10px] py-3 px-4">
              <p className="text-[#EEE] font-noto-sans text-base tracking-[-0.24px]">
                {selectedNFTSend?.name || ''}
              </p>
            </div>
          </div>
          <div className="flex flex-col w-full gap-2">
            <p className="text-[#868991] font-noto-sans text-sm leading-[21px]">
              URI
            </p>
            <div className="flex flex-col w-full bg-[#080908] rounded-[10px] py-3 px-4">
              <p className="text-[#EEE] font-noto-sans text-base tracking-[-0.24px]">
                {`${selectedNFTSend?.uri || ''}${selectedNFTSend?.uri_hash || ''}`}
              </p>
            </div>
          </div>
          <div className="flex flex-col w-full gap-2 items-center">
            <div className="flex items-center justify-start w-full">
              <label
                className="block text-sm text-[#868991] font-noto-sans"
              >
                Data
              </label>
            </div>
            <FileUpload
              setFileContent={setFileContent}
              disabled={!!data.length}
            />
            <div className="flex w-full items-center my-2 justify-center border-t border-dashed border-[#1B1D23] relative h-1">
              <div className="flex items-center px-2 -mt-1 text-[#868991] text-sm font-noto-sans bg-[#101216]">
                Or
              </div>
            </div>
            <TextArea
              id="data"
              value={data}
              onChange={setData}
              placeholder="Type content here"
              rows={4}
              className={classNames({
                '!bg-[#080908] !border-transparent': !!fileContent.length,
              })}
              disabled={!!fileContent.length}
            />
          </div>
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
