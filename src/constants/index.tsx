import { FooterIcon } from "@/assets/FooterIcon";
import { GeneralIcon } from "@/assets/GeneralIcon";
import { FooterIconType, GeneralIconType, Network, TabItem, TabItemType, TabSwitchItem, TabSwitchItemType, TokenCapabilityItem, TokenCapabilityType, WalletOption, WalletType } from "@/shared/types";

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
    id: Network.Mainnet,
    label: Network.Mainnet.toUpperCase(),
    icon: <GeneralIcon type={GeneralIconType.Coreum} />
  },
  {
    id: Network.Testnet,
    label: Network.Testnet.toUpperCase(),
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
    content: 'If the minting feature is enabled, the issuer can mint more tokens and increase the total supply of the token.',
  },
  {
    type: TokenCapabilityType.Burn,
    label: 'Burning',
    content: 'The issuer of the token can burn the tokens that they hold. If the burning feature is enabled, then every holder of the token can burn the tokens they hold.',
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
    content: 'If the IBC feature is enabled, issuer decides if users may send and receive it over IBC transfer protocol. If IBC feature is disabled, token can never leave the Coreum chain to other Cosmos SDK chain.',
  },
  {
    type: TokenCapabilityType.Block,
    label: 'Block Smart Contract',
    content: 'If the block smart contract feature is enabled, then the token can only be sent to regular user addresses and not smart contract. It\'s important to point out that this doesn\'t mean that the token cannot be issued from a smart contract.',
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
  {
    type: WalletType.CosmostationMobile,
    label: 'Cosmostation Mobile',
  },
  {
    type: WalletType.Keplr,
    label: 'Keplr',
  },
  {
    type: WalletType.KeplrMobile,
    label: 'Keplr Mobile',
  },
  {
    type: WalletType.Leap,
    label: 'Leap',
  },
  {
    type: WalletType.LeapMobile,
    label: 'Leap Mobile',
  },
];
