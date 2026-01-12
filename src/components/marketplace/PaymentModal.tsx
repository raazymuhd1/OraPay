import { useEffect, useState } from 'react'
import { CreditCard, X, History } from 'lucide-react'
import { usePeyPeyContext } from "@/components/PeyPeyContext"
import { useAccount } from 'wagmi'
import {Toaster} from "react-hot-toast"
import toast from 'react-hot-toast'
import { useContractHooks } from '@/utils/hooks'
import { ITxsRecord } from "@/types"
// components
import { CustomButton } from "@/components"
import TxResult from "../transactions-result/TxResult"
import TransactionsRecord from '../records/TransactionsRecord'
import LoadingState from "../loadings/LoadingState"

const PaymentModal = () => {
        const { openPayModal, setOpenPayModal, selectedProduct, setShowTxsRecord, setShowLoadingState } = usePeyPeyContext()
        const { payData, payStatus, paymentError, payPurchasedItem, resetPayment }  = useContractHooks()
        const [requiredDepo, setRequiredDepo] = useState("50")
        const [showTxResult, setShowTxResult] = useState(false)
        const [estYield, setEstYield] = useState("10");
        const [txsRecord, setTxsRecord] = useState<ITxsRecord<string>[]>([
            {
                id: 0,
                action: "payment",
                date: new Date(),
                value: requiredDepo
            },
            {
                id: 1,
                action: "payment",
                date: new Date(),
                value: requiredDepo
            }
        ])


        useEffect(() => {
           const handleSelectedProduct = () => {
               setRequiredDepo(selectedProduct.price)
              //  setEstYield(selectedProduct.estimatedYield)
           }
           handleSelectedProduct()
        }, [selectedProduct])

        useEffect(() => {
            const handlingPaymentProcess = () => {
                if(payStatus === "success" && payData) {
                    toast.success("Payment successful!", { position: "top-right" })
                    setShowTxResult(true)
                    setShowLoadingState(false)
                    resetPayment()

                    setTimeout(() => {
                      setOpenPayModal(false)
                      setShowTxResult(false)
                    }, 5000)
                } else if(payStatus === "error") {
                    setTimeout(() => {
                        setOpenPayModal(false) 
                        setShowLoadingState(false)
                    }, 2000)
                    console.error(paymentError);
                    resetPayment()
                    toast.error("Payment failed!", { position: "top-right" })
                }
            }

            handlingPaymentProcess()
        }, [payStatus, payData])


   const handleItemDetails = (title: string, value: string) => {
       return (
         <div className="w-full flex items-center justify-between">
            <h3 className="text-[#7f7f80] font-bold w-[40%]"> {title}: </h3>
            <h4 className="font-bold w-[40%]"> {title == "price" && "$"}{value} </h4>
         </div>
       )
   }

   const handleDepositDetails = (title: string, value: string) => {
      return (
          <div className="w-full flex items-center justify-between">
            <h3 className="text-[#7f7f80] font-bold"> {title}: </h3>
            <h4 className={`font-bold ${title.toLowerCase() == "estimated yield" && "text-[#11afb8]"}`}> {value} </h4>
         </div>
      )
   }

  return (
    <div 
      className={`transition-all duration-500 ${!openPayModal ? "hidden h-0 w-0" : "h-screen fixed left-0 flex top-0"} w-full`}>

       <Toaster />
       <div 
          onClick={() => {
              if(payStatus != "pending") setOpenPayModal(false)
          }}
          className="absolute top-0 w-full h-full glass-modal" />
       
       {/* payment card */}
        <div 
            className="flex h-[60%] w-[80%] xl:w-[30%] lg:w-[40%] mx-auto flex-col glass-card border-[1px] border-[#202021] rounded-[15px] gap-[15px] p-[20px] translate-y-[140px] relative overflow-y-scroll overflow-x-hidden top-0">

            <div className="w-full flex justify-between">
                <div className="flex flex-col gap-[10px]">
                    <h2 className="font-bold responsive-headerText"> Payment </h2>
                    <p className="font-semibold text-(--paraph-color) responsive-paraph"> pay your purchase item using your future yield </p>
                </div>

                <History className="w-[30px] cursor-pointer" onClick={() => setShowTxsRecord(true)} />
            </div>

            <div className="w-full flex flex-col gap-[10px] border-b-[1px] border-[rgba(255, 255, 255, 0.125)] p-[10px]">
              { handleItemDetails("Item", selectedProduct.title) }
              { handleItemDetails("Price", `$${selectedProduct.price}`) }
              { handleItemDetails("Source", selectedProduct.tag) }
            </div>

            <h2 className="font-bold responsive-headerText"> Payment Method </h2>
            <div className="flex w-full flex-col border-[1px] bg-[var(--bright-yellow)] border-[rgba(255, 255, 255, 0.125)] p-[20px] rounded-[15px]">

                    <div className="w-full flex flex-col gap-[5px]">
                        <aside className="flex w-full items-center gap-[5px] cursor-pointer">
                            <History className="w-[30px] text-[#11afb8]" />
                            <h3 className="font-bold"> Buy Now, Pay Never </h3>
                        </aside>

                        <div className="w-full flex flex-col gap-[5px]">
                          <p className="text-(--paraph-color) font-semibold"> This will be paid by your future yield. </p>
                          {/* separator */}
                          <div className="w-full h-[0.5px] bg-[#7f7f80]" />

                          {/* deposit details */}
                          { handleDepositDetails("Required Deposit", `${requiredDepo}YT`) }
                          { handleDepositDetails("Estimated Yield", `${estYield}YT`) }
                        </div>

                    </div>
            </div>

            <div className="flex flex-col w-full gap-[10px]">
                <CustomButton
                    onClick={() => {
                        payPurchasedItem(requiredDepo)
                        setShowLoadingState(true)
                    }} 
                    disabled={payStatus == "pending" || payStatus == "success" ? true : false}
                    style={`bg-[var(--dark)]`}
                        >
                    <CreditCard className="" />
                    { payStatus == "pending" ? "Processing..." : "Pay Now" }
                </CustomButton>

                 <CustomButton
                    onClick={() => setOpenPayModal(false)}
                    disabled={payStatus == "pending" ? true : false}
                    style={`bg-[var(--bright-yellow)]`}
                        >
                    <X className="" />
                    Cancel
                </CustomButton> 
            </div>
        
            {/* tx result modal */}
            <TxResult { ...{ title: "Payment Successfull", msg: "You've use the future yield to pay for this", showTxResult, setShowTxResult: setOpenPayModal, closeTxResult: setShowTxResult } } />

            {/* txs record */}
            <TransactionsRecord transactions={txsRecord} />
            {/* loading state */}
            <LoadingState />
        </div>


    </div>
  )
}

export default PaymentModal