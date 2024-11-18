import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ClawbackState {
  amount: string;
  walletAddress: string;
}

export const initialClawbackState: ClawbackState = {
  amount: '0',
  walletAddress: '',
};

const clawbackSlice = createSlice({
  name: 'clawback',
  initialState: initialClawbackState,
  reducers: {
    setClawbackAmount(state, action: PayloadAction<string>) {
      state.amount = action.payload;
    },
    setClawbackWalletAddress(state, action: PayloadAction<string>) {
      state.walletAddress = action.payload;
    },
  },
});

export const { setClawbackAmount, setClawbackWalletAddress } = clawbackSlice.actions;
export const clawbackReducer = clawbackSlice.reducer;
export default clawbackSlice.reducer;
