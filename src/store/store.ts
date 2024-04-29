import { alertsReducer } from '@/features/alerts/alertsSlice';
import { chainsReducer } from '@/features/chains/chainsSlice';
import { generalReducer } from '@/features/general/generalSlice';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    alerts: alertsReducer,
    chains: chainsReducer,
    general: generalReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
