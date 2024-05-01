import { metadata } from './../../app/layout';
import { CurrencyMetadata, Network, Token } from '@/shared/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

interface FetchCurrenciesByAccountArgs {
  account: string;
  network: Network;
}

export const fetchCurrenciesByAccount = createAsyncThunk(
  'currencies/fetchByAccount',
  async ({ account, network }: FetchCurrenciesByAccountArgs, thinkAPI) => {
    const tokensRequestUrl = `https://full-node.${network}-1.coreum.dev:1317/coreum/asset/ft/v1/tokens?issuer=${account}`;
    const {
      data: {
        pagination: { total: tokensTotal },
        tokens,
      },
    }: AxiosResponse<{ pagination: { total: string }; tokens: Token[]; }> = await axios.get(tokensRequestUrl);

    if (Number(tokensTotal) > tokens.length) {
      const {
        data: {
          tokens: allTokens,
        }
      }: AxiosResponse<{ tokens: Token[] }> = await axios.get(`${tokensRequestUrl}&pagination.limit=${tokensTotal}`);

      return allTokens;
    }

    return tokens;
  },
);

export interface CurrenciesState {
  isLoading: boolean;
  list: Token[];
  isFetched: boolean;
}

export const initialCurrenciesState: CurrenciesState = {
  isLoading: false,
  list: [],
  isFetched: false,
};

const currenciesSlice = createSlice({
  name: 'currencies',
  initialState: initialCurrenciesState,
  reducers: {
    setCurrencies(state, action: PayloadAction<any[]>) {
      state.list = action.payload;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrenciesByAccount.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(fetchCurrenciesByAccount.rejected, (state, action) => {
      state.list = [];
      state.isLoading = false;
    })
    builder.addCase(fetchCurrenciesByAccount.fulfilled, (state, action) => {
      state.list = action.payload;
    })
  },
});

export const { setCurrencies } = currenciesSlice.actions;
export const currenciesReducer = currenciesSlice.reducer;
export default currenciesSlice.reducer;
