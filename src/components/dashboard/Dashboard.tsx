"use client"
import React from 'react'
import Steps from './Steps'
import BalanceTracker from "./BalanceTracker"

const Dashboard = () => {
  return (
    <section className="flex flex-col w-full gap-[40px]">
       <div className="flex w-full flex-col gap-[20px] items-center mt-[40px]">
         <h2 className="text-[2.5vmax] font-bold"> Your Portfolio </h2>
         <p className="text-[1vmax] font-semibold text-[#7f7f80]"> Track your deposits, yields, and token holdings in one place </p>
       </div>

        {/* steps */}
       <Steps />
       <div className="flex items-center gap-[20px] w-full">
         {/* balance tracker */}
         <BalanceTracker />
       </div>
    </section>
  )
}

export default Dashboard