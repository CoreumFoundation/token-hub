'use client';

import { ButtonIconType, ButtonType, DropdownType, GeneralIconType } from "@/shared/types";
import Image from "next/image";
import { Button } from "../Button";
import { Dropdown, DropdownItem } from "../Dropdown";
import { GeneralIcon } from "@/assets/GeneralIcon";
import { useState } from "react";

const NetworkSelectorItems = [
  {
    id: 'testnet',
    label: 'Testnet'.toUpperCase(),
    icon: <GeneralIcon type={GeneralIconType.Coreum} />
  },
  {
    id: 'devnet',
    label: 'Devnet'.toUpperCase(),
    icon: <GeneralIcon type={GeneralIconType.Coreum} />
  },
];

export const Navbar = () => {
  const [selected, setSelected] = useState<DropdownItem>(NetworkSelectorItems[0]);

  const handleConnectButtonClick = () => {
    console.log('handle connect');
  };

  return (
    <div className="flex items-center justify-between w-full p-6 z-10">
      <Image
        className="w-[7.5rem]"
        src="/images/logo.svg"
        alt="Coreum Logo"
        width={120}
        height={24}
      />
      <div className="flex items-center gap-2">
        <Dropdown
          selected={selected}
          onSelect={setSelected}
          items={NetworkSelectorItems}
          type={DropdownType.Primary}
          icon={<GeneralIcon type={GeneralIconType.Network} />}
          selectedClassName="text-xs !w-[140px]"
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
