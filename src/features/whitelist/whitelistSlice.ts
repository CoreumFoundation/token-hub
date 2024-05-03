import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WhitelistState {
  amount: string;
  walletAddress: string;
}

export const initialWhitelistState: WhitelistState = {
  amount: '0',
  walletAddress: '',
};

const whitelistSlice = createSlice({
  name: 'whitelist',
  initialState: initialWhitelistState,
  reducers: {
    setWhitelistAmount(state, action: PayloadAction<string>) {
      state.amount = action.payload;
    },
    setWhitelistWalletAddress(state, action: PayloadAction<string>) {
      state.walletAddress = action.payload;
    },
  },
});

export const { setWhitelistAmount, setWhitelistWalletAddress } = whitelistSlice.actions;
export const whitelistReducer = whitelistSlice.reducer;
export default whitelistSlice.reducer;
