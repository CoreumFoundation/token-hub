import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UnfreezeState {
  amount: string;
  walletAddress: string;
}

export const initialUnfreezeState: UnfreezeState = {
  amount: '0',
  walletAddress: '',
};

const unfreezeSlice = createSlice({
  name: 'unfreeze',
  initialState: initialUnfreezeState,
  reducers: {
    setUnfreezeAmount(state, action: PayloadAction<string>) {
      state.amount = action.payload;
    },
    setUnfreezeWalletAddress(state, action: PayloadAction<string>) {
      state.walletAddress = action.payload;
    },
  },
});

export const { setUnfreezeAmount, setUnfreezeWalletAddress } = unfreezeSlice.actions;
export const unfreezeReducer = unfreezeSlice.reducer;
export default unfreezeSlice.reducer;
