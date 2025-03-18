"use client"
import React from 'react'
import { MoveDown } from 'lucide-react'
import InputFrom from './InputFrom'
import InputTo from "./InputTo"
import { CustomButton } from "@/components"

const Trade = () => {

    const handleTradeDetails = (title: string, value: string) => {
       return (
         <div className="w-full flex items-center justify-between">
            <h3 className="text-[#7f7f80] font-bold"> {title}: </h3>
            <h4 className="font-bold">{value} </h4>
         </div>
       )
   }

  return (
    <div className="w-full h-screen flex flex-col items-center gap-[20px] justify-center">

         <aside className="flex flex-col gap-[10px] items-center">
              <h3 className="font-bold lg:text-[2vmax] text-[4vmax]"> Trade </h3>
              <p className="text-[#7f7f80] lg:text-[1.2vmax] text-[2vmax]"> Swap between PT, YT tokens and stablecoins </p>
        </aside>

       <div className="bg-brown lg:w-[40%] w-[80%] min-h-[400px] mx-auto p-[30px] flex flex-col gap-[15px] rounded-[10px]">
          <aside className="flex flex-col gap-[10px]">
              <h3 className="font-bold lg:text-[1.3vmax] text-[2vmax]"> Swap </h3>
              <p className="text-[#7f7f80]"> Trade tokens with minimal slippage </p>
          </aside>

          <div className="w-full flex flex-col items-center">
            <InputFrom/>
            <MoveDown className="translate-y-[20px]" />
            <InputTo />
          </div>
          
          <div className="flex flex-col gap-[10px] glass-card p-[15px]">
            { handleTradeDetails("Rate", "1 USDC = 0.98 PT-USDC") }
            { handleTradeDetails("Fee", "0.3%") }
          </div>

            <CustomButton
              onClick={() => {}}
              disabled={false}
              style={`bg-gradient`}
                    >
              Swap
         </CustomButton>
       </div>
    </div>
  )
}

export default Trade