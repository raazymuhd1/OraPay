import React from 'react'
import { IconType } from 'react-icons/lib';
import { BsExclamation } from "react-icons/bs";

interface IBalancesProp {
  id: number;
  title: string;
  value: string;
  TitleLogo: IconType;
  desc: string;
}

const BalancesCard = ({ id, title, value, TitleLogo, desc }: IBalancesProp) => {
  return (
     <div 
        className="flex flex-col gap-[10px] lg:w-[35%] w-full md:h-[60%] h-[fit-content] glass-card p-[20px]"
        >
            <div className='w-full flex items-center justify-between'>
                <div className="flex items-center gap-[10px]">
                <TitleLogo />
                <h3 className="text-(--paraph-color) font-semibold resp-headerCard"> { title } </h3>
                </div>

                <BsExclamation className={`${id == 1 && "hidden" } block border-[1px] rounded-[50%] cursor-pointer hover:bg-[rgba(29,220,255,255)] transition-[background] duration-500 h-[10px] w-[10px] md:w-[15px] md:h-[15px]`} />
            </div>

            <div className="flex flex-col gap-[10px] w-full wrap-anywhere">
              <h2 className="font-bold text-[clamp(18px,1vw,25px)]"> { value } </h2>
              <p className={`${id == 3 ? "text-(--paraph-color)" : "text-[#11afb8]"} w-full md:text-[1vmax] text-[1.8vmax] whitespace-nowrap`}> {desc} </p>
            </div>
    </div>
  )
}

export default BalancesCard