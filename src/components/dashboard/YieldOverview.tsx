import React from 'react'
import { TbArrowBearRight } from "react-icons/tb";
import { MoveRight } from 'lucide-react'
import { yields } from '@/constants';
import { CustomButton } from "@/components"

const YieldOverview = () => {
  return (
    <div className="w-full h-[300px]  mx-auto rounded-[10px] p-[30px] border-[1px] border-[#202021] bg-brown">
        <aside>
           <h3 className="font-bold text-[1.5vmax]"> Yield Overview </h3>
           <p className="text-[#7f7f80]"> This overview shows your current yield generation and performance metrics. Use this to track how efficiently your deposits are working for you. </p>
        </aside>

        <aside className="w-full flex items-center gap-[20px] mt-[20px]">
          <div className="w-[50%] h-[60%] rounded-[10px] border-[1px] border-[#202021] p-[20px] glass-card">
              <div className='flex items-center justify-between'>
                  <h2 className="font-bold"> Current APY </h2>
                  <p className="flex items-center text-[#11afb8] font-semibold"> <TbArrowBearRight /> 8.2% </p>
              </div>
               <div className="flex flex-col gap-[10px] mt-[10px]">
                  <p className="text-[#7f7f80]"> Your deposits are currently earning at an annual rate of 8.2%, which is 2.1% higher than market average. </p>
                  <p className="text-[#7f7f80] text-[.8vmax]">APY is variable and changes based on market conditions</p>
               </div>
          </div>

          <div className="w-[50%] h-[60%] rounded-[10px] border-[1px] border-[#202021] p-[20px] glass-card">
              <div className='flex items-center justify-between'>
                  <h2 className="font-bold"> YT Generation </h2>
                  <p className="flex items-center gap-[10px] text-[#11afb8] font-semibold"> +12.4 YT/day </p>
              </div>
             <div className="flex flex-col gap-[10px] mt-[10px]">
                  <p className="text-[#7f7f80]">At the current rate, you are generating approximately 12.4 YT tokens per day from your deposits.</p>
                  <CustomButton
                    onClick={() => {}}
                    disabled={false}
                    style={`glass-card`}
                          >
                    View detailed analytics
                  <MoveRight className="" />
                </CustomButton>
            </div> 

          </div>

        </aside>
    </div>
  )
}

export default YieldOverview