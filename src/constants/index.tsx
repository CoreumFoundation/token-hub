import { FooterIcon } from "@/assets/FooterIcon";
import { GeneralIcon } from "@/assets/GeneralIcon";
import { FooterIconType, GeneralIconType, TabItem, TabItemType, TabSwitchItem, TabSwitchItemType, TokenCapabilityItem, TokenCapabilityType } from "@/shared/types";

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
    id: 'testnet',
    label: 'Testnet'.toUpperCase(),
    icon: <GeneralIcon type={GeneralIconType.Coreum} />
  },
  {
    id: 'devnet',
    label: 'Devnet'.toUpperCase(),
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

export const TOKEN_CAPABILITIES: TokenCapabilityItem[] = [
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
    content: 'If the freezing feature is enabled on a token, then the issuer of the token can freeze an account up to an amount. The frozen amount can be more than what the user currently holds, an works even if the user holds zero. The user can only send the tokens that they hold in excess of the frozen amount.',
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
