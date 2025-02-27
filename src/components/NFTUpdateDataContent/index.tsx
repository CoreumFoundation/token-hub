import { FC, useCallback, useMemo, useState } from "react";
import { FileUploadSingle } from "../FileUploadSingle";
import { Input } from "../Input";
import { DataEditor } from "coreum-js-nightly/dist/main/coreum/asset/nft/v1/types";
import { Switch } from "../Switch";
import { TextArea } from "../TextArea";

interface NFTUpdateDataContentProps {
  index: number;
  currentValue: string;
  contentValue: string;
  fileValue: string;
  handleUpdateContent: (value: string, index: number, contentType: 'input' | 'file' | 'current') => void;
  roles: DataEditor[];
  handleClearData: (index: number) => void;
}

export const NFTUpdateDataContent: FC<NFTUpdateDataContentProps> = ({
  index,
  currentValue,
  contentValue,
  fileValue,
  handleUpdateContent,
  roles,
  handleClearData,
}) => {
  const [isEditClicked, setEditClicked] = useState<boolean>(false);
  const [isNewDataOpened, setIsNewDataOpened] = useState<boolean>(false);

  const handleValidateEnteredData = useCallback((value: string) => {
    try {
      btoa(value);

      return undefined;
    } catch (error) {
      return 'Failed to parse data';
    }
  }, []);

  const isAdminEnabled = useMemo(() => {
    const adminEnabled = roles?.indexOf(DataEditor.admin);

    return adminEnabled !== -1;
  }, [roles]);

  const isOwnerEnabled = useMemo(() => {
    const ownerEnabled = roles?.indexOf(DataEditor.owner);

    return ownerEnabled !== -1;
  }, [roles]);

  const handleEditClick = useCallback(() => {
    if (isEditClicked) {
      setEditClicked(false);
      setIsNewDataOpened(false);

      const newValue = !!currentValue.length
        ? currentValue
        : !!fileValue.length
          ? fileValue
          : contentValue;

      console.log(newValue);

      handleUpdateContent(newValue, index, 'current');
    } else {
      setEditClicked(true);
    }
  }, [contentValue, currentValue, fileValue, index, isEditClicked]);

  const handleClearNFTData = useCallback(() => {
    setIsNewDataOpened(true);
    setEditClicked(true);
    handleClearData(index);
  }, [handleUpdateContent]);

  const handleUpdateTextAreaContent = useCallback((value: string) => {
    if (isEditClicked) {
      handleUpdateContent(value, index, 'current');
    }
  }, [isEditClicked, handleUpdateContent, index]);

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex flex-col w-full gap-2 items-center bg-custom-grey p-3 rounded-xl backdrop-blur-[5px]">
        <div className="flex items-center w-full justify-start">
          <p className="text-[#868991] text-sm font-noto-sans font-normal leading-[21px]">
            Data
          </p>
        </div>
        <TextArea
          value={currentValue}
          rows={3}
          onChange={handleUpdateTextAreaContent}
          placeholder=""
          className={!isEditClicked ? 'bg-[#080908]' : ''}
          disabled={!isEditClicked || !!fileValue.length || !!contentValue.length}
        />
        <div className="flex items-center justify-between w-full gap-4">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-1.5">
              <p className="text-[#9FA2AC] text-sm font-noto-sans leading-[21px]">
                Owner Edit
              </p>
              <Switch
                enabled={isOwnerEnabled}
                setEnabled={() => {}}
              />
            </div>
            <div className="flex items-center gap-1.5">
              <p className="text-[#9FA2AC] text-sm font-noto-sans leading-[21px]">
                Admin Edit
              </p>
              <Switch
                enabled={isAdminEnabled}
                setEnabled={() => {}}
              />
            </div>
          </div>
          <div className="flex items-center gap-5">
            <p className="text-[#FFF] font-noto-sans text-sm font-medium leading-[21px] tracking-[-0.21px] cursor-pointer" onClick={handleEditClick}>
              {isEditClicked ? 'Save' : 'Edit Data'}
            </p>
            <div className="">
              <p className="text-[#D81D3C] font-noto-sans text-sm font-medium leading-[21px] tracking-[-0.21px] cursor-pointer" onClick={handleClearNFTData}>
                Clear Data
              </p>
            </div>
          </div>
        </div>
      </div>
      {isNewDataOpened && (
        <div className="flex flex-col w-full gap-2 items-center bg-custom-grey p-3 rounded-xl backdrop-blur-[5px]">
          <div className="flex items-center w-full justify-start">
            <p className="text-[#868991] text-sm font-noto-sans font-normal leading-[21px]">
              New Data
            </p>
          </div>
          <FileUploadSingle
            setFileContent={(value: string) => handleUpdateContent(value, index, 'file')}
            disabled={!!contentValue.length || !!currentValue.length}
          />
          <div className="flex w-full items-center my-2 justify-center border-t border-dashed border-[#1B1D23] relative h-1">
            <div className="flex items-center px-2 -mt-1 text-[#868991] text-sm font-noto-sans bg-[#101216]">
              Or
            </div>
          </div>
          <Input
            value={contentValue}
            onChange={(e: string) => handleUpdateContent(e, index, 'input')}
            label=""
            placeholder="Type content here"
            disabled={!!fileValue.length || !!currentValue.length}
            error={handleValidateEnteredData(contentValue)}
          />
        </div>
      )}
    </div>
  );
};
