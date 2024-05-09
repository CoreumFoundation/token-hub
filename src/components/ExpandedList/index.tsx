import { GeneralIcon } from "@/assets/GeneralIcon";
import { ExpandedListElem, GeneralIconType } from "@/shared/types";
import { Disclosure } from "@headlessui/react";
import classNames from "classnames";
import React, { FC } from "react";

interface ExpandedListProps {
  label: string;
  listItems: ExpandedListElem[];
}

export const ExpandedList: FC<ExpandedListProps> = ({
  label,
  listItems,
}) => {
  return (
    <div className="flex flex-col items-center w-full bg-secondary-gradient rounded-xl backdrop-blur-sm px-5">
      <Disclosure defaultOpen={true}>
        {({ open }) => (
          <>
            <Disclosure.Button className={classNames('flex items-center w-full justify-between py-5 border-b', { 'border-[#1B1D23]': open, 'border-transparent': !open })}>
              <div className="flex text-base font-medium text-[#EEE] font-space-grotesk tracking-[-0.24px]">
                {label}
              </div>
              <GeneralIcon
                type={GeneralIconType.ArrowRight}
                className={classNames('group cursor-pointer', { 'rotate-90 transform': open })}
                pathClassName="group-hover:fill-[#eee]"
              />
            </Disclosure.Button>
            <Disclosure.Panel className="flex flex-col w-full items-center py-5 gap-8">
              {listItems.map((listItem: ExpandedListElem, index) => {
                return (
                  <React.Fragment key={`${listItem.id}-${index}`}>
                    {listItem.content}
                  </React.Fragment>
                );
              })}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};
