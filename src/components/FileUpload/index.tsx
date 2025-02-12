import { GeneralIcon } from "@/assets/GeneralIcon";
import { AlertType, ButtonType, GeneralIconType } from "@/shared/types";
import { Button } from "../Button";
import { ChangeEvent, FC, useCallback, useMemo, useRef, useState } from "react";
import Big from "big.js";
import classNames from "classnames";
import { useAppDispatch } from "@/store/hooks";
import { dispatchAlert } from "@/features/alerts/alertsSlice";
import { setNFTMultipleDataFiles } from "@/features/nft/nftSlice";

interface FileUploadProps {
  isDataEditable: boolean;
  disabled: boolean;
}

export const FileUpload: FC<FileUploadProps> = ({
  disabled,
  isDataEditable,
}) => {
  const [files, setFiles] = useState<{ name: string; content: string }[]>([]);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const onUploadFile = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
    let { files: selectedFiles } = event.target;

    if (!selectedFiles || selectedFiles.length === 0) return;

    if (isDataEditable) {
      let totalSize = files.reduce((sum, file) => sum + file.content.length, 0);
      for (const file of Array.from(selectedFiles)) {
        totalSize += file.size;
      }

      if (Big(totalSize).div(1000).gt(250)) {
        dispatch(dispatchAlert({
          type: AlertType.Error,
          title: "Too large size of attached files",
          message: "The max size of files is 250KB",
        }));
        return;
      }
    } else {
      if (selectedFiles.length > 1) {
        dispatch(dispatchAlert({
          type: AlertType.Error,
          title: "Cannot select multiple files",
          message: "You cannot select multiple files when 'Edit' is disabled",
        }));
        return;
      }

      if (Big(selectedFiles[0].size).div(1000).gt(250)) {
        dispatch(dispatchAlert({
          type: AlertType.Error,
          title: "Too large size of attached file",
          message: "The max size of files is 250KB",
        }));
        return;
      }
    }

    const readFile = (file: File) => {
      return new Promise<{ content: string; name: string }>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsText(file, "UTF-8");

        fileReader.onload = (e) => {
          if (e.target && typeof e.target.result === "string") {
            resolve({ content: e.target.result, name: file.name });
          } else {
            reject(new Error("Failed to read file"));
          }
        };

        fileReader.onerror = () => reject(new Error("Error reading file"));
      });
    };

    try {
      const filesArray = Array.from(selectedFiles);
      let filesToHandle: any[] = [];

      for (const file of filesArray) {
        filesToHandle.push(file);

        if (!isDataEditable && filesToHandle.length) {
          break;
        }
      }

      const newFiles = await Promise.all(filesToHandle.map(readFile));
      setFiles((prev) => isDataEditable ? [...prev, ...newFiles] : [...newFiles]);
      dispatch(setNFTMultipleDataFiles(newFiles.map((file) => file.content)));
    } catch (error) {
      console.error("Error reading files", error);
    }
  }, [files, isDataEditable]);

  const removeFile = useCallback((name: string) => {
    setFiles((prev) => prev.filter((file) => file.name !== name));
    dispatch(setNFTMultipleDataFiles(files.filter((file) => file.name !== name).map((file) => file.content)));
  }, [files]);

  const renderContent = useMemo(() => {
    if (files.length) {
      return (
        <>
          <div className="flex flex-col gap-2 items-center w-full">
            {files.map((file) => (
              <div key={file.name} className="flex items-center justify-between gap-2 w-full bg-[#1B1D23] rounded-[10px] text-base text-[#EEE] py-3 px-4">
                {file.name}
                <GeneralIcon type={GeneralIconType.Close} className="group cursor-pointer" pathClassName="group-hover:fill-[#eee]" onClick={() => removeFile(file.name)} />
              </div>
            ))}
            <Button
              label="Choose more files"
              type={ButtonType.Secondary}
              onClick={() => !disabled && inputFileRef?.current?.click()}
              className="text-sm !py-2 px-6 rounded-[10px] font-medium w-[160px] !bg-transparent group-hover:opacity-50"
            />
          </div>
          <div className="flex items-center gap-2 text-xs mt-1 text-[#5E6773]">
            <GeneralIcon type={GeneralIconType.Warning} /> The max file size is 5KB per file
          </div>
        </>
      );
    }

    return (
      <>
        <div className="flex flex-col gap-2 items-center w-full">
          <GeneralIcon type={GeneralIconType.File} />
          <Button
            label="Upload files"
            type={ButtonType.Secondary}
            onClick={() => !disabled && inputFileRef?.current?.click()}
            className={classNames('text-sm !py-2 px-6 rounded-[10px] font-semibold w-[160px] !bg-transparent', {
              'cursor-not-allowed !enabled:hover:opacity-100': disabled,
            })}
          />
        </div>
        <div className="flex items-center gap-2 text-xs mt-1 text-[#5E6773]">
          <GeneralIcon type={GeneralIconType.Warning} /> The max file size is 5KB per file
        </div>
      </>
    );
  }, [files, disabled, removeFile]);

  return (
    <div
      className={classNames('flex flex-col w-full gap-4 py-8 items-center border border-[#1B1D23] rounded-[10px]', {
        'px-4': !files.length,
        'px-20': files.length,
        'bg-[#080908] border-transparent cursor-not-allowed opacity-50': disabled,
      })}
    >
      {renderContent}
      <input
        ref={inputFileRef}
        className="hidden h-0 w-0"
        type="file"
        multiple={isDataEditable ? true : false}
        onChange={onUploadFile}
      />
    </div>
  );
};
