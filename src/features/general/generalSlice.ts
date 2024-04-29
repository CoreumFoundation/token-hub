import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GeneralState {
  isConnectModalOpen: boolean;
}

export const initialGeneralState: GeneralState = {
  isConnectModalOpen: false,
};

const generalSlice = createSlice({
  name: 'general',
  initialState: initialGeneralState,
  reducers: {
    setIsConnectModalOpen(state, action: PayloadAction<boolean>) {
      state.isConnectModalOpen = action.payload;
    }
  },
});

export const { setIsConnectModalOpen } = generalSlice.actions;
export const generalReducer = generalSlice.reducer;
export default generalSlice.reducer;
