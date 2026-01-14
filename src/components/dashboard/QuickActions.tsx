import React from 'react'
import { quickActionBtns } from '@/constants'
import { LuChartNoAxesColumn  } from "react-icons/lu"
import { CustomButton } from "@/components"
import { usePeyPeyContext } from "../PeyPeyContext"
import Link from "next/link"

const QuickActions = () => {
    const { setDepositModal, setCalculatorModal, setOpenWithdrawModal} = usePeyPeyContext()

    const buttonClickHandler = (stepId: number) => {
       stepId == 1 ? setDepositModal(true) : stepId == 2 ? setCalculatorModal(true) : stepId == 3 ? setOpenWithdrawModal(true) : null;
    }

  return (
    <aside className="lg:w-[30%] w-full h-[300px] rounded-[15px] border-[1px] border-[#202021] p-[20px] flex flex-col gap-[20px] card_shadow bg-[var(--dark)]">
        <div>
            <h3 className="font-bold responsive-headerText"> Quick Actions </h3>
            <p className="text-(--paraph-color) responsive-paraph"> Common operations you can perform </p>
        </div>

        {/* action buttons */}
        <div className="w-full flex flex-col gap-[15px]">
          { quickActionBtns.map(action => (
            // action.title.toLowerCase() == "browse marketplace" 
            // ? 
            //   <Link key={action.id} href="/marketplace" className="glass-card flex items-center gap-[10px] text-white font-semibold rounded-[10px] cursor-pointer py-[6px] px-[10px]" >
            //    <LuChartNoAxesColumn className='' />
            //    {action.title} 
            //    </Link> 
            // : 
            <CustomButton
                  key={action.id} 
                  onClick={() => buttonClickHandler(action.id)}
                  disabled={false}
                  style={` ${action.id == 1 ? "bg-gradient " : action.id == 2 ? "glass-card" : "bg-[rgba(9,9,11,255)]"} responsive-btnText justify-start border-[1px] border-[#7f7f80]`}
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