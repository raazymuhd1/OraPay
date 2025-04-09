import { useRef, useState, useEffect } from 'react'
import { CustomButton } from "@/components"
import { CreditCard, X } from 'lucide-react'
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
        // const [hasDeposited, setHasDeposited] = useState(false)
        const { address: userAddr } = useAccount()
        const { mockUsdc, fundsVault } = allContracts;
        const chainId = useChainId()
        const userBalance = useBalance({ chainId, address: userAddr, token: mockUsdc.address as `0x${string}` })
        const { handleAssetsDeposit, writeDeposit, depositStatus, depoData,
        handleTokenApproval, approvalStatus, approveData, resetApproval, resetDeposit, hasDeposited, setHasDeposited, setIsApproved, approvalError, depositError } = useContractHooks()


        useEffect(() => {
           const depositProcess = async() => {

               try {
                 // the second way to handle 2 transactions at once 
                 const approvalReceipt = await waitForTransactionReceipt(wagmiConfig, {
                   hash: approveData as `0x${string}`,
                   confirmations: 2
                 })
                 console.log("approve data", approveData)
                 const shouldApprove = approvalStatus == "success";

                 if (shouldApprove) {
                      writeDeposit({
                        abi: fundsVault.abi,
                        address: fundsVault.address as `0x${string}`,
                        functionName: "deposit",
                        args: [depositAmount ? ethers.parseUnits(depositAmount, 6) : 0, lockPeriod],
                        // gas: BigInt("3000000")
                      });
                      resetApproval();
                      setHasDeposited(true)

                      console.log("approval tx receipt", approvalReceipt?.transactionHash)
                      
                    }
                    
                    const shouldDeposit = depositStatus === "success" || depoData;
                    
                    if (shouldDeposit) {
                      toast.success("token has been deposited", {
                        position: "top-right"
                      });
                      resetDeposit()
                      setIsApproved(false);
                      setDepositAmount("")
                      updateLockPeriod("")
                      setHasDeposited(false)
          
                      setTimeout(() => {
                        setDepositModal(false);
                      }, 4000);
                    } else if(depositStatus == "error") {
                        // console.error(depositError);
                        console.log(depositError)
                        toast.error("depositing failed", {
                          position: "top-right"
                        })
                    }
       
                
               } catch (error) {
                  console.log(error)
               }

           }
          
          depositProcess()

          return () => {
            // Only reset if needed, or move reset into a cancel handler
          };
      }, [approveData, approvalStatus]);


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
            <div className="flex w-full flex-col gap-[25px]">
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
                 <CustomButton
                    onClick={() => handleAssetsDeposit(depositAmount, 0)}
                    disabled={depositAmount.length <= 0 || Number(depositAmount) == 0 || depositStatus == "pending" ? true : false}
                    style={`bg-gradient`}
                          >
                    <CreditCard className="" />
                     { approvalStatus == "pending" ? "approving..." : depositStatus == "pending" ? "Depositing..." : "Deposit Now" }
                </CustomButton>    
            
        </div>


    </div>
  )
}

export default DepositModal