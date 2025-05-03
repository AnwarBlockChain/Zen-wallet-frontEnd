import ContextProvider from '@/context';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import React from "react";
import { Toaster } from "sonner";
import { twMerge } from "tailwind-merge";
import "./globals.css";
import { TokenListProvider } from '@/components/providers/TokenListProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZenWallet - Premium Decentralized Wallet",
  description: "The world's most elegant decentralized wallet experience",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersData = await headers();
  const cookies = headersData.get('cookie');
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={twMerge(
          `${geistSans.variable} ${geistMono.variable} min-h-screen bg-background antialiased`
        )}
      >
        <ContextProvider cookies={cookies}>
          <Toaster />
          <TokenListProvider>
            {children}
          </TokenListProvider>
        </ContextProvider>
      </body>
    </html>
  );
} 