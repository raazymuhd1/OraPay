"use client"
import { useState } from 'react'
import SearchBar from './SearchBar'
import MarketTabs from './MarketTabs'
import PaymentModal from './PaymentModal'

const Marketplace = () => {
      const [openPayModal, setOpenPayModal] = useState<boolean>(false)

      console.log(openPayModal)

  return (
    <div className="flex w-[70%] mx-auto flex-col gap-[30px]">
       <div className="flex w-full flex-col gap-[20px] items-center mt-[40px]">
         <h2 className="text-[2.5vmax] font-bold"> Marketplace </h2>
         <p className="text-[1vmax] font-semibold text-[#7f7f80]"> Discover items, subscriptions, and services you can purchase with your yield tokens </p>
       </div>

       <SearchBar />
       <MarketTabs setOpenModal={setOpenPayModal} />
       <PaymentModal openModal={openPayModal} setOpenModal={setOpenPayModal} />
    </div>
  )
}

export default Marketplace