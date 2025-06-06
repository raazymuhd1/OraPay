# OraPay Frontend

**Learn and Buy Now, Pay Never.**  
OraPay is a decentralized platform that lets students fund their education using DeFi yield — without ever touching their principal token.

This is the frontend repo for the EduZero MVP.  
Built with NextJS, TypeScript, TailwindCSS, and Web3 integrations.

---

## 🚀 Features

- 🔐 Connect wallet (Civic's Web3 Auth)
- 📤 Deposit stablecoins to receive PT (Principal Token) & YT (Yield Token)
- 💸 Pay for education/tools using yield (YT)
- 📊 View balances
- 🧼 Simple UX for students unfamiliar with DeFi

---

## 🛠 Tech Stack

- [React](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Wagmi](https://wagmi.sh/) + [RainbowKit](https://www.rainbowkit.com/) for wallet connection

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/eduzero-frontend.git
cd eduzero-frontend
```

### 2. Install dependencies

Make sure you have Node.js v18+ and a package manager like pnpm, yarn, or npm.

```bash
pnpm install
# or
yarn install
# or
npm install
```

### 3. Set up environment variables
Duplicate the .env.example file:

```bash
cp .env.example .env
```
Then fill in the values:
```bash
VITE_PUBLIC_RPC_URL=https://polygon-rpc.com
VITE_PUBLIC_EDUZERO_CONTRACT=0xYourContractAddressHere
VITE_PUBLIC_CHAIN_ID=137
VITE_PUBLIC_EXPLORER_URL=https://polygonscan.com
```
✅ You can use any supported EVM chain — Polygon, Base, etc.

Start the dev server
```bash
pnpm dev
# or
yarn dev
# or
npm run dev
```

Open your browser and visit:
👉 http://localhost:5173
