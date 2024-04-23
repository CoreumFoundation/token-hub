import type { Metadata } from "next";
import { Noto_Sans, Space_Grotesk } from "next/font/google";
import { Layout } from "@/components/Layout";
// import Image from 'next/image';

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
