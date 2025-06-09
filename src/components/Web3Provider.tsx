"use client"
import '@rainbow-me/rainbowkit/styles.css';
import { ReactNode } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { CivicAuthProvider } from "@civic/auth-web3/nextjs";
import { embeddedWallet } from "@civic/auth-web3/wagmi"
// custom chain
import { pharos } from "@/chain-configs/customChain"
import useCreateWallet from "@/utils/hooks/useCreateWallet"

interface IProps {
    children: ReactNode;
}

export const wagmiConfig = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL),
  },
  connectors: [ embeddedWallet() ],
  ssr: true
})


const queryClient = new QueryClient();

const Web3Provider = ({ children }: IProps) => {

  useCreateWallet()

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <CivicAuthProvider displayMode="redirect" initialChain={sepolia} >
            {children}
          </CivicAuthProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Web3Provider;