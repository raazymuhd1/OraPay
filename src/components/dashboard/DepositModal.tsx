"use client"
import { useRef, useState, useEffect } from 'react'
import { CustomButton } from "@/components"
import { CreditCard, X, History } from 'lucide-react'
import { usePeyPeyContext } from "../PeyPeyContext"
import { useWaitForTransactionReceipt, useBalance } from 'wagmi'
import toast, {Toaster} from "react-hot-toast"
import { allContracts } from '@/constants'
import { useContractHooks } from '@/utils/hooks'
import { ITxsRecord } from "@/types"
import { ethers } from 'ethers'
// components
import LoadingState from '../loadings/LoadingState'
import TransactionsRecord from '../records/TransactionsRecord'
import TxResult from '../transactions-result/TxResult'

const DepositModal = () => {
        const { setDepositModal, openDepositModal, showTxResult, setShowTxResult, showLoadingState, showTxsRecord, network, setShowTxsRecord, setShowLoadingState} = usePeyPeyContext()
        const inputRef = useRef<HTMLInputElement>(null)
        const [depositAmount, setDepositAmount] = useState<string>("")
        const [lockPeriod, updateLockPeriod] = useState<string>("")
        const { mockUsdc, fundsVault } = allContracts;
        const userBalance = useBalance({ chainId: network.chainId, address: network.userAddr, token: mockUsdc.address as `0x${string}` })
        const { handleAssetsDeposit, writeDeposit, depositStatus, depoData,
        approvalStatus, approveData, resetApproval, resetDeposit, hasDeposited, setHasDeposited, depositError } = useContractHooks()
         const { data: approvalReceipt } = useWaitForTransactionReceipt({
                   hash: approveData as `0x${string}`,
                   confirmations: 1
          })

        const [txsRecord, setTxsRecord] = useState<ITxsRecord<string>[]>([
                  {
                      id: 0,
                      action: "payment",
                      date: new Date(),
                      value: depositAmount
                  },
                  {
                      id: 1,
                      action: "payment",
                      date: new Date(),
                      value: depositAmount
                  }
              ])

        
       const postTxRecord = async() => {
            const data = { action: "deposit", date: new Date(), value: depositAmount };
            const res = await fetch("http://localhost:3000/api/tx-records", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                  "Content-Type": "application/json"
                }
            })
            const resData = await res?.json()

            console.log(`response, ${resData}`);
       }


        useEffect(() => {
               try {
                 const shouldApprove = approvalReceipt?.transactionHash;
                 console.log("approval tx receipt", approvalReceipt?.transactionHash)

                 if (shouldApprove) {
                      writeDeposit({
                        abi: fundsVault.abi,
                        address: fundsVault.address as `0x${string}`,
                        functionName: "deposit",
                        args: [depositAmount ? ethers.parseUnits(depositAmount, 6) : 0, lockPeriod],
                      });
                      setHasDeposited(true)

                      console.log("approval tx receipt", approvalReceipt?.transactionHash)
                      console.log("deposit is executed")
                      
                  }
                
               } catch (error) {
                  console.log(error)
               }

      }, [approvalReceipt]);


      useEffect(() => {
          const shouldDeposit = depositStatus === "success" || depoData;
          if (shouldDeposit) {
              toast.success("token has been deposited", {
                position: "top-right"
              });
              
              resetDeposit()
              // setIsApproved(false);
              setDepositAmount("")
              updateLockPeriod("")
              resetApproval();

              setTimeout(() => {
                setDepositModal(false);
                setHasDeposited(false)
                setShowLoadingState(false)
              }, 2000);
            } else if(depositStatus == "error" || approvalStatus == "error") {
              console.log(depositError)
              toast.error("depositing failed", {
                position: "top-right"
              })
              setShowLoadingState(false)
              setDepositModal(false);
          }
      }, [depoData, depositStatus, approvalStatus])


        const handleBalanceSelection = (value: number) => {
            // (userBalance / value) * 100;
            const bal = userBalance.data;
            inputRef.current?.focus();
            let dividedAmount;

            if(value == 50) {
                dividedAmount = bal?.formatted && (Number(bal?.formatted) * 50) / 100;
                setDepositAmount(String(dividedAmount))
              } else if(value == 100) {
                 dividedAmount = bal?.formatted && (Number(bal?.formatted) / 100) * 100;
                setDepositAmount(bal?.formatted as string)
              }
        }

        const depositDetails = (title: string, value: string) => {
          return (
            <div className="w-full flex items-center justify-between">
                <h3 className="text-[#7f7f80] resp-paraphCard"> {title}: </h3>
                <h4 className={`font-bold responsive-paraph ${title.toLowerCase() == "initial yt allocation" && "text-[#2caec5]"}`}> {value} </h4>
            </div>
          )
        }


  return (
      <div 
      className={`transition-all duration-500 ${!openDepositModal ? "hidden h-0 w-0" : "h-full fixed left-0 flex top-0 w-full"} `}>

      <Toaster />
       <div 
          onClick={() => {
            setShowLoadingState(false)
            if(depositStatus != "pending") setDepositModal(false)}
          } 
          className="absolute top-0 w-full h-full glass-modal" />
       
       {/* deposit card */}
        <div className={`flex h-[75%] lg:w-[40%] xl:w-[30%] w-[80%] mx-auto translate-y-[120px] flex-col glass-card border-[1px] border-[#202021] relative rounded-[15px] gap-[15px] p-[20px] ${!showLoadingState || !showTxResult || !showTxsRecord ? "overflow-y-scroll" : "overflow-y-hidden"}`}>

            {/* top card */}
            <div className="w-full flex justify-between">
                <div className="flex flex-col gap-[10px]">
                    <h2 className="font-bold responsive-headerTabs "> Deposit USDC </h2>
                    <p className="font-semibold text-(--paraph-color) responsive-paraph"> Deposit USDC to receive Principal Tokens (PT) and start earning yield </p>
                </div>

                <History className="w-[25px] cursor-pointer" onClick={() => setShowTxsRecord(true)} />
            </div>

           
              {/* deposit details */}
            <div className="flex w-full flex-col gap-[15px]">
                <div className='w-full flex flex-col gap-[10px]'>
                    <h2 className="font-bold resp-headerCard"> Amount {`(USDC)`} </h2>
                    <input 
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        ref={inputRef} type="text" placeholder='0.00' className="w-full glass-card p-[10px] outline-none" />
                </div>
                <div className='w-full flex flex-col gap-[10px]'>
                    <h2 className="font-bold resp-headerCard"> Lock Period {`(Days)`} </h2>
                    <input 
                        value={lockPeriod}
                        onChange={(e) => updateLockPeriod(e.target.value)}
                        ref={inputRef} type="text" placeholder='0.00' className="w-full glass-card p-[10px] outline-none" />
                </div>
            </div>

            {/* available balance */}
            <div className="flex items-start justify-between w-full p-[10px] glass-card">
              <p className="resp-paraphCard"> Available balance: </p>
              <aside>
                  <h4 className="resp-paraphCard font-bold"> { userBalance.data?.formatted || "0" } USDC </h4>
                  <p className="text-[#11afb8] resp-paraphCard underline flex items-center gap-[3px] "> 
                    <span onClick={() => handleBalanceSelection(50)} className="cursor-pointer"> 50% </span> 
                    | 
                    <span onClick={() => handleBalanceSelection(100)} className="cursor-pointer"> 100% </span> </p>
              </aside>
            </div>

            <p className='text-(--paraph-color) responsive-paraph'> You will receive PT token representing your deposit, which will generate YT over time. </p>

            <div className="flex flex-col w-full p-[10px] glass-card">
                { depositDetails("You will receive", `${depositAmount || 0}PT`) }
                { depositDetails("Initial YT allocation", `${(Number(depositAmount) * 10) / 100 || 0}YT`) }
                { depositDetails("Expiry Date", `${new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString()}`) }
            </div>

            <div className="flex w-full flex-col gap-[10px]">
              <CustomButton
                  onClick={async() => {
                    handleAssetsDeposit(depositAmount, 0)
                    // await postTxRecord()
                  }}
                  disabled={depositAmount.length <= 0 || Number(depositAmount) == 0 || approvalStatus == "pending" || depositStatus == "pending" ? true : false}
                  style={`bg-gradient`}
                    >
                  <CreditCard className="" />
                  { approvalStatus == "pending" ? "approving..." : approvalStatus == "success" || depositStatus == "pending" ? "Depositing..." : "Deposit Now" }
              </CustomButton>    
              <CustomButton
                  onClick={() => setDepositModal(false)}
                  disabled={approvalStatus == "pending" || depositStatus == "pending" ? true : false}
                  style={`bg-[rgba(9,9,11,255)]`}
                        >
                  <X className="" />
                    Cancel
              </CustomButton>    
            </div>
            
        
                 {/* tx result modal */}
            <TxResult { ...{ title: "Deposit Successfull", msg: "Deposit went successfully", showTxResult, setShowTxResult: setDepositModal, closeTxResult: setShowTxResult } } />

            {/* txs record */}
            <TransactionsRecord transactions={txsRecord} />
            {/* loading state */}
            <LoadingState />
        </div>


    </div>
  )
}

export default DepositModal
