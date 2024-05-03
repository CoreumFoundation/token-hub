import { Network } from '@/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { coreum, coreumtestnet } from 'graz/chains';
import { ChainInfo as KeplrChainInfo } from '@keplr-wallet/types';
import { ChainInfo } from '@/shared/types';

export interface GeneralState {
  network: Network;
  currentNetworkInfo: KeplrChainInfo;
  account: string;
  isConnected: boolean;
  destinationChain: ChainInfo | null;
  isTxExecuting: boolean;
  isConnectModalOpen: boolean;
  isManageCurrencyModalOpen: boolean;
  isBurnCurrencyModalOpen: boolean;
}

export const initialGeneralState: GeneralState = {
  network: Network.Testnet,
  currentNetworkInfo: coreumtestnet,
  account: '',
  isConnected: false,
  destinationChain: null,
  isTxExecuting: false,
  isConnectModalOpen: false,
  isManageCurrencyModalOpen: false,
  isBurnCurrencyModalOpen: false,
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
    setDestinationChain(state, action: PayloadAction<ChainInfo | null>) {
      state.destinationChain = action.payload;
    },
    setIsTxExecuting(state, action: PayloadAction<boolean>) {
      state.isTxExecuting = action.payload;
    },
    setIsManageCurrencyModalOpen(state, action: PayloadAction<boolean>) {
      state.isManageCurrencyModalOpen = action.payload;
    },
    setIsBurnCurrencyModalOpen(state, action: PayloadAction<boolean>) {
      state.isBurnCurrencyModalOpen = action.payload;
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
  setIsManageCurrencyModalOpen,
  setIsBurnCurrencyModalOpen,
} = generalSlice.actions;
export const generalReducer = generalSlice.reducer;
export default generalSlice.reducer;
