'use client';

import { GeneralIcon } from "@/assets/GeneralIcon";
import { Button } from "@/components/Button";
import { ExpandedList } from "@/components/ExpandedList";
import { Input } from "@/components/Input";
import { MessageBox } from "@/components/MessageBox";
import { TextArea } from "@/components/TextArea";
import { TokenCapability } from "@/components/TokenCapability";
import { TOKEN_CAPABILITIES } from "@/constants";
import { ButtonIconType, ButtonType, ExpandedListElem, GeneralIconType, TokenCapabilityItem, TokenCapabilityType } from "@/shared/types";
import Link from "next/link";
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from "react";

export const FungibleTokenCreate = () => {
  const [symbol, setSymbol] = useState<string>('');
  const [subunit, setSubunit] = useState<string>('');
  const [precision, setPrecision] = useState<string>('0');
  const [initialAmount, setInitialAmount] = useState<string>('0');

  const [url, setUrl] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const [burnRate, setBurnRate] = useState<string>('0');
  const [sendCommissionRate, setSendCommissionRate] = useState<string>('0');

  const [mintingEnabled, setMintingEnabled] = useState<boolean>(false);
  const [burningEnabled, setBurningEnabled] = useState<boolean>(false);
  const [freezingEnabled, setFreezingEnabled] = useState<boolean>(false);
  const [whitelistingEnabled, setWhitelistingEnabled] = useState<boolean>(false);
  const [ibcEnabled, setIBCEnabled] = useState<boolean>(false);
  const [blockEnabled, setBlockEnabled] = useState<boolean>(false);

  const handleConnectWalletClick = useCallback(() => {
    console.log('connect wallet');
  }, []);

  const getTokenStateItem = useCallback((type: TokenCapabilityType): [boolean, Dispatch<SetStateAction<boolean>>] | [] => {
    switch (type) {
      case TokenCapabilityType.Mint:
        return [mintingEnabled, setMintingEnabled];
      case TokenCapabilityType.Burn:
        return [burningEnabled, setBurningEnabled];
      case TokenCapabilityType.Freeze:
        return [freezingEnabled, setFreezingEnabled];
      case TokenCapabilityType.Whitelist:
        return [whitelistingEnabled, setWhitelistingEnabled];
      case TokenCapabilityType.IBC:
        return [ibcEnabled, setIBCEnabled];
      case TokenCapabilityType.Block:
        return [blockEnabled, setBlockEnabled];
      default:
        return [];
    }
  }, [blockEnabled, burningEnabled, freezingEnabled, ibcEnabled, mintingEnabled, whitelistingEnabled]);

  const tokenCapabilities: ExpandedListElem[] = useMemo(() => {
    return TOKEN_CAPABILITIES.map((tokenCapability: TokenCapabilityItem) => {
      const [enabled, setEnabled] = getTokenStateItem(tokenCapability.type);

      return {
        id: tokenCapability.type,
        content: (
          <TokenCapability
            {...tokenCapability}
            enabled={enabled || false}
            setEnabled={setEnabled ? setEnabled : () => {}}
          />
        ),
      };
    });
  }, [getTokenStateItem]);

  return (
    <div className="flex flex-col gap-10">
      <MessageBox>
        <ul className="list-disc text-[#868991] text-sm font-normal ml-5">
          <li>Smart tokens on the Coreum network enable enterprises to set <Link className="text-[#25D695] underline font-medium" href="/">predetermine behaviours</Link> and <Link className="text-[#25D695] underline" href="">deterministic gas fee</Link> for certain tokens, facilitating the execution of contract-like functions directly on the blockchain&apos;s storage.</li>
          <li>Your <span className="text-[#9FA2AC] font-semibold">Fungible Tokens (FT)</span> will be stored in a collection that defines their behavior.</li>
        </ul>
      </MessageBox>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          label="Symbol"
          value={symbol}
          onChange={setSymbol}
          placeholder="e. g. TOKEN"
        />
        <Input
          label="Subunit"
          value={subunit}
          onChange={setSubunit}
          placeholder="e. g. utoken"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          label="Precision"
          value={precision}
          onChange={setPrecision}
          placeholder="0"
        />
        <Input
          label="Initial Amount"
          value={initialAmount}
          onChange={setInitialAmount}
          placeholder="0"
        />
      </div>
      <div className="grid grid-cols-1">
        <Input
          label="URL"
          value={url}
          onChange={setUrl}
          placeholder="http://example.com"
        />
      </div>
      <div className="grid grid-cols-1">
        <TextArea
          label="Description"
          value={description}
          onChange={setDescription}
          placeholder="Enter token description"
          rows={4}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          label="Burn Rate"
          value={burnRate}
          onChange={setBurnRate}
          placeholder="0"
          icon={<GeneralIcon type={GeneralIconType.Percentage} />}
        />
        <Input
          label="Send Commission Rate"
          value={sendCommissionRate}
          onChange={setSendCommissionRate}
          placeholder="0"
          icon={<GeneralIcon type={GeneralIconType.Percentage} />}
        />
      </div>
      <div className="flex w-full">
        <ExpandedList
          label="Token Capabilities"
          listItems={tokenCapabilities}
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
