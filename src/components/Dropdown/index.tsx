import React, { FC, Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import classNames from 'classnames';
import { DropdownType, GeneralIconType } from '@/shared/types';
import { GeneralIcon } from '@/assets/GeneralIcon';

export interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface DropdownProps {
  selected: DropdownItem;
  onSelect: (item: DropdownItem) => void;
  items: DropdownItem[];
  icon?: React.ReactNode;
  type?: DropdownType;
  className?: string;
  selectedClassName?: string;
  listClassName?: string;
  selectedLabelClassName?: string;
}

export const Dropdown: FC<DropdownProps> = ({
  selected,
  items,
  icon,
  onSelect,
  type = DropdownType.Primary,
  selectedClassName,
  listClassName,
  className,
  selectedLabelClassName,
}) => {
  const selectedDropdownItemCx = classNames('flex items-center justify-between gap-2 rounded-[10px] text-[#eee] w-full', {
    'bg-[#17191E] hover:bg-[#21262E] text-sm py-2 pl-3 pr-2 transition transform border border-transparent box-border': type === DropdownType.Primary,
    'bg-transparent border border-[#1B1D23] hover:border-[#2B3138] text-base py-3 px-4 backdrop-blur-sm': type === DropdownType.Secondary,
  }, selectedClassName);

  const dropdownListCx = classNames('absolute z-10 mt-2 bg-[#1B1D23] text-[#9FA2AC] overflow-auto w-full shadow-lg', {
    'text-sm rounded-lg': type === DropdownType.Primary,
    'text-base rounded-[10px]': type === DropdownType.Secondary,
  }, listClassName);

  return (
    <Listbox value={selected} onChange={onSelect}>
      {({ open }) => (
        <div className={classNames('relative w-full', className)}>
          <Listbox.Button className={classNames(selectedDropdownItemCx, { '!border-[#25D695]': open })}>
            <span className={classNames('flex items-center gap-2', selectedLabelClassName)}>
              {icon}
              {selected.label}
            </span>
            <span className="pointer-events-none inset-y-0 right-0 flex items-center">
              <svg
                className={classNames('transition transform', { 'rotate-180': open })}
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.62839 12.9445C9.82701 13.1652 10.1731 13.1652 10.3717 12.9445L14.3919 8.47762C14.6814 8.15586 14.4531 7.64314 14.0202 7.64314L5.97986 7.64314C5.54697 7.64314 5.31863 8.15586 5.60821 8.47762L9.62839 12.9445Z"
                  fill={open ? '#25D695' : '#5E6773'}
                />
              </svg>
            </span>
          </Listbox.Button>

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className={dropdownListCx}>
              {items.map((dropdownItem: DropdownItem) => (
                <Listbox.Option
                  key={dropdownItem.id}
                  className={({ active }) =>
                    classNames(
                      selected.id === dropdownItem.id ? 'bg-[#2B3138] text-[#EEE]' : '',
                      active && !(selected.id === dropdownItem.id) ? 'bg-[#21262E]' : '',
                      type === DropdownType.Primary ? 'p-4' : 'py-3 px-4',
                      'flex items-center justify-between gap-2 relative cursor-pointer select-none'
                    )
                  }
                  value={dropdownItem}
                >
                  {({ selected }) => (
                    <>
                      <div className="flex items-center gap-2">
                        {dropdownItem.icon}
                        {dropdownItem.label}
                      </div>
                      {selected ? (
                        <GeneralIcon
                          type={GeneralIconType.CheckMark}
                        />
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  )
}
