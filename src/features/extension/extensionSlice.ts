import { Token } from '@/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ExtensionToken = Token & { balance: string; };

export interface ExtensionState {
  codeId: string;
  label: string;
  funds: ExtensionToken[];
  issuanceMsg: string;
}

export const initialExtensionState: ExtensionState = {
  codeId: '',
  label: '',
  funds: [],
  issuanceMsg: '',
};

const extensionSlice = createSlice({
  name: 'extension',
  initialState: initialExtensionState,
  reducers: {
    setExtensionCodeId(state, action: PayloadAction<string>) {
      state.codeId = action.payload;
    },
    setExtensionLabel(state, action: PayloadAction<string>) {
      state.label = action.payload;
    },
    setExtensionIssuanceMsg(state, action: PayloadAction<string>) {
      state.issuanceMsg = action.payload;
    },
    setExtensionFunds(state, action: PayloadAction<ExtensionToken[]>) {
      state.funds = action.payload;
    },
    addFundToExtensionFunds(state, action: PayloadAction<ExtensionToken>) {
      state.funds.push(action.payload);
    },
    updateFundInExtensionFunds(state, action: PayloadAction<ExtensionToken>) {
      for (const fund of state.funds) {
        if (fund.denom === action.payload.denom) {
          fund.amount = action.payload.amount;
        }
      }
    },
    clearExtensionState(state) {
      state.codeId = '';
      state.label = '';
      state.funds = [];
      state.issuanceMsg = '';
    },
  },
});

export const {
  setExtensionCodeId,
  setExtensionLabel,
  setExtensionIssuanceMsg,
  setExtensionFunds,
  addFundToExtensionFunds,
  updateFundInExtensionFunds,
  clearExtensionState,
} = extensionSlice.actions;
export const extensionReducer = extensionSlice.reducer;
export default extensionSlice.reducer;
