import React from 'react'
import { quickActionBtns } from '@/constants'
import { CustomButton } from "@/components"

const QuickActions = () => {
  return (
    <aside className="w-[30%] h-[300px] rounded-[15px] border-[1px] border-[#202021] p-[20px] flex flex-col gap-[30px] bg-brown">
        <div>
            <h3 className="font-bold text-[1.5vmax]"> Quick Actions </h3>
            <p className="text-[#7f7f80]"> Common operations you can perform </p>
        </div>

        {/* action buttons */}
        <div className="w-full flex flex-col gap-[15px]">
          { quickActionBtns.map(action => (
             <CustomButton
                  key={action.id} 
                  onClick={() => {}}
                  disabled={false}
                  style={` ${action.id == 1 ? "bg-gradient " : action.id == 2 ? "glass-card" : "bg-[rgba(9,9,11,255)]"} justify-start border-[1px] border-[#7f7f80]`}
                    >
                    <action.btnLogo className="" />
                    { action.title }
            </CustomButton>
          )) }
        </div>
    </aside>
  )
}

export default QuickActions