import { ClassFeature, Feature } from 'coreum-js';
import { Switch } from './../components/Switch/index';
import { Chain } from '@chain-registry/types';
import { Any } from 'coreum-js/dist/main/google/protobuf/any';
import { Class } from 'coreum-js/dist/main/coreum/asset/nft/v1/nft';

export enum FooterIconType {
  X = 'twitter',
  Instagram = 'instagram',
  Telegram = 'telegram',
  Discord = 'discord',
  Youtube = 'youtube',
  Medium = 'medium',
};

export enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
};

export enum ButtonIconType {
  Check = 'check',
  Wallet = 'wallet',
  Token = 'token',
  Plus = 'plus',
  Send = 'send',
};

export enum ButtonIconColorScheme  {
  Primary = '#21262E',
  Secondary = '#25D695',
  Disabled = '#2B3138',
};

export enum DropdownType {
  Primary = 'primary',
  Secondary = 'secondary',
};

export enum GeneralIconType {
  Coreum = 'coreum',
  Network = 'network',
  CheckMark = 'check_mark',
  Info = 'info',
  Error = 'error',
  Close = 'close',
  Percentage = 'percentage',
  ArrowRight = 'arrow_right',
  Copy = 'copy',
  Switch = 'switch',
  Explorer = 'explorer',
  Disconnect = 'disconnect',
  DefaultToken = 'default_token',
  Dots = 'dots',
  Send = 'send',
  Burn = 'burn',
  Manage = 'manage',
  Warning = 'warning',
  AlertClose = 'alert_close',
  Hand = 'hand',
  Mint = 'mint',
  View = 'view',
  Freeze = 'freeze',
  Unfreeze = 'unfreeze',
  Whitelist = 'whitelist',
  File = 'file',
};

export enum TabItemType {
  Create = 'create',
  Send = 'send',
  Manage = 'manage',
  Mint = 'mint',
  Freeze = 'freeze',
  Unfreeze = 'unfreeze',
  Whitelist = 'whitelist',
};

export enum TabSwitchItemType {
  FungibleToken = 'ft',
  NonFungibleToken = 'nft',
};

export interface DropdownItem {
  id: string;
  label: string | React.ReactNode;
  icon?: React.ReactNode;
}

export interface TabItem {
  id: TabItemType;
  label: string;
}

export interface TabSwitchItem {
  id: TabSwitchItemType;
  label: string;
}

export enum TokenCapabilityType {
  Mint = 'mint',
  Burn = 'burn',
  Freeze = 'freeze',
  Whitelist = 'whitelist',
  IBC = 'ibc',
  Block = 'block_smart_contract',
  DisableSend = 'disable_send',
  Soulbound = 'soulbound',
}

export interface ExpandedListElem {
  id: string;
  content: React.ReactNode | string;
}

export interface TokenCapabilityItem {
  type: TokenCapabilityType;
  label: string;
  content: string;
}

export enum WalletType {
  Cosmostation = 'cosmostation',
  Keplr = 'keplr',
  Leap = 'leap',
  CosmostationMobile = 'cosmostation_mobile',
  KeplrMobile = 'keplr_mobile',
  LeapMobile = 'leap_mobile',
}

export interface WalletOption {
  type: WalletType,
  label: string;
}

export enum Network {
  Mainnet = 'mainnet',
  Testnet = 'testnet',
}

export interface ChainInfo extends Chain {
  connection_id: string;
  client_id: string;
  channel_id: string;
  port_id: string;
  coreum_channel_id: string;
  coreum_client_id: string;
}

export enum ChainType {
  Axelar = 'axelar',
  Band = 'bandchain',
  Cosmos = 'cosmoshub',
  Dora = 'doravota',
  DYDX = 'dydx',
  Evmos = 'evmos',
  Gravity = 'gravitybridge',
  Kava = 'kava',
  Kujira = 'kujira',
  Noble = 'noble',
  Osmosis = 'osmosis',
  OsmosisTestnet = 'osmosistestnet',
  Secret = 'secretnetwork',
  Coreum = 'coreum',
  CoreumTestnet = 'coreumtestnet',
}

export enum AccountActionType {
  Copy = 'copy',
  Switch = 'switch',
  Explorer = 'explorer',
  Disconnect = 'disconnect',
}

export interface DenomUnit {
  denom: string;
  exponent: number;
}

export interface Token {
  denom: string;
  issuer?: string;
  symbol: string;
  subunit: string;
  precision: number;
  description?: string;
  globally_frozen?: boolean;
  // TODO: update type to have strict usage of FEATURES from FT
  features?: string[];
  burn_rate?: string;
  send_commission_rate?: string;
  uri?: string;
  uri_hash?: string;
}

export interface ActionItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export enum ConfirmationModalImageType {
  Success = 'success',
  Mint = 'mint',
  Freeze = 'freeze',
  Unfreeze = 'unfreeze',
  Whitelist = 'whitelist',
  Burn = 'burn',
}

export enum AlertType {
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
}

export interface NFT {
  classId: string;
  id: string;
  uri: string;
  uri_hash: string;
  data?: Any;
  image: string;
  name: string;
}

export interface NFTClass {
  id: string;
  issuer: string;
  name: string;
  symbol: string;
  description: string;
  uri: string;
  uri_hash: string;
  data?: Any;
  features: string[];
  royaltyRate: string;
  image: string;
}
