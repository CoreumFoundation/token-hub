import { FC, useCallback, useMemo } from "react";
import { FileUploadSingle } from "../FileUploadSingle";
import { Input } from "../Input";
import { Checkbox } from "../Checkbox";
import { DataEditor } from "coreum-js-nightly/dist/main/coreum/asset/nft/v1/types";
import classNames from "classnames";

interface NFTUploadContentProps {
  index: number;
  contentValue: string;
  fileValue: string;
  handleUpdateContent: (value: string, index: number, contentType: 'input' | 'file') => void;
  isEditEnabled: boolean;
  handleEnableRole: (value: boolean, index: number, role: 'admin' | 'owner') => void;
  roles: DataEditor[];
  handleRemoveItem: () => void;
  isRemoveAllowed: boolean;
}

export const NFTUploadContent: FC<NFTUploadContentProps> = ({
  index,
  contentValue,
  fileValue,
  handleUpdateContent,
  isEditEnabled,
  handleEnableRole,
  roles,
  handleRemoveItem,
  isRemoveAllowed,
}) => {
  const handleValidateEnteredData = useCallback((value: string) => {
    try {
      btoa(value);

      return undefined;
    } catch (error) {
      return 'Failed to parse data';
    }
  }, []);

  const isAdminEnabled = useMemo(() => {
    const adminEnabled = roles.indexOf(DataEditor.admin);

    return adminEnabled !== -1;
  }, [roles]);

  const isOwnerEnabled = useMemo(() => {
    const ownerEnabled = roles.indexOf(DataEditor.owner);

    return ownerEnabled !== -1;
  }, [roles]);

  return (
    <div className="flex flex-col w-full gap-2 items-center bg-custom-grey p-3 rounded-xl backdrop-blur-[5px]">
      <div className={
        classNames('flex items-center w-full', {
          'justify-between': isRemoveAllowed,
          'justify-start': !isRemoveAllowed,
        })
      }>
        <p className="text-[#868991] text-sm font-noto-sans font-normal leading-[21px]">
          Data
        </p>
        {isRemoveAllowed && (
          <svg
            onClick={isRemoveAllowed ? handleRemoveItem : () => {}}
            className="cursor-pointer"
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.0747 2.68439C2.82885 2.43854 2.43024 2.43854 2.18439 2.68439C1.93854 2.93024 1.93854 3.32885 2.18439 3.5747L6.10969 7.5L2.18439 11.4253C1.93854 11.6712 1.93854 12.0698 2.18439 12.3156C2.43024 12.5615 2.82885 12.5615 3.0747 12.3156L7 8.39031L10.9251 12.3155C11.171 12.5613 11.5696 12.5613 11.8155 12.3155C12.0613 12.0696 12.0613 11.671 11.8155 11.4251L7.89031 7.5L11.8155 3.57485C12.0613 3.329 12.0613 2.9304 11.8155 2.68454C11.5696 2.43869 11.171 2.43869 10.9251 2.68454L7 6.60969L3.0747 2.68439Z"
              fill="#5E6773"
            />
          </svg>
        )}
      </div>
      <FileUploadSingle
        setFileContent={(value: string) => handleUpdateContent(value, index, 'file')}
        disabled={!!contentValue.length}
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
        disabled={!!fileValue.length}
        error={handleValidateEnteredData(contentValue)}
      />
      {isEditEnabled && (
        <div className="grid grid-cols-3 w-full mt-8">
          <p className="font-noto-sans text-[#868991] text-sm leading-[21px]">
            Editability Authorized:
          </p>
          <div className="flex items-center gap-2">
            <Checkbox isChecked={isAdminEnabled} setIsChecked={(value: boolean) => handleEnableRole(value, index, 'admin')} />
            <p className="font-noto-sans text-[#eee] text-base tracking-[-0.24px]">
              Admin
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox isChecked={isOwnerEnabled} setIsChecked={(value: boolean) => handleEnableRole(value, index, 'owner')} />
            <p className="font-noto-sans text-[#eee] text-base tracking-[-0.24px]">
              Owner
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
