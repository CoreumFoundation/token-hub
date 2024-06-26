'use client';

import { ButtonIconType, ButtonType, DropdownItem, DropdownType, GeneralIconType, Network } from "@/shared/types";
import Image from "next/image";
import { Button } from "../Button";
import { Dropdown } from "../Dropdown";
import { GeneralIcon } from "@/assets/GeneralIcon";
import { useCallback, useEffect, useMemo, useState } from "react";
import { NETWORK_SELECTOR_ITEMS, STORAGE_SELECTED_NETWORK } from "@/constants";
import { setIsConnectModalOpen, setNetwork } from "@/features/general/generalSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { AccountActions } from "../AccountActions";
import { useDisconnect } from "graz";
import { shouldRefetchBalances } from "@/features/balances/balancesSlice";
import { shouldRefetchCurrencies } from "@/features/currencies/currenciesSlice";
import { setShouldFetchNFTCollections, setShouldRefetchNFTItems } from "@/features/nft/nftSlice";

export const Navbar = () => {
  const [selected, setSelected] = useState<DropdownItem>(NETWORK_SELECTOR_ITEMS[0]);
  const isConnected = useAppSelector(state => state.general.isConnected);
  const { disconnect } = useDisconnect();

  const dispatch = useAppDispatch();

  const handleSelectCurrentNetwork = useCallback((value: DropdownItem) => {
    if (value.id === selected.id) {
      return;
    }

    disconnect();
    dispatch(setNetwork(value.id as Network));
    setSelected(value);
    dispatch(shouldRefetchBalances(true));
    dispatch(shouldRefetchCurrencies(true));
    dispatch(setShouldRefetchNFTItems(true));
    dispatch(setShouldFetchNFTCollections(true));

    localStorage.setItem(STORAGE_SELECTED_NETWORK, value.id);
  }, [selected]);

  useEffect(() => {
    const networkInStorage = localStorage.getItem(STORAGE_SELECTED_NETWORK);

    if (!networkInStorage) {
      localStorage.setItem(STORAGE_SELECTED_NETWORK, selected.id);
    } else {
      const itemToSelect = NETWORK_SELECTOR_ITEMS.find((item: DropdownItem) => item.id === networkInStorage);

      if (itemToSelect) {
        handleSelectCurrentNetwork(itemToSelect);
      }
    }
  }, []);

  const handleConnectButtonClick = useCallback(() => {
    dispatch(setIsConnectModalOpen(true));
  }, []);

  return (
    <div className="flex items-baseline sm:items-center justify-between w-full p-6 z-20">
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
          onSelect={handleSelectCurrentNetwork}
          items={NETWORK_SELECTOR_ITEMS}
          type={DropdownType.Primary}
          icon={<GeneralIcon type={GeneralIconType.Network} />}
          selectedClassName="text-xs sm:!w-[140px]"
          selectedLabelClassName="text-grey-gradient"
        />
        {isConnected ? (
          <AccountActions />
        ) : (
          <Button
            label="Connect Wallet"
            onClick={handleConnectButtonClick}
            type={ButtonType.Primary}
            iconType={ButtonIconType.Wallet}
            className="text-sm !py-2 px-6 rounded-[10px]"
            iconClassName="w-4"
          />
        )}
      </div>
    </div>
  );
}
