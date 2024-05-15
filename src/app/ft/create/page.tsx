import { FungibleTokenCreate } from "@/containers/FungibleTokenCreate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TokenHub Send | Coreum",
  description: "Create Smart Tokens on Coreum. Add features like whitelisting, minting, burning, freezing and more.",
  keywords: ['token hub', 'developer', 'developer resources', 'blockchain', 'smart tokens', 'iso20022', 'defi', 'cosmos crypto', 'dapps', 'smart contracts', 'ledger', 'blockchain', 'trading', 'enterprise grade blockchain'],
  icons: "/favicon.ico",
  openGraph: {
    type: 'website',
    url: '',
    description: 'Create Smart Tokens on Coreum. Add features like whitelisting, minting, burning, freezing and more.',
    siteName: 'TokenHub Send | Coreum',
    images: [{
      url: 'https://https://tokenhub.test.coreum.dev/images/og.jpg',
    }],
  },
};

export default function FTCreate() {
  return <FungibleTokenCreate />;
}
