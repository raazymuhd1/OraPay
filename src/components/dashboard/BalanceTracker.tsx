import { useState, useEffect, } from 'react'
import { balances } from "@/constants"
import { LuWallet, LuChartNoAxesColumn  } from "react-icons/lu";
import { ImStack } from "react-icons/im";
import { allContracts } from '@/constants';
import { MdArrowOutward } from "react-icons/md";
import { useContractHooks } from "@/utils/hooks"
import { useReadContract } from "wagmi"
import { readContract } from '@wagmi/core'
import BalancesCard from "./BalancesCard"


const BalanceTracker = () => {
      const [userBalances, updateUserBalance] = useState(balances);
      const [depositBalances, setDepositBalances] = useState({
          deposited: "0",
          yieldBalance: "0",
          principalBalance: "0"
      })
      const { userDeposits, holdingsResult, userDepositStatus, holdingStatus, depositStatus } = useContractHooks()
      const { fundsVault } = allContracts;
      const { data: currentAPY, status: apyStatus } = useReadContract({
              abi: fundsVault.abi,
              address: fundsVault.address as `0x${string}`,
              functionName: 'getCurrentAPY',
              args: []
           })

      console.log("userDeposits", userDeposits)
      console.log("user holdings", holdingsResult)


      useEffect(() => {
         const handleUserDepositedBalance = () => {
            //  i could pass a deposit status in the dependencies list to keep updating the balances
            if(userDeposits && holdingsResult) {
                setDepositBalances({
                  deposited: String(userDeposits).slice(0, -6) ?? "0",
                  // @ts-ignore
                  yieldBalance: holdingsResult && (String(holdingsResult[0]).slice(0, -6) ?? "0"),
                  // @ts-ignore
                  principalBalance: holdingsResult && (String(holdingsResult['1']).slice(0, -6) ?? "0")
                })
            }
         }

         handleUserDepositedBalance()
      }, [userDeposits, holdingsResult, depositStatus])


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
              { ...{ id: userBalances[0].id, title: userBalances[0].title, TitleLogo: LuWallet, value: `$${depositBalances.deposited}`, desc: `+${currentAPY ?? 0}% this year` } } 
              />
            <BalancesCard 
              { ...{ 
                id: userBalances[1].id, 
                title: userBalances[1].title, 
                TitleLogo: ImStack, 
                value: `${depositBalances.principalBalance}`, 
                desc: userBalances[1].desc 
                } } 
              />
            <BalancesCard 
              { ...{ 
                id: userBalances[2].id, 
                title: userBalances[2].title, 
                TitleLogo: LuChartNoAxesColumn, 
                value: `${depositBalances.yieldBalance}`, 
                desc: userBalances[2].desc 
              } } 
              />
        </aside>
    </aside>
  )
}

export default BalanceTracker