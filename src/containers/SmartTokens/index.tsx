'use client';

import { Input } from "@/components/Input";
import { MessageBox } from "@/components/MessageBox";
import { Tabs } from "@/components/Tabs";
import { TabsSwitch } from "@/components/TabsSwitch";
import { TextArea } from "@/components/TextArea";
import { TABS_ITEMS, TABS_SWITCH_ITEMS } from "@/constants";
import { TabItem, TabSwitchItem } from "@/shared/types";
import Link from "next/link";
import { useState } from "react";

export const SmartTokens = () => {
  const [selectedTab, setSelectedTab] = useState<TabItem>(TABS_ITEMS[0]);
  const [selectedTabSwitch, setSelectedTabSwitch] = useState<TabSwitchItem>(TABS_SWITCH_ITEMS[0]);

  const [symbol, setSymbol] = useState<string>('');
  const [subunit, setSubunit] = useState<string>('');
  const [precision, setPrecision] = useState<string>('0');
  const [initialAmount, setInitialAmount] = useState<string>('0');

  const [url, setUrl] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const [burnRate, setBurnRate] = useState<string>('0');
  const [sendCommissionRate, setSendCommissionRate] = useState<string>('0');

  return (
    <div className="flex flex-col w-full bg-main-gradient py-6 px-10 gap-5 rounded-3xl font-noto-sans">
      <div className="flex justify-between gap-4 w-full">
        <Tabs
          selectedTab={selectedTab}
          items={TABS_ITEMS}
          handleSelectTab={setSelectedTab}
        />
        <TabsSwitch
          selectedTabSwitch={selectedTabSwitch}
          items={TABS_SWITCH_ITEMS}
          handleSelectTab={setSelectedTabSwitch}
        />
      </div>
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
          />
          <Input
            label="Send Commission Rate"
            value={sendCommissionRate}
            onChange={setSendCommissionRate}
            placeholder="0"
          />
        </div>
      </div>
    </div>
  );
};
