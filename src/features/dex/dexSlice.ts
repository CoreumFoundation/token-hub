import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DEXState {
  refAmount: string;
  whitelistDenoms: string[];
}

export const initialExtensionState: DEXState = {
  refAmount: '',
  whitelistDenoms: [''],
};

const dexSlice = createSlice({
  name: 'dex',
  initialState: initialExtensionState,
  reducers: {
    setDexRefAmount(state, action: PayloadAction<string>) {
      state.refAmount = action.payload;
    },
    setDexWhitelistedDenoms(state, action: PayloadAction<string[]>) {
      state.whitelistDenoms = action.payload;
    },
    addDenomToWhitelistedDenoms(state) {
      state.whitelistDenoms.push('');
    },
    clearDexState(state) {
      state.refAmount = '';
      state.whitelistDenoms = [''];
    },
  },
});

export const {
  setDexRefAmount,
  setDexWhitelistedDenoms,
  addDenomToWhitelistedDenoms,
  clearDexState,
} = dexSlice.actions;
export const dexReducer = dexSlice.reducer;
export default dexSlice.reducer;
