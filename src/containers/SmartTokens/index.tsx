'use client';

import { Input } from "@/components/Input";
import { Tabs } from "@/components/Tabs";
import { TabsSwitch } from "@/components/TabsSwitch";
import { TABS_ITEMS, TABS_SWITCH_ITEMS } from "@/constants";
import { TabItem, TabSwitchItem } from "@/shared/types";
import { useState } from "react";

export const SmartTokens = () => {
  const [selectedTab, setSelectedTab] = useState<TabItem>(TABS_ITEMS[0]);
  const [selectedTabSwitch, setSelectedTabSwitch] = useState<TabSwitchItem>(TABS_SWITCH_ITEMS[0]);
  const [inputValue, setInputValue] = useState<string>('');

  return (
    <div className="flex flex-col w-full bg-main-gradient py-6 px-10 gap-5 rounded-3xl">
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
        Content
      </div>
    </div>
  );
};
