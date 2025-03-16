import { Plus, Calculator, CreditCard } from 'lucide-react'
import { LuWallet, LuChartNoAxesColumn  } from "react-icons/lu";
import { ImStack } from "react-icons/im";

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

export {navbarLists, intros, steps, balances, quickActionBtns}