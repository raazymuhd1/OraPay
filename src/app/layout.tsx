import type { Metadata } from "next";
import {  ReactNode } from "react"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header, PeyPeyContextProvider, Web3Provider, ConnectWallet } from "@/components"
import {Toaster} from "react-hot-toast"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EdZero",
  description: "EdZero Dapps",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // const handleGlobalWalletModal = (): ReactNode => {
  //     return <ConnectWallet />
  // }

  return (
    <html lang="en">
            <body
              className={`${geistSans.variable} ${geistMono.variable} antialiased w-full bg-[rgba(9,9,11,255)] text-white`}
              >
              <Web3Provider>
                <PeyPeyContextProvider>
                  <Header />
                  {children}
                  {/* <ConnectWallet /> */}
                  <Toaster />
                </PeyPeyContextProvider>
            </Web3Provider>
            </body>
    </html>
  );
}
