import { TabItem } from "@/shared/types";
import classNames from "classnames";
import Link from "next/link";
import { FC } from "react";

interface TabsProps {
  selectedTab: TabItem | null;
  items: TabItem[];
  handleSelectTab?: (tab: TabItem) => void;
  isLink?: boolean;
}

export const Tabs: FC<TabsProps> = ({
  selectedTab,
  items,
  handleSelectTab,
  isLink,
}) => {
  return (
    <nav className="flex gap-10" aria-label="Tabs">
      {items.map((item: TabItem) => {
        if (isLink) {
          return (
            <Link
              href={item?.href || ''}
              prefetch={false}
              key={item.label}
              className={classNames(
                item.id === selectedTab?.id
                  ? 'border-[#25D695] text-grey-gradient'
                  : 'border-transparent text-[#5E6773] hover:text-[#9FA2AC] outline-none',
                'border-b cursor-pointer py-4'
              )}
              aria-current={item.id === selectedTab?.id ? 'page' : undefined}
            >
              {item.label}
            </Link>
          );
        }

        return (
          <div
            key={item.label}
            className={classNames(
              item.id === selectedTab?.id
                ? 'border-[#25D695] text-grey-gradient'
                : 'border-transparent text-[#5E6773] hover:text-[#9FA2AC]',
              'border-b cursor-pointer py-4'
            )}
            onClick={() => handleSelectTab?.(item)}
            aria-current={item.id === selectedTab?.id ? 'page' : undefined}
          >
            {item.label}
          </div>
        );
      })}
    </nav>
  )
}
