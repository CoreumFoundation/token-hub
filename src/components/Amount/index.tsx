'use client';

import { ButtonType, DropdownItem, DropdownType, GeneralIconType } from "@/shared/types";
import { Button } from "../Button";
import { Dropdown } from "../Dropdown";
import { ChangeEvent, FC, useCallback, useMemo, useState } from "react";
import { GeneralIcon } from "@/assets/GeneralIcon";
import { getNumberRegex } from "@/helpers/getNumberRegex";
import { Decimal } from "../Decimal";

interface AmountProps {
  value: string;
  onChangeValue: (value: string) => void;
  selectedCurrency: DropdownItem | null;
  currencies: DropdownItem[];
  onSelectCurrency: (item: DropdownItem) => void;
  onMaxButtonClick: () => void;
  balance: string;
  precision: number;
}

export const Amount: FC<AmountProps> = ({
  value,
  onChangeValue,
  selectedCurrency,
  currencies,
  onSelectCurrency,
  onMaxButtonClick,
  balance,
  precision,
}) => {
  const handleChangeAmount = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value.length) {
      onChangeValue('');
      return;
    }

    const currentValue = e.target.value.replaceAll(',', '');
    if (getNumberRegex(precision).test(currentValue)) {
      onChangeValue(currentValue);
    }
  }, [onChangeValue, precision]);

  const renderFormattedValue = useMemo(() => {
    const [integerPart, decimalPart] = value.split('.');

    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    const formattedValue = decimalPart !== undefined
      ? `${formattedIntegerPart}.${decimalPart.slice(0, precision)}`
      : formattedIntegerPart;

    return formattedValue;
  }, [precision, value]);

  return (
    <div className="flex flex-col w-full items-center gap-2">
      <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4 sm:gap-6">
        <input
          className="flex-1 w-full bg-transparent text-2xl font-medium placeholder:text-[#5E6773] text-[#EEE] outline-none text-center sm:text-left"
          placeholder="0.00"
          value={renderFormattedValue}
          onChange={handleChangeAmount}
        />
        <div className="flex-none">
          <Dropdown
            selected={selectedCurrency}
            onSelect={onSelectCurrency}
            items={currencies}
            type={DropdownType.Primary}
            icon={selectedCurrency?.icon}
            selectedClassName="text-xs !w-[200px]"
            selectedLabelClassName="text-grey-gradient"
            listClassName="!w-[240px] right-0"
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
            <div className="flex text-[#eee] text-base gap-1 items-baseline">
              <Decimal value={balance} precision={precision} /> <span className="text-xs">{(selectedCurrency?.label as string)?.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
