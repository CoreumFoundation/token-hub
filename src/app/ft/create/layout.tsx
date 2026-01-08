import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Token | Coreum",
  description: "Create Smart Tokens on Coreum. Add features like whitelisting, minting, burning, freezing and more.",
  keywords: ['token hub', 'developer', 'developer resources', 'blockchain', 'smart tokens', 'iso20022', 'defi', 'cosmos crypto', 'dapps', 'smart contracts', 'ledger', 'blockchain', 'trading', 'enterprise grade blockchain'],
  icons: "/favicon.ico",
  openGraph: {
    type: 'website',
    url: '',
    description: 'Create Smart Tokens on Coreum. Add features like whitelisting, minting, burning, freezing and more.',
    siteName: 'Create Token | Coreum',
    images: [{
      url: 'https://tokenhub.test.coreum.dev/images/og.jpg',
    }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
