import { useState } from 'react'
import { balances } from "@/constants"
import { MdArrowOutward } from "react-icons/md";
import { BsExclamation } from "react-icons/bs";

const BalanceTracker = () => {
      const [userBalances, updateUserBalance] = useState(balances);

  return (
    <aside className="w-[70%] h-[300px] mx-auto rounded-[10px] p-[30px] border-[1px] border-[#7f7f80] bg-brown">
        {/* top  */}
        <div className="w-full flex items-center justify-between">
            <aside>
              <h3 className="font-bold text-[1.5vmax]"> Your Balance </h3>
              <p className="text-[#7f7f80]"> Track your deposit and token holdings </p>
            </aside>

            <h4 className="flex items-center gap-[10px] bg-[rgba(9,9,11,255)] p-[6px] rounded-[10px] hover:bg-[rgba(29,220,255,255)] hover:text-[#fff]   transition-[background] duration-500 cursor-pointer text-[#11afb8]"> <MdArrowOutward className="w-[18px]" /> Manage </h4>
        </div>

        <aside className="w-full flex items-center justify-center gap-[20px] mt-[10px]">
           { userBalances.map(balance => (
               <div 
                className="flex flex-col gap-[10px] w-[250px] bg-brown"
                key={balance.id}>

                  <div className='w-full flex items-center justify-between'>
                      <div className="flex items-center gap-[10px]">
                        <balance.titleLogo />
                        <h3 className="text-[#7f7f80] font-semibold"> { balance.title } </h3>
                      </div>

                      <BsExclamation className={`${balance.id == 1 && "hidden" } block border-[1px] rounded-[50%] cursor-pointer hover:bg-[rgba(29,220,255,255)] transition-[background] duration-500`} />
                  </div>

                  <h2 className="font-bold text-[1.3vmax]"> { balance.value } </h2>
                  <p className={`${balance.id == 3 ? "text-[#7f7f80]" : "text-[#11afb8]"} `}> {balance.desc} </p>
               </div>
           )) }
        </aside>
    </aside>
  )
}

export default BalanceTracker