import { AccountActionType, DropdownItem, DropdownType } from "@/shared/types";
import { Dropdown } from "../Dropdown";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback, useMemo } from "react";
import { ACTION_ITEMS_OPTIONS } from "@/constants";
import { useDisconnect } from "graz";
import { setIsConnectModalOpen } from "@/features/general/generalSlice";


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
  }, [account]);

  const handleSwitchWallet = useCallback(() => {
    dispatch(setIsConnectModalOpen(true));
  }, []);

  const handleOpenExplorer = useCallback(() => {
    console.log('open explorer')
  }, []);

  const handleDisconnect = useCallback(async () => {
    try {
      await disconnectAsync();
    } catch (error) {
      console.log(error);
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
      case AccountActionType.Explorer:
        handleOpenExplorer();
        break;
      case AccountActionType.Disconnect:
        handleDisconnect();
        break;
      default:
    }
  }, []);

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
