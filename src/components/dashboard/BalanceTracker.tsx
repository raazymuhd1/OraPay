import React from 'react'
import { MdArrowOutward } from "react-icons/md";

const BalanceTracker = () => {
  return (
    <aside className="w-[80%] h-[300px] mx-auto rounded-[10px] p-[30px] border-[1px] border-[#7f7f80] bg-brown">
        <div className="w-full flex items-center justify-between">
            <aside>
              <h3 className="font-bold text-[1.5vmax]"> Welcome to NoPeyPey </h3>
              <p className="text-[#7f7f80]"> The Buy Now, Pay Never protocol </p>
            </aside>

            <h4 className="flex items-center gap-[10px] bg-[rgba(9,9,11,255)] p-[6px] rounded-[10px] hover:bg-[rgba(29,220,255,255)]   transition-[background] duration-500 cursor-pointer"> <MdArrowOutward className="w-[18px]" /> How it works </h4>
        </div>
    </aside>
  )
}

export default BalanceTracker