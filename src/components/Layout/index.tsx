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

import { ConnectWalletModal } from "../ConnectWalletModal";
import { ReduxProvider } from "@/providers/ReduxProvider";
import { AppProvider } from "@/providers/AppProvider";
import { WalletProvider } from "@/providers/WalletProvider";
import { BurnTokensModal } from "../BurnTokensModal";
import { ManageTokensModal } from "../ManageTokensModal";
import { ConfirmMintModal } from "../ConfirmMintModal";
import { ConfirmBurnModal } from "../ConfirmBurnModal";
import { ConfirmFreezeModal } from "../ConfirmFreezeModal";
import { ConfirmGlobalFreezeModal } from "../ConfirmGlobalFreezeModal";
import { ConfirmGlobalUnfreezeModal } from "../ConfirmGlobalUnfreezeModal";
import { ConfirmUnfreezeModal } from "../ConfirmUnfreezeModal";
import { ConfirmWhitelistModal } from "../ConfirmWhitelistModal";
import { Alerts } from "../Alerts";
import { MintNFTModal } from "../MintNFTModal";
import { ViewNFTCollectionModal } from "../ViewNFTCollectionModal";
import { ConfirmNFTMintModal } from "../ConfirmNFTMintModal";
import { SelectNFTModal } from "../SelectNFTModal";
import { BurnNFTModal } from "../BurnNFTModal";
import { FreezeNFTModal } from "../FreezeNFTModal";
import { UnfreezeNFTModal } from "../UnfreezeNFTModal";
import { WhitelistNFTModal } from "../WhitelistNFTModal";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [, switchTab, tab] = pathname.split('/');

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
    router.push(`/${selectedTabSwitch.id}/${value.id}`);
  }, [router, selectedTabSwitch.id]);

  const handleSetSwitchTab = useCallback((value: TabSwitchItem) => {
    router.push(`/${value.id}/${selectedTab.id}`);
  }, [router, selectedTab.id]);

  return (
    <WalletProvider>
      <ReduxProvider>
        <AppProvider>
          <div className="flex flex-col min-h-screen w-full items-center bg-main-image z-10">
            <Alerts />
            <Navbar />
            <div className="flex flex-1 flex-col h-full w-full pb-28 relative items-center overflow-hidden">
              <main className="flex min-h-screen flex-col items-center w-full z-10 p-4">
                <div className="flex flex-col items-center w-[800px] max-w-full gap-10 my-6">
                  <div className="flex items-center gap-2 font-space-grotesk w-full">
                    <div className="text-3xl font-bold">
                      <span className="text-grey-gradient">Smart Tokens on </span><span className="text-green-gradient">Coreum</span>
                    </div>
                    <GeneralIcon type={GeneralIconType.Info} className="group cursor-pointer" pathClassName="group-hover:fill-[#eee]" />
                  </div>
                  <div className="flex flex-col w-full bg-[#0d1012] py-6 px-10 gap-5 rounded-3xl font-noto-sans z-10">
                    <div className="flex justify-between gap-4 w-full">
                      <Tabs
                        selectedTab={selectedTab}
                        items={TABS_ITEMS}
                        handleSelectTab={handleSetTab}
                      />
                      <TabsSwitch
                        selectedTabSwitch={selectedTabSwitch}
                        items={TABS_SWITCH_ITEMS}
                        handleSelectTab={handleSetSwitchTab}
                      />
                    </div>
                    {children}
                  </div>
                </div>
                <div className="absolute bottom-0 z-0">
                  <Image src="/images/bg-image-bottom.png" width={1440} height={900} alt="bg image bottom" />
                </div>
              </main>
            </div>
            <Footer />
            <ConnectWalletModal />
            <BurnTokensModal />
            <ManageTokensModal />
            <ConfirmMintModal />
            <ConfirmBurnModal />
            <ConfirmFreezeModal />
            <ConfirmGlobalFreezeModal />
            <ConfirmUnfreezeModal />
            <ConfirmGlobalUnfreezeModal />
            <ConfirmWhitelistModal />
            <MintNFTModal />
            <ConfirmNFTMintModal />
            <ViewNFTCollectionModal />
            <SelectNFTModal />
            <BurnNFTModal />
            <FreezeNFTModal />
            <UnfreezeNFTModal />
            <WhitelistNFTModal />
          </div>
        </AppProvider>
      </ReduxProvider>
    </WalletProvider>
  );
};
