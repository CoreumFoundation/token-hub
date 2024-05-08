import { Network } from '@/shared/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { Class } from 'coreum-js/dist/main/coreum/asset/nft/v1/nft';

interface FetchIssuedCollectionsArgs {
  account: string;
  network: Network;
}

export const fetchIssuedNFTCollectionsByAccount = createAsyncThunk(
  'nfts/fetchCollectionsByAccount',
  async ({ account, network }: FetchIssuedCollectionsArgs) => {
    try {
      const classesRequestUrl = `https://full-node.${network}-1.coreum.dev:1317/coreum/asset/nft/v1/classes?issuer=${account}`;
      const {
        data: {
          pagination: { total: collectionsTotal },
          classes,
        },
      }: AxiosResponse<{ pagination: { total: string }; classes: Class[]; }> = await axios.get(classesRequestUrl);

      if (Number(collectionsTotal) > classes.length) {
        const {
          data: {
            classes: allClasses,
          }
        }: AxiosResponse<{ classes: Class[] }> = await axios.get(`${classesRequestUrl}&pagination.limit=${collectionsTotal}`);

        return allClasses;
      }

      return classes;
    } catch (error) {
      return [];
    }
  },
);

export interface NFTsState {
  isLoading: boolean;
  collections: Class[];
  isFetched: boolean;
  selectedNFTClass: Class | null;
}

export const initialNFTsState: NFTsState = {
  isLoading: false,
  collections: [],
  isFetched: false,
  selectedNFTClass: null,
};

const nftsSlice = createSlice({
  name: 'nfts',
  initialState: initialNFTsState,
  reducers: {
    setNFTCollections(state, action: PayloadAction<Class[]>) {
      state.collections = action.payload;
      state.isLoading = false;
    },
    setSelectedNFTClass(state, action: PayloadAction<Class | null>) {
      state.selectedNFTClass = action.payload;
    },
    setIsFetched(state, action: PayloadAction<boolean>) {
      state.isFetched = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIssuedNFTCollectionsByAccount.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(fetchIssuedNFTCollectionsByAccount.rejected, (state, action) => {
      state.collections = [];
      state.isLoading = false;
    })
    builder.addCase(fetchIssuedNFTCollectionsByAccount.fulfilled, (state, action) => {
      state.collections = action.payload;
      state.isLoading = false;
      state.isFetched = true;
    })
  },
});

export const { setNFTCollections, setSelectedNFTClass, setIsFetched } = nftsSlice.actions;
export const nftsReducer = nftsSlice.reducer;
export default nftsSlice.reducer;
