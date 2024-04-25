'use client';

import { ButtonIconType, ButtonType, DropdownItem, DropdownType, GeneralIconType } from "@/shared/types";
import Image from "next/image";
import { Button } from "../Button";
import { Dropdown } from "../Dropdown";
import { GeneralIcon } from "@/assets/GeneralIcon";
import { useState } from "react";
import { NETWORK_SELECTOR_ITEMS } from "@/constants";

export const Navbar = () => {
  const [selected, setSelected] = useState<DropdownItem>(NETWORK_SELECTOR_ITEMS[0]);

  const handleConnectButtonClick = () => {
    console.log('handle connect');
  };

  return (
    <div className="flex items-baseline sm:items-center justify-between w-full p-6 z-10">
      <Image
        className="w-[7.5rem]"
        src="/images/logo.svg"
        alt="Coreum Logo"
        width={120}
        height={24}
      />
      <div className="flex flex-col-reverse sm:flex-row items-end gap-2">
        <Dropdown
          selected={selected}
          onSelect={setSelected}
          items={NETWORK_SELECTOR_ITEMS}
          type={DropdownType.Primary}
          icon={<GeneralIcon type={GeneralIconType.Network} />}
          selectedClassName="text-xs sm:!w-[140px]"
          selectedLabelClassName="text-grey-gradient"
        />
        <Button
          label={"Connect Wallet"}
          onClick={handleConnectButtonClick}
          type={ButtonType.Primary}
          iconType={ButtonIconType.Wallet}
          className="text-sm !py-2 px-6 rounded-[10px]"
          iconClassName="w-4"
        />
      </div>
    </div>
  );
}
