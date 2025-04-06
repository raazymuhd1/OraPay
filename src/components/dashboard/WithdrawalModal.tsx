import {useRef, useState} from 'react'
import {Toaster} from "react-hot-toast"
import { usePeyPeyContext } from "../PeyPeyContext"
import { CircleDollarSign, X } from "lucide-react"
import { CustomButton } from "@/components"
import { allContracts } from '@/constants'
import { useWriteContract, useAccount, useBalance, useChainId } from 'wagmi'

const WithdrawalModal = () => {
     const { fundsVault, principalToken } = allContracts;
     const [withdrawalAmount, setWithdrawalAmount] = useState("0")
     const { openWithdrawModal, setOpenWithdrawModal } = usePeyPeyContext()
     const inputRef = useRef<HTMLInputElement>(null)
     const chainId = useChainId()
     const { address: userAddr } = useAccount()
     const userBalance = useBalance({ chainId, address: userAddr, token: principalToken.address as `0x${string}` })
     const { writeContract: writeWD, data: wdData, status: wdStatus } = useWriteContract()

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


      const handleAssetsWithdrawal = () => {

      }


  return (
    <div
     className={`transition-all duration-500 ${!openWithdrawModal ? "hidden h-0 w-0" : "h-screen fixed left-0 flex top-0 w-full"} `}    
    >   
        <Toaster />
        <div 
          onClick={() => setOpenWithdrawModal(false)}
          className="absolute top-0 w-full h-full glass-modal" />

        <div className="w-[40%] mx-auto h-[50%] glass-card flex flex-col gap-[20px] rounded-[10px] translate-y-[150px] p-[15px]">
            <aside className="flex items-center w-full justify-between">
                <div>
                    <h2 className="font-bold responsive-headerTabs"> Funds Withdrawal </h2>
                    <p className='font-normal text-(--paraph-color) responsive-paraph'> You can only make a withdrawal when the lockup period has passed </p>
                </div>
                <X className="w-[20px] h-[20px]" />
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
                  <h4 className="resp-paraphCard font-bold"> { userBalance.data?.formatted } PT </h4>
                  <p className="text-[#11afb8] resp-paraphCard underline flex items-center gap-[3px] "> 
                    <span onClick={() => handleBalanceSelection(50)} className="cursor-pointer"> 50% </span> 
                    | 
                    <span onClick={() => handleBalanceSelection(100)} className="cursor-pointer"> 100% </span> </p>
              </aside>
            </div>

             <CustomButton
                onClick={handleAssetsWithdrawal}
                disabled={withdrawalAmount.length <= 0 || wdStatus == "pending" ? true : false}
                style={`bg-gradient`}
                      >
                <CircleDollarSign className="" />
                  { wdStatus == "pending" ? "Processin..." : "Withdraw" }
            </CustomButton>    
        </div>
    </div>
  )
}

export default WithdrawalModal