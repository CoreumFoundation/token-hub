'use client';

import { ButtonType, DropdownItem, DropdownType, GeneralIconType } from "@/shared/types";
import { Button } from "../Button";
import { Dropdown } from "../Dropdown";
import { ChangeEvent, FC, useCallback, useState } from "react";
import { GeneralIcon } from "@/assets/GeneralIcon";
import { getNumberRegex } from "@/helpers/getNumberRegex";

interface AmountProps {
  value: string;
  onChangeValue: (value: string) => void;
  selectedCurrency: DropdownItem;
  currencies: DropdownItem[];
  onSelectCurrency: (item: DropdownItem) => void;
  onMaxButtonClick: () => void;
  balance: string;
}

export const Amount: FC<AmountProps> = ({
  value,
  onChangeValue,
  selectedCurrency,
  currencies,
  onSelectCurrency,
  onMaxButtonClick,
  balance,
}) => {
  const handleChangeAmount = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value.length) {
      onChangeValue('');
      return;
    }

    if (getNumberRegex().test(e.target.value)) {
      onChangeValue(e.target.value);
    }
  }, [onChangeValue]);

  return (
    <div className="flex flex-col w-full items-center gap-2">
      <div className="flex items-center justify-between w-full gap-6">
        <input
          className="flex-1 w-full bg-transparent text-2xl font-medium placeholder:text-[#5E6773] text-[#EEE] outline-none"
          placeholder="0.00"
          value={value}
          onChange={handleChangeAmount}
        />
        <div className="flex-none">
          <Dropdown
            selected={selectedCurrency}
            onSelect={onSelectCurrency}
            items={currencies}
            type={DropdownType.Primary}
            icon={<GeneralIcon type={GeneralIconType.Coreum} />}
            selectedClassName="text-xs !w-[140px]"
            selectedLabelClassName="text-grey-gradient"
          />
        </div>
      </div>
      <div className="flex items-center justify-between w-full gap-6">
        <div className="flex-1">
          <div className="max-w-min">
            <Button
              label="Max"
              onClick={onMaxButtonClick}
              type={ButtonType.Secondary}
              className="!py-1 !px-2 text-xs !rounded"
            />
          </div>
        </div>
        <div className="flex-none">
          <div className="flex items-baseline w-full gap-1">
            <div className="text-[#5E6773] text-xs">
              Available:
            </div>
            <div className="text-[#eee] text-base">
              {balance} COREUM
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
