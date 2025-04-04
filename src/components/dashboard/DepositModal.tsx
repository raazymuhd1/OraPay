import { useRef, useState } from 'react'
import { CustomButton } from "@/components"
import { CreditCard, X } from 'lucide-react'
import { usePeyPeyContext } from "../PeyPeyContext"
import { useWriteContract, useReadContract, useAccount, useBalance } from 'wagmi'
import toast from "react-hot-toast"
import { erc20Abi } from 'viem'
import { allContracts } from '@/constants'
import { CustomConnectButton } from '@/components'

const DepositModal = () => {
        const { setDepositModal, openDepositModal} = usePeyPeyContext()
        const [isApproved, setIsApproved] = useState(false)
        const inputRef = useRef<HTMLInputElement>(null)
        const [depositAmount, setDepositAmount] = useState<string>("")
        const { address: userAddr } = useAccount()
        const { writeContract } = useWriteContract();
        const { fundsVault, mockUsdc } = allContracts;
        const userBalance = useBalance({ chainId: 11155111, address: userAddr, token: mockUsdc.address as `0x${string}` })
       

        /**
         * @dev depositing an underlying assets into a platform
         */
        const handleAssetsDeposit = () => {
            if(typeof userAddr == "undefined" || userAddr.length == 0) {
                toast.error("please kindly connect your wallet before proceeding..", {
                   position: "top-right"
                })
            }

            try {
              const lockPeriod = 10 * 86400; // 10 days
              const args = [Number(depositAmount) * 10**6, lockPeriod]

               const res = writeContract({
                  abi: fundsVault.abi,
                  address: fundsVault.address as `0x${string}`,
                  functionName: "deposit",
                  args,
                  gas: BigInt("3000000")
              })

              if(res?.data) {
                  console.log(res?.data)
                  setDepositModal(false)
              }

            } catch(err) {
                console.log(err)
            }

        }

        const handleTokenApproval = (): void => {
             const result =  writeContract({
                abi: mockUsdc.abi,
                address: mockUsdc.address as `0x${string}`,
                functionName: "approve",
                args: [fundsVault.address, Number(depositAmount) * 10**6],
            })

            if(result?.data! != "undefined") {
               console.log(result?.data)
                setIsApproved(true)
             }
        }

        const handleBalanceSelection = (value: number) => {
            // (userBalance / value) * 100;
            inputRef.current?.focus();
            let dividedAmount;

            if(value == 50) {
                dividedAmount = userBalance?.data && (Number(userBalance?.data?.value) / 50) * 100;
                setDepositAmount("5")
              } else if(value == 100) {
                dividedAmount = userBalance?.data && (Number(userBalance?.data?.value) / 100) * 100;
                setDepositAmount(String(dividedAmount))
              }
        }

  return (
      <div 
      className={`transition-all duration-500 ${!openDepositModal ? "hidden h-0 w-0" : "h-screen fixed left-0 flex top-0 w-full"} `}>

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
                    ref={inputRef} type="text" placeholder='0.00' className="w-full glass-card p-[10px] outline-noe" />
            </div>
            <div className="flex items-start justify-between w-full p-[10px] glass-card">
              <p className="resp-paraphCard"> Available balance: </p>
              <aside>
                  <h4 className="resp-paraphCard font-bold"> 10,000 USDC </h4>
                  <p className="text-[#11afb8] resp-paraphCard underline flex items-center gap-[3px] "> 
                    <span onClick={() => handleBalanceSelection(50)} className="cursor-pointer"> 50% </span> 
                    | 
                    <span onClick={() => handleBalanceSelection(100)} className="cursor-pointer"> 100% </span> </p>
              </aside>
            </div>

            {/* action buttons */}
            {  userAddr ?  
                <CustomButton
                    onClick={isApproved ? handleAssetsDeposit : handleTokenApproval}
                    disabled={depositAmount.length <= 0 ? true : false}
                    style={`bg-gradient`}
                          >
                    <CreditCard className="" />
                     { !isApproved ? "Approve" : "Deposit Now" }
                </CustomButton> 
                  :   
                <CustomConnectButton />
            }
        </div>


    </div>
  )
}

export default DepositModal