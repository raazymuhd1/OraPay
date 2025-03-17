import React from 'react'
import { CustomButton } from "@/components"
import { CreditCard, X } from 'lucide-react'

interface IProps {
  openDepositModal: boolean,
  setDepositModal: React.Dispatch<React.SetStateAction<boolean>>
}

const DepositModal = ({ openDepositModal, setDepositModal }: IProps) => {
  return (
      <div 
      className={`transition-all duration-500 ${!openDepositModal ? "hidden h-0 w-0" : "h-screen fixed left-0 flex top-0 w-full"} `}>

       <div 
          onClick={() => setDepositModal(false)}
          className="absolute top-0 w-full h-full glass-modal" />
       
       {/* payment card */}
        <div className="flex h-[70%] w-[30%] mx-auto translate-y-[100px] flex-col glass-card border-[1px] border-[#202021] rounded-[15px] gap-[25px] p-[20px] overflow-y-scroll">

            {/* top card */}
            <div className="w-full flex justify-between">
                <div className="flex flex-col gap-[10px]">
                    <h2 className="font-bold text-[1.2vmax]"> Deposit USDC </h2>
                    <p className="font-normal text-[.9vmax]"> Deposit USDC to receive Principal Tokens (PT) and start earning yield </p>
                </div>

                <X className="w-[20px] cursor-pointer" onClick={() => setDepositModal(false)} />
            </div>

           

            <h2 className="font-bold text-[1.2vmax]"> Amount {`(USDC)`} </h2>
            <input type="text" placeholder='0.00' />
            <div>
              <p> Available balance: </p>
              <aside>
                  <h4> 10,000 USDC </h4>
                  <p> <span className="underline"> 50% </span> | <span className="underline"> 100% </span> </p>
              </aside>
            </div>

            <CustomButton
              onClick={() => {}}
              disabled={false}
              style={`bg-gradient`}
                    >
              <CreditCard className="" />
                Pay Now
          </CustomButton>
        </div>


    </div>
  )
}

export default DepositModal