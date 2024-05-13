import { useEffect } from "react";
import { chains, ibc } from 'chain-registry';
import { Chain, IBCInfo } from '@chain-registry/types';
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIBCChains } from "@/features/chains/chainsSlice";
import { ChainInfo, Network } from "@/shared/types";
import { coreum, coreumtestnet } from "graz/chains";
import { setDestinationChain } from "@/features/general/generalSlice";
import { COREUM_TESTNET_SUPPORTED_CHAINS } from "@/constants";

export const useChains = () => {
  const dispatch = useAppDispatch();
  const network = useAppSelector(state => state.general.network);
  const compareNetworkChainName = network === Network.Mainnet ? coreum.chainName.toLowerCase() : coreumtestnet.chainName.toLowerCase();

  useEffect(() => {
    const ibcChainsData = network === Network.Mainnet ? ibc : COREUM_TESTNET_SUPPORTED_CHAINS;
    const coreumChainId = network === Network.Mainnet ? 'coreum' : 'coreumtestnet';

    const filteredIBCInfos = ibcChainsData
      .filter((ibcItem: IBCInfo) => ibcItem.chain_1.chain_name === compareNetworkChainName || ibcItem.chain_2.chain_name === compareNetworkChainName);

    const supportedIBCChains: ChainInfo[] = filteredIBCInfos.map((ibcItem: IBCInfo) => {
      const targetChain = ibcItem.chain_1.chain_name === coreumChainId ? {
        chain: ibcItem.chain_2,
        channelData: ibcItem.channels[0].chain_2,
      } : {
        chain: ibcItem.chain_1,
        channelData: ibcItem.channels[0].chain_1,
      };
      const coreumChainIBCData = ibcItem.chain_1.chain_name === coreumChainId ? {
        chain: ibcItem.chain_1,
        channelData: ibcItem.channels[0].chain_1,
      } : {
        chain: ibcItem.chain_2,
        channelData: ibcItem.channels[0].chain_2,
      };
      const chainData = chains.find((chain: Chain) => chain.chain_name === targetChain.chain.chain_name);

      return {
        ...chainData!,
        connection_id: targetChain.chain.connection_id,
        client_id: targetChain.chain.client_id,
        channel_id: targetChain.channelData.channel_id,
        port_id: targetChain.channelData.port_id,
        coreum_channel_id: coreumChainIBCData.channelData.channel_id,
        coreum_client_id: coreumChainIBCData.chain.client_id,
      };
    });

    const coreumChainData: Chain | undefined = chains.find((chain: Chain) => chain.chain_name === compareNetworkChainName);
    const coreumChainInfoData: ChainInfo = {
      ...coreumChainData!,
      connection_id: '',
      client_id: '',
      channel_id: '',
      port_id: '',
      coreum_channel_id: '',
      coreum_client_id: '',
    }

    supportedIBCChains.unshift(coreumChainInfoData);

    dispatch(setIBCChains(supportedIBCChains));
    dispatch(setDestinationChain(supportedIBCChains[0]));
  }, [network, compareNetworkChainName]);
};
