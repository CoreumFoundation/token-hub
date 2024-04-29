import { ChainInfo } from '@/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ChainsState {
  list: ChainInfo[];
}

export const initialChainsState: ChainsState = {
  list: [],
};

const chainsSlice = createSlice({
  name: 'chains',
  initialState: initialChainsState,
  reducers: {
    setIBCChains(state, action: PayloadAction<ChainInfo[]>) {
      state.list = action.payload;
    },
  },
});

export const { setIBCChains } = chainsSlice.actions;
export const chainsReducer = chainsSlice.reducer;
export default chainsSlice.reducer;
