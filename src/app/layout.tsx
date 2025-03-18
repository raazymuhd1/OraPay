import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header, PeyPeyContextProvider, Web3Provider } from "@/components"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NoPeyPey",
  description: "NoPeyPey Dapps",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Web3Provider>
        <PeyPeyContextProvider>
            <body
              className={`${geistSans.variable} ${geistMono.variable} antialiased w-full bg-[rgba(9,9,11,255)] text-white`}
            >
              <Header />
              {children}
            </body>
        </PeyPeyContextProvider>
      </Web3Provider>
    </html>
  );
}
