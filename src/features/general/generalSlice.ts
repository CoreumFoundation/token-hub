import { Network } from '@/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GeneralState {
  isConnectModalOpen: boolean;
  network: Network;
}

export const initialGeneralState: GeneralState = {
  isConnectModalOpen: false,
  network: Network.Testnet,
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
    }
  },
});

export const { setIsConnectModalOpen } = generalSlice.actions;
export const generalReducer = generalSlice.reducer;
export default generalSlice.reducer;
