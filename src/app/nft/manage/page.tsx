import { NonFungibleTokenManage } from "@/containers/NonFungibleTokenManage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage NFTs | Coreum",
  description: "View and manage created NFTs.",
  keywords: ['token hub', 'developer', 'developer resources', 'blockchain', 'smart tokens', 'iso20022', 'defi', 'cosmos crypto', 'dapps', 'smart contracts', 'ledger', 'blockchain', 'trading', 'enterprise grade blockchain'],
  icons: "/favicon.ico",
  openGraph: {
    type: 'website',
    url: '',
    description: 'View and manage created NFTs.',
    siteName: 'Manage NFTs | Coreum',
    images: [{
      url: 'https://https://tokenhub.test.coreum.dev/images/og.jpg',
    }],
  },
};

export default function NFTManage() {
  return <NonFungibleTokenManage />;
}
