import { NonFungibleTokenSend } from "@/containers/NonFungibleTokenSend";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Send & Receive NFTs | Coreum",
  description: "Send created NFTs from one wallet to another. ",
  keywords: ['token hub', 'developer', 'developer resources', 'blockchain', 'smart tokens', 'iso20022', 'defi', 'cosmos crypto', 'dapps', 'smart contracts', 'ledger', 'blockchain', 'trading', 'enterprise grade blockchain'],
  icons: "/favicon.ico",
  openGraph: {
    type: 'website',
    url: '',
    description: 'Send created NFTs from one wallet to another. ',
    siteName: 'Send & Receive NFTs | Coreum',
    images: [{
      url: 'https://tokenhub.test.coreum.dev/images/og.jpg',
    }],
  },
};

export default function NFTSend() {
  return <NonFungibleTokenSend />;
}
