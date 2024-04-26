'use client';

import { GeneralIcon } from "@/assets/GeneralIcon";
import { Amount } from "@/components/Amount";
import { Button } from "@/components/Button";
import { InfoRow } from "@/components/InfoRow";
import { Input } from "@/components/Input";
import { MessageBox } from "@/components/MessageBox";
import { SectionWithLabel } from "@/components/SectionWithLabel";
import { ButtonIconType, ButtonType, DropdownItem, GeneralIconType } from "@/shared/types";
import { useCallback, useState } from "react";

export const FungibleTokenSend = () => {
  const [destinationChain, setDestinationChain] = useState<string>('');
  const [destinationAddress, setDestinationAddress] = useState<string>('');

  const handleConnectWalletClick = useCallback(() => {
    console.log('connect wallet');
  }, []);


  const selectedCurrency: DropdownItem = {
    id: 'coreum',
    label: 'COREUM',
    icon: <GeneralIcon type={GeneralIconType.Coreum} />
  };

  return (
    <div className="flex flex-col gap-10">
      <MessageBox>
        <ul className="list-disc text-[#868991] text-sm font-normal ml-5">
          <li>Depending of the nature of your Smart Token you can send it to another user.</li>
          <li>Please note, you will not be able to re-claim the assets unless the receiver sends it back to you..</li>
        </ul>
      </MessageBox>
      <SectionWithLabel label="Amount">
        <Amount
          value={""}
          onChangeValue={(value: string) => {}}
          selectedCurrency={selectedCurrency}
          currencies={[]}
          onSelectCurrency={(item: DropdownItem) => {}}
          onMaxButtonClick={() => {}}
          balance={""}
        />
      </SectionWithLabel>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Input
          label="Destination Chain"
          value={destinationChain}
          onChange={setDestinationChain}
          placeholder="Destination Chain"
        />
        <div className="col-span-2">
          <Input
            label="Destination Address"
            value={destinationAddress}
            onChange={setDestinationAddress}
            placeholder="Enter Destination Address"
          />
        </div>
      </div>
      <div className="flex flex-col w-full items-center gap-2">
        <InfoRow
          label={"Fee"}
          value="~ 0.00 COREUM"
        />
        <InfoRow
          label={"Estimated Time"}
          value="1 - 3 minutes"
        />
      </div>
      <div className="flex w-full justify-end">
        <div className="flex items-center">
          <Button
            label="Connect Wallet"
            onClick={handleConnectWalletClick}
            type={ButtonType.Primary}
            iconType={ButtonIconType.Wallet}
          />
        </div>
      </div>
    </div>
  );
};
