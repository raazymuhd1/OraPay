import React from 'react'
import { steps } from '@/constants'
import { CustomButton } from "@/components"
import { CircleHelp } from 'lucide-react'

const Steps = () => {
  return (
    <aside className="w-[80%] h-[300px] mx-auto rounded-[10px] p-[30px] border-[1px] border-[#7f7f80] bg-brown">
      {/* top content */}
        <div className="w-full flex items-center justify-between">
            <aside>
              <h3 className="font-bold text-[1.5vmax]"> Welcome to NoPeyPey </h3>
              <p className="text-[#7f7f80]"> The Buy Now, Pay Never protocol </p>
            </aside>

            <h4 className="flex items-center gap-[10px] bg-[rgba(9,9,11,255)] p-[6px] rounded-[10px] hover:bg-[rgba(29,220,255,255)]   transition-[background] duration-500 cursor-pointer"> <CircleHelp className="w-[18px]" /> How it works </h4>
        </div>

        {/* cards */}
        <aside className="w-full flex items-center justify-center gap-[20px] mt-[10px]">
            { steps.map(step => (
               <div 
                  key={step.id}
                  className="flex flex-col gap-[10px] w-[400px] py-[25px] px-[15px] border-[1px] border-[#7f7f80] rounded-[15px]">
                <h3 className="text-[1.3vmax] font-bold"> Step {step.id}: {step.title} </h3>
                <p className="text-[#7f7f80] font-medium text-[.9vmax] whitespace-nowrap"> { step.desc } </p>  
                  <CustomButton
                        onClick={() => {}}
                        disabled={false}
                        style={`${step.id == 1 ? "bg-gradient" : "bg-[#272729)]"}`}
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