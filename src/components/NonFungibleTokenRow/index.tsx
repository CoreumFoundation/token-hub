import { GeneralIcon } from "@/assets/GeneralIcon";
import { ActionItem, GeneralIconType } from "@/shared/types";
import { FC } from "react";
import { ActionRow } from "../ActionRow";

interface NonFungibleTokenRowProps {
  name: string;
  onMintClick: () => void;
  onViewClick: () => void;
}

export const NonFungibleTokenRow: FC<NonFungibleTokenRowProps> = ({
  name,
  onMintClick,
  onViewClick,
}) => {
  let items: ActionItem[] = [
    {
      id: 'mint',
      label: 'Mint',
      icon: <GeneralIcon type={GeneralIconType.Mint} />,
      onClick: onMintClick,
    },
    {
      id: 'view',
      label: 'View',
      icon: <GeneralIcon type={GeneralIconType.View} />,
      onClick: onViewClick,
    }
  ];

  return (
    <ActionRow actionItems={items}>
      <div className="flex-1 grid grid-cols-2 items-center w-full">
        <div className="grid-cols-2 flex items-center gap-3">
          <GeneralIcon
            type={GeneralIconType.DefaultToken}
            className="w-10 h-10 min-w-10 min-h-10"
          />
          <div className="flex flex-col items-start gap-1">
            <div className="text-left text-base text-[#EEE] font-noto-sans font-medium break-all max-w-full pr-4">
              {name}
            </div>
          </div>
        </div>
      </div>
    </ActionRow>
  );
}
