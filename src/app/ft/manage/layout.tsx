import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Your Tokens | Coreum",
  description: "View and manage created Smart Tokens on the Coreum Blockchain",
  keywords: ['token hub', 'developer', 'developer resources', 'blockchain', 'smart tokens', 'iso20022', 'defi', 'cosmos crypto', 'dapps', 'smart contracts', 'ledger', 'blockchain', 'trading', 'enterprise grade blockchain'],
  icons: "/favicon.ico",
  openGraph: {
    type: 'website',
    url: '',
    description: 'View and manage created Smart Tokens on the Coreum Blockchain',
    siteName: 'Manage Your Tokens | Coreum',
    images: [{
      url: 'https://tokenhub.test.coreum.dev/images/og.jpg',
    }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
