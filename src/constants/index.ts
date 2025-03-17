import { Plus, Calculator, CreditCard } from 'lucide-react'
import { LuWallet, LuChartNoAxesColumn  } from "react-icons/lu";
import { ImStack } from "react-icons/im";
import { prod1, prod2, subs1, subs2, course1, course2 } from "@/assets"

const navbarLists = [
    { id: 0, title: "Home", url: "/" },
    { id: 1, title: "Dashboard", url: "/dashboard" },
    { id: 2, title: "Marketplace", url: "/marketplace" },
    { id: 3, title: "Trade", url: "/trade" },
]

const intros = [
    { id: 0, title: "Deposit & Earn", desc: "Deposit your stablecoins and receive Principal Tokens (PT) to maintain your capital while earning yield." },
    { id: 1, title: "Pay With Yield", desc: "Use your Yield Tokens (YT) as spending money—pay merchants without ever touching your principal." },
    { id: 2, title: "Trade PT & TY", desc: "Easily swap between Principal and Yield tokens on our marketplace to optimize your strategy." },
]

// dashboard
const steps = [
    { id: 1, title: "Deposit",  desc: "Deposit USDC and receive Principal Tokens (PT)", BtnLogo: Plus, btnText: "Deposit Now" },
    { id: 2, title: "Get YT",  desc: "Receive Yield Tokens (YT) that you can trade or hold", BtnLogo: Calculator, btnText: "Calculate YT Earnings" },
    { id: 3, title: "Spend Yield", desc: "Use YT to purchase items or subscriptions in the marketplace", BtnLogo: CreditCard, btnText: "Browse Marketplace" },
]

const balances = [
    { id: 1, "title": "Deposits", value: "$8,240", titleLogo: LuWallet, desc: "+12.4% this month" },
    { id: 2, "title": "PT Holdings", value: "8,240 PT", titleLogo: ImStack, desc: "Expiry: 12/31/2023" },
    { id: 3, "title": "YT Holdings", value: "240 YT", titleLogo: LuChartNoAxesColumn , desc: "Available for payments" }
]

const quickActionBtns = [
    { id: 1, title: "Deposit Funds", btnLogo: LuWallet },
    { id: 2, title: "Browse Marketplace", btnLogo: LuChartNoAxesColumn },
    { id: 3, title: "Calculate YT Earnings", btnLogo: Calculator },
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
        { id: 1, title: "Advanced Blockchain Development Course", desc: "Learn smart contract development and DApp creation", price: "49.99", tag: "CryptoAcademy", productImg: prod1 },
        { id: 2, title: "DeFi Masterclass", desc: "Advanced yield strategies and DeFi protocols", price: "39.99", tag: "YieldLabs", productImg: prod2 },
    ] 
}

export {navbarLists, intros, steps, balances, quickActionBtns, yields, marketplaceDatas}