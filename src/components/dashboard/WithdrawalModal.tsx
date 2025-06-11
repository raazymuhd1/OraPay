import {useRef, useState, useEffect} from 'react'
import toast, {Toaster} from "react-hot-toast"
import { usePeyPeyContext } from "../PeyPeyContext"
import { CircleDollarSign, X } from "lucide-react"
import { CustomButton } from "@/components"
import { allContracts } from '@/constants'
import { useContractHooks } from '@/utils/hooks'
import { useBalance, useAccount } from 'wagmi'
import { ITxsRecord } from "@/types"
import { ethers } from 'ethers'
import TxResult from "../transactions-result/TxResult"
import LoadingState from '../loadings/LoadingState'
import TransactionsRecord from '../records/TransactionsRecord'

const WithdrawalModal = () => {
     const { principalToken } = allContracts;
     const [withdrawalAmount, setWithdrawalAmount] = useState("0")
     const { openWithdrawModal, setOpenWithdrawModal, showTxResult, setShowTxResult, network, setShowLoadingState } = usePeyPeyContext()
     const inputRef = useRef<HTMLInputElement>(null)
     const userBalance = useBalance({ chainId: network.chainId, address: network.userAddr, token: principalToken.address as `0x${string}` })
     const [ptBalance, setPtBalance] = useState("0");
     const {handleAssetsWithdrawal, wdData, wdStatus, resetWd} = useContractHooks()
    const [txsRecord, setTxsRecord] = useState<ITxsRecord<string>[]>([
                    {
                        id: 0,
                        action: "payment",
                        date: new Date(),
                        value: withdrawalAmount
                    },
                    {
                        id: 1,
                        action: "payment",
                        date: new Date(),
                        value: withdrawalAmount
                    }
                ])

       const handleBalanceSelection = (value: number) => {
            // (userBalance / value) * 100;
            const bal = userBalance.data;
            inputRef.current?.focus();
            let dividedAmount;

            if(value == 50) {
                dividedAmount = bal?.formatted && (Number(bal?.formatted) * 50) / 100;
                setWithdrawalAmount(String(dividedAmount))
              } else if(value == 100) {
                 dividedAmount = bal?.formatted && (Number(bal?.formatted) / 100) * 100;
                setWithdrawalAmount(bal?.formatted as string)
              }
        }

      useEffect(() => {
          if(userBalance.data) {
                setPtBalance(userBalance.data?.value.toString())
          }
      }, [userBalance?.data])

      useEffect(() => {

        const handlwWithdrawalState = () => {
            if(wdData || wdStatus == 'success') {
                  toast.success("Assets withdrawn successfully!", {
                    position: "top-right"
                  })
                  setWithdrawalAmount("0")
                  resetWd()
                  setShowTxResult(true)
                  
                  setTimeout(() => {
                    setOpenWithdrawModal(false)
                    setShowLoadingState(false)
                    setShowTxResult(false)
                    }, 5000)
                    
                    resetWd()
                    return;
                } else if(wdStatus === "error") {
                    resetWd()
                    toast.error("An error occurred while withdrawing assets. Please try again!", {
                      position: "top-right"
                    })
                    setOpenWithdrawModal(false)
                    setShowLoadingState(false)
                    setWithdrawalAmount("0")
                    return;
            }
            
        }

        handlwWithdrawalState()

      }, [wdData, wdStatus])

  return (
    <div
     className={`transition-all duration-500 ${!openWithdrawModal ? "hidden h-0 w-0" : "h-screen fixed left-0 flex top-0 w-full"} `}    
    >   
        <Toaster />
        <div 
          onClick={() => setOpenWithdrawModal(false)}
          className="absolute top-0 w-full h-full glass-modal" />

        <div className="lg:w-[40%] md:w-[60%] w-[80%] mx-auto h-[50%] glass-card flex flex-col gap-[20px] rounded-[10px] translate-y-[220px] p-[15px] overflow-hidden">
            <aside className="flex items-center w-full justify-between">
                <div>
                    <h2 className="font-bold responsive-headerTabs"> Funds Withdrawal </h2>
                    <p className='font-normal text-(--paraph-color) responsive-paraph'> You can only make a withdrawal when the lockup period has passed </p>
                </div>
                <X className="w-[20px] h-[20px] cursor-pointer" onClick={() => setOpenWithdrawModal(false)} />
            </aside>

             <div className='w-full flex flex-col gap-[10px]'>
                <h2 className="font-bold resp-headerCard"> Withdraw Amount {`(USDC)`} </h2>
                <input 
                    value={withdrawalAmount}
                    onChange={(e) => setWithdrawalAmount(e.target.value)}
                    ref={inputRef} type="text" placeholder='0.00' className="w-full glass-card p-[10px] outline-none" />
            </div>
            <div className="flex items-start justify-between w-full p-[10px] glass-card">
              <p className="resp-paraphCard"> Available balance: </p>
              <aside>
                  <h4 className="resp-paraphCard font-bold"> { userBalance?.data && ethers.formatUnits(String(userBalance?.data?.value), 6) || 0 } PT </h4>
                  <p className="text-[#11afb8] resp-paraphCard underline flex items-center gap-[3px] "> 
                    <span onClick={() => handleBalanceSelection(50)} className="cursor-pointer"> 50% </span> 
                    | 
                    <span onClick={() => handleBalanceSelection(100)} className="cursor-pointer"> 100% </span> </p>
              </aside>

            </div>

             <CustomButton
                onClick={() => {
                  handleAssetsWithdrawal(String(userBalance?.data?.value), Number(withdrawalAmount))
                }} 
                disabled={withdrawalAmount.length <= 0 || Number(withdrawalAmount) == 0 || wdStatus == "pending" || wdStatus == "success" ? true : false}
                style={`bg-gradient`}
                      >
                <CircleDollarSign className="" />
                  { wdStatus == "pending" ? "Processin..." : "Withdraw" }
            </CustomButton>    
       
              <TxResult { ...{ title: "Withdraw Successfull", msg: "You've successfull withdrawn your PT", showTxResult, setShowTxResult: setOpenWithdrawModal, closeTxResult: setShowTxResult } } />

                {/* txs record */}
              <TransactionsRecord transactions={txsRecord} />
              {/* loading state */}
              <LoadingState />
        </div>
    </div>
  )
}

export default WithdrawalModal