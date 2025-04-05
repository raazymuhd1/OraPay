"use client"
import '@rainbow-me/rainbowkit/styles.css';
import { ReactNode } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
// custom chain
import { educhain } from "@/chain-configs/customChain"

interface IProps {
    children: ReactNode;
}

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, educhain],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [educhain.id]: http()
  },
  ssr: true
})


const queryClient = new QueryClient();

const Web3Provider = ({ children }: IProps) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
            {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Web3Provider;