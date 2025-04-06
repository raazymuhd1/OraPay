import { useRef, useState, useEffect } from 'react'
import { CustomButton } from "@/components"
import { CreditCard, X } from 'lucide-react'
import { usePeyPeyContext } from "../PeyPeyContext"
import { useWriteContract, useAccount, useBalance, useChainId } from 'wagmi'
import toast from "react-hot-toast"
import {Toaster} from "react-hot-toast"
import { allContracts } from '@/constants'
import { useContractHooks } from '@/utils/hooks'
import { CustomConnectButton } from '@/components'

const DepositModal = () => {
        const { setDepositModal, openDepositModal} = usePeyPeyContext()
        const [isApproved, setIsApproved] = useState(false)
        const inputRef = useRef<HTMLInputElement>(null)
        const [depositAmount, setDepositAmount] = useState<string>("")
        const { address: userAddr } = useAccount()
        const { mockUsdc } = allContracts;
        const chainId = useChainId()
        const userBalance = useBalance({ chainId, address: userAddr, token: mockUsdc.address as `0x${string}` })
        const { handleAssetsDeposit, depositStatus, depoData,
        handleTokenApproval, approvalStatus, approveData, resetApproval } = useContractHooks()

      console.log(approvalStatus)

        useEffect(() => {
           const handlingTxState = () => {

              if(approveData) {
                  console.log(approveData)
                    toast.success("assets has been approved", {
                        position: "top-right"
                    })
                  setIsApproved(true)
                } 
                
              if(depoData && depositStatus == "success") {
                  toast.success("assets has been deposited", {
                        position: "top-right"
                  })
                  console.log(depoData)
                  resetApproval()
                  setIsApproved(false)

                  setTimeout(() => {
                    setDepositModal(false)
                  }, 4000)
               }

           }

           handlingTxState()
        }, [approveData, depoData, approvalStatus])


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

  return (
      <div 
      className={`transition-all duration-500 ${!openDepositModal ? "hidden h-0 w-0" : "h-screen fixed left-0 flex top-0 w-full"} `}>

        <Toaster />
       <div 
          onClick={() => setDepositModal(false)}
          className="absolute top-0 w-full h-full glass-modal" />
       
       {/* payment card */}
        <div className="flex h-[60%] lg:w-[30%] w-[80%] mx-auto translate-y-[150px] flex-col glass-card border-[1px] border-[#202021] rounded-[15px] gap-[25px] p-[20px]">

            {/* top card */}
            <div className="w-full flex justify-between">
                <div className="flex flex-col gap-[10px]">
                    <h2 className="font-bold responsive-headerTabs "> Deposit USDC </h2>
                    <p className="font-normal text-(--paraph-color) responsive-paraph"> Deposit USDC to receive Principal Tokens (PT) and start earning yield </p>
                </div>

                <X className="w-[20px] cursor-pointer" onClick={() => setDepositModal(false)} />
            </div>

           
              {/* deposit details */}
            <div className='w-full flex flex-col gap-[10px]'>
                <h2 className="font-bold resp-headerCard"> Amount {`(USDC)`} </h2>
                <input 
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    ref={inputRef} type="text" placeholder='0.00' className="w-full glass-card p-[10px] outline-none" />
            </div>
            <div className="flex items-start justify-between w-full p-[10px] glass-card">
              <p className="resp-paraphCard"> Available balance: </p>
              <aside>
                  <h4 className="resp-paraphCard font-bold"> { userBalance.data?.formatted } USDC </h4>
                  <p className="text-[#11afb8] resp-paraphCard underline flex items-center gap-[3px] "> 
                    <span onClick={() => handleBalanceSelection(50)} className="cursor-pointer"> 50% </span> 
                    | 
                    <span onClick={() => handleBalanceSelection(100)} className="cursor-pointer"> 100% </span> </p>
              </aside>
            </div>

            {/* action buttons */}
            { !isApproved ?  <CustomButton
                    onClick={() => handleTokenApproval(Number(depositAmount))}
                    disabled={depositAmount.length <= 0 || Number(depositAmount) == 0 || approvalStatus == "pending" ? true : false}
                    style={`bg-gradient`}
                          >
                    <CreditCard className="" />
                     { approvalStatus == "pending" ? "Approving..." : "Approve" }
                </CustomButton>  
               :
                 <CustomButton
                    onClick={() => handleAssetsDeposit(Number(depositAmount))}
                    disabled={depositAmount.length <= 0 || Number(depositAmount) == 0 || depositStatus == "pending" ? true : false}
                    style={`bg-gradient`}
                          >
                    <CreditCard className="" />
                     { depositStatus == "pending" ? "Depositing..." : "Deposit Now" }
                </CustomButton>    
            }
        </div>


    </div>
  )
}

export default DepositModal