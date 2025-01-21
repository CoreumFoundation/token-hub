import { GeneralIcon } from "@/assets/GeneralIcon";
import { GeneralIconType, ButtonType, Token } from "@/shared/types";
import { FC } from "react";
import { Button } from "../Button";
import { Input } from "../Input";
import { useAppSelector } from "@/store/hooks";
import { DEXWhitelistedDenomsSettings } from "../DEXWhitelistedDenomsSettings";

interface DEXUpdateWhitelistedDenomsActionProps {
  handleUpdateDexWhitelistedDenoms: () => void;
  handleBackClick: () => void;
}

export const DEXUpdateWhitelistedDenomsAction: FC<DEXUpdateWhitelistedDenomsActionProps> = ({
  handleUpdateDexWhitelistedDenoms,
  handleBackClick,
}) => {
  const whitelistedDenoms = useAppSelector(state => state.dex.whitelistDenoms);

  return (
    <div className="flex flex-col w-full gap-8">
      <DEXWhitelistedDenomsSettings />
      <div className="flex w-full justify-between gap-4">
        <div className="flex items-center">
          <Button
            label="Back"
            onClick={handleBackClick}
            type={ButtonType.Secondary}
            className="text-sm !py-2 px-6 rounded-[10px] font-semibold w-[160px] !bg-transparent pl-0"
          />
        </div>
        <div className="flex items-center">
          <Button
            label="Continue"
            onClick={handleUpdateDexWhitelistedDenoms}
            type={ButtonType.Primary}
            className="text-sm !py-2 px-6 rounded-[10px] font-semibold w-[160px]"
            disabled={!whitelistedDenoms.length}
          />
        </div>
      </div>
    </div>
  );
};
