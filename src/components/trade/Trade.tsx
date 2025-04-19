"use client"
import { useState, useEffect } from 'react'
import { MoveDown, History } from 'lucide-react'
import InputFrom from './InputFrom'
import InputTo from "./InputTo"
import { CustomButton } from "@/components"
import { useContractHooks } from '@/utils/hooks'
import { usePeyPeyContext } from '../PeyPeyContext'
import { IState, ITxsRecord } from "@/types"
import toast, { Toaster } from "react-hot-toast"
import TransactionsRecord from '../records/TransactionsRecord'
import LoadingState from '../loadings/LoadingState'

const Trade = () => {
    const { sellTokens, sellData, sellStatus, resetSelling, sellingError } = useContractHooks()
    const { setShowTxsRecord, setShowLoadingState } = usePeyPeyContext()
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

    const [txsRecord, setTxsRecord] = useState<ITxsRecord<string>[]>([
                    {
                        id: 0,
                        action: "payment",
                        date: new Date(),
                        value: String(selectedAsset?.from?.amount)
                    },
                    {
                        id: 1,
                        action: "payment",
                        date: new Date(),
                        value: String(selectedAsset?.from?.amount)
                    }
                ])


    useEffect(() => {
        const handleSwapProcess = () => {
           if(sellData && sellStatus == "success") {
                  toast.success("assets has been sold", {
                        position: "top-right"
                  })
                  console.log(sellData)
                  resetSelling()
                  setShowLoadingState(false)
                return;
            } else if(!sellData && sellStatus == "error") {
               console.log(sellingError);
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

  return (
    <div className="w-full h-screen p-[20px] flex flex-col items-center gap-[20px] justify-center">

        <Toaster />

         <div className="flex w-[80%] mx-auto flex-col gap-[20px] items-center mt-[10px]">
            <h2 className="page-headerText font-bold"> Trade </h2>
            <p className="page-paraphText font-semibold text-[#7f7f80]"> Swap between PT, YT tokens and stablecoins </p>
       </div>

       <div className="bg-brown xl:w-[30%] lg:w-[40%] w-[80%] min-h-[400px] mx-auto p-[30px] flex flex-col gap-[15px] rounded-[10px] relative overflow-hidden">
         <div className="w-full flex items-start justify-between"> 
            <aside className="flex flex-col gap-[10px]">
                <h3 className="font-bold lg:text-[1.3vmax] text-[2vmax]"> Swap </h3>
                <p className="text-[#7f7f80]"> Trade tokens with minimal slippage </p>
            </aside>

            <History onClick={() => setShowTxsRecord(true)} className="w-[20px] h-[20px] cursor-pointer" />
         </div>

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
              onClick={() => sellTokens(selectedAsset?.from?.amount as number, selectedAsset?.to?.address as string)}
              disabled={sellStatus == "pending" || sellStatus == "success" || selectedAsset?.from?.amount! <= 0 ? true : false}
              style={`bg-gradient`}
                    >
              { sellStatus == "pending" ? "Processing..." : "Swap" }
         </CustomButton>
       
            {/* txs record */}
            <TransactionsRecord transactions={txsRecord} />
            {/* loading state */}
            <LoadingState />
       </div>
    </div>
  )
}

export default Trade