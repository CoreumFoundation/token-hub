'use client';

import { Tabs } from "@/components/Tabs";
import { TabsSwitch } from "@/components/TabsSwitch";
import { TABS_ITEMS, TABS_SWITCH_ITEMS } from "@/constants";
import { TabItem, TabItemType, TabSwitchItem, TabSwitchItemType, } from "@/shared/types";
import { useMemo, useState } from "react";
import { FungibleTokenSend } from "../FungibleTokenSend";
import { FungibleTokenCreate } from "../FungibleTokenCreate";
import { FungibleTokenManage } from "../FungibleTokenManage";
import { NonFungibleTokenCreate } from "../NonFungibleTokenCreate";
import { NonFungibleTokenManage } from "../NonFungibleTokenManage";
import { NonFungibleTokenSend } from "../NonFungibleTokenSend";

export const SmartTokens = () => {
  const [selectedTab, setSelectedTab] = useState<TabItem>(TABS_ITEMS[0]);
  const [selectedTabSwitch, setSelectedTabSwitch] = useState<TabSwitchItem>(TABS_SWITCH_ITEMS[0]);

  const renderCurrentPage = useMemo(() => {
    if (selectedTabSwitch.id === TabSwitchItemType.FungibleToken) {
      switch (selectedTab.id) {
        case TabItemType.Create:
          return <FungibleTokenCreate />;
        case TabItemType.Manage:
          return <FungibleTokenManage />;
        case TabItemType.Send:
          return <FungibleTokenSend />;
        default:
      }
    } else {
      switch (selectedTab.id) {
        case TabItemType.Create:
          return <NonFungibleTokenCreate />;
        case TabItemType.Manage:
          return <NonFungibleTokenManage />;
        case TabItemType.Send:
          return <NonFungibleTokenSend />;
        default:
      }
    }
  }, [selectedTab.id, selectedTabSwitch.id]);

  return (
    <div className="flex flex-col w-full bg-[#0d1012] py-6 px-10 gap-5 rounded-3xl font-noto-sans z-10">
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
      {renderCurrentPage}
    </div>
  );
};
