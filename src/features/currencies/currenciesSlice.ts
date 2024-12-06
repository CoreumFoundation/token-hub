import { COREUM_TOKEN_MAINNET, COREUM_TOKEN_TESTNET } from '@/constants';
import { AssetRegistry, Network, Token } from '@/shared/types';
import { Coin } from '@cosmjs/proto-signing';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { Feature } from 'coreum-js';

interface FetchCurrenciesByAccountArgs {
  account: string;
  network: Network;
}

export const fetchCurrenciesByAccount = createAsyncThunk(
  'currencies/fetchByAccount',
  async ({ account, network }: FetchCurrenciesByAccountArgs) => {
    const responseTokens = network === Network.Mainnet ? [COREUM_TOKEN_MAINNET] : [COREUM_TOKEN_TESTNET];

    if (!account.length) {
      return responseTokens;
    }

    try {
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

      return responseTokens.concat(tokens);
    } catch (error) {
      return responseTokens;
    }
  },
);

interface FetchSecondaryCurrenciesInfo {
  network: Network;
  currencies: Coin[];
}

export const fetchSecondaryCurrenciesInfo = createAsyncThunk(
  'currencies/fetchSecondaryCurrenciesInfo',
  async ({ network, currencies }: FetchSecondaryCurrenciesInfo) => {
    if (!currencies.length) {
      return [];
    }

    const tokenRegistryRequestUrl = `https://raw.githubusercontent.com/CoreumFoundation/token-registry/master/${network}/assets.json`;
    let assets: AssetRegistry[] = [];

    try {
      const {
        data,
      }: AxiosResponse<{ assets: AssetRegistry[] }> = await axios.get(
        tokenRegistryRequestUrl
      );

      assets = data.assets;
    } catch (error) {
      console.log(error);
    }

    const tokenInfoRequestUrl = `https://full-node.${network}-1.coreum.dev:1317/coreum/asset/ft/v1/tokens`;

    const resultAssets: Token[] = [];
    for (const asset of currencies) {
      if (asset.denom.includes('ibc/')) {
        const assetInRegistry = assets.find((item: AssetRegistry) => item.denom.toLowerCase() === asset.denom.toLowerCase());

        if (assetInRegistry) {
          console.log({ assetInRegistry });
          resultAssets.push({
            ...asset,
            symbol: assetInRegistry.extra.ibc_info?.display_name || asset.denom,
            precision: assetInRegistry.extra.ibc_info?.precision || 0,
            subunit: asset.denom,
          });
          continue;
        }

        resultAssets.push({
          ...asset,
          symbol: asset.denom,
          subunit: asset.denom,
          precision: 0,
        });
        continue;
      }

      try {
        const {
          data: {
            token,
          },
        }: AxiosResponse<{ token: Token; }> = await axios.get(`${tokenInfoRequestUrl}/${asset.denom}`);

        resultAssets.push({
          ...token,
          amount: asset.amount,
        })
      } catch (error) {
        console.log({ error });
      }
    }

    return resultAssets;
  },
);

interface IssuedTokenType {
  symbol: string;
  subunit: string;
  precision: string;
  initialAmount: string;
  description: string;
  features: Feature[];
  burnRate: string;
  sendCommissionRate: string;
  uri: string;
  txHash: string;
}

export interface CurrenciesState {
  isLoading: boolean;
  list: Token[];
  secondaryList: Token[];
  issuedList: Token[];
  isFetched: boolean;
  selectedCurrency: Token | null;
  shouldRefetchCurrencies: boolean;
  issuedToken: IssuedTokenType | null;
}

export const initialCurrenciesState: CurrenciesState = {
  isLoading: false,
  list: [COREUM_TOKEN_TESTNET],
  secondaryList: [],
  issuedList: [],
  isFetched: false,
  selectedCurrency: null,
  shouldRefetchCurrencies: false,
  issuedToken: null,
};

const currenciesSlice = createSlice({
  name: 'currencies',
  initialState: initialCurrenciesState,
  reducers: {
    setCurrencies(state, action: PayloadAction<Token[]>) {
      state.list = action.payload;
      state.issuedList = action.payload;
      state.isLoading = false;
    },
    setSelectedCurrency(state, action: PayloadAction<Token | null>) {
      state.selectedCurrency = action.payload;
    },
    setIsFetched(state, action: PayloadAction<boolean>) {
      state.isFetched = action.payload;
    },
    shouldRefetchCurrencies(state, action: PayloadAction<boolean>) {
      state.shouldRefetchCurrencies = action.payload;
    },
    setIssuedToken(state, action: PayloadAction<IssuedTokenType | null>) {
      state.issuedToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrenciesByAccount.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(fetchCurrenciesByAccount.rejected, (state, action) => {
      state.list = action.payload as Token[];
      state.isLoading = false;
      state.issuedList = [];
    })
    builder.addCase(fetchCurrenciesByAccount.fulfilled, (state, action) => {
      state.list = action.payload;
      state.isLoading = false;
      state.issuedList = action.payload.length === 1 ? [] : action.payload.slice(1);
    })

    builder.addCase(fetchSecondaryCurrenciesInfo.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(fetchSecondaryCurrenciesInfo.rejected, (state, action) => {
      state.list = action.payload as Token[];
      state.isLoading = false;
      state.issuedList = [];
    })
    builder.addCase(fetchSecondaryCurrenciesInfo.fulfilled, (state, action) => {
      state.secondaryList = action.payload;
      state.isLoading = false;
    })
  },
});

export const { setCurrencies, setSelectedCurrency, setIsFetched, shouldRefetchCurrencies, setIssuedToken } = currenciesSlice.actions;
export const currenciesReducer = currenciesSlice.reducer;
export default currenciesSlice.reducer;
