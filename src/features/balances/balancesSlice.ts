import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coin } from "@cosmjs/amino";
import { Network, Token } from '@/shared/types';
import axios, { AxiosResponse } from 'axios';
import { fetchSecondaryCurrenciesInfo } from '../currencies/currenciesSlice';

interface FetchBalancesByAccountArgs {
  account: string;
  network: Network;
}

export const fetchBalancesByAccount = createAsyncThunk(
  'balances/fetchByAccount',
  async ({ account, network }: FetchBalancesByAccountArgs, thunkAPI) => {
    const state = thunkAPI.getState();
    const currencies = (state as any).currencies.list;

    let balancesToSet = [];
    try {
      const balancesRequestUrl = network === Network.Devnet
        ? `https://full-node-pluto.${network}-1.coreum.dev:1317/cosmos/bank/v1beta1/balances/${account}`
        : `https://full-node.${network}-1.coreum.dev:1317/cosmos/bank/v1beta1/balances/${account}`;
      const {
        data: {
          pagination: { total: balancesTotal },
          balances,
        },
      }: AxiosResponse<{ pagination: { total: string }; balances: Coin[]; }> = await axios.get(balancesRequestUrl);

      balancesToSet = balances;

      if (Number(balancesTotal) > balances.length) {
        const {
          data: {
            balances: allBalances,
          }
        }: AxiosResponse<{ balances: Coin[] }> = await axios.get(`${balancesRequestUrl}&pagination.limit=${balancesTotal}`);

        balancesToSet = allBalances;
      }

      const userIssuedBalances: any[] = [];
      const userOtherBalances: Coin[] = [];

      balances.forEach((token: Coin) => {
        const isIssued = currencies.find((currency: Token) => currency.denom === token.denom);

        if (isIssued) {
          userIssuedBalances.push({
            ...isIssued,
            amount: token.amount,
          });
        } else {
          userOtherBalances.push(token);
        }
      });

      thunkAPI.dispatch(setBalances(userIssuedBalances));
      thunkAPI.dispatch(fetchSecondaryCurrenciesInfo({ network, currencies: userOtherBalances }));

      return balancesToSet;
    } catch (error) {
      return [];
    }
  },
);

export interface BalancesState {
  list: Token[];
  shouldRefetch: boolean;
  isLoading: boolean;
  restBalances: any[];
  isFetched: boolean;
}

export const initialBalancesState: BalancesState = {
  isLoading: false,
  list: [],
  shouldRefetch: false,
  restBalances: [],
  isFetched: false,
};

const balancesSlice = createSlice({
  name: 'balances',
  initialState: initialBalancesState,
  reducers: {
    setBalances(state, action: PayloadAction<Token[]>) {
      state.list = action.payload;
    },
    shouldRefetchBalances(state, action: PayloadAction<boolean>) {
      state.shouldRefetch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBalancesByAccount.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(fetchBalancesByAccount.rejected, (state, action) => {
      state.restBalances = action.payload as any[];
      state.isLoading = false;
      state.isFetched = true;
    })
    builder.addCase(fetchBalancesByAccount.fulfilled, (state, action) => {
      state.restBalances = action.payload;
      state.isLoading = false;
      state.isFetched = true;
    })
  },
});

export const { setBalances, shouldRefetchBalances } = balancesSlice.actions;
export const balancesReducer = balancesSlice.reducer;
export default balancesSlice.reducer;
