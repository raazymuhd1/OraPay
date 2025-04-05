import { useState, useEffect, SetStateAction } from 'react'
import { balances } from "@/constants"
import { LuWallet, LuChartNoAxesColumn  } from "react-icons/lu";
import { ImStack } from "react-icons/im";
import { allContracts } from '@/constants';
import { MdArrowOutward } from "react-icons/md";
import { useContractHooks } from "@/utils/hooks"
import BalancesCard from "./BalancesCard"


const BalanceTracker = () => {
      const [userBalances, updateUserBalance] = useState(balances);
      const [depositBalances, setDepositBalances] = useState({
          deposited: "",
          yieldBalance: "",
          principalBalance: ""
      })
      const { userDeposits, holdingsResult } = useContractHooks()
      const { fundsVault } = allContracts;

      console.log(parseFloat(userDeposits.data as string))
      console.log(userDeposits.data)


      useEffect(() => {
         const handleUserDepositedBalance = () => {
             
         }

         handleUserDepositedBalance()
      }, [])


  return (
    <aside className="lg:w-[70%] w-full lg:h-[300px] min-h-[300px] mx-auto rounded-[10px] p-[30px] border-[1px] border-[#202021] bg-brown">
        {/* top  */}
        <div className="w-full flex items-center justify-between">
            <aside>
              <h3 className="font-bold responsive-headerText"> Your Balance </h3>
              <p className="text-(--paraph-color) font-semibold responsive-paraph"> Track your deposit and token holdings </p>
            </aside>

            <h4 className="flex items-center gap-[10px] bg-[rgba(9,9,11,255)] p-[6px] rounded-[10px] hover:bg-[rgba(29,220,255,255)] hover:text-[#fff]   transition-[background] duration-500 cursor-pointer text-[#11afb8] text-[clamp(14px),1vw,16px]"> <MdArrowOutward className="w-[18px]" /> Manage </h4>
        </div>

        <aside className="w-full flex items-center lg:flex-nowrap flex-wrap justify-center gap-[20px] mt-[10px]">
            <BalancesCard 
              { ...{ id: userBalances[0].id, title: userBalances[0].title, TitleLogo: LuWallet, value: `$${String(userDeposits.data).slice(0, -6) ?? 0 }`, desc: userBalances[0].desc } } 
              />
            <BalancesCard 
              { ...{ id: userBalances[1].id, title: userBalances[1].title, TitleLogo: ImStack, value: `${holdingsResult?.data! && (String(holdingsResult?.data[1]).slice(0, -6) ?? 0) }`, desc: userBalances[1].desc } } 
              />
            <BalancesCard 
              { ...{ id: userBalances[2].id, title: userBalances[2].title, TitleLogo: LuChartNoAxesColumn, value: `${holdingsResult?.data! && (String(holdingsResult?.data[0]).slice(0, -6) ?? 0) }`, desc: userBalances[2].desc } } 
              />
        </aside>
    </aside>
  )
}

export default BalanceTracker