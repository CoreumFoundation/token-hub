import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback, useMemo } from "react";
import { addDenomToWhitelistedDenoms, setDexRefAmount, setDexWhitelistedDenoms } from "@/features/dex/dexSlice";

export const DEXWhitelistedDenomsSettings = () => {
  const whitelistedDenoms = useAppSelector(state => state.dex.whitelistDenoms);

  const dispatch = useAppDispatch();

  const handleAddDenomToWhitelist = useCallback(() => {
    dispatch(addDenomToWhitelistedDenoms());
  }, [whitelistedDenoms]);

  const handleUpdateDenomToWhitelist = useCallback((newDenom: string, denomIndex: number) => {
    const newDenoms = whitelistedDenoms.map((denom: string, index: number) => {
      if (index === denomIndex) {
        return newDenom;
      }

      return denom;
    });

    dispatch(setDexWhitelistedDenoms(newDenoms));
  }, [whitelistedDenoms]);

  const handleRemoveDenomFromList = useCallback((denom: string) => {
      const indexOfDenomToRemove = whitelistedDenoms.indexOf(denom);

      dispatch(
        setDexWhitelistedDenoms([
          ...whitelistedDenoms.slice(0, indexOfDenomToRemove),
          ...whitelistedDenoms.slice(indexOfDenomToRemove + 1)],
        )
      );
    }, [whitelistedDenoms]);

  const renderFunds = useMemo(() => {
    return (
      <>
        {whitelistedDenoms.map((denom: string, index: number) => {
          if (index === 0) {
            return (
              <div className="flex items-center py-3 px-5 rounded-[10px] border border-[#1B1D23]" key={`whitelisting-denom-${index}`}>
                <input
                  className="flex-1 w-full bg-transparent text-[#EEE] placeholder:text-[#5E6773] outline-none shadow-sm"
                  value={denom}
                  onChange={(e) => handleUpdateDenomToWhitelist(e.target.value, index)}
                />
              </div>
            );
          }

          return (
            <div className="flex items-center w-full gap-2" key={`whitelisting-denom-${index}`}>
              <div className="flex-none flex items-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.8378 1.84783C12.8378 1.45847 12.5221 1.14282 12.1327 1.14282C11.7434 1.14282 11.4277 1.45847 11.4277 1.84783L11.4277 7.35433C11.4277 10.2356 13.7635 12.5714 16.6448 12.5714H22.1513C22.5407 12.5714 22.8563 12.2558 22.8563 11.8664C22.8563 11.477 22.5407 11.1614 22.1513 11.1614H16.6448C14.5422 11.1614 12.8378 9.4569 12.8378 7.35433V1.84783Z"
                    fill="#5E6773"
                  />
                </svg>
              </div>
              <div className="flex-1 flex items-center py-3 px-5 rounded-[10px] border border-[#1B1D23] gap-2">
                <input
                  className="flex-1 w-full bg-transparent text-[#EEE] placeholder:text-[#5E6773] outline-none shadow-sm"
                  value={denom}
                  onChange={(e) => handleUpdateDenomToWhitelist(e.target.value, index)}
                />
              </div>
              <div className="flex-none flex items-center cursor-pointer" onClick={() => handleRemoveDenomFromList(denom)}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.5041 3.51412C13.7851 3.23314 13.7851 2.77759 13.5041 2.49662C13.2231 2.21565 12.7676 2.21565 12.4866 2.49662L8.00056 6.98268L3.5145 2.49662C3.23353 2.21565 2.77798 2.21565 2.497 2.49662C2.21603 2.77759 2.21603 3.23314 2.497 3.51412L6.98306 8.00017L2.49718 12.4861C2.2162 12.767 2.2162 13.2226 2.49718 13.5036C2.77815 13.7845 3.2337 13.7845 3.51468 13.5036L8.00056 9.01767L12.4864 13.5036C12.7674 13.7845 13.223 13.7845 13.5039 13.5036C13.7849 13.2226 13.7849 12.767 13.5039 12.4861L9.01806 8.00017L13.5041 3.51412Z"
                    fill="#5E6773"
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </>
    );
  }, [handleRemoveDenomFromList, handleUpdateDenomToWhitelist, whitelistedDenoms]);

  return (
    <div className="flex flex-col w-full items-center justify-center gap-2">
      <div className="flex flex-col w-full gap-2">
        <p className="text-[#868991] text-sm font-noto-sans font-normal leading-[21px]">
          Whitelisted Denoms
        </p>
        <div className="flex flex-col w-full gap-2">
          {renderFunds}
        </div>
        <div className="flex items-center gap-1 cursor-pointer" onClick={handleAddDenomToWhitelist}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.41248 2L6.41246 6.41252L2 6.41254L2 7.5878L6.41246 7.58779L6.41245 12L7.58772 12L7.58773 7.58779L12 7.58778L12 6.41251L7.58773 6.41252L7.58774 2L6.41248 2Z"
              fill="#25D695"
            />
          </svg>
          <p className="text-[#25D695] font-noto-sans text-xs font-medium leading-[18px] tracking-[-0.18px]">
            Add Denom
          </p>
        </div>
      </div>
    </div>
  );
};
