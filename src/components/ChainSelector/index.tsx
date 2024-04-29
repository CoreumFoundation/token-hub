import { ChainInfo, ChainType, DropdownItem } from "@/shared/types";
import { useAppSelector } from "@/store/hooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Dropdown } from "../Dropdown";
import { ChainIcon } from "@/assets/ChainIcon";


export const ChainSelector = () => {
  const [destinationChain, setDestinationChain] = useState<ChainInfo | null>(null);

  const chains = useAppSelector(state => state.chains.list);

  useEffect(() => {
    if (destinationChain === null && chains.length) {
      setDestinationChain(chains[0]);
    }
  }, [chains, destinationChain]);

  const selectedChain: DropdownItem | null = useMemo(() => {
    if (!destinationChain) {
      return null;
    }

    return {
      id: destinationChain.chain_id,
      label: destinationChain.pretty_name,
      icon: <ChainIcon type={destinationChain.chain_name as ChainType} className="!w-7 !h-7" />,
    }
  }, [destinationChain]);

  const dropdownChains: DropdownItem[] = useMemo(() => {
    return chains.map((chainInfoItem: ChainInfo) => {
      return {
        id: chainInfoItem.chain_id,
        label: chainInfoItem.pretty_name,
        icon: <ChainIcon type={chainInfoItem.chain_name as ChainType} className="!w-7 !h-7" />
      };
    });
  }, [chains]);

  const onSelect = useCallback((value: DropdownItem) => {
    const chain = chains.find((chainInfoItem: ChainInfo) => chainInfoItem.chain_id === value.id);

    if (chain) {
      setDestinationChain(chain);
    }
  }, [chains]);

  return (
    <div className="flex flex-col w-full gap-2 relative">
      <label className="block text-sm text-[#868991] font-noto-sans">
        Destination Chain
      </label>
      <Dropdown
        selected={selectedChain}
        onSelect={onSelect}
        items={dropdownChains}
        selectedClassName="py-3 !px-4"
        selectedLabelClassName="text-base"
        icon={selectedChain?.icon}
      />
    </div>
  );
};
