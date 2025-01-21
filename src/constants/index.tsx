import { FooterIcon } from "@/assets/FooterIcon";
import { GeneralIcon } from "@/assets/GeneralIcon";
import { ExplorerLink } from "@/components/ExplorerLink";
import {
  AccountActionType,
  DropdownItem,
  FooterIconType,
  GeneralIconType,
  Network,
  TabItem,
  TabItemType,
  TabSwitchItem,
  TabSwitchItemType,
  Token,
  TokenCapabilityItem,
  TokenCapabilityType,
  WalletOption,
  WalletType,
} from "@/shared/types";
import { Chain, IBCInfo } from '@chain-registry/types';

export const FOOTER_NAVIGATION = {
  products: [
    { name: 'Explorer', href: 'https://explorer.coreum.com/coreum' },
    { name: 'ISO Simulator', href: 'https://www.coreum.com/iso20022' },
    { name: 'Developer Playground', href: 'https://playground.coreum.dev/' },
    { name: 'Whitepaper', href: 'https://www.coreum.com/assets/coreum_technical_paper.pdf' },
  ],
  social: [
    {
      name: 'Twitter',
      href: 'https://x.com/CoreumOfficial',
      icon: (props: any) => <FooterIcon type={FooterIconType.X} className="group w-6 " pathClassName="group-hover:fill-[#eee]" />,
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/coreum.official/',
      icon: (props: any) => <FooterIcon type={FooterIconType.Instagram} className="group w-6 " pathClassName="group-hover:fill-[#eee]" />,
    },
    {
      name: 'Telegram',
      href: 'https://t.me/CoreumOfficial',
      icon: (props: any) => <FooterIcon type={FooterIconType.Telegram} className="group w-6 " pathClassName="group-hover:fill-[#eee]" />,
    },
    {
      name: 'Discord',
      href: 'https://discord.com/invite/XdVAGKXEhg',
      icon: (props: any) => <FooterIcon type={FooterIconType.Discord} className="group w-6 " pathClassName="group-hover:fill-[#eee]" />,
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/@coreumofficial',
      icon: (props: any) => <FooterIcon type={FooterIconType.Youtube} className="group w-6 " pathClassName="group-hover:fill-[#eee]" />,
    },
    {
      name: 'Medium',
      href: 'https://coreum.medium.com/',
      icon: (props: any) => <FooterIcon type={FooterIconType.Medium} className="group w-6 " pathClassName="group-hover:fill-[#eee]" />,
    },
  ],
};

export const NETWORK_SELECTOR_ITEMS = [
  {
    id: Network.Testnet,
    label: Network.Testnet.toUpperCase(),
    icon: <GeneralIcon type={GeneralIconType.Coreum} />
  },
  {
    id: Network.Mainnet,
    label: Network.Mainnet.toUpperCase(),
    icon: <GeneralIcon type={GeneralIconType.Coreum} />
  },
  {
    id: Network.Devnet,
    label: Network.Devnet.toUpperCase(),
    icon: <GeneralIcon type={GeneralIconType.Coreum} />
  },
];

export const TABS_ITEMS: TabItem[] = [
  {
    id: TabItemType.Create,
    label: 'Create',
  },
  {
    id: TabItemType.Send,
    label: 'Send',
  },
  {
    id: TabItemType.Manage,
    label: 'Manage',
  }
];

export const TABS_SWITCH_ITEMS: TabSwitchItem[] = [
  {
    id: TabSwitchItemType.FungibleToken,
    label: 'Fungible Tokens',
  },
  {
    id: TabSwitchItemType.NonFungibleToken,
    label: 'Non-Fungible Tokens',
  },
];

export const FT_TOKEN_CAPABILITIES: TokenCapabilityItem[] = [
  {
    type: TokenCapabilityType.Mint,
    label: 'Minting',
    content: 'If the minting feature is enabled, the issuer can mint more tokens and increase the current supply of the token.',
  },
  {
    type: TokenCapabilityType.Burn,
    label: 'Burning',
    content: 'If the burning feature is enabled, it allows token holders to burn their tokens.',
  },
  {
    type: TokenCapabilityType.Freeze,
    label: 'Freezing',
    content: 'If the freezing feature is enabled on a token, then the issuer of the token can freeze an account up to an amount. The frozen amount can be more than what the user currently holds, and works even if the user holds zero. The user can only send the tokens that they hold in excess of the frozen amount.',
  },
  {
    type: TokenCapabilityType.Whitelist,
    label: 'Whitelisting',
    content: 'If the whitelisting feature is enabled, then every account that wishes to receive this token, must first be whitelisted by the issuer, otherwise they will not be able to receive that token. This feature allows the issuer to set whitelisted limit on any account, and then that account will be able to receive tokens only up to the whitelisted limit.',
  },
  {
    type: TokenCapabilityType.IBC,
    label: 'IBC',
    content: 'If the IBC feature is enabled the token can be transferred over IBC to other IBC-enabled chains. If it is disabled it can only live on the Coreum blockchain.',
  },
  {
    type: TokenCapabilityType.Block,
    label: 'Block Smart Contract',
    content: 'If the block smart contract feature is enabled, then the token can only be sent to regular user addresses and not smart contracts. It\'s important to point out that this doesn\'t mean that the token cannot be issued from a smart contract.',
  },
  {
    type: TokenCapabilityType.Clawback,
    label: 'Clawback',
    content: 'If the clawback feature is enabled, then the owner can reverse or “claw back” a transaction or action, typically under specific circumstances, such as if it was unauthorized, fraudulent, or mistaken.',
  },
  {
    type: TokenCapabilityType.Extension,
    label: 'Extension',
    content: 'If the smart token extension is enabled, each token transfer will trigger a smart contract executing custom logic before the token reaches the recipient.',
  },
];

export const FT_DEX_TOKEN_CAPABILITIES: TokenCapabilityItem[] = [
  {
    type: TokenCapabilityType.DEXBlock,
    label: 'DEX Block',
    content: 'The asset FT token admin at time of issues can set the block_dex feature, which will block the DEX completely for the issued denom. So the DEX won\'t accept the orders with the denom.',
  },
  {
    type: TokenCapabilityType.DEXWhitelistedDenoms,
    label: 'DEX Whitelisted Denoms',
    content: 'This feature introduces an enhancement to the asset FT (restrict_dex feature), allowing the asset FT (a specific fungible token) to be traded only against a predefined set of denoms specified in denoms_to_trade_with. This adds a layer of control over trading pairs, ensuring that denom(asset FT) can only be exchanged with certain denoms/currencies or assets, as specified by the admin.',
  },
  {
    type: TokenCapabilityType.DEXOrderCancellation,
    label: 'DEX Order Cancellation',
    content: 'The users can cancel their orders within the DEX. Or The token admin or gov can cancel user orders within the system. It grants specific administrative or governance roles the power to manage and oversee active orders, providing a safeguard against potential issues such as erroneous trades, malicious activity, or market manipulation. For the token admin to cancel the user\'s orders, the dex_order_cancellation feature must be enabled.',
  },
  {
    type: TokenCapabilityType.DEXUnifiedRefAmountChange,
    label: 'DEX Unified Ref Amount Change',
    content: 'The unified_ref_amount used in price tick and precision can be updated and by the gov or the token admin.',
  },
];

export const NFT_TOKEN_CAPABILITIES: TokenCapabilityItem[] = [
  {
    type: TokenCapabilityType.Burn,
    label: 'Burning',
    content: 'If the burning feature is enabled, it allows the holders of the token to burn the tokens they hold. It should be noted here that the issuer can burn their token regardless of this feature.',
  },
  {
    type: TokenCapabilityType.Freeze,
    label: 'Freezing',
    content: 'If the freezing feature is enabled, it allows the issuer of the class to freeze any NFT token in that class. A frozen token cannot be transferred until it is unfrozen by the issuer.',
  },
  {
    type: TokenCapabilityType.Whitelist,
    label: 'Whitelisting',
    content: 'If the whitelisting feature is enabled, then for any user to receive any NFT of that class, they must be whitelisted to receive that specific NFT. It follows that this feature allows the issuer of the class to whitelist an account to hold a specific NFT of that class, or remove an account from whitelisted accounts for that NFT.',
  },
  {
    type: TokenCapabilityType.DisableSend,
    label: 'Disable Sending',
    content: 'If this feature is enabled, it will prevent transferring NFTs directly between users. This feature opens up the door for different use cases in the future, one of which is that it might be used to force transfer of ownership to go via DEX, so that the royalty fee is applied and the creator of the NFT always gets a royalty fee.',
  },
  {
    type: TokenCapabilityType.Soulbound,
    label: 'Soulbound',
    content: 'If the soulbound feature is enabled, the NFT can not be sent by anyone, except the issuer. This feature is useful for NFTs that are created for a specific user, and the issuer wants to make sure that the NFT is not transferred to anyone else.',
  },
];

export const CONNECT_WALLET_OPTIONS: WalletOption[] = [
  {
    type: WalletType.Cosmostation,
    label: 'Cosmostation',
  },
  // {
  //   type: WalletType.CosmostationMobile,
  //   label: 'Cosmostation Mobile',
  // },
  {
    type: WalletType.Keplr,
    label: 'Keplr',
  },
  // {
  //   type: WalletType.KeplrMobile,
  //   label: 'Keplr Mobile',
  // },
  {
    type: WalletType.Leap,
    label: 'Leap',
  },
  // {
  //   type: WalletType.LeapMobile,
  //   label: 'Leap Mobile',
  // },
];

export const ACTION_ITEMS_OPTIONS: DropdownItem[] = [
  {
    id: AccountActionType.Copy,
    label: 'Copy Address',
    icon: <GeneralIcon type={GeneralIconType.Copy} />,
  },
  {
    id: AccountActionType.Switch,
    label: 'Switch Wallet',
    icon: <GeneralIcon type={GeneralIconType.Switch} />,
  },
  {
    id: AccountActionType.Explorer,
    label: <ExplorerLink />,
  },
  {
    id: AccountActionType.Disconnect,
    label: 'Disconnect',
    icon: <GeneralIcon type={GeneralIconType.Disconnect} />,
  },
];

export const COREUM_TOKEN_DEVNET: Token = {
  denom: 'udevcore',
  symbol: 'Coreum',
  subunit: 'udevcore',
  precision: 6,
};

export const COREUM_TOKEN_TESTNET: Token = {
  denom: 'utestcore',
  symbol: 'Coreum',
  subunit: 'utestcore',
  precision: 6,
};

export const COREUM_TOKEN_MAINNET: Token = {
  denom: 'ucore',
  symbol: 'Coreum',
  subunit: 'ucore',
  precision: 6,
};

export const MANAGE_FT_TOKENS_TABS = {
  'minting':  {
    id: TabItemType.Mint,
    label: 'Mint',
  },
  'freezing': {
    id: TabItemType.Freeze,
    label: 'Freeze',
  },
  'unfreezing': {
    id: TabItemType.Unfreeze,
    label: 'Unfreeze',
  },
  'whitelisting': {
    id: TabItemType.Whitelist,
    label: 'Whitelist',
  },
  'clawback': {
    id: TabItemType.Clawback,
    label: 'Clawback',
  },
  'dex_whitelisted_denoms': {
    id: TabItemType.DEXWhitelistedDenoms,
    label: 'DEX Update whitelisted denoms'
  },
  'dex_unified_ref_amount_change': {
    id: TabItemType.DEXUnifiedRefAmountChange,
    label: 'DEX Update Unified Ref Amount',
  },
};

export const SUBUNITS_REGEX = new RegExp(`^[a-z][a-z0-9/:._]{0,50}$`);
export const SYMBOL_REGEX = new RegExp(`^[a-zA-Z][a-zA-Z0-9/:._-]{2,127}$`);
export const URL_REGEX = /^(https?:\/\/([\w.-]+))(:\d+)?(\/[\w.-]*)*\/?$/;
export const IPFS_REGEX = new RegExp(`^ipfs:\/\/(?:[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*)?(\/[a-zA-Z0-9_:@&?=+,.!\/-]*)?$`);

export const CID_REGEX = new RegExp(`^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*$`);

export const SYMBOL_NFT_REGEX = new RegExp(`^[a-zA-Z][a-zA-Z0-9/:._]{0,30}$`);
export const NFT_ID_REGEX = new RegExp(`^[a-zA-Z][a-zA-Z0-9/:._-]{2,100}$`);

export const COREUM_TESTNET_SUPPORTED_CHAINS: IBCInfo[] = [
  {
    chain_1: {
      chain_name: "coreumtestnet",
      client_id: "07-tendermint-183",
      connection_id: "connection-90",
    },
    chain_2: {
      chain_name: "osmosistestnet",
      client_id: "07-tendermint-4092",
      connection_id: "connection-3539",
    },
    channels: [
      {
        chain_1: {
          channel_id: "channel-65",
          port_id: "transfer",
        },
        chain_2: {
          channel_id: "channel-9151",
          port_id: "transfer",
        },
        ordering: "unordered",
        version: "ics20-1",
        tags: {
          status: "live",
          preferred: true,
        },
      },
    ],
  },
];

export const STORAGE_SELECTED_NETWORK = 'local_selected_network';
export const STORAGE_DISCLAIMER_CONFIRMED = 'local_disclaimer_confirmed';

export const COREUM_DEVNET_CHAIN_DATA: Chain = {
  apis: {
    grpc: [],
    rest: [],
    rpc: [],
  },
  bech32_prefix: 'devcore',
  chain_id: 'coreum-devnet-1',
  chain_name: 'coreumdevnet',
  fees: {
    fee_tokens: [{
      average_gas_price: 0.0625,
      denom: 'udevcore',
      fixed_min_gas_price: 0.03125,
      high_gas_price: 62.5,
      low_gas_price: 0.0625,
    }],
  },
  key_algos: ['secp256k1'],
  network_type: 'devnet',
  pretty_name: 'Coreum',
  slip44: 990,
  status: 'live',
};
