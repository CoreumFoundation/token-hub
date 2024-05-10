import { AccountActionType, AlertType, DropdownItem, DropdownType } from "@/shared/types";
import { Dropdown } from "../Dropdown";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback, useMemo } from "react";
import { ACTION_ITEMS_OPTIONS } from "@/constants";
import { useDisconnect } from "graz";
import { setIsConnectModalOpen } from "@/features/general/generalSlice";
import { dispatchAlert } from "@/features/alerts/alertsSlice";
import { shouldRefetchBalances } from "@/features/balances/balancesSlice";
import { shouldRefetchCurrencies } from "@/features/currencies/currenciesSlice";
import { setShouldFetchNFTCollections, setShouldRefetchNFTItems } from "@/features/nft/nftSlice";

export const AccountActions = () => {
  const account = useAppSelector(state => state.general.account);
  const { disconnectAsync } = useDisconnect();
  const dispatch = useAppDispatch();

  const selectedDropdownValue: DropdownItem = useMemo(() => {
    return {
      id: 'account',
      label: (
        <p className="truncate w-[116px] max-w-full">{account}</p>
      ),
    };
  }, [account]);

  const handleCopyAccountAddress = useCallback(() => {
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = account;

    document.body.appendChild(tempTextArea);

    tempTextArea.select();
    tempTextArea.setSelectionRange(0, 99999); // For mobile devices

    // Execute the copy command
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);

    dispatch(dispatchAlert({
      type: AlertType.Success,
      title: 'Account address was copied!'
    }));
  }, [account]);

  const handleSwitchWallet = useCallback(() => {
    dispatch(setIsConnectModalOpen(true));
  }, []);

  const handleDisconnect = useCallback(async () => {
    try {
      await disconnectAsync();
      dispatch(shouldRefetchBalances(true));
      dispatch(shouldRefetchCurrencies(true));
      dispatch(setShouldRefetchNFTItems(true));
      dispatch(setShouldFetchNFTCollections(true));
    } catch (error) {
      dispatch(dispatchAlert({
        type: AlertType.Error,
        title: 'Wallet disconnect is failed. Please, try again!',
      }));
    }
  }, []);

  const onSelect = useCallback((value: DropdownItem) => {
    switch (value.id as unknown as AccountActionType) {
      case AccountActionType.Copy:
        handleCopyAccountAddress();
        break;
      case AccountActionType.Switch:
        handleSwitchWallet();
        break;
      case AccountActionType.Disconnect:
        handleDisconnect();
        break;
      default:
    }
  }, [handleCopyAccountAddress]);

  return (
    <Dropdown
      selected={selectedDropdownValue}
      onSelect={onSelect}
      items={ACTION_ITEMS_OPTIONS}
      type={DropdownType.Primary}
      selectedClassName="bg-green-secondary-opacity-10 truncate"
      selectedLabelClassName="text-[#25D695] font-noto-sans"
    />
  );
};
