import { GeneralIcon } from "@/assets/GeneralIcon";
import { GeneralIconType, ButtonType, Token } from "@/shared/types";
import { FC } from "react";
import { Button } from "../Button";
import { Input } from "../Input";

interface DEXUnifiedRefAmountChangeActionProps {
  refAmount: string;
  setRefAmount: (value: string) => void;
  handleUpdateDexUnifiedRefAmount: () => void;
  handleBackClick: () => void;
}

export const DEXUnifiedRefAmountChangeAction: FC<DEXUnifiedRefAmountChangeActionProps> = ({
  refAmount,
  setRefAmount,
  handleUpdateDexUnifiedRefAmount,
  handleBackClick,
}) => {
  return (
    <div className="flex flex-col w-full gap-8">
      <Input
        label="Value"
        value={refAmount}
        onChange={setRefAmount}
        placeholder="0"
        type="number"
        decimals={0}
      />
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
            onClick={handleUpdateDexUnifiedRefAmount}
            type={ButtonType.Primary}
            className="text-sm !py-2 px-6 rounded-[10px] font-semibold w-[160px]"
            disabled={!refAmount.length || +refAmount === 0}
          />
        </div>
      </div>
    </div>
  );
};
