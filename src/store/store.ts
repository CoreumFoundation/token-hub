import { alertsReducer } from '@/features/alerts/alertsSlice';
import { balancesReducer } from '@/features/balances/balancesSlice';
import { burnReducer } from '@/features/burn/burnSlice';
import { chainsReducer } from '@/features/chains/chainsSlice';
import { currenciesReducer } from '@/features/currencies/currenciesSlice';
import { freezeReducer } from '@/features/freeze/freezeSlice';
import { generalReducer } from '@/features/general/generalSlice';
import { mintReducer } from '@/features/mint/mintSlice';
import { nftsReducer } from '@/features/nft/nftSlice';
import { unfreezeReducer } from '@/features/unfreeze/unfreezeSlice';
import { whitelistReducer } from '@/features/whitelist/whitelistSlice';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    alerts: alertsReducer,
    balances: balancesReducer,
    burn: burnReducer,
    chains: chainsReducer,
    currencies: currenciesReducer,
    freeze: freezeReducer,
    general: generalReducer,
    mint: mintReducer,
    nfts: nftsReducer,
    unfreeze: unfreezeReducer,
    whitelist: whitelistReducer,
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
