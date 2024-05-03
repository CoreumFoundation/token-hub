import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BurnState {
  amount: string;
  walletAddress: string;
}

export const initialBurnState: BurnState = {
  amount: '0',
  walletAddress: '',
};

const burnSlice = createSlice({
  name: 'burn',
  initialState: initialBurnState,
  reducers: {
    setBurnAmount(state, action: PayloadAction<string>) {
      state.amount = action.payload;
    },
  },
});

export const { setBurnAmount } = burnSlice.actions;
export const burnReducer = burnSlice.reducer;
export default burnSlice.reducer;
