import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FreezeState {
  amount: string;
  walletAddress: string;
}

export const initialFreezeState: FreezeState = {
  amount: '0',
  walletAddress: '',
};

const freezeSlice = createSlice({
  name: 'freeze',
  initialState: initialFreezeState,
  reducers: {
    setFreezeAmount(state, action: PayloadAction<string>) {
      state.amount = action.payload;
    },
    setFreezeWalletAddress(state, action: PayloadAction<string>) {
      state.walletAddress = action.payload;
    },
  },
});

export const { setFreezeAmount, setFreezeWalletAddress } = freezeSlice.actions;
export const freezeReducer = freezeSlice.reducer;
export default freezeSlice.reducer;
