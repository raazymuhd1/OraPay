"use client"
import React from 'react'
import Steps from './Steps'
import BalanceTracker from "./BalanceTracker"
import QuickActions from './QuickActions'
import YieldInfos from './YieldInfos'
import DepositModal from  "./DepositModal"
import CalculatorModal from "./CalculatorModal"
import WithdrawalModal from "./WithdrawalModal"

const Dashboard = () => {

  return (
    <section className="flex flex-col w-full gap-[40px] pb-[40px]">
       <div className="flex w-[80%] flex-col gap-[20px] mx-auto items-center mt-[40px]">
         <h2 className="page-headerText font-bold"> Your Portfolio </h2>
         <p className="page-paraphText text-center font-semibold text-(--paraph-color)"> Track your deposits, yields, and token holdings in one place </p>
       </div>

        {/* steps */}
       <Steps />
       <div className="flex items-center lg:flex-nowrap flex-wrap gap-[20px] xl:w-[70%] md:w-[90%] w-full mx-auto">
         {/* balance tracker */}
         <BalanceTracker />
         {/* quick actions */}
         <QuickActions />
       </div>

       <YieldInfos />

       {/* modals */}
       <DepositModal /> 
       <CalculatorModal />
       <WithdrawalModal />
    </section>
  )
}

export default Dashboard