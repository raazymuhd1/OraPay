import React from 'react'
import { TbArrowBearRight } from "react-icons/tb";
import { MoveRight } from 'lucide-react'
import { yields } from '@/constants';
import { CustomButton } from "@/components"
import { useReadContract, useAccount } from 'wagmi';
import { allContracts } from '@/constants';

const YieldOverview = () => {
     const { fundsVault, mockAavePool } = allContracts
     const { data: currentAPY, status: apyStatus } = useReadContract({
        abi: fundsVault.abi,
        address: fundsVault.address as `0x${string}`,
        functionName: 'getCurrentAPY',
        args: []
     })
     const { address: userAddr } = useAccount()
     const { data: dailyYield, status: yieldStatus } = useReadContract({
        abi: mockAavePool.abi,
        address: mockAavePool.address as `0x${string}`,
        functionName: 'calculateYield',
        args: [userAddr]
     })

     function yieldOverviewDetails(title: string, value: string, desc: string, ...rest: string[]) {
        return (
            <div className="w-full lg:w-[50%] h-[180px] rounded-[10px] border-[1px] border-[#202021] p-[20px] glass-card">
              <div className='flex items-center justify-between'>
                  <h2 className="font-bold resp-headerCard"> {title} </h2>
                  <p className="flex items-center gap-[10px] text-[clamp(14px,1vw,18px)] text-[#11afb8] font-semibold"> { value || 0 } </p>
              </div>
              <div className="flex flex-col gap-[10px] mt-[10px]">
                    <p className="text-(--paraph-color) text-[clamp(12px,1.3vw,14px)] font-semibold">{desc}</p>
                      <p className={`text-(--paraph-color) text-[1.5vmax] md:text-[.8vmax] ${title.toLowerCase() == "yt generation" && "hidden"}`}> { rest[0] } </p>
                    <CustomButton
                      onClick={() => {}}
                      disabled={false}
                      style={`glass-card ${title.toLowerCase() == "current apy" && "hidden"} responsive-btnText`}
                            >
                      { rest[1] }
                    <MoveRight className="w-[15px]" />
                  </CustomButton>
              </div> 
          </div>
        )
     }

  return (
    <div className="w-full lg:h-[300px] min-h-[300px]  mx-auto rounded-[10px] p-[30px] border-[1px] border-[#202021] bg-brown">
        <aside>
           <h3 className="font-bold responsive-headerTabs"> Yield Overview </h3>
           <p className="text-(--paraph-color) responsive-paraph"> This overview shows your current yield generation and performance metrics. Use this to track how efficiently your deposits are working for you. </p>
        </aside>

        <aside className="w-full flex items-center lg:flex-nowrap flex-wrap gap-[20px] mt-[20px]">

          { yieldOverviewDetails("Current APY", `${String(currentAPY)}`, `Your deposits are currently earning at an annual rate of 8.2%, which is 2.1% higher than market average.`, `APY is variable and changes based on market conditions`, ``) }
          { yieldOverviewDetails("YT Generation", `+${dailyYield?.toString()} YT/day`, `At the current rate, you are generating approximately +${dailyYield?.toString()} YT tokens per day from your deposits.`, ``, `View detailed analytics`) }

        </aside>
    </div>
  )
}

export default YieldOverview