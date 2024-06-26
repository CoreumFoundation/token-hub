import { GeneralIcon } from "@/assets/GeneralIcon";
import { ActionItem, GeneralIconType } from "@/shared/types";
import { FC } from "react";
import { ActionRow } from "../ActionRow";
import { Decimal } from "../Decimal";

interface FungibleTokenRowProps {
  symbol: string;
  subunit: string;
  precision: number;
  balance: string;
  className?: string;
  onSendClick: () => void;
  onManageClick: () => void;
  onBurnClick: () => void;
  isBurnable: boolean;
  isManageable: boolean;
}

export const FungibleTokenRow: FC<FungibleTokenRowProps> = ({
  symbol,
  subunit,
  precision,
  balance,
  onSendClick,
  onManageClick,
  onBurnClick,
  isBurnable,
  isManageable,
}) => {
  let items: ActionItem[] = [
    {
      id: 'send',
      label: 'Send',
      icon: <GeneralIcon type={GeneralIconType.Send} />,
      onClick: onSendClick,
    }
  ];

  if (isBurnable) {
    items.push({
      id: 'burn',
      label: 'Burn',
      icon: <GeneralIcon type={GeneralIconType.Burn} />,
      onClick: onBurnClick,
    });
  }

  if (isManageable) {
    items.push({
      id: 'manage',
      label: 'Manage',
      icon: <GeneralIcon type={GeneralIconType.Manage} />,
      onClick: onManageClick,
    })
  };

  return (
    <ActionRow actionItems={items}>
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 items-center w-full">
        <div className="grid-cols-2 flex items-center gap-3">
          <GeneralIcon
            type={GeneralIconType.DefaultToken}
            className="w-10 h-10 min-w-10 min-h-10"
          />
          <div className="flex flex-col items-start gap-1">
            <div className="text-left text-base text-[#EEE] font-medium break-all max-w-full pr-4">
              {symbol}
            </div>
            <div className="text-sm text-[#868991] break-all max-w-full">
              {subunit}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 w-full items-center gap-6">
          <div className="grid-cols-1 flex flex-col items-start gap-1">
            <div className="text-sm text-[#5E6773]">
              Precision
            </div>
            <div className="text-base text-[#EEE]">
              {precision}
            </div>
          </div>
          <div className="grid-cols-1 flex flex-col items-start gap-1 max-w-full">
            <div className="text-sm text-[#5E6773]">
              Balance
            </div>
            <div className="text-base text-[#EEE] flex items-baseline flex-wrap max-w-full gap-1">
              <Decimal className="break-all max-w-full !inline" value={balance} precision={precision} />
              <span className="text-left text-xs max-w-full break-all">{symbol.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>
    </ActionRow>
  );
}
