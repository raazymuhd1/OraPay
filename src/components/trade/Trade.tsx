"use client"
import { useState, useEffect } from 'react'
import { MoveDown } from 'lucide-react'
import InputFrom from './InputFrom'
import InputTo from "./InputTo"
import { CustomButton } from "@/components"
import { allContracts } from '@/constants'
import { useWriteContract } from 'wagmi'
import { IState } from "@/types"
import { ethers } from 'ethers'
import toast, { Toaster } from "react-hot-toast"

const Trade = () => {
    const { fundsVault, mockUsdc } = allContracts
    const [selectedAsset, setSelectedAsset] = useState<IState>({
        from: {
           name: "",
           address: "",
           amount: 0
        },
        to: {
           name: "",
           address: "",
           amount: 0
        }
    });
    const { writeContract: writeSell, data: sellData, status: sellStatus, reset: resetSelling, error: sellingError } = useWriteContract()

    useEffect(() => {
        const handleSwapProcess = () => {
           if(sellData && sellStatus == "success") {
                  toast.success("assets has been sold", {
                        position: "top-right"
                  })
                  console.log(sellData)
                  resetSelling()
                return;
            } else if(!sellData && sellStatus == "error") {
               console.error(sellingError);
               toast.error("Failed to sell assets", {
                        position: "top-right"
                  })
                  console.log(sellData)
                  resetSelling()
                return;
            }
        }

        handleSwapProcess()

    }, [sellData, sellStatus])

    const handleTradeDetails = (title: string, value: string) => {
       return (
         <div className="w-full flex items-center justify-between">
            <h3 className="text-[#7f7f80] font-bold"> {title}: </h3>
            <h4 className="font-bold">{value} </h4>
         </div>
       )
   }

   const sellTokens = () => {
       try {
         console.log("trading")
         if(selectedAsset?.from?.amount && selectedAsset?.to?.address) {
           writeSell({
               abi: fundsVault.abi,
               address: fundsVault.address as `0x${string}`,
               functionName: "sellYieldTokensForTokens",
               args: [ethers.parseUnits(String(selectedAsset?.from?.amount), 6), selectedAsset?.to?.address],
              //  gas: BigInt("52000"),
           })
         }

          
       } catch(err) {
          console.log(err)
       }
   }


  return (
    <div className="w-full h-screen p-[20px] flex flex-col items-center gap-[20px] justify-center">

        <Toaster />

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
            { handleTradeDetails("Rate", `1 ${selectedAsset.from?.name?.toUpperCase() || "YTUSDC"} = 1 USDC`) }
            { handleTradeDetails("Fee", "0.3%") }
          </div>

            <CustomButton
              onClick={sellTokens}
              disabled={sellStatus == "pending" || selectedAsset?.from?.amount! <= 0 ? true : false}
              style={`bg-gradient`}
                    >
              { sellStatus == "pending" ? "Processing..." : "Swap" }
         </CustomButton>
       </div>
    </div>
  )
}

export default Trade