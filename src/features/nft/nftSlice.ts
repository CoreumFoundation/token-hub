import { convertEditorsToDataEditors } from '@/helpers/convertEditorsToDataEditors';
import { Network, NFT, NFTClass } from '@/shared/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { ClassFeature } from "coreum-js";
import { DataEditor } from 'coreum-js/dist/main/coreum/asset/nft/v1/types';

interface FetchIssuedCollectionsArgs {
  account: string;
  network: Network;
}

interface FetchNFTSbyOwnerAndClassArgs {
  account: string;
  classId: string
  network: Network;
}

const GATEWAY_URL = 'https://coffee-giant-crane-879.mypinata.cloud/ipfs/';
const GATEWAY_ACCESS_KEY = 'HfAzLhR7d5lxz7hicMBmsKhOTl6Jw_9DbTxbIpxtqM1V2SMGvz7yYI2c4FTJjpia';

const getMetadata = async (requestUrl: string) => {
  const gatewayRequestUrl = requestUrl.includes('ipfs://')
    ? `${requestUrl.replace('ipfs://', GATEWAY_URL)}?pinataGatewayToken=${GATEWAY_ACCESS_KEY}`
    : requestUrl;

  try {
    const { data } = await axios.get(gatewayRequestUrl);

    return {
      ...data,
      image: data.image?.length ? `${data.image?.replace('ipfs://', GATEWAY_URL)}?pinataGatewayToken=${GATEWAY_ACCESS_KEY}` : '',
    };
  } catch (error) {
    return {
      image: '',
      name: '',
    };
  }
};

export const fetchIssuedNFTCollectionsByAccount = createAsyncThunk(
  'nfts/fetchCollectionsByAccount',
  async ({ account, network }: FetchIssuedCollectionsArgs) => {
    try {
      const classesRequestUrl = network === Network.Devnet
        ? `https://full-node.${network}-1.coreum.dev:1317/coreum/asset/nft/v1/classes?issuer=${account}`
        : `https://full-node.${network}-1.coreum.dev:1317/coreum/asset/nft/v1/classes?issuer=${account}`;
      let classesToReturn = [];

      if (!account) {
        return [];
      }

      const {
        data: {
          pagination: { total: collectionsTotal },
          classes,
        },
      }: AxiosResponse<{ pagination: { total: string }; classes: NFTClass[]; }> = await axios.get(classesRequestUrl);

      classesToReturn = classes;

      if (Number(collectionsTotal) > classes.length) {
        const {
          data: {
            classes: allClasses,
          }
        }: AxiosResponse<{ classes: NFTClass[] }> = await axios.get(`${classesRequestUrl}&pagination.limit=${collectionsTotal}`);

        classesToReturn = allClasses;
      }

      classesToReturn = await Promise.all(classesToReturn.map(async (collection: NFTClass) => {
        const uriPath = `${collection.uri}${collection.uri_hash ? collection.uri_hash : ''}`;

        if (uriPath === 'ipfs://') {
          return {
            ...collection,
            image: '',
          };
        }

        if (uriPath.startsWith('ipfs://')) {
          const cid = uriPath.replace('ipfs://', '');

          if (cid.length !== 46) {
            return {
              ...collection,
              image: '',
            };
          }
        }

        const { image } = await getMetadata(uriPath);

        return {
          ...collection,
          image,
        };
      }));

      return classesToReturn;
    } catch (error) {
      return [];
    }
  },
);

export const fetchNFTsByOwnerAndClass = createAsyncThunk(
  'nfts/fetchNFTsByOwnerAndClass',
  async ({ account, classId, network }: FetchNFTSbyOwnerAndClassArgs) => {
    try {
      const nftsRequestUrl = network === Network.Devnet
        ? `https://full-node.${network}-1.coreum.dev:1317/cosmos/nft/v1beta1/nfts?class_id=${classId}`
        : `https://full-node.${network}-1.coreum.dev:1317/coreum/nft/v1beta1/nfts?class_id=${classId}`;
      let nftsToReturn = [];
      let ownNFTsToReturn = [];

      const {
        data: {
          pagination: { total: nftsTotal },
          nfts,
        },
      }: AxiosResponse<{ pagination: { total: string }; nfts: NFT[]; }> = await axios.get(nftsRequestUrl);

      nftsToReturn = nfts;

      if (Number(nftsTotal) > nfts.length) {
        const {
          data: {
            nfts: allNFTs,
          }
        }: AxiosResponse<{ nfts: NFT[] }> = await axios.get(`${nftsRequestUrl}&pagination.limit=${nftsTotal}`);

        nftsToReturn = allNFTs;
      }

      const {
        data: {
          pagination: { total: ownNFTsTotal },
          nfts: ownNFTs,
        },
      }: AxiosResponse<{ pagination: { total: string }; nfts: NFT[]; }> = await axios.get(`${nftsRequestUrl}&owner=${account}`);

      ownNFTsToReturn = ownNFTs;

      if (Number(ownNFTsTotal) > ownNFTs.length) {
        const {
          data: {
            nfts: allOwnedNFTs,
          }
        }: AxiosResponse<{ nfts: NFT[] }> = await axios.get(`${nftsRequestUrl}&owner=${account}&pagination.limit=${ownNFTsTotal}`);

        ownNFTsToReturn = allOwnedNFTs;
      }

      nftsToReturn = await Promise.all(nftsToReturn.map(async (nft: NFT) => {
        const uriPath = `${nft.uri}${nft.uri_hash ? nft.uri_hash : ''}`;

        if (uriPath === 'ipfs://') {
          return {
            ...nft,
            image: '',
            name: '',
          };
        }

        if (uriPath.startsWith('ipfs://')) {
          const cid = uriPath.replace('ipfs://', '');

          if (cid.length !== 46) {
            return {
              ...nft,
              image: '',
              name: '',
            };
          }
        }

        const { image, name } = await getMetadata(uriPath);

        return {
          ...nft,
          image,
          name,
        };
      }));

      ownNFTsToReturn = await Promise.all(ownNFTsToReturn.map(async (nft: NFT) => {
        const uriPath = `${nft.uri}${nft.uri_hash ? nft.uri_hash : ''}`;

        if (uriPath === 'ipfs://') {
          return {
            ...nft,
            image: '',
            name: '',
          };
        }

        if (uriPath.startsWith('ipfs://')) {
          const cid = uriPath.replace('ipfs://', '');

          if (cid.length !== 46) {
            return {
              ...nft,
              image: '',
              name: '',
            };
          }
        }

        const { image, name } = await getMetadata(uriPath);

        return {
          ...nft,
          image,
          name,
        };
      }));

      return {
        class: classId,
        items: nftsToReturn,
        ownedItems: ownNFTsToReturn,
      }
    } catch (error) {
      return {
        class: classId,
        items: [],
        ownedItems: [],
      };
    }
  },
);

interface IssuedNFTCollectionType {
  name: string;
  symbol: string;
  royalties: string;
  description: string;
  features: ClassFeature[];
  uri: string;
  uriHash: string;
  txHash: string;
}

export interface NFTsState {
  isLoading: boolean;
  collections: NFTClass[];
  isFetched: boolean;
  selectedNFTClass: NFTClass | null;
  selectedNFTSend: NFT | null;
  nftID: string;
  nftURI: string;
  nftURIHash: string;
  nftRecipient: string;
  nftData: string;
  nftItems: {
    [key: string]: NFT[];
  };
  ownedNftItems: {
    [key: string]: NFT[];
  };
  isNFTItemsFetched: boolean;
  isNFTItemsLoading: boolean;
  whitelistAccount: string;
  shouldRefetchCollections: boolean;
  shouldRefetchNFTItems: boolean;
  issuedNFTCollection: IssuedNFTCollectionType | null;
  deWhitelistAccount: string;
  editNFTData: string;
  isDataEditable: boolean;
  nftMultipleDataValues: NFTDataItem[];
  selectedNFTDataValues: NFTDataItem[];
}

export interface NFTDataItem {
  currentValue: string;
  contentValue: string;
  fileValue: string;
  roles: DataEditor[];
  index?: number;
}

export const defaultNFTDataItem: NFTDataItem = {
  currentValue: '',
  contentValue: '',
  fileValue: '',
  roles: [DataEditor.admin],
};

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
  nftItems: {},
  ownedNftItems: {},
  isNFTItemsFetched: false,
  isNFTItemsLoading: false,
  selectedNFTSend: null,
  whitelistAccount: '',
  shouldRefetchCollections: false,
  shouldRefetchNFTItems: false,
  issuedNFTCollection: null,
  deWhitelistAccount: '',
  editNFTData: '',
  isDataEditable: false,
  nftMultipleDataValues: [defaultNFTDataItem],
  selectedNFTDataValues: [],
};

const nftsSlice = createSlice({
  name: 'nfts',
  initialState: initialNFTsState,
  reducers: {
    setNFTCollections(state, action: PayloadAction<NFTClass[]>) {
      state.collections = action.payload;
      state.isLoading = false;
    },
    setSelectedNFTClass(state, action: PayloadAction<NFTClass | null>) {
      state.selectedNFTClass = action.payload;
    },
    setSelectedNFTSend(state, action: PayloadAction<NFT | null>) {
      state.selectedNFTSend = action.payload;

      if (action.payload) {
        const nftData = action.payload.data;

        if (!!nftData) {
          state.selectedNFTDataValues = (nftData as any).items.map((item: {editors: string[]; data: string}) => {
            return {
              roles: convertEditorsToDataEditors(item.editors),
              fileValue: '',
              contentValue: '',
              currentValue: atob(item.data),
            };
          });
        }
      }
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
    setNFTItems(state, action: PayloadAction<{ [key: string]: NFT[] }>) {
      state.nftItems = action.payload;
    },
    setOwnedNFTItems(state, action: PayloadAction<{ [key: string]: NFT[] }>) {
      state.ownedNftItems = action.payload;
      state.isNFTItemsLoading = false;
    },
    setIsNFTItemsFetched(state, action: PayloadAction<boolean>) {
      state.isNFTItemsFetched = action.payload;
    },
    setIsNFTItemsLoading(state, action: PayloadAction<boolean>) {
      state.isNFTItemsLoading = action.payload;
    },
    setWhitelistAccount(state, action: PayloadAction<string>) {
      state.whitelistAccount = action.payload;
    },
    setShouldFetchNFTCollections(state, action: PayloadAction<boolean>) {
      state.shouldRefetchCollections = action.payload;
      state.isNFTItemsFetched = false
    },
    setShouldRefetchNFTItems(state, action: PayloadAction<boolean>) {
      state.shouldRefetchNFTItems = action.payload;
    },
    setIssuedNFTCollection(state, action: PayloadAction<IssuedNFTCollectionType | null>) {
      state.issuedNFTCollection = action.payload;
    },
    setDeWhitelistAccount(state, action: PayloadAction<string>) {
      state.deWhitelistAccount = action.payload;
    },
    setEditNFTData(state, action: PayloadAction<string>) {
      state.editNFTData = action.payload;
    },
    setDataEditable(state, action: PayloadAction<boolean>) {
      state.isDataEditable = action.payload;
    },
    addNFTDataItem(state) {
      state.nftMultipleDataValues.push(defaultNFTDataItem);
    },
    setNFTMultipleDataValues(state, action: PayloadAction<NFTDataItem[]>) {
      state.nftMultipleDataValues = action.payload;
    },
    setSelectedNFTDataValues(state, action: PayloadAction<NFTDataItem[]>) {
      state.selectedNFTDataValues = action.payload;
    },
    resetNFTsState(state) {
      state.collections = [];
      state.nftID = '';
      state.nftURI = '';
      state.nftURIHash = '';
      state.nftRecipient = '';
      state.nftData = '';
      state.nftItems = {};
      state.ownedNftItems = {};
      state.selectedNFTSend = null;
      state.whitelistAccount = '';
      state.issuedNFTCollection = null;
      state.deWhitelistAccount = '';
      state.isDataEditable = false;
      state.nftMultipleDataValues = [defaultNFTDataItem];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIssuedNFTCollectionsByAccount.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(fetchIssuedNFTCollectionsByAccount.rejected, (state) => {
      state.collections = [];
      state.isLoading = false;
      state.isFetched = true;
    })
    builder.addCase(fetchIssuedNFTCollectionsByAccount.fulfilled, (state, action) => {
      state.collections = action.payload;
      state.isLoading = false;
      state.isFetched = true;
    })
    builder.addCase(fetchNFTsByOwnerAndClass.pending, (state) => {
      state.isNFTItemsLoading = true;
    })
    builder.addCase(fetchNFTsByOwnerAndClass.rejected, (state) => {
      state.nftItems = {};
      state.ownedNftItems = {};
      state.isNFTItemsLoading = false;
      state.isNFTItemsFetched = true;
    })
    builder.addCase(fetchNFTsByOwnerAndClass.fulfilled, (state, action) => {
      state.nftItems[action.payload.class] = action.payload.items;
      state.ownedNftItems[action.payload.class] = action.payload.ownedItems;
      state.isNFTItemsLoading = false;
      state.isNFTItemsFetched = true;
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
  setNFTItems,
  setOwnedNFTItems,
  setSelectedNFTSend,
  setWhitelistAccount,
  setShouldFetchNFTCollections,
  setShouldRefetchNFTItems,
  setIssuedNFTCollection,
  setDeWhitelistAccount,
  resetNFTsState,
  setEditNFTData,
  setDataEditable,
  addNFTDataItem,
  setNFTMultipleDataValues,
  setSelectedNFTDataValues,
} = nftsSlice.actions;
export const nftsReducer = nftsSlice.reducer;
export default nftsSlice.reducer;
