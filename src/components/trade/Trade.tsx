"use client"
import { useState, useEffect } from 'react'
import { MoveDown } from 'lucide-react'
import InputFrom from './InputFrom'
import InputTo from "./InputTo"
import { CustomButton } from "@/components"
import { allContracts } from '@/constants'
import { useWriteContract, useReadContract } from 'wagmi'

interface IState {
   from?: {
     address: string;
     amount: number;
   },
   to?: {
     address: string;
     amount: number;
   }
}


const Trade = () => {
    const { fundsVault } = allContracts
    const [selectedAsset, setSelectedAsset] = useState<IState>({
        from: {
           address: "",
           amount: 0
        },
        to: {
           address: "",
           amount: 0
        }
    });
    const { writeContract: writeSell, data: sellData, status: sellStatus } = useWriteContract()

    const handleTradeDetails = (title: string, value: string) => {
       return (
         <div className="w-full flex items-center justify-between">
            <h3 className="text-[#7f7f80] font-bold"> {title}: </h3>
            <h4 className="font-bold">{value} </h4>
         </div>
       )
   }

   const handleTrade = () => {
       try {
         console.log("trading")
          writeSell({
              abi: fundsVault.abi,
              address: fundsVault.address as `0x${string}`,
              functionName: "sellYieldTokensForTokens",
              args: [selectedAsset?.from?.amount, selectedAsset?.to?.address],
              gas: BigInt("3000000")
          })
          
       } catch(err) {
          console.log(err)
       }
   }

   console.log(sellData)

  return (
    <div className="w-full h-screen p-[20px] flex flex-col items-center gap-[20px] justify-center">

         <div className="flex w-[80%] mx-auto flex-col gap-[20px] items-center mt-[10px]">
            <h2 className="page-headerText font-bold"> Trade </h2>
            <p className="page-paraphText font-semibold text-[#7f7f80]"> Swap between PT, YT tokens and stablecoins </p>
       </div>

       <div className="bg-brown xl:w-[30%] lg:w-[40%] w-[80%] min-h-[400px] mx-auto p-[30px] flex flex-col gap-[15px] rounded-[10px]">
          <aside className="flex flex-col gap-[10px]">
              <h3 className="font-bold lg:text-[1.3vmax] text-[2vmax]"> Swap </h3>
              <p className="text-[#7f7f80]"> Trade tokens with minimal slippage </p>
          </aside>

          <div className="w-full flex flex-col items-center">
            <InputFrom selectedAsset={selectedAsset} setSelectedAsset={setSelectedAsset} />
            <MoveDown className="translate-y-[20px]" />
            <InputTo selectedAsset={selectedAsset} setSelectedAsset={setSelectedAsset} />
          </div>
          
          <div className="flex flex-col gap-[10px] glass-card p-[15px]">
            { handleTradeDetails("Rate", `1 USDC = 1 PT-USDC`) }
            { handleTradeDetails("Fee", "0.3%") }
          </div>

            <CustomButton
              onClick={handleTrade}
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