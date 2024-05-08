import { GeneralIcon } from "@/assets/GeneralIcon";
import { GeneralIconType } from "@/shared/types";
import { FC } from "react";

interface InfoRowProps {
  label: string;
  value: string | React.ReactNode;
}

export const InfoRow: FC<InfoRowProps> = ({
  label,
  value,
}) => {
  return (
    <div className="flex items-center w-full justify-between gap-4">
      <div className="flex items-center gap-1.5">
        <div className="text-sm capitalize text-[#5E6773]">
          {label}
        </div>
      </div>
      <div className="flex items-center text-[#EEE] font-noto-sans text-base">
        {value}
      </div>
    </div>
  );
};
