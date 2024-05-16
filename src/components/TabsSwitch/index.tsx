import { TabSwitchItem } from "@/shared/types";
import classNames from "classnames";
import Link from "next/link";
import { FC } from "react";

interface TabSwitchProps {
  selectedTabSwitch: TabSwitchItem;
  items: TabSwitchItem[];
  handleSelectTab?: (item: TabSwitchItem) => void;
  isLink?: boolean;
}

export const TabsSwitch: FC<TabSwitchProps> = ({
  selectedTabSwitch,
  items,
  handleSelectTab,
  isLink,
}) => {
  return (
    <div className="flex p-1 bg-[#17191E] rounded-xl backdrop-blur-sm">
      {items.map((item: TabSwitchItem) => {
        const cx = classNames('flex items-center justify-center py-2 rounded-lg cursor-pointer w-40 text-sm font-medium font-space-grotesk', {
          'bg-green-opacity-10 text-[#25D695]': item.id === selectedTabSwitch.id,
          'text-[#5E6773] rounded-md hover:bg-[#21262E]': item.id !== selectedTabSwitch.id,
        });

        if (isLink) {
          return (
            <Link
              href={item?.href || ''}
              prefetch={false}
              key={item.id}
              className={cx}
            >
              {item.label}
            </Link>
          );
        }

        return (
          <div
            key={item.id}
            className={cx}
            onClick={() => handleSelectTab?.(item)}
          >
            {item.label}
          </div>
        );
      })}
    </div>
  );
};
