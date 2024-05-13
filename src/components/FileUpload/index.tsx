import { GeneralIcon } from "@/assets/GeneralIcon";
import { AlertType, ButtonType, GeneralIconType } from "@/shared/types";
import { Button } from "../Button";
import { ChangeEvent, FC, useCallback, useMemo, useRef, useState } from "react";
import Big from "big.js";
import classNames from "classnames";
import { useAppDispatch } from "@/store/hooks";
import { dispatchAlert } from "@/features/alerts/alertsSlice";

interface FileUploadProps {
  setFileContent: (value: string) => void;
  disabled: boolean;
}

export const FileUpload: FC<FileUploadProps> = ({
  setFileContent,
  disabled,
}) => {
  const [fileName, setFileName] = useState<string>('');
  const inputFileRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const onUploadFile = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const { files } = event.target;

    if (files && files.length > 0) {
      if (Big(files[0].size).div(1000).gt(5)) {
        dispatch(dispatchAlert({
          type: AlertType.Error,
          title: 'Too large file size',
          message: 'The max file size is 5KB'
        }))
        return;
      }

      fileReader.readAsText(files[0], "UTF-8");
      fileReader.onload = e => {
        if (e.target && typeof e.target.result === "string") {
          const content = e.target.result;
          setFileContent(content);
          setFileName(files[0].name);
        }
      };
    }
  }, []);

  const clearFiles = useCallback(() => {
    setFileContent('');
    setFileName('');
  }, []);

  const renderContent = useMemo(() => {
    if (fileName.length) {
      return (
        <>
          <div className="flex flex-col gap-2 items-center w-full">
            <div className="flex items-center justify-between gap-2 w-full bg-[#1B1D23] rounded-[10px] text-base text-[#EEE] py-3 px-4">
              {fileName}
              <GeneralIcon type={GeneralIconType.Close} className="group cursor-pointer" pathClassName="group-hover:fill-[#eee]" onClick={clearFiles} />
            </div>
            <Button
              label="Choose another file"
              type={ButtonType.Secondary}
              onClick={() => !disabled && inputFileRef?.current?.click()}
              className="text-sm !py-2 px-6 rounded-[10px] font-semibold w-[160px] !bg-transparent group-hover:opacity-50"
            />
          </div>
          <div className="flex items-center gap-2 text-xs mt-1 text-[#5E6773]">
            <GeneralIcon type={GeneralIconType.Warning} /> File size cannot exceed 5KB
          </div>
        </>
      );
    }

    return (
      <>
        <div className="flex flex-col gap-2 items-center w-full">
          <GeneralIcon type={GeneralIconType.File} />
          <Button
            label="Upload file"
            type={ButtonType.Secondary}
            onClick={() => !disabled && inputFileRef?.current?.click()}
            className={classNames('text-sm !py-2 px-6 rounded-[10px] font-semibold w-[160px] !bg-transparent', {
              'cursor-not-allowed !enabled:hover:opacity-100': disabled,
            })}
          />
        </div>
        <div className="flex items-center gap-2 text-xs mt-1 text-[#5E6773]">
          <GeneralIcon type={GeneralIconType.Warning} /> The max file size is 5KB
        </div>
      </>
    );
  }, [fileName, disabled]);

  return (
    <div
      className={classNames('flex flex-col w-full gap-4 py-8 items-center border border-[#1B1D23] rounded-[10px]', {
        'px-4': !fileName.length,
        'px-20': fileName.length,
        'bg-[#080908] border-transparent cursor-not-allowed opacity-50': disabled,
      })}
    >
      {renderContent}
      <input ref={inputFileRef} className="hidden h-0 w-0" type="file" onChange={onUploadFile} />
    </div>
  );
};
