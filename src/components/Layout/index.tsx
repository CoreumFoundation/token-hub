'use client';

import { GeneralIcon } from "@/assets/GeneralIcon";
import { GeneralIconType, TabItem, TabSwitchItem } from "@/shared/types";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import Image from 'next/image';
import { TabsSwitch } from "../TabsSwitch";
import { TABS_ITEMS, TABS_SWITCH_ITEMS } from "@/constants";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Tabs } from "../Tabs";
import { usePathname, useRouter } from "next/navigation";

import { ReduxProvider } from "@/providers/ReduxProvider";
import { AppProvider } from "@/providers/AppProvider";
import { WalletProvider } from "@/providers/WalletProvider";
import { Alerts } from "../Alerts";
import { Tooltip } from "../Tooltip";
import Link from "next/link";
import { ModalsWrapper } from "../ModalsWrapper";
import classNames from "classnames";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [, switchTab, tab] = pathname.split('/');

  const [isMounted, setIsMounted] = useState<boolean>(false);

  const defaultTabItem = useMemo(() => TABS_ITEMS.find((value: TabItem) => value.id === tab), [tab]);
  const defaultTabSwitchItem = useMemo(() => TABS_SWITCH_ITEMS.find((value: TabSwitchItem) => value.id === switchTab), [switchTab]);

  const [selectedTab, setSelectedTab] = useState<TabItem>(defaultTabItem || TABS_ITEMS[0]);
  const [selectedTabSwitch, setSelectedTabSwitch] = useState<TabSwitchItem>(defaultTabSwitchItem || TABS_SWITCH_ITEMS[0]);

  useEffect(() => {
    const [, switchTab, tab] = pathname.split('/');

    if (tab !== selectedTab.id) {
      const newSelectedTabItem = TABS_ITEMS.find((value: TabItem) => value.id === tab);

      if (newSelectedTabItem) {
        setSelectedTab(newSelectedTabItem);
      }
    }

    if (switchTab !== selectedTabSwitch.id) {
      const newSelectedTabSwitchItem = TABS_SWITCH_ITEMS.find((value: TabSwitchItem) => value.id === switchTab);

      if (newSelectedTabSwitchItem) {
        setSelectedTabSwitch(newSelectedTabSwitchItem);
      }
    }
  }, [pathname, selectedTab.id, selectedTabSwitch.id]);

  const handleSetTab = useCallback((value: TabItem) => {
    router.prefetch(`/${selectedTabSwitch.id}/${value.id}`);
    router.push(`/${selectedTabSwitch.id}/${value.id}`);
  }, [router, selectedTabSwitch.id]);

  const handleSetSwitchTab = useCallback((value: TabSwitchItem) => {
    router.prefetch(`/${value.id}/${selectedTab.id}`);
    router.push(`/${value.id}/${selectedTab.id}`);
  }, [router, selectedTab.id]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <WalletProvider>
      <ReduxProvider>
        <AppProvider>
          <div className="flex flex-col min-h-screen w-full items-center bg-main-image z-10">
            <Alerts />
            <Navbar />
            <div className={classNames('flex flex-1 flex-col h-full min-h-full w-full pb-28 relative items-center overflow-hidden', {
              'min-h-[700px]': !isMounted,
            })}>
              <main className="flex min-h-screen flex-col items-center w-full z-10 p-4">
                <div className="flex flex-col items-center w-[800px] max-w-full gap-10 my-6">
                  <div className="flex items-center gap-2 font-space-grotesk w-full">
                    <div className="text-3xl font-bold">
                      <span className="text-grey-gradient">Smart Tokens on </span><span className="text-green-gradient">Coreum</span>
                    </div>
                    <Tooltip
                      content={(
                        <div className="flex items-center gap-1">
                          Find the codebase on
                          <Link className="text-[#25D695]" href="https://github.com/CoreumFoundation/token-hub" target="_blank">Github</Link>
                        </div>
                      )}
                    >
                      <GeneralIcon type={GeneralIconType.Info} className="group cursor-pointer" pathClassName="group-hover:fill-[#eee]" />
                    </Tooltip>
                  </div>
                  <div className="flex flex-col w-full bg-[#0d1012] p-4 md:py-6 md:px-10 gap-5 rounded-3xl font-noto-sans z-10">
                    <div className="flex flex-col-reverse md:flex-row items-center md:justify-between gap-4 w-full">
                      <Tabs
                        selectedTab={selectedTab}
                        items={TABS_ITEMS}
                        handleSelectTab={handleSetTab}
                      />
                      <div className="flex">
                        <TabsSwitch
                          selectedTabSwitch={selectedTabSwitch}
                          items={TABS_SWITCH_ITEMS}
                          handleSelectTab={handleSetSwitchTab}
                        />
                      </div>
                    </div>
                    {children}
                  </div>
                </div>
                {isMounted && (
                  <div className="absolute bottom-0 z-0">
                    <Image loading="eager" src="/images/bg-image-bottom.png" width={1440} height={900} alt="bg image bottom" />
                  </div>
                )}
              </main>
            </div>
            <Footer />
            <ModalsWrapper />
          </div>
        </AppProvider>
      </ReduxProvider>
    </WalletProvider>
  );
};
