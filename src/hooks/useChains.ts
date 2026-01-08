import { useEffect } from "react";
import { chains, ibcData } from 'chain-registry';
import { Chain, IBCData } from '@chain-registry/types';
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIBCChains } from "@/features/chains/chainsSlice";
import { ChainInfo, Network } from "@/shared/types";
import { coreum, coreumtestnet } from "graz/chains";
import { setDestinationChain } from "@/features/general/generalSlice";
import { COREUM_TESTNET_SUPPORTED_CHAINS, COREUM_DEVNET_CHAIN_DATA } from "@/constants";

export const useChains = () => {
  const dispatch = useAppDispatch();
  const network = useAppSelector(state => state.general.network);
  const compareNetworkChainName = network === Network.Mainnet ? coreum.chainName.toLowerCase() : coreumtestnet.chainName.toLowerCase();

  useEffect(() => {
    const ibcChainsData = network === Network.Mainnet ? ibcData : (network === Network.Testnet ? COREUM_TESTNET_SUPPORTED_CHAINS : []);
    const coreumChainId = network === Network.Mainnet ? 'coreum' : (network === Network.Testnet ? 'coreumtestnet' : 'coreumdevnet');

    const filteredIBCInfos = ibcChainsData
      .filter((ibcItem: IBCData) => ibcItem.chain1.chainName === compareNetworkChainName || ibcItem.chain2.chainName === compareNetworkChainName);

    const supportedIBCChains: ChainInfo[] = filteredIBCInfos.map((ibcItem: IBCData) => {
      const targetChain = ibcItem.chain1.chainName === coreumChainId ? {
        chain: ibcItem.chain2,
        channelData: ibcItem.channels[0].chain2,
      } : {
        chain: ibcItem.chain1,
        channelData: ibcItem.channels[0].chain1,
      };
      const coreumChainIBCData = ibcItem.chain1.chainName === coreumChainId ? {
        chain: ibcItem.chain1,
        channelData: ibcItem.channels[0].chain1,
      } : {
        chain: ibcItem.chain2,
        channelData: ibcItem.channels[0].chain2,
      };
      const chainData = chains.find((chain: Chain) => chain.chainName === targetChain.chain.chainName);

      return {
        ...chainData!,
        connection_id: targetChain.chain.connectionId,
        client_id: targetChain.chain.clientId,
        channel_id: targetChain.channelData.channelId,
        port_id: targetChain.channelData.portId,
        coreum_channel_id: coreumChainIBCData.channelData.channelId,
        coreum_client_id: coreumChainIBCData.chain.clientId,
      };
    });

    const coreumChainData: Chain | undefined = chains.find((chain: Chain) => chain.chainName === compareNetworkChainName);
    const coreumChainInfoData: ChainInfo = {
      ...(network === Network.Devnet ? COREUM_DEVNET_CHAIN_DATA! : coreumChainData!),
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
  }, [network, compareNetworkChainName, dispatch]);
};
