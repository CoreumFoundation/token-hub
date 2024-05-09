import { Network } from '@/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { coreum, coreumtestnet } from 'graz/chains';
import { ChainInfo as KeplrChainInfo } from '@keplr-wallet/types';
import { ChainInfo } from '@/shared/types';

export interface GeneralState {
  network: Network;
  currentNetworkInfo: KeplrChainInfo;
  account: string;
  isConnected: boolean;
  destinationChain: ChainInfo | null;
  isTxExecuting: boolean;
  isConnectModalOpen: boolean;
  isManageCurrencyModalOpen: boolean;
  isBurnCurrencyModalOpen: boolean;
  isConfirmMintModalOpen: boolean;
  isConfirmFreezeModalOpen: boolean;
  isConfirmGlobalFreezeModalOpen: boolean;
  isConfirmUnfreezeModalOpen: boolean;
  isConfirmGlobalUnfreezeModalOpen: boolean;
  isConfirmWhitelistModalOpen: boolean;
  isConfirmBurnModalOpen: boolean;
  isSelectNFTModalOpen: boolean;
  isNFTCollectionViewModalOpen: boolean;
  isNFTMintModalOpen: boolean;
  isConfirmNFTMintModalOpen: boolean;
}

export const initialGeneralState: GeneralState = {
  network: Network.Testnet,
  currentNetworkInfo: coreumtestnet,
  account: '',
  isConnected: false,
  destinationChain: null,
  isTxExecuting: false,
  isConnectModalOpen: false,
  isManageCurrencyModalOpen: false,
  isBurnCurrencyModalOpen: false,
  isConfirmMintModalOpen: false,
  isConfirmFreezeModalOpen: false,
  isConfirmGlobalFreezeModalOpen: false,
  isConfirmUnfreezeModalOpen: false,
  isConfirmGlobalUnfreezeModalOpen: false,
  isConfirmWhitelistModalOpen: false,
  isConfirmBurnModalOpen: false,
  isSelectNFTModalOpen: false,
  isNFTCollectionViewModalOpen: false,
  isNFTMintModalOpen: false,
  isConfirmNFTMintModalOpen: false,
};

const generalSlice = createSlice({
  name: 'general',
  initialState: initialGeneralState,
  reducers: {
    setIsConnectModalOpen(state, action: PayloadAction<boolean>) {
      state.isConnectModalOpen = action.payload;
    },
    setNetwork(state, action: PayloadAction<Network>) {
      state.network = action.payload;

      if (action.payload === Network.Mainnet) {
        state.currentNetworkInfo = coreum;
      } else {
        state.currentNetworkInfo = coreumtestnet;
      }
    },
    setAccount(state, action: PayloadAction<string>) {
      state.account = action.payload;
    },
    setIsConnected(state, action: PayloadAction<boolean>) {
      state.isConnected = action.payload;
    },
    setDestinationChain(state, action: PayloadAction<ChainInfo | null>) {
      state.destinationChain = action.payload;
    },
    setIsTxExecuting(state, action: PayloadAction<boolean>) {
      state.isTxExecuting = action.payload;
    },
    setIsManageCurrencyModalOpen(state, action: PayloadAction<boolean>) {
      state.isManageCurrencyModalOpen = action.payload;
    },
    setIsBurnCurrencyModalOpen(state, action: PayloadAction<boolean>) {
      state.isBurnCurrencyModalOpen = action.payload;
    },
    setIsConfirmMintModalOpen(state, action: PayloadAction<boolean>) {
      state.isConfirmMintModalOpen = action.payload;
    },
    setIsConfirmFreezeModalOpen(state, action: PayloadAction<boolean>) {
      state.isConfirmFreezeModalOpen = action.payload;
    },
    setIsConfirmGlobalFreezeModalOpen(state, action: PayloadAction<boolean>) {
      state.isConfirmGlobalFreezeModalOpen = action.payload;
    },
    setIsConfirmUnfreezeModalOpen(state, action: PayloadAction<boolean>) {
      state.isConfirmUnfreezeModalOpen = action.payload;
    },
    setIsConfirmGlobalUnfreezeModalOpen(state, action: PayloadAction<boolean>) {
      state.isConfirmGlobalUnfreezeModalOpen = action.payload;
    },
    setIsConfirmWhitelistModalOpen(state, action: PayloadAction<boolean>) {
      state.isConfirmWhitelistModalOpen = action.payload;
    },
    setIsConfirmBurnModalOpen(state, action: PayloadAction<boolean>) {
      state.isConfirmBurnModalOpen = action.payload;
    },
    setIsSelectNFTModalOpen(state, action: PayloadAction<boolean>) {
      state.isSelectNFTModalOpen = action.payload;
    },
    setisNFTCollectionViewModalOpen(state, action: PayloadAction<boolean>) {
      state.isNFTCollectionViewModalOpen = action.payload;
    },
    setIsNFTMintModalOpen(state, action: PayloadAction<boolean>) {
      state.isNFTMintModalOpen = action.payload;
    },
    setIsConfirmNFTMintModalOpen(state, action: PayloadAction<boolean>) {
      state.isConfirmNFTMintModalOpen = action.payload;
    },
  },
});

export const {
  setIsConnectModalOpen,
  setNetwork,
  setAccount,
  setIsConnected,
  setDestinationChain,
  setIsTxExecuting,
  setIsManageCurrencyModalOpen,
  setIsBurnCurrencyModalOpen,
  setIsConfirmMintModalOpen,
  setIsConfirmFreezeModalOpen,
  setIsConfirmGlobalFreezeModalOpen,
  setIsConfirmUnfreezeModalOpen,
  setIsConfirmGlobalUnfreezeModalOpen,
  setIsConfirmWhitelistModalOpen,
  setIsConfirmBurnModalOpen,
  setIsSelectNFTModalOpen,
  setisNFTCollectionViewModalOpen,
  setIsNFTMintModalOpen,
  setIsConfirmNFTMintModalOpen,
} = generalSlice.actions;
export const generalReducer = generalSlice.reducer;
export default generalSlice.reducer;
