import { Chain } from "@rainbow-me/rainbowkit"

// created a custom chain for educhain
export const educhain = {
    id: 656476,
    name: "Educhain",
    blockExplorers: {
        default: {
            name: "Educhain Testnet",
            url: "https://edu-chain-testnet.blockscout.com/"
        }
    },
    rpcUrls: {
        default: {
            http: ["https://rpc.open-campus-codex.gelato.digital"]
        }
    },
    nativeCurrency: {
        name: "Edu",
        symbol: "EDU",
        decimals: 18
    }
} as const satisfies Chain

// created a custom chain for pharos network
export const pharos = {
    id: 50002,
    name: "Pharos Network",
    blockExplorers: {
        default: {
            name: "Pharos Devnet",
            url: "https://pharosscan.xyz/"
        }
    },
    rpcUrls: {
        default: {
            http: ["https://devnet.dplabs-internal.com"]
        }
    },
    nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18
    },
    sourceId: 1,
    testnet: true
} as const satisfies Chain