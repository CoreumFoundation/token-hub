import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { FC, Fragment, useCallback, useEffect, useMemo } from "react";
import { addNFTDataItem, NFTDataItem, setNFTMultipleDataValues } from "@/features/nft/nftSlice";
import { NFTUploadContent } from "../NFTUploadContent";
import { DataEditor } from "coreum-js-nightly/dist/main/coreum/asset/nft/v1/types";

interface NFTMultipleDataProps {
  isDataEditable: boolean;
}

export const NFTMultipleData: FC<NFTMultipleDataProps> = ({ isDataEditable }: NFTMultipleDataProps) => {
  const nftMultipleDataValues = useAppSelector(state => state.nfts.nftMultipleDataValues);
  const dispatch = useAppDispatch();

  const handleAddDataToMultipleData = useCallback(() => {
    dispatch(addNFTDataItem());
  }, [nftMultipleDataValues]);

  const handleUpdateDataInList = useCallback((newDataValue: string, dataIndex: number, contentType: 'input' | 'file') => {
    const newData = nftMultipleDataValues.map((data: NFTDataItem, index: number) => {
      if (index === dataIndex) {
        return {
          ...data,
          ...(contentType === 'input' ? {
            contentValue: newDataValue,
          } : {
            fileValue: newDataValue,
          }),
        };
      }

      return data;
    });

    dispatch(setNFTMultipleDataValues(newData));
  }, [nftMultipleDataValues]);

  const handleRemoveDataFromList = useCallback((item: NFTDataItem) => {
    const indexOfDataToRemove = nftMultipleDataValues.indexOf(item);

    dispatch(
      setNFTMultipleDataValues([
        ...nftMultipleDataValues.slice(0, indexOfDataToRemove),
        ...nftMultipleDataValues.slice(indexOfDataToRemove + 1)],
      )
    );
  }, [nftMultipleDataValues]);

  useEffect(() => {
    if (!isDataEditable && nftMultipleDataValues.length > 1) {
      dispatch(setNFTMultipleDataValues([...nftMultipleDataValues.slice(0, 1)]));
    }
  }, [isDataEditable, nftMultipleDataValues]);

  const handleUpdateRolesInList = useCallback((value: boolean, dataIndex: number, role: 'admin' | 'owner') => {
    const newData = nftMultipleDataValues.map((data: NFTDataItem, index: number) => {
      if (index === dataIndex) {
        const roles: DataEditor[] = [];
        let adminEnabled = !!data.roles.find((item: DataEditor) => item === DataEditor.admin);
        let ownerEnabled = !!data.roles.find((item: DataEditor) => item === DataEditor.owner);

        if (role === 'admin') {
          adminEnabled = value;
        } else {
          ownerEnabled = value;
        }

        if (adminEnabled) {
          roles.push(DataEditor.admin);
        }

        if (ownerEnabled) {
          roles.push(DataEditor.owner);
        }

        console.log({ roles });

        return {
          ...data,
          roles,
        };
      }

      return data;
    });

    dispatch(setNFTMultipleDataValues(newData));
  }, [nftMultipleDataValues]);

  const renderContentData = useMemo(() => {
    if (!isDataEditable) {
      return (
        <NFTUploadContent
          index={0}
          contentValue={nftMultipleDataValues[0].contentValue}
          fileValue={nftMultipleDataValues[0].fileValue}
          handleUpdateContent={handleUpdateDataInList}
          isEditEnabled={isDataEditable}
          handleEnableRole={() => {}}
          roles={[]}
          handleRemoveItem={() => {}}
          isRemoveAllowed={false}
        />
      );
    }

    return (
      <>
        {nftMultipleDataValues.map((item: NFTDataItem, index: number) => {
          return (
            <NFTUploadContent
              key={`data-${index}`}
              index={index}
              contentValue={item.contentValue}
              fileValue={item.fileValue}
              handleUpdateContent={handleUpdateDataInList}
              isEditEnabled={isDataEditable}
              handleEnableRole={handleUpdateRolesInList}
              roles={item.roles}
              handleRemoveItem={() => handleRemoveDataFromList(item)}
              isRemoveAllowed={nftMultipleDataValues.length > 1}
            />
          );
        })}
      </>
    );
  }, [isDataEditable, nftMultipleDataValues, handleUpdateDataInList, handleUpdateRolesInList, handleRemoveDataFromList]);

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex flex-col w-full gap-8">
        {renderContentData}
      </div>
      {isDataEditable && (
        <div className="flex items-center gap-1 cursor-pointer mt-2" onClick={handleAddDataToMultipleData}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.41248 2L6.41246 6.41252L2 6.41254L2 7.5878L6.41246 7.58779L6.41245 12L7.58772 12L7.58773 7.58779L12 7.58778L12 6.41251L7.58773 6.41252L7.58774 2L6.41248 2Z"
              fill="#25D695"
            />
          </svg>
          <p className="text-[#25D695] font-noto-sans text-xs font-medium leading-[18px] tracking-[-0.18px]">
            Add Another Content
          </p>
        </div>
      )}
    </div>
  );
};
