import { useRef, useState } from 'react'
import { CustomButton } from "@/components"
import { CreditCard, X } from 'lucide-react'
import { usePeyPeyContext } from "../PeyPeyContext"
import { useWriteContract, useReadContract, useAccount, useBalance } from 'wagmi'
import toast from "react-hot-toast"
import CustomWalletConnect from '../header/CustomWalletConnect'
import { erc20Abi } from 'viem'

const DepositModal = () => {
        const { setDepositModal, openDepositModal} = usePeyPeyContext()
        const inputRef = useRef<HTMLInputElement>(null)
        const [depositAmount, setDepositAmount] = useState<string>("")
        const { address: userAddr } = useAccount()
        const userBalance = useBalance({ chainId: 1, address: userAddr, token: "0x" })
        const result = useReadContract({
           abi: erc20Abi,
           address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
           functionName: "name"
        })

          console.log(userBalance.data)
          console.log("token name", result.data)

        /**
         * @dev depositing an underlying assets into a platform
         */
        const handleAssetsDeposit = () => {
            if(typeof userAddr == "undefined" || userAddr.length == 0) {
                toast.error("please kindly connect your wallet before proceeding..", {
                   position: "top-right"
                })
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
                    onClick={() => handleAssetsDeposit}
                    disabled={depositAmount.length <= 0 ? true : false}
                    style={`bg-gradient`}
                          >
                    <CreditCard className="" />
                      Deposit Now
                </CustomButton> 
                  :   
                <CustomWalletConnect />
            }
        </div>


    </div>
  )
}

export default DepositModal