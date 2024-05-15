import type { Metadata } from "next";
import { Noto_Sans, Space_Grotesk } from "next/font/google";
import { Layout } from "@/components/Layout";

import "./globals.css";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-noto-sans',
});
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: "Coreum Token Hub",
  description: "Create Smart Tokens on Coreum. Add features like whitelisting, minting, burning, freezing and more.",
  keywords: ['token hub', 'developer', 'developer resources', 'blockchain', 'smart tokens', 'iso20022', 'defi', 'cosmos crypto', 'dapps', 'smart contracts', 'ledger', 'blockchain', 'trading', 'enterprise grade blockchain'],
  icons: "/favicon.ico",
  openGraph: {
    type: 'website',
    url: '',
    description: 'Create Smart Tokens on Coreum. Add features like whitelisting, minting, burning, freezing and more.',
    siteName: 'Coreum Token Hub',
    images: [{
      url: 'https://https://tokenhub.test.coreum.dev/images/og.jpg',
    }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${notoSans.variable} ${spaceGrotesk.variable} font-sans`}>
      <body className="relative h-full m-0 bg-[#080908]">
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
