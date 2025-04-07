import { Plus, Calculator, CreditCard, CircleDollarSign } from 'lucide-react'
import { LuWallet, LuChartNoAxesColumn  } from "react-icons/lu";
import { ImStack } from "react-icons/im";
import { prod1, prod2, subs1, subs2, course1, course2, deposit, pay, trade } from "@/assets"
import Vault from "../utils/abis/vault.json"
import MockUsdc from "../utils/abis/mockUsdc.json"
import Principal from "../utils/abis/principalToken.json"
import YieldToken from "../utils/abis/yieldToken.json"
import Treasury from "../utils/abis/treasury.json"
import MockLendingPool from "../utils/abis/mockAavePool.json"

const navbarLists = [
    { id: 0, title: "Home", url: "/" },
    { id: 1, title: "Dashboard", url: "/dashboard" },
    { id: 2, title: "Marketplace", url: "/marketplace" },
    { id: 3, title: "Trade", url: "/trade" },
]

const intros = [
    { id: 0, title: "Deposit & Earn", desc: "Deposit your stablecoins and receive Principal Tokens (PT) to maintain your capital while earning yield.", img: deposit},
    { id: 1, title: "Pay With Yield", desc: "Use your Yield Tokens (YT) as spending money—pay merchants without ever touching your principal.", img: pay },
    { id: 2, title: "Trade PT & TY", desc: "Easily swap between Principal and Yield tokens on our marketplace to optimize your strategy.", img: trade },
]

// dashboard
const steps = [
    { id: 1, title: "Deposit",  desc: "Deposit USDC and receive Principal Tokens (PT)", BtnLogo: Plus, btnText: "Deposit Now" },
    { id: 2, title: "Calculate YT",  desc: "Receive Yield Tokens (YT) that you can trade or hold", BtnLogo: Calculator, btnText: "Calculate YT Earnings" },
    { id: 3, title: "Spend Yield", desc: "Use YT to purchase items or subscriptions in the marketplace", BtnLogo: CreditCard, btnText: "Browse Marketplace" },
]

const balances = [
    { id: 1, "title": "Deposits", value: "$8,240", TitleLogo: LuWallet, desc: "+12.4% this month" },
    { id: 2, "title": "PT Holdings", value: "8,240 PT", TitleLogo: ImStack, desc: "Expiry: 12/31/2023" },
    { id: 3, "title": "YT Holdings", value: "240 YT", TitleLogo: LuChartNoAxesColumn , desc: "Available for payments" }
]

const quickActionBtns = [
    { id: 1, title: "Deposit Funds", btnLogo: LuWallet },
    { id: 2, title: "Browse Marketplace", btnLogo: LuChartNoAxesColumn },
    { id: 3, title: "Calculate YT Earnings", btnLogo: Calculator },
    { id: 4, title: "Withdrawal", btnLogo: CircleDollarSign },
]

const yields = [
    { id: 1, title: "Current APY", desc: "Your deposits are currently earning at an annual rate of 8.2%, which is 2.1% higher than market average.", value: "8.2", detail: "APY is variable and changes based on market conditions"  },
    { id: 2, title: "YT Generation", desc: "At the current rate, you are generating approximately 12.4 YT tokens per day from your deposits.", value: "12.4", detail: ""  },
]


// marketplaces
const marketplaceDatas = {
    ["all-items"]: function() {
        const allItems = [...this.subs, ...this.products, ...this.courses]
        console.log(allItems)
        return allItems;
    } ,
    subs: [
        { id: 1, title: "Premium Streaming Subscription", desc: "Access to unlimited movies, TV shows, and documentaries", price: "15.99", tag: "StreamFlix", productImg: subs1 },
        { id: 2, title: "Music Streaming Premium", desc: "Ad-free music with unlimited skips and downloads", price: "9.99", tag: "SoundWave", productImg: subs2 },
    ],
    products: [
        { id: 1, title: "Home Furniture Set", desc: "Modern living room furniture collection", price: "129.99", tag: "HomeStyle", productImg: prod1 },
        { id: 2, title: "Hardware Wallet", desc: "Secure cold storage for your crypto assets", price: "79.99", tag: "CryptoHardware", productImg: prod2 },
    ], 
    courses: [
        { id: 1, title: "Advanced Blockchain Development Course", desc: "Learn smart contract development and DApp creation", price: "49.99", tag: "CryptoAcademy", productImg: course1 },
        { id: 2, title: "DeFi Masterclass", desc: "Advanced yield strategies and DeFi protocols", price: "39.99", tag: "YieldLabs", productImg: course2 },
    ] 
}

// contracts details
const allContracts = {
   fundsVault: { address: '0x310E7DAEA5f4F4037ED4b96e013daA8E3084B2Eb', abi: Vault.abi },
   treasury: { address: '0xDb2aCEb7eBdc4af837018F5f4880587DB7E6D55D', abi: Treasury.abi },
   yieldToken: { address: '0x4E29dd2E75F66441f35Ad6Cd814a6D8004d49C58', abi: YieldToken.abi },
   principalToken: { address: '0xc0a2F87Bd4c926048a722791Aa73ffbaD3D72C27', abi: Principal.abi },
   mockUsdc: { address: '0x1fA4218847A4E8F8839AA1E06eE295563b3E5727', abi: MockUsdc.abi },
   mockAavePool: { address: '0xEF735f2a1012C7f040A73A5878508c2bD2638613', abi: MockLendingPool.abi },
}

export {navbarLists, intros, steps, balances, quickActionBtns, yields, marketplaceDatas, allContracts}