import { FC } from "react";
import Image from 'next/image';
import classNames from "classnames";
import { ActionRow } from "../ActionRow";
import { ActionItem } from "@/shared/types";

interface NFTItemProps {
  imgPath: string;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
  className?: string;
  description?: string;
  isActionRow?: boolean;
  actionItems?: ActionItem[];
}

export const NFTItem: FC<NFTItemProps> = ({
  imgPath,
  label,
  onClick,
  isActive,
  className,
  description,
  isActionRow,
  actionItems,
}) => {
  return (
    <div
      className={classNames('flex flex-col items-center w-40 max-w-full rounded-lg bg-[#17191E] text-[#9FA2AC] group hover:bg-[#2B3138] hover:text-[#eee] shadow-lg cursor-pointer box-content font-noto-sans justify-self-center', {
        ' border-[1.5px] border-[#25D695]': isActive,
      }, className)}
      onClick={onClick}
    >
      <Image className="w-full h-40 rounded-t-lg" src={imgPath.length ? imgPath : '/images/default-token.svg'} alt={label} width="160" height="160" />
      {isActionRow ? (
        <ActionRow
          actionItems={actionItems || []}
          className="rounded-b-lg p-1 sm:p-3 gap-2 w-full hover:bg-[#2B3138] hover:text-[#eee] text-left break-all !border-transparent"
        >
          <div className="flex flex-col w-full gap-1">
            <div className="flex items-center w-full gap-1 text-sm tracking-[-0.21px] overflow-scroll scroll">
              {label}
            </div>
            {description && (
              <div className="text-xs text-[#5E6773] overflow-scroll scroll">
                {description}
              </div>
            )}
          </div>
        </ActionRow>
      ) : (
        <div className="flex flex-col w-full gap-1 p-3">
          <div className="flex items-center w-full gap-1 text-sm tracking-[-0.21px] overflow-scroll scroll">
            {label}
          </div>
          {description && (
            <div className="text-xs text-[#5E6773] overflow-scroll scroll">
              {description}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
