import { TabItemType } from "@/shared/types";
import { FC } from "react";
import { AssetFtManageRowIcon } from "../AssetFtManageRowIcon";

interface AssetFTManageRowProps {
  id: TabItemType;
  label: string;
  onClick: () => void;
}

export const AssetFTManageRow: FC<AssetFTManageRowProps> = ({ id, label, onClick }: AssetFTManageRowProps) => {
  return (
    <div
      className="flex items-center w-full gap-3 p-4 bg-[#17191E] hover:bg-[#21262E] rounded-[10px] cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-col items-center justify-center w-7 h-7">
        <AssetFtManageRowIcon type={id} />
      </div>
      <p className="text-[#EEE] font-noto-sans text-base leading-6 tracking-[-0.24px] font-medium capitalize">
        {label}
      </p>
    </div>
  );
};
