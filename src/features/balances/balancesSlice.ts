import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coin } from "@cosmjs/amino";

export interface BalancesState {
  list: Coin[];
  shouldRefetch: boolean;
}

export const initialBalancesState: BalancesState = {
  list: [],
  shouldRefetch: false,
};

const balancesSlice = createSlice({
  name: 'balances',
  initialState: initialBalancesState,
  reducers: {
    setBalances(state, action: PayloadAction<Coin[]>) {
      state.list = action.payload;
    },
    shouldRefetchBalances(state, action: PayloadAction<boolean>) {
      state.shouldRefetch = action.payload;
    },
  },
});

export const { setBalances, shouldRefetchBalances } = balancesSlice.actions;
export const balancesReducer = balancesSlice.reducer;
export default balancesSlice.reducer;
