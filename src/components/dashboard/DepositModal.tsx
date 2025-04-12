import { useRef, useState, useEffect } from 'react'
import { CustomButton } from "@/components"
import { CreditCard, X, History } from 'lucide-react'
import { usePeyPeyContext } from "../PeyPeyContext"
import { useWaitForTransactionReceipt, useAccount, useBalance, useChainId } from 'wagmi'
import { waitForTransactionReceipt } from '@wagmi/core'
import toast, {Toaster} from "react-hot-toast"
import { allContracts } from '@/constants'
import { useContractHooks } from '@/utils/hooks'
import { wagmiConfig } from '../Web3Provider'
import { CustomConnectButton } from '@/components'
import { ethers } from 'ethers'

const DepositModal = () => {
        const { setDepositModal, openDepositModal} = usePeyPeyContext()
        const inputRef = useRef<HTMLInputElement>(null)
        const [depositAmount, setDepositAmount] = useState<string>("")
        const [lockPeriod, updateLockPeriod] = useState<string>("")
        const { address: userAddr } = useAccount()
        const { mockUsdc, fundsVault } = allContracts;
        const chainId = useChainId()
        const userBalance = useBalance({ chainId, address: userAddr, token: mockUsdc.address as `0x${string}` })
        const { handleAssetsDeposit, writeDeposit, depositStatus, depoData,
        handleTokenApproval, approvalStatus, approveData, resetApproval, resetDeposit, hasDeposited, setHasDeposited, depositError } = useContractHooks()
         const { data: approvalReceipt } = useWaitForTransactionReceipt({
                   hash: approveData as `0x${string}`,
                   confirmations: 1
          })


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
                      console.log("executed")
                      
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
              }, 2000);
          } else if(depositStatus == "error") {
              console.log(depositError)
              toast.error("depositing failed", {
                position: "top-right"
              })
              setDepositModal(false);
          }
      }, [depoData, depositStatus])


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
                <h3 className="text-[#7f7f80] font-bold"> {title}: </h3>
                <h4 className={`font-bold ${title.toLowerCase() == "initial yt allocation" && "text-[#2caec5]"}`}> {value} </h4>
            </div>
          )
        }


  return (
      <div 
      className={`transition-all duration-500 ${!openDepositModal ? "hidden h-0 w-0" : "h-screen fixed left-0 flex top-0 w-full"} `}>

      <Toaster />
       <div 
          onClick={() => setDepositModal(false)}
          className="absolute top-0 w-full h-full glass-modal" />
       
       {/* payment card */}
        <div className="flex h-[75%] lg:w-[30%] w-[80%] mx-auto translate-y-[120px] flex-col glass-card border-[1px] border-[#202021] rounded-[15px] gap-[15px] p-[20px]">

            {/* top card */}
            <div className="w-full flex justify-between">
                <div className="flex flex-col gap-[10px]">
                    <h2 className="font-bold responsive-headerTabs "> Deposit USDC </h2>
                    <p className="font-normal text-(--paraph-color) responsive-paraph"> Deposit USDC to receive Principal Tokens (PT) and start earning yield </p>
                </div>

                <History className="w-[25px] cursor-pointer" onClick={() => {}} />
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
                { depositDetails("You will receive", `500PT`) }
                { depositDetails("Initial YT allocation", `50YT`) }
                { depositDetails("Expiry Date", `10 May 2025`) }
            </div>

            {/* action buttons */}
            {/* { !isApproved ?  <CustomButton
                    onClick={() => handleTokenApproval(Number(depositAmount))}
                    disabled={depositAmount.length <= 0 || Number(depositAmount) == 0 || approvalStatus == "pending" ? true : false}
                    style={`bg-gradient`}
                          >
                    <CreditCard className="" />
                     { approvalStatus == "pending" ? "Approving..." : "Approve" }
                </CustomButton>  
               :
                 <CustomButton
                    onClick={() => handleAssetsDeposit(Number(depositAmount), 0)}
                    disabled={depositAmount.length <= 0 || Number(depositAmount) == 0 || depositStatus == "pending" ? true : false}
                    style={`bg-gradient`}
                          >
                    <CreditCard className="" />
                     { depositStatus == "pending" ? "Depositing..." : "Deposit Now" }
                </CustomButton>    
            } */}
                <div className="flex w-full flex-col gap-[10px]">
                  <CustomButton
                      onClick={() => handleAssetsDeposit(depositAmount, 0)}
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
            
        </div>


    </div>
  )
}

export default DepositModal