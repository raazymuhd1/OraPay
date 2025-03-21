import { useState } from 'react'
import { balances } from "@/constants"
import { MdArrowOutward } from "react-icons/md";
import { BsExclamation } from "react-icons/bs";

const BalanceTracker = () => {
      const [userBalances, updateUserBalance] = useState(balances);

  return (
    <aside className="lg:w-[70%] w-full lg:h-[300px] min-h-[300px] mx-auto rounded-[10px] p-[30px] border-[1px] border-[#202021] bg-brown">
        {/* top  */}
        <div className="w-full flex items-center justify-between">
            <aside>
              <h3 className="font-bold responsive-headerText"> Your Balance </h3>
              <p className="text-(--paraph-color) font-semibold responsive-paraph"> Track your deposit and token holdings </p>
            </aside>

            <h4 className="flex items-center gap-[10px] bg-[rgba(9,9,11,255)] p-[6px] rounded-[10px] hover:bg-[rgba(29,220,255,255)] hover:text-[#fff]   transition-[background] duration-500 cursor-pointer text-[#11afb8] text-[clamp(14px),1vw,16px]"> <MdArrowOutward className="w-[18px]" /> Manage </h4>
        </div>

        <aside className="w-full flex items-center lg:flex-nowrap flex-wrap justify-center gap-[20px] mt-[10px]">
           { userBalances.map(balance => (
               <div 
                className="flex flex-col gap-[10px] lg:w-[30%] w-full h-[60%] glass-card p-[20px]"
                key={balance.id}>

                  <div className='w-full flex items-center justify-between'>
                      <div className="flex items-center gap-[10px]">
                        <balance.titleLogo />
                        <h3 className="text-(--paraph-color) font-semibold resp-headerCard"> { balance.title } </h3>
                      </div>

                      <BsExclamation className={`${balance.id == 1 && "hidden" } block border-[1px] rounded-[50%] cursor-pointer hover:bg-[rgba(29,220,255,255)] transition-[background] duration-500 h-[10px] w-[10px] md:w-[15px] md:h-[15px]`} />
                  </div>

                  <h2 className="font-bold text-[clamp(18px,1vw,25px)]"> { balance.value } </h2>
                  <p className={`${balance.id == 3 ? "text-(--paraph-color)" : "text-[#11afb8]"} md:text-[1vmax] text-[1.8vmax] whitespace-nowrap`}> {balance.desc} </p>
               </div>
           )) }
        </aside>
    </aside>
  )
}

export default BalanceTracker