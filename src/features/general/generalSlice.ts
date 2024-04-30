import { Network } from '@/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { coreum, coreumtestnet } from 'graz/chains';
import { ChainInfo } from '@keplr-wallet/types';

export interface GeneralState {
  isConnectModalOpen: boolean;
  network: Network;
  currentNetworkInfo: ChainInfo;
  account: string;
  isConnected: boolean;
}

export const initialGeneralState: GeneralState = {
  isConnectModalOpen: false,
  network: Network.Testnet,
  currentNetworkInfo: coreumtestnet,
  account: '',
  isConnected: false,
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
  },
});

export const { setIsConnectModalOpen, setNetwork, setAccount, setIsConnected } = generalSlice.actions;
export const generalReducer = generalSlice.reducer;
export default generalSlice.reducer;
