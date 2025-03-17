import { useState } from 'react'
import { steps } from '@/constants'
import { CustomButton } from "@/components"
import { CircleHelp } from 'lucide-react'
import { usePeyPeyContext } from "../PeyPeyContext"

const Steps = () => {
    const {setDepositModal, setCalculatorModal} = usePeyPeyContext()

    const buttonClickHandler = (stepId: number) => {
       stepId == 1 ? setDepositModal(true) : stepId == 2 ? setCalculatorModal(true) : null;

       console.log(stepId)
    }

  return (
      <aside className="w-[70%] min-h-[300px] mx-auto rounded-[10px] p-[30px] border-[1px] border-[#202021] bg-brown">
        {/* card header */}
          <div className="w-full flex items-center justify-between">
              <aside>
                <h3 className="font-bold text-[1.5vmax]"> Welcome to NoPeyPey </h3>
                <p className="text-[#7f7f80]"> The Buy Now, Pay Never protocol </p>
              </aside>

              <h4 className="flex items-center gap-[10px] bg-[rgba(9,9,11,255)] p-[6px] rounded-[10px] hover:bg-[rgba(29,220,255,255)] transition-[background] duration-500 cursor-pointer"> <CircleHelp className="w-[18px]" /> How it works </h4>
          </div>

          {/* card items */}
          <aside className="w-full flex items-center justify-center gap-[20px] mt-[10px]">
              { steps.map(step => (
                <div 
                    key={step.id}
                    className="flex flex-col gap-[10px] w-[400px] py-[25px] px-[15px] rounded-[15px] glass-card">
                  <h3 className="text-[1.3vmax] font-bold"> Step {step.id}: {step.title} </h3>
                  <p className="text-[#7f7f80] font-medium text-[.9vmax]"> { step.desc } </p>  
                    <CustomButton
                          onClick={() => buttonClickHandler(step.id)}
                          disabled={false}
                          style={`${step.id == 1 ? "bg-gradient" : "glass-card"}`}
                                >
                          <step.BtnLogo className="" />
                          { step.btnText }
                    </CustomButton>
                </div>
              )) }
          </aside>
      </aside>
  )
}

export default Steps