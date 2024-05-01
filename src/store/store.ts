import { alertsReducer } from '@/features/alerts/alertsSlice';
import { balancesReducer } from '@/features/balances/chainsSlice';
import { chainsReducer } from '@/features/chains/chainsSlice';
import { currenciesReducer } from '@/features/currencies/currenciesSlice';
import { generalReducer } from '@/features/general/generalSlice';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    alerts: alertsReducer,
    balances: balancesReducer,
    chains: chainsReducer,
    currencies: currenciesReducer,
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
