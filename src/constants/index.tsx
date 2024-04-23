import { FooterIcon } from "@/assets/FooterIcon";
import { GeneralIcon } from "@/assets/GeneralIcon";
import { FooterIconType, GeneralIconType, TabItem } from "@/shared/types";

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
    id: 'create',
    label: 'Create',
  },
  {
    id: 'send',
    label: 'Send',
  },
  {
    id: 'manage',
    label: 'Manage',
  }
];
