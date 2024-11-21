import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coin } from "@cosmjs/amino";
import { Token } from '@/shared/types';

export interface BalancesState {
  list: Token[];
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
    setBalances(state, action: PayloadAction<Token[]>) {
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
