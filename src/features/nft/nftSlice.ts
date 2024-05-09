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
  nftID: string;
  nftURI: string;
  nftURIHash: string;
  nftRecipient: string;
  nftData: string;
}

export const initialNFTsState: NFTsState = {
  isLoading: false,
  collections: [],
  isFetched: false,
  selectedNFTClass: null,
  nftID: '',
  nftURI: '',
  nftURIHash: '',
  nftRecipient: '',
  nftData: '',
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
    setNFTID(state, action: PayloadAction<string>) {
      state.nftID = action.payload;
    },
    setNFTURI(state, action: PayloadAction<string>) {
      state.nftURI = action.payload;
    },
    setNFTURIHash(state, action: PayloadAction<string>) {
      state.nftURIHash = action.payload;
    },
    setNFTRecipient(state, action: PayloadAction<string>) {
      state.nftRecipient = action.payload;
    },
    setNFTData(state, action: PayloadAction<string>) {
      state.nftData = action.payload;
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

export const {
  setNFTCollections,
  setSelectedNFTClass,
  setIsFetched,
  setNFTID,
  setNFTURI,
  setNFTURIHash,
  setNFTRecipient,
  setNFTData,
} = nftsSlice.actions;
export const nftsReducer = nftsSlice.reducer;
export default nftsSlice.reducer;
