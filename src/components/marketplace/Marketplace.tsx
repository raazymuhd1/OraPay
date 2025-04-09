"use client"
import { useState, useEffect } from 'react'
import SearchBar from './SearchBar'
import MarketTabs from './MarketTabs'
import PaymentModal from './PaymentModal'

const Marketplace = () => {

  return (
    <div className="flex w-[70%] mx-auto flex-col gap-[30px]">
       <div className="flex w-[80%]mx-auto flex-col gap-[20px] items-center mt-[40px]">
         <h2 className="page-headerText font-bold"> Marketplace </h2>
         <p className="page-paraphText font-semibold text-[#7f7f80]"> Discover items, subscriptions, and services you can purchase with your yield tokens </p>
       </div>

       <SearchBar />
       <MarketTabs  />
       <PaymentModal />
    </div>
  )
}

export default Marketplace