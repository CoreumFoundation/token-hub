import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coin } from "@cosmjs/amino";

export interface BalancesState {
  list: Coin[];
}

export const initialBalancesState: BalancesState = {
  list: [],
};

const balancesSlice = createSlice({
  name: 'balances',
  initialState: initialBalancesState,
  reducers: {
    setBalances(state, action: PayloadAction<Coin[]>) {
      state.list = action.payload;
    },
  },
});

export const { setBalances } = balancesSlice.actions;
export const balancesReducer = balancesSlice.reducer;
export default balancesSlice.reducer;
