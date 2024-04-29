import { ChainInfo } from '@/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ChainsState {
  chains: ChainInfo[];
}

export const initialChainsState: ChainsState = {
  chains: [],
};

const chainsSlice = createSlice({
  name: 'chains',
  initialState: initialChainsState,
  reducers: {
    setIBCChains(state, action: PayloadAction<ChainInfo[]>) {
      state.chains = action.payload;
    },
  },
});

export const { setIBCChains } = chainsSlice.actions;
export const chainsReducer = chainsSlice.reducer;
export default chainsSlice.reducer;
