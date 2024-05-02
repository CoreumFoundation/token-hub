import { Network } from '@/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { coreum, coreumtestnet } from 'graz/chains';
import { ChainInfo as KeplrChainInfo } from '@keplr-wallet/types';
import { ChainInfo } from '@/shared/types';

export interface GeneralState {
  isConnectModalOpen: boolean;
  network: Network;
  currentNetworkInfo: KeplrChainInfo;
  account: string;
  isConnected: boolean;
  destinationChain: ChainInfo | null;
  isTxExecuting: boolean;
}

export const initialGeneralState: GeneralState = {
  isConnectModalOpen: false,
  network: Network.Testnet,
  currentNetworkInfo: coreumtestnet,
  account: '',
  isConnected: false,
  destinationChain: null,
  isTxExecuting: false,
};

const generalSlice = createSlice({
  name: 'general',
  initialState: initialGeneralState,
  reducers: {
    setIsConnectModalOpen(state, action: PayloadAction<boolean>) {
      state.isConnectModalOpen = action.payload;
    },
    setNetwork(state, action: PayloadAction<Network>) {
      state.network = action.payload;

      if (action.payload === Network.Mainnet) {
        state.currentNetworkInfo = coreum;
      } else {
        state.currentNetworkInfo = coreumtestnet;
      }
    },
    setAccount(state, action: PayloadAction<string>) {
      state.account = action.payload;
    },
    setIsConnected(state, action: PayloadAction<boolean>) {
      state.isConnected = action.payload;
    },
    setDestinationChain(state, action: PayloadAction<ChainInfo>) {
      state.destinationChain = action.payload;
    },
    setIsTxExecuting(state, action: PayloadAction<boolean>) {
      state.isTxExecuting = action.payload;
    },
  },
});

export const {
  setIsConnectModalOpen,
  setNetwork,
  setAccount,
  setIsConnected,
  setDestinationChain,
  setIsTxExecuting,
} = generalSlice.actions;
export const generalReducer = generalSlice.reducer;
export default generalSlice.reducer;
