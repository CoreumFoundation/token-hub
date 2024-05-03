import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MintState {
  amount: string;
}

export const initialMintState: MintState = {
  amount: '0',
};

const mintSlice = createSlice({
  name: 'mint',
  initialState: initialMintState,
  reducers: {
    setMintAmount(state, action: PayloadAction<string>) {
      state.amount = action.payload;
    },
  },
});

export const { setMintAmount } = mintSlice.actions;
export const mintReducer = mintSlice.reducer;
export default mintSlice.reducer;
