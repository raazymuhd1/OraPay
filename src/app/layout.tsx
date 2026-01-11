import type { Metadata } from "next";
import {  ReactNode } from "react"
import { Geist, Geist_Mono, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import { Header, PeyPeyContextProvider, Web3Provider, ConnectWallet } from "@/components"
import {Toaster} from "react-hot-toast"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"]
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OraPay",
  description: "OraPay Dapps",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
            <body
              className={`${sourceCodePro.variable} antialiased w-full bg-[var(--dark-bg)] text-white`}
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
