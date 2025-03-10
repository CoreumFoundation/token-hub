import { Network } from '@/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { coreum, coreumtestnet } from 'graz/chains';
import { ChainInfo as KeplrChainInfo } from '@keplr-wallet/types';
import { ChainInfo } from '@/shared/types';
import { coreumdevnet } from '@/providers/WalletProvider';

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
  isConfirmClawbackModalOpen: boolean;
  isConfirmBurnModalOpen: boolean;
  isConfirmUpdateDexUnifiedRefAmountOpen: boolean;
  isConfirmUpdateDexWhitelistedDenomsOpen: boolean;
  isEditNFTModalOpen: boolean;
  isConfirmEditNFTModalOpen: boolean;
  isSelectNFTModalOpen: boolean;
  isNFTCollectionViewModalOpen: boolean;
  isNFTMintModalOpen: boolean;
  isConfirmNFTMintModalOpen: boolean;
  isFreezeNFTModalOpen: boolean;
  isUnfreezeNFTModalOpen: boolean;
  isBurnNFTModalOpen: boolean;
  isWhitelistNFTModalOpen: boolean;
  isConfirmNFTBurnModalOpen: boolean;
  isConfirmNFTFreezeModalOpen: boolean;
  isConfirmNFTUnfreezeModalOpen: boolean;
  isConfirmNFTWhitelistModalOpen: boolean;
  isSuccessIssueFTModalOpen: boolean;
  isSuccessIssueNFTModalOpen: boolean;
  isDeWhitelistNFTModalOpen: boolean;
  isConfirmNFTDeWhitelistModalOpen: boolean;
  isDisclaimerModalOpen: boolean;
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
  isConfirmClawbackModalOpen: false,
  isConfirmBurnModalOpen: false,
  isConfirmUpdateDexUnifiedRefAmountOpen: false,
  isConfirmUpdateDexWhitelistedDenomsOpen: false,
  isEditNFTModalOpen: false,
  isConfirmEditNFTModalOpen: false,
  isSelectNFTModalOpen: false,
  isNFTCollectionViewModalOpen: false,
  isNFTMintModalOpen: false,
  isConfirmNFTMintModalOpen: false,
  isFreezeNFTModalOpen: false,
  isUnfreezeNFTModalOpen: false,
  isBurnNFTModalOpen: false,
  isWhitelistNFTModalOpen: false,
  isConfirmNFTBurnModalOpen: false,
  isConfirmNFTFreezeModalOpen: false,
  isConfirmNFTUnfreezeModalOpen: false,
  isConfirmNFTWhitelistModalOpen: false,
  isSuccessIssueFTModalOpen: false,
  isSuccessIssueNFTModalOpen: false,
  isDeWhitelistNFTModalOpen: false,
  isConfirmNFTDeWhitelistModalOpen: false,
  isDisclaimerModalOpen: true,
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
      } else if (action.payload === Network.Testnet) {
        state.currentNetworkInfo = coreumtestnet;
      } else {
        state.currentNetworkInfo = coreumdevnet;
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
    setIsConfirmClawbackModalOpen(state, action: PayloadAction<boolean>) {
      state.isConfirmClawbackModalOpen = action.payload;
    },
    setIsConfirmBurnModalOpen(state, action: PayloadAction<boolean>) {
      state.isConfirmBurnModalOpen = action.payload;
    },
    setIsConfirmUpdateDexUnifiedRefAmountOpen(state, action: PayloadAction<boolean>) {
      state.isConfirmUpdateDexUnifiedRefAmountOpen = action.payload;
    },
    setIsConfirmUpdateDexWhitelistedDenomsOpen(state, action: PayloadAction<boolean>) {
      state.isConfirmUpdateDexWhitelistedDenomsOpen = action.payload;
    },
    setIsSelectNFTModalOpen(state, action: PayloadAction<boolean>) {
      state.isSelectNFTModalOpen = action.payload;
    },
    setIsNFTCollectionViewModalOpen(state, action: PayloadAction<boolean>) {
      state.isNFTCollectionViewModalOpen = action.payload;
    },
    setIsNFTMintModalOpen(state, action: PayloadAction<boolean>) {
      state.isNFTMintModalOpen = action.payload;
    },
    setIsConfirmNFTMintModalOpen(state, action: PayloadAction<boolean>) {
      state.isConfirmNFTMintModalOpen = action.payload;
    },
    setIsFreezeNFTModalOpen(state, action: PayloadAction<boolean>) {
      state.isFreezeNFTModalOpen = action.payload;
    },
    setIsUnfreezeNFTModalOpen(state, action: PayloadAction<boolean>) {
      state.isUnfreezeNFTModalOpen = action.payload;
    },
    setIsBurnNFTModalOpen(state, action: PayloadAction<boolean>) {
      state.isBurnNFTModalOpen = action.payload;
    },
    setIsWhitelistNFTModalOpen(state, action: PayloadAction<boolean>) {
      state.isWhitelistNFTModalOpen = action.payload;
    },
    setIsConfirmNFTBurnModalOpen(state, action: PayloadAction<boolean>) {
      state.isConfirmNFTBurnModalOpen = action.payload;
    },
    setIsConfirmNFTFreezeModalOpen(state, action: PayloadAction<boolean>) {
      state.isConfirmNFTFreezeModalOpen = action.payload;
    },
    setIsConfirmNFTUnfreezeModalOpen(state, action: PayloadAction<boolean>) {
      state.isConfirmNFTUnfreezeModalOpen = action.payload;
    },
    setIsConfirmNFTWhitelistModalOpen(state, action: PayloadAction<boolean>) {
      state.isConfirmNFTWhitelistModalOpen = action.payload;
    },
    setIsSuccessIssueFTModalOpen(state, action: PayloadAction<boolean>) {
      state.isSuccessIssueFTModalOpen = action.payload;
    },
    setIsSuccessIssueNFTModalOpen(state, action: PayloadAction<boolean>) {
      state.isSuccessIssueNFTModalOpen = action.payload;
    },
    setIsDeWhitelistNFTModalOpen(state, action: PayloadAction<boolean>) {
      state.isDeWhitelistNFTModalOpen = action.payload;
    },
    setIsConfirmNFTDeWhitelistModalOpen(state, action: PayloadAction<boolean>) {
      state.isConfirmNFTDeWhitelistModalOpen = action.payload;
    },
    setIsDisclaimerModalOpen(state, action: PayloadAction<boolean>) {
      state.isDisclaimerModalOpen = action.payload;
    },
    setIsEditNFTModalOpen(state, action: PayloadAction<boolean>) {
      state.isEditNFTModalOpen = action.payload;
    },
    setIsConfirmEditNFTModalOpen(state, action: PayloadAction<boolean>) {
      state.isConfirmEditNFTModalOpen = action.payload;
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
  setIsConfirmClawbackModalOpen,
  setIsConfirmBurnModalOpen,
  setIsSelectNFTModalOpen,
  setIsNFTCollectionViewModalOpen,
  setIsNFTMintModalOpen,
  setIsConfirmNFTMintModalOpen,
  setIsFreezeNFTModalOpen,
  setIsUnfreezeNFTModalOpen,
  setIsBurnNFTModalOpen,
  setIsWhitelistNFTModalOpen,
  setIsConfirmNFTBurnModalOpen,
  setIsConfirmNFTFreezeModalOpen,
  setIsConfirmNFTUnfreezeModalOpen,
  setIsConfirmNFTWhitelistModalOpen,
  setIsSuccessIssueFTModalOpen,
  setIsSuccessIssueNFTModalOpen,
  setIsDeWhitelistNFTModalOpen,
  setIsConfirmNFTDeWhitelistModalOpen,
  setIsDisclaimerModalOpen,
  setIsConfirmUpdateDexUnifiedRefAmountOpen,
  setIsConfirmUpdateDexWhitelistedDenomsOpen,
  setIsEditNFTModalOpen,
  setIsConfirmEditNFTModalOpen,
} = generalSlice.actions;
export const generalReducer = generalSlice.reducer;
export default generalSlice.reducer;
