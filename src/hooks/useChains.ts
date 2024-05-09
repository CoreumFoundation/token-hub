import { useEffect, useState } from "react";
import { chains, ibc } from 'chain-registry';
import { Chain, IBCInfo } from '@chain-registry/types';
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIBCChains } from "@/features/chains/chainsSlice";
import { ChainInfo, Network } from "@/shared/types";
import { coreum, coreumtestnet } from "graz/chains";
import { setDestinationChain } from "@/features/general/generalSlice";

export const useChains = () => {
  const dispatch = useAppDispatch();
  const network = useAppSelector(state => state.general.network);
  const compareNetworkChainName = network === Network.Mainnet ? coreum.chainName.toLowerCase() : coreumtestnet.chainName.toLowerCase();

  useEffect(() => {
    const filteredIBCInfos = ibc
      .filter((ibcItem: IBCInfo) => ibcItem.chain_1.chain_name === compareNetworkChainName || ibcItem.chain_2.chain_name === compareNetworkChainName);

    const supportedIBCChains: ChainInfo[] = filteredIBCInfos.map((ibcItem: IBCInfo) => {
      const targetChain = ibcItem.chain_1.chain_name === 'coreum' ? {
        chain: ibcItem.chain_2,
        channelData: ibcItem.channels[0].chain_2,
      } : {
        chain: ibcItem.chain_1,
        channelData: ibcItem.channels[0].chain_1,
      };
      const chainData = chains.find((chain: Chain) => chain.chain_name === targetChain.chain.chain_name);

      return {
        ...chainData!,
        connection_id: targetChain.chain.connection_id,
        client_id: targetChain.chain.client_id,
        channel_id: targetChain.channelData.channel_id,
        port_id: targetChain.channelData.port_id,
      };
    });

    const coreumChainData: Chain | undefined = chains.find((chain: Chain) => chain.chain_name === compareNetworkChainName);
    const coreumChainInfoData: ChainInfo = {
      ...coreumChainData!,
      connection_id: '',
      client_id: '',
      channel_id: '',
      port_id: '',
    }

    supportedIBCChains.unshift(coreumChainInfoData);

    dispatch(setIBCChains(supportedIBCChains));
    dispatch(setDestinationChain(supportedIBCChains[0]));
  }, [network, compareNetworkChainName]);
};
