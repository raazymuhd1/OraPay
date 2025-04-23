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
    { id: 1, title: "Dashboard", url: "/dashboard" },
    { id: 2, title: "Marketplace", url: "/marketplace" },
    { id: 3, title: "Trade", url: "/trade" },
    { id: 4, title: "Faucet", url: "/faucet" },
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
    { id: 2, title: "Calculate YT Earnings", btnLogo: Calculator },
    { id: 3, title: "Withdrawal", btnLogo: CircleDollarSign },
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


const transactionsRecordHeaders = [
    { id: 1, title: "Action" },
    { id: 2, title: "Date" },
    { id: 3, title: "Value" },
]


// contracts details
const allContracts = {
   fundsVault: { address: '0x94E3Ae807dD4c1030AA3bF94B348e29CFf1CF0aE', abi: Vault.abi },
   treasury: { address: '0xC6660C0952C98a9Ac14c26b35b1dB598f2139Efa', abi: Treasury.abi },
   yieldToken: { address: '0x8A90B3FDa4fEb2Cafc875b5241227ee285be18D4', abi: YieldToken.abi },
   principalToken: { address: '0xe89Ad517A30292Ab63A922B147B7E83727C2B3BB', abi: Principal.abi },
   mockUsdc: { address: '0x5e47b3Ba6f9E80f1504b8cCbC83e2d7Ca69Ab22d', abi: MockUsdc.abi },
   mockAavePool: { address: '0xab01753b6D75d550d87807a8E4a9Ddd07D15797e', abi: MockLendingPool.abi },
}

export {navbarLists, intros, steps, balances, quickActionBtns, yields, marketplaceDatas, allContracts, transactionsRecordHeaders}