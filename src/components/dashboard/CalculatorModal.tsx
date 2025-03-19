import React from 'react'
import { CustomButton } from "@/components"
import { CreditCard, X } from 'lucide-react'
import { usePeyPeyContext } from "../PeyPeyContext"

const DepositModal = () => {
        const { setCalculatorModal, openCalculatorModal, setDepositModal} = usePeyPeyContext()

     const handleItemDetails = (title: string, value: string) => {
       return (
         <div className="w-full flex items-center justify-between">
            <h3 className="text-(--paraph-color) font-bold text-[1.7vmax] md:text-[1.5vmax] lg:text-[.9vmax]"> {title}: </h3>
            <h4 className={`font-bold text-[1.7vmax] md:text-[1.5vmax] lg:text-[.9vmax] ${title == "Approximate USD value" && "text-[#11afb8]"}`}> {title == "price" && "$"}{value} </h4>
         </div>
       )
   }

  return (
      <div 
      className={`transition-all duration-500 ${!openCalculatorModal ? "hidden h-0 w-0" : "h-screen fixed left-0 flex top-0 w-full"} `}>

       <div 
          onClick={() => setCalculatorModal(false)}
          className="absolute top-0 w-full h-full glass-modal" />
       
       {/* payment card */}
        <div className="flex h-[60%] lg:w-[30%] w-[80%] mx-auto translate-y-[150px] flex-col gap-[15px] glass-card border-[1px] border-[#202021] rounded-[15px] p-[20px] overflow-y-scroll">

            {/* top card */}
            <div className="w-full flex justify-between">
                <div className="flex flex-col gap-[10px]">
                    <h2 className="font-bold responsive-headerText"> YT Yield Calculator </h2>
                    <p className="font-normal text-(--paraph-color) responsive-paraph"> Calculate how much YT you can earn based on your deposit </p>
                </div>

                <X className="w-[20px] cursor-pointer" onClick={() => setCalculatorModal(false)} />
            </div>

            <div className="w-full flex flex-col gap-[10px]">
                {/* card details */}
                <div className="w-full">
                    <h3 className="font-bold resp-headerCard"> Deposit Amount {`(USDC)`} </h3>
                    <input type="text" placeholder='0.00' className="w-full glass-card p-[10px] outline-none mt-[10px]" />
                </div>
                <div className="flex items-start justify-between w-full">
                  <h3 className='resp-headerCard font-bold'> Time Period {"(Days)"} </h3>
                  {/* select option */}
                </div>

                <div className="w-full rounded-[15px] glass-card p-[10px] flex flex-col gap-[10px]">
                  <h3 className='resp-headerCard'> Estimated Yield </h3>
                  { handleItemDetails("Daily Yield", "0 YT") }
                  { handleItemDetails("Total Yield (30 days)", "0 YT") }
                  { handleItemDetails("Approximate USD value", "$0") }
                  <div className="w-full h-[1px] bg-[#7f7f80]" />
                  <div>
                      <h4 className="font-semibold resp-headerCard"> What you can do with this yield: </h4>
                      <p className="font-medium resp-paraphCard text-(--paraph-color)"> Increase your deposit amountor time period to see what you can buy </p>
                  </div>
                </div>
            </div>

            <div className="w-full flex items-center justify-end gap-[15px]">
                {/* action buttons*/}
                <CustomButton
                  onClick={() => setCalculatorModal(false)}
                  disabled={false}
                  style={`bg-[rgba(9,9,11,255)] responsive-btnText`}
                        >
                  <X className="w-[15px]" />
                   Close
              </CustomButton>
                <CustomButton

                  onClick={() => {
                      setCalculatorModal(false)
                      setDepositModal(true)
                  }}
                  disabled={false}
                  style={`bg-gradient responsive-btnText`}
                        >
                  <CreditCard className="w-[15px]" />
                    Deposit Now
              </CustomButton>

            </div>
        </div>


    </div>
  )
}

export default DepositModal