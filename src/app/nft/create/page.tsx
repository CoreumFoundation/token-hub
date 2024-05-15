import { NonFungibleTokenCreate } from "@/containers/NonFungibleTokenCreate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mint NFT | Coreum",
  description: "Create NFT's with Smart Token features like soulbound, whitelisting, and burning.",
  keywords: ['token hub', 'developer', 'developer resources', 'blockchain', 'smart tokens', 'iso20022', 'defi', 'cosmos crypto', 'dapps', 'smart contracts', 'ledger', 'blockchain', 'trading', 'enterprise grade blockchain'],
  icons: "/favicon.ico",
  openGraph: {
    type: 'website',
    url: '',
    description: 'Create NFT\'s with Smart Token features like soulbound, whitelisting, and burning.',
    siteName: 'Mint NFT | Coreum',
    images: [{
      url: 'https://tokenhub.test.coreum.dev/images/og.jpg',
    }],
  },
};


export default function NFTCreate() {
  return <NonFungibleTokenCreate />;
}
