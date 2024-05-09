import { GeneralIcon } from "@/assets/GeneralIcon";
import { ActionItem, GeneralIconType } from "@/shared/types";
import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import { FC, Fragment } from "react";

interface ActionRowProps {
  children: React.ReactNode;
  actionItems: ActionItem[];
  className?: string;
  itemsClassName?: string;
}

export const ActionRow: FC<ActionRowProps> = ({
  children,
  actionItems,
  className,
  itemsClassName,
}) => {
  return (
    <Menu as="div" className="relative inline-block text-left w-full">
      {({ open }) => (
        <>
          <Menu.Button
            className={classNames('flex items-center w-full gap-10 p-4 bg-secondary-gradient group hover:bg-[#1B1D23] backdrop-blur-sm rounded-[10px] cursor-pointer border border-transparent', {
              '!border-[#25D695]': open,
            }, className)}
          >
            {children}
            <div className="flex flex-col flex-none items-center justify-center">
              <GeneralIcon type={GeneralIconType.Dots} className="w-5 h-5 group" pathClassName={open ? 'fill-[#25D695]' : 'group-hover:fill-[#9FA2AC]'} />
            </div>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className={classNames('absolute right-0 z-10 mt-2 bg-[#1B1D23] text-[#9FA2AC] overflow-auto w-40 shadow-lg max-h-[240px] text-sm rounded-lg', itemsClassName)}>
              {actionItems.map((item: any) => {
                return (
                  <Menu.Item key={item.id}>
                    <div
                      className="flex items-center gap-2 relative cursor-pointer select-none p-4 hover:bg-[#21262E]"
                      onClick={item.onClick}
                    >
                      {item.icon}
                      {item.label}
                    </div>
                  </Menu.Item>
                );
              })}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};
